import express from 'express'
    import cors from 'cors'
    import helmet from 'helmet'
    import compression from 'compression'
    import Database from 'better-sqlite3'
    import jwt from 'jsonwebtoken'
    import bcrypt from 'bcryptjs'
    import { RateLimiterMemory } from 'rate-limiter-flexible'
    import asyncHandler from 'express-async-handler'

    const app = express()
    const db = new Database('database.db')
    const limiter = new RateLimiterMemory({
      points: 100,
      duration: 60
    })

    app.use(helmet())
    app.use(compression())
    app.use(cors())
    app.use(express.json())

    // Rate limiting middleware
    app.use(async (req, res, next) => {
      try {
        await limiter.consume(req.ip)
        next()
      } catch {
        res.status(429).json({ error: 'Too many requests' })
      }
    })

    // Database initialization
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        is_premium BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run()

    // Authentication middleware
    const authenticate = asyncHandler(async (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) throw new Error('Authentication required')

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id)
      if (!user) throw new Error('User not found')

      req.user = user
      next()
    })

    // Routes
    app.post('/register', asyncHandler(async (req, res) => {
      const { email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      
      try {
        const { lastInsertRowid } = db.prepare(`
          INSERT INTO users (email, password) VALUES (?, ?)
        `).run(email, hashedPassword)

        const token = jwt.sign({ id: lastInsertRowid }, process.env.JWT_SECRET)
        res.json({ token })
      } catch (error) {
        throw new Error('Email already exists')
      }
    }))

    app.post('/login', asyncHandler(async (req, res) => {
      const { email, password } = req.body
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
      if (!user) throw new Error('Invalid credentials')

      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) throw new Error('Invalid credentials')

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      res.json({ token, isPremium: user.is_premium })
    }))

    app.get('/profile', authenticate, (req, res) => {
      res.json(req.user)
    })

    // Start server
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
