import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthProvider'
import { MemoryRouter } from 'react-router-dom'

const TestComponent = () => {
  const { user, loading } = useAuth()
  return (
    <div>
      <span data-testid="user">{JSON.stringify(user)}</span>
      <span data-testid="loading">{loading.toString()}</span>
    </div>
  )
}

describe('AuthProvider', () => {
  it('should handle authentication state', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })
  })
})
