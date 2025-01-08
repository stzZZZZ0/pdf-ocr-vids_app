import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../LoginPage'
import { AuthProvider } from '../../components/AuthProvider'

describe('LoginPage', () => {
  it('should display error on invalid credentials', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    )

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    })

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    // Vérifier l'erreur
    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument()
  })

  it('should successfully login with valid credentials', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    )

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'validpassword' }
    })

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    // Vérifier la redirection
    expect(window.location.pathname).toBe('/')
  })
})
