import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import initSqlJs from 'sql.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import asyncHandler from 'express-async-handler'

const app = express()
const SQL = await initSqlJs()
const db = new SQL.Database()
const limiter = new RateLimiterMemory({
  points: 100,
  duration: 60
})

// ... reste du code serveur ...
