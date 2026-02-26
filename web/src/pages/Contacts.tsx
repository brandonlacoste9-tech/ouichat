import { Search, UserPlus } from 'lucide-react'

export function ContactsPage() {
  const contacts = [
    { name: 'Alice', status: 'online' },
    { name: 'Bob', status: 'offline' },
    { name: 'Charlie', status: 'online' },
  ]

  return (
    <div className="h-full flex flex-col bg-wechat-bg">
      {/* Header */}
      <header className="bg-wechat-dark text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-medium">Contacts</h1>
        <UserPlus size={22} />
      </header>

      {/* Search */}
      <div className="bg-white px-4 py-2">
        <div className="flex items-center bg-wechat-bg rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher"
            className="bg-transparent ml-2 flex-1 outline-none"
          />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto mt-2">
        <div className="bg-white">
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className="flex items-center px-4 py-3 border-b border-gray-100 active:bg-gray-100"
            >
              <div className="w-10 h-10 rounded bg-gray-300" />
              <div className="ml-3 flex-1">
                <p className="font-medium">{contact.name}</p>
              </div>
              {contact.status === 'online' && (
                <span className="w-2 h-2 bg-green-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
