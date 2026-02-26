import { ChevronLeft, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MomentsPage() {
  const moments = [
    {
      id: 1,
      user: 'Alice',
      avatar: '',
      content: 'Belle journée à Montréal! 🌞',
      images: [''],
      time: '2h',
      likes: 12,
      comments: 3,
    },
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center justify-between">
        <Link to="/discover" className="flex items-center">
          <ChevronLeft size={24} />
          <span className="ml-2">Moments</span>
        </Link>
        <Camera size={22} />
      </header>

      {/* Cover */}
      <div className="relative h-48 bg-gradient-to-b from-blue-400 to-blue-600">
        <div className="absolute -bottom-8 right-4 flex items-end">
          <span className="text-white font-medium mr-3 mb-2">Moi</span>
          <div className="w-20 h-20 bg-gray-300 rounded-lg border-4 border-wechat-bg" />
        </div>
      </div>

      {/* Moments list */}
      <div className="flex-1 overflow-y-auto mt-10 px-4">
        {moments.map((moment) => (
          <div key={moment.id} className="flex py-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded bg-gray-300 flex-shrink-0" />
            <div className="ml-3 flex-1">
              <p className="text-wechat-blue font-medium">{moment.user}</p>
              <p className="mt-1">{moment.content}</p>
              <div className="mt-2 text-sm text-gray-400 flex justify-between">
                <span>{moment.time}</span>
                <span>{moment.likes} ❤ {moment.comments} 💬</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
