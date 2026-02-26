import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './stores/auth'

// Layout
import { TabBar } from './components/TabBar'

// Pages - WeChat style tabs
import { ChatsPage } from './pages/Chats'
import { ContactsPage } from './pages/Contacts'
import { DiscoverPage } from './pages/Discover'
import { MePage } from './pages/Me'

// Feature pages
import { ChatDetailPage } from './pages/ChatDetail'
import { MomentsPage } from './pages/Moments'
import { PayPage } from './pages/Pay'
import { MiniAppsPage } from './pages/MiniApps'
import { BeechatMonitorPage } from './pages/BeechatMonitor'
import { LoginPage } from './pages/Login'

// Tab routes that show the TabBar
const TAB_ROUTES = ['/chats', '/contacts', '/discover', '/me', '/']

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Check if current route is a tab route
  const isTabRoute = TAB_ROUTES.some(route => 
    route === '/' ? location.pathname === '/' : location.pathname.startsWith(route)
  )

  return (
    <div className="h-screen flex flex-col bg-wechat-bg">
      <div className="flex-1 overflow-hidden">
        <Routes>
          {/* Main tabs */}
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/me" element={<MePage />} />
          
          {/* Feature routes */}
          <Route path="/chat/:id" element={<ChatDetailPage />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/miniapps" element={<MiniAppsPage />} />
          <Route path="/beechat-monitor" element={<BeechatMonitorPage />} />
        </Routes>
      </div>
      {isTabRoute && <TabBar />}
    </div>
  )
}

export default App
