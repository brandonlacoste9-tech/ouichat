import { useState } from 'react'
import { ChevronLeft, MessageSquare, MapPin, Users, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BeechatMonitorPage() {
  const [activeTab, setActiveTab] = useState<'messages' | 'location' | 'contacts'>('messages')

  // Mock data - in real app this comes from BEEChat API
  const child = {
    name: 'Emma',
    age: 8,
    status: 'online',
    lastSeen: '2 min ago',
  }

  const recentMessages = [
    { from: 'Ami', content: 'Tu veux jouer?', time: '14:20', flagged: false },
    { from: 'Inconnu', content: 'Salut! Comment ça va?', time: '13:15', flagged: true },
    { from: 'Famille', content: 'À ce soir!', time: '12:00', flagged: false },
  ]

  const location = {
    current: 'École Saint-Joseph',
    lat: 45.5017,
    lng: -73.5673,
    updated: '5 min ago',
    inSafeZone: true,
  }

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center">
        <Link to="/me" className="mr-4">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-medium">BEEChat Monitor</h1>
      </header>

      {/* Child profile */}
      <div className="bg-white px-4 py-4 flex items-center">
        <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl">
          🐝
        </div>
        <div className="ml-3 flex-1">
          <h2 className="font-medium text-lg">{child.name}</h2>
          <p className="text-sm text-gray-500">{child.age} ans • {child.lastSeen}</p>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="text-sm text-green-600">En ligne</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white flex border-b border-gray-200">
        {[
          { id: 'messages', label: 'Messages', icon: MessageSquare },
          { id: 'location', label: 'Localisation', icon: MapPin },
          { id: 'contacts', label: 'Contacts', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center py-3 text-sm ${
                isActive ? 'text-wechat-green border-b-2 border-wechat-green' : 'text-gray-500'
              }`}
            >
              <Icon size={16} className="mr-2" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {recentMessages.map((msg, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{msg.from}</p>
                    <p className="text-gray-600 mt-1">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                {msg.flagged && (
                  <div className="mt-2 flex items-center text-amber-600 text-sm bg-amber-50 p-2 rounded">
                    <AlertTriangle size={16} className="mr-2" />
                    Message suspect détecté
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'location' && (
          <div className="bg-white rounded-lg p-4">
            <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <MapPin size={32} className="text-gray-400" />
              <span className="ml-2 text-gray-500">Carte</span>
            </div>
            <div className="space-y-2">
              <p className="font-medium">{location.current}</p>
              <p className="text-sm text-gray-500">Mis à jour: {location.updated}</p>
              {location.inSafeZone ? (
                <p className="text-green-600 text-sm">✓ Dans la zone sécuritaire</p>
              ) : (
                <p className="text-red-600 text-sm">⚠ Hors zone</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg">
            {['Ami (approuvé)', 'Cousin (approuvé)', 'Inconnu (en attente)'].map((contact, idx) => (
              <div key={idx} className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span>{contact}</span>
                {contact.includes('attente') && (
                  <button className="text-wechat-green text-sm">Approuver</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety tips */}
      <div className="p-4 bg-blue-50 text-blue-800 text-sm">
        <p className="font-medium mb-1">💡 Conseil de sécurité</p>
        <p>Vérifiez régulièrement les messages et approuvez uniquement les contacts connus.</p>
      </div>
    </div>
  )
}
