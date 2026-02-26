import { Link } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'

export function ChatsPage() {
  const chats = [
    { id: '1', name: 'Marie', message: 'Salut! Ça va?', time: '14:30', unread: 2 },
    { id: '2', name: 'Groupe Famille', message: 'On mange où ce soir?', time: '12:15', unread: 0 },
    { id: '3', name: 'Jean', message: '👍', time: 'Hier', unread: 0 },
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-medium">OuiChat</h1>
        <div className="flex gap-4">
          <Search size={22} />
          <Plus size={22} />
        </div>
      </header>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="flex items-center bg-white px-4 py-3 border-b border-gray-100 active:bg-gray-100"
          >
            <div className="w-12 h-12 rounded bg-gray-300 flex-shrink-0" />
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-wechat-dark truncate">{chat.name}</h3>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                {chat.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
