import { NavLink, useLocation } from 'react-router-dom'
import { MessageCircle, Users, Compass, User } from 'lucide-react'

export function TabBar() {
  const location = useLocation()
  
  // Hide tab bar on chat detail pages
  if (location.pathname.startsWith('/chat/')) {
    return null
  }

  const tabs = [
    { path: '/chats', label: 'Chats', icon: MessageCircle },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/discover', label: 'Discover', icon: Compass },
    { path: '/me', label: 'Me', icon: User },
  ]

  return (
    <nav className="bg-white border-t border-gray-200 safe-bottom">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full ${
                  isActive ? 'text-wechat-green' : 'text-gray-500'
                }`
              }
            >
              <Icon size={24} strokeWidth={2} />
              <span className="text-xs mt-1">{tab.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
