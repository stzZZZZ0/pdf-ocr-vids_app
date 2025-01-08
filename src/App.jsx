import React from 'react'
    import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import { AuthProvider } from './components/AuthProvider'
    import ProtectedRoute from './components/ProtectedRoute'
    import HomePage from './pages/HomePage'
    import LoginPage from './pages/LoginPage'
    import RegisterPage from './pages/RegisterPage'
    import ProfilePage from './pages/ProfilePage'
    import Navbar from './components/Navbar'

    function App() {
      return (
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      )
    }

    export default App
