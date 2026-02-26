import { useAuthStore } from '../stores/auth'
import { QrCode, Wallet, CreditCard, Settings, Shield, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MePage() {
  const { user, logout } = useAuthStore()

  const menuItems = [
    { icon: QrCode, label: 'Mon QR Code', path: '/qr' },
    { icon: Wallet, label: 'OuiPay', path: '/pay' },
    { icon: CreditCard, label: 'Cartes', path: '/cards' },
    { icon: Shield, label: 'BEEChat Monitor', path: '/beechat-monitor' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Profile header */}
      <div className="bg-white mt-4 px-4 py-6 flex items-center">
        <div className="w-16 h-16 rounded-lg bg-gray-300" />
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-medium">{user?.displayName || 'Utilisateur'}</h2>
          <p className="text-sm text-gray-500">+1 {user?.phone}</p>
        </div>
        <MessageCircle size={20} className="text-gray-400" />
      </div>

      {/* Menu */}
      <div className="mt-4 bg-white">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-4 active:bg-gray-100 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <Icon size={22} className="text-gray-600" />
              <span className="ml-3 flex-1">{item.label}</span>
              <span className="text-gray-400">›</span>
            </Link>
          )
        })}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-4 bg-white py-4 text-center text-red-500 active:bg-gray-100"
      >
        Déconnexion
      </button>
    </div>
  )
}
