import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send, Mic, Phone, Video, MoreVertical, Smile, Paperclip, CheckCheck } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: { id: string; username: string; avatar: string };
  timestamp: Date;
  type: "text" | "voice";
  isBot?: boolean;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "offline";
}

const THEME = {
  primary: "#1a472a",
  secondary: "#d4af37",
  bg: "#0f1419",
  card: "#1a1f2e",
};

export default function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("message:received", (msg: Message) => {
      setMessages((prev) => [...prev, { ...msg, timestamp: new Date(msg.timestamp) }]);
    });

    newSocket.on("user:joined", (user: User) => {
      setUsers((prev) => [...prev.filter((u) => u.id !== user.id), user]);
    });

    newSocket.on("user:left", (user: User) => {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "offline" } : u)));
    });

    newSocket.on("typing:start", ({ username }) => {
      setTypingUsers((prev) => [...new Set([...prev, username])]);
    });

    newSocket.on("typing:stop", () => {
      setTypingUsers([]);
    });

    return () => { newSocket.close(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = () => {
    if (!socket || !username.trim()) return;
    socket.emit("user:join", { username, avatar: "🦫" });
    socket.emit("conversation:join", "general");
    setIsJoined(true);
  };

  const handleSend = () => {
    if (!socket || !inputMessage.trim()) return;
    socket.emit("message:send", { content: inputMessage, conversationId: "general", type: "text" });
    setInputMessage("");
    socket.emit("typing:stop", "general");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: THEME.bg }}>
        <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl" style={{ background: THEME.card }}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🦫</div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: THEME.secondary }}>OuiChat</h1>
            <p className="text-gray-400">Le messager du Québec</p>
          </div>
          <input
            type="text"
            placeholder="Ton nom (ex: Jean-Guy)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleJoin()}
            className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 mb-4"
            style={{ background: THEME.bg, border: `1px solid ${THEME.primary}` }}
          />
          <button
            onClick={handleJoin}
            disabled={!username.trim()}
            className="w-full py-3 rounded-xl font-bold text-lg disabled:opacity-50"
            style={{ background: THEME.primary, color: THEME.secondary }}
          >
            Entrer dans le chat ⚜️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: THEME.bg }}>
      <header className="flex items-center justify-between px-4 py-3 border-b" style={{ background: THEME.card, borderColor: THEME.primary }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl" style={{ background: THEME.primary }}>🦫</div>
          <div>
            <h2 className="font-bold text-white">Chat Général</h2>
            <p className="text-xs text-gray-400">{users.filter((u) => u.status === "online").length} en ligne</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button style={{ color: THEME.secondary }}><Phone size={20} /></button>
          <button style={{ color: THEME.secondary }}><Video size={20} /></button>
          <button style={{ color: THEME.secondary }}><MoreVertical size={20} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === socket?.id;
          const isTiGuy = msg.senderId === "ti-guy";
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[70%] gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: isTiGuy ? THEME.secondary : THEME.primary, color: isTiGuy ? "#000" : THEME.secondary }}>
                  {isTiGuy ? "🦫" : msg.sender?.avatar || "👤"}
                </div>
                <div className={`px-4 py-2 rounded-2xl ${isMe ? "rounded-br-md" : "rounded-bl-md"}`} style={{ background: isMe ? THEME.primary : THEME.card, border: isTiGuy ? `2px solid ${THEME.secondary}` : "none" }}>
                  {!isMe && !isTiGuy && <p className="text-xs mb-1" style={{ color: THEME.secondary }}>{msg.sender?.username}</p>}
                  {isTiGuy && <p className="text-xs mb-1 font-bold" style={{ color: THEME.secondary }}>TI-GUY 🦫</p>}
                  <p className="text-sm text-white">{msg.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] opacity-60">{format(new Date(msg.timestamp), "HH:mm", { locale: fr })}</span>
                    {isMe && <CheckCheck size={12} className="opacity-60" style={{ color: THEME.secondary }} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl" style={{ background: THEME.card }}>
              <p className="text-xs text-gray-400">{typingUsers.join(", ")} écrit...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-t flex gap-2 overflow-x-auto" style={{ background: THEME.card, borderColor: THEME.primary }}>
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ background: THEME.bg }}>
            <span>{user.avatar}</span>
            <span className="text-gray-300">{user.username}</span>
            <span className={user.status === "online" ? "text-green-400" : "text-gray-500"}>●</span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t" style={{ background: THEME.card, borderColor: THEME.primary }}>
        <div className="flex items-center gap-2">
          <button style={{ color: THEME.secondary }}><Paperclip size={20} /></button>
          <button style={{ color: THEME.secondary }}><Smile size={20} /></button>
          <input
            type="text"
            placeholder="Écris ton message..."
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              if (socket && e.target.value) socket.emit("typing:start", "general");
            }}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 rounded-full text-white placeholder-gray-500"
            style={{ background: THEME.bg }}
          />
          <button style={{ color: THEME.secondary }}><Mic size={20} /></button>
          <button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className="p-3 rounded-full disabled:opacity-50"
            style={{ background: THEME.primary, color: THEME.secondary }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
