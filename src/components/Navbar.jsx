import React from 'react'
    import { Link } from 'react-router-dom'
    import { useAuth } from './AuthProvider'

    export default function Navbar() {
      const { user, logout } = useAuth()

      return (
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              PDF OCR & Video Summary
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-primary">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-primary">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )
    }
