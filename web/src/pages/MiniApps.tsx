import { ChevronLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MiniAppsPage() {
  const categories = [
    { id: 'recent', name: 'Récemment utilisés', apps: [
      { name: 'Réservations', icon: '📅' },
      { name: 'Livraison', icon: '🍕' },
    ]},
    { id: 'food', name: 'Restauration', apps: [
      { name: 'Restos', icon: '🍽️' },
      { name: 'Cafés', icon: '☕' },
      { name: 'Bars', icon: '🍺' },
    ]},
    { id: 'services', name: 'Services', apps: [
      { name: 'Plombier', icon: '🔧' },
      { name: 'Taxi', icon: '🚕' },
      { name: 'Livraison', icon: '📦' },
    ]},
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center justify-between">
        <Link to="/discover" className="flex items-center">
          <ChevronLeft size={24} />
          <span className="ml-2">Mini-apps</span>
        </Link>
        <Search size={22} />
      </header>

      {/* Search bar */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-center bg-wechat-bg rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une mini-app"
            className="bg-transparent ml-2 flex-1 outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.id} className="mt-4">
            <h3 className="px-4 text-sm text-gray-500 mb-2">{cat.name}</h3>
            <div className="bg-white grid grid-cols-4 gap-4 p-4">
              {cat.apps.map((app) => (
                <div key={app.name} className="flex flex-col items-center">
                  <span className="text-3xl">{app.icon}</span>
                  <span className="text-xs mt-2">{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
