import { useParams } from 'react-router-dom'
import { ChevronLeft, Phone, Video, MoreVertical, Send, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ChatDetailPage() {
  const { id } = useParams()
  const [message, setMessage] = useState('')

  const mockMessages = [
    { id: 1, from: 'them', content: 'Salut! Ça va?', time: '14:20' },
    { id: 2, from: 'me', content: 'Ça va bien, merci! Et toi?', time: '14:22' },
    { id: 3, from: 'them', content: 'Super! On se voit ce soir?', time: '14:25' },
    { id: 4, from: 'me', content: 'Oui, à 19h au resto?', time: '14:28' },
    { id: 5, from: 'them', content: 'Parfait! 👍', time: '14:30' },
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-3">
            <ChevronLeft size={24} />
          </Link>
          <span className="font-medium">Marie</span>
        </div>
        <div className="flex gap-4">
          <Phone size={20} />
          <Video size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.from === 'me'
                  ? 'bg-wechat-green text-white'
                  : 'bg-white'
              }`}
            >
              <p>{msg.content}</p>
              <span className={`text-xs ${msg.from === 'me' ? 'opacity-75' : 'text-gray-400'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-3 flex items-center gap-3">
        <Plus size={24} className="text-gray-500" />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-wechat-bg rounded-full px-4 py-2 outline-none"
        />
        <button className="bg-wechat-green text-white p-2 rounded-full">
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
