import { render, screen } from '@testing-library/react'
import PremiumModal from '../PremiumModal'

describe('PremiumModal', () => {
  it('should render premium features', () => {
    render(
      <PremiumModal 
        onClose={jest.fn()}
        setIsPremium={jest.fn()}
      />
    )

    expect(screen.getByText('Premium Features')).toBeInTheDocument()
    expect(screen.getByText('Pas de publicités')).toBeInTheDocument()
    expect(screen.getByText("S'abonner - 9.99€/mois")).toBeInTheDocument()
  })
})
