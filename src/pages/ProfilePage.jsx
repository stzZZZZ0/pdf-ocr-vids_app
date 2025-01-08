import { useAuth } from '../components/AuthProvider'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <div className="p-2 bg-gray-100 rounded">{user?.email}</div>
        </div>
        <div>
          <label className="block mb-1">Statut</label>
          <div className="p-2 bg-gray-100 rounded">
            {user?.isPremium ? 'Premium' : 'Gratuit'}
          </div>
        </div>
      </div>
    </div>
  )
}
