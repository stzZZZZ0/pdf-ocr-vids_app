import { useAuth } from '../components/AuthProvider'

    export default function ProfilePage() {
      const { user } = useAuth()

      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Account Type</h3>
                <p className="text-gray-600">
                  {user?.isPremium ? 'Premium' : 'Free'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
