import { useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { useAuth } from './AuthProvider'

    export default function ProtectedRoute({ children }) {
      const { user, loading } = useAuth()
      const navigate = useNavigate()

      useEffect(() => {
        if (!loading && !user) {
          navigate('/login')
        }
      }, [user, loading, navigate])

      if (loading) return <div>Loading...</div>
      if (!user) return null

      return children
    }
