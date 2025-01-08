import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RegisterPage from '../RegisterPage'
import { AuthProvider } from '../../components/AuthProvider'

describe('RegisterPage', () => {
  it('should display error on registration failure', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </MemoryRouter>
    )

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    // Vérifier l'erreur
    expect(await screen.findByText(/registration failed/i)).toBeInTheDocument()
  })

  it('should successfully register with valid credentials', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </MemoryRouter>
    )

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'newuser@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'validpassword123' }
    })

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /register/i }))

    // Vérifier la redirection
    expect(window.location.pathname).toBe('/')
  })
})
