/**
     * © 2023 [Votre nom ou société]. Tous droits réservés.
     * Ce fichier fait partie du projet PDF OCR & Video Summary App.
     * Licence : MIT
     */

    import { createContext, useContext, useState, useEffect } from 'react'
    import axios from 'axios'
    import { useNavigate } from 'react-router-dom'

    const AuthContext = createContext()

    export function AuthProvider({ children }) {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)
      const navigate = useNavigate()

      useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
          axios.get('/profile', {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => setUser(response.data))
          .catch(() => localStorage.removeItem('token'))
          .finally(() => setLoading(false))
        } else {
          setLoading(false)
        }
      }, [])

      const login = async (email, password) => {
        const { data } = await axios.post('/login', { email, password })
        localStorage.setItem('token', data.token)
        setUser({ ...data })
      }

      const register = async (email, password) => {
        const { data } = await axios.post('/register', { email, password })
        localStorage.setItem('token', data.token)
        setUser({ email, isPremium: false })
      }

      const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login')
      }

      return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
          {children}
        </AuthContext.Provider>
      )
    }

    export const useAuth = () => useContext(AuthContext)
