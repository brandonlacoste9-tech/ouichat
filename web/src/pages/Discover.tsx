import { Search } from 'lucide-react'

export function DiscoverPage() {
  const miniApps = [
    { id: 'reservations', name: 'Réservations', icon: '📅', desc: 'Restaurants, salons...' },
    { id: 'shopping', name: 'Shopping', icon: '🛒', desc: 'Commande locale' },
    { id: 'delivery', name: 'Livraison', icon: '🍕', desc: 'Repas et courses' },
    { id: 'transit', name: 'Transport', icon: '🚌', desc: 'STM, BIXI, taxis' },
    { id: 'events', name: 'Événements', icon: '🎭', desc: 'Spectacles, concerts' },
    { id: 'services', name: 'Services', icon: '🔧', desc: 'Plombier, électricien' },
  ]

  const features = [
    { name: 'Moments', icon: '📸', desc: 'Partagez vos photos' },
    { name: 'Channels', icon: '📢', desc: 'Suivez vos commerces' },
    { name: 'Nearby', icon: '📍', desc: 'Trouvez du monde près de vous' },
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-medium">Découvrir</h1>
        <Search size={22} />
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Features */}
        <div className="bg-white mt-2">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center px-4 py-4 border-b border-gray-100 active:bg-gray-100"
            >
              <span className="text-2xl">{feat.icon}</span>
              <div className="ml-3 flex-1">
                <p className="font-medium">{feat.name}</p>
                <p className="text-sm text-gray-500">{feat.desc}</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          ))}
        </div>

        {/* Mini-apps section */}
        <div className="mt-4 px-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase mb-3">Mini-apps</h2>
          <div className="grid grid-cols-3 gap-3">
            {miniApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg p-3 text-center active:bg-gray-100"
              >
                <span className="text-3xl">{app.icon}</span>
                <p className="font-medium mt-2 text-sm">{app.name}</p>
                <p className="text-xs text-gray-400 mt-1">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promo banner */}
        <div className="mx-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
          <p className="font-medium">🎉 Nouveau!</p>
          <p className="text-sm mt-1">Rejoignez le programme fidélité OuiChat</p>
        </div>
      </div>
    </div>
  )
}
