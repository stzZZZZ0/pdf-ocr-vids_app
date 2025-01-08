import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

export default function PremiumModal({ onClose, setIsPremium }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubscribe = async () => {
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      if (stripeError) throw stripeError

      // Create subscription
      const response = await axios.post('/create-subscription', {
        email: 'user@example.com', // Get from auth
        paymentMethod: paymentMethod.id
      })

      // Confirm payment
      const { error: confirmError } = await stripe.confirmCardPayment(
        response.data.clientSecret
      )

      if (confirmError) throw confirmError

      setIsPremium(true)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Passer à Premium</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Premium Features</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Pas de publicités</li>
              <li>OCR illimité</li>
              <li>Résumés vidéo plus longs</li>
              <li>Support prioritaire</li>
            </ul>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <button 
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-premium text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Traitement...' : 'S\'abonner - 9.99€/mois'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
