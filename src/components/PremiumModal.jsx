import { useState, useEffect } from 'react'
    import { loadStripe } from '@stripe/stripe-js'
    import { motion } from 'framer-motion'
    import { AiOutlineClose } from 'react-icons/ai'

    export default function PremiumModal({ onClose, setIsPremium }) {
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)
      const [stripe, setStripe] = useState(null)

      // Load Stripe.js on component mount
      useEffect(() => {
        let isMounted = true

        const initializeStripe = async () => {
          try {
            const stripeInstance = await loadStripe('pk_test_51...') // Replace with your actual Stripe publishable key
            if (isMounted) {
              setStripe(stripeInstance)
            }
          } catch (err) {
            if (isMounted) {
              setError('Failed to load payment system. Please try again later.')
            }
          }
        }

        initializeStripe()

        return () => {
          isMounted = false
        }
      }, [])

      const handleSubscribe = async () => {
        if (!stripe) {
          setError('Payment system is not ready. Please try again.')
          return
        }

        setLoading(true)
        setError(null)

        try {
          const { error: stripeError } = await stripe.redirectToCheckout({
            lineItems: [{ price: 'your_price_id', quantity: 1 }],
            mode: 'subscription',
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancel`,
          })

          if (stripeError) throw stripeError
        } catch (err) {
          setError(err.message || 'Payment failed. Please try again.')
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
              <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
              <button onClick={onClose}>
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Premium Features</h3>
                <ul className="list-disc pl-5 mt-2">
                  <li>No ads</li>
                  <li>Unlimited OCR</li>
                  <li>Longer video summaries</li>
                  <li>Priority support</li>
                </ul>
              </div>

              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={handleSubscribe}
                disabled={loading || !stripe}
                className="w-full bg-premium text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Subscribe - $9.99/month'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )
    }
