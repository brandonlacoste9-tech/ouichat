import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  type: 'text' | 'voice';
}

interface ChildChatProps {
  socket: Socket;
  childId: string;
  username: string;
  parentId: string;
}

export const ChildChat: React.FC<ChildChatProps> = ({ socket, childId, username, parentId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [tiGuyMessage, setTiGuyMessage] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Request location tracking
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          socket.emit('location:update', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => console.log('Location error:', error),
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [socket]);

  useEffect(() => {
    socket.on('message:received', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('message:sent', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('message:blocked', (data) => {
      setWarning(data.tiGuyMessage);
      setTimeout(() => setWarning(null), 5000);
    });

    socket.on('message:warning', (data) => {
      setTiGuyMessage(data.tiGuyMessage);
      setTimeout(() => setTiGuyMessage(null), 3000);
    });

    return () => {
      socket.off('message:received');
      socket.off('message:sent');
      socket.off('message:blocked');
      socket.off('message:warning');
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    socket.emit('message:send', {
      content: inputValue,
      recipientId: 'test_recipient', // Would be dynamic
      type: 'text',
    });

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐝</span>
            <div>
              <h1 className="font-bold">BEEChat</h1>
              <p className="text-xs text-green-200">Messagerie sécurisée - {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-200">Tes parents peuvent voir tes messages</span>
          </div>
        </div>
      </div>

      {/* BEE Warning */}
      {tiGuyMessage && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 animate-pulse">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <span className="text-3xl">🐝</span>
            <div>
              <p className="font-bold text-yellow-800">TI-GUY dit:</p>
              <p className="text-yellow-700">{tiGuyMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Block Warning */}
      {warning && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <span className="text-3xl">🚫</span>
            <div>
              <p className="font-bold text-red-800">Message bloqué</p>
              <p className="text-red-700">{warning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl">👋</span>
              <p className="mt-4 text-gray-600">
                Bienvenue sur OuiChat, {username}!
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Envoie un message à tes amis approuvés par tes parents
              </p>
              <div className="mt-6 bg-green-50 rounded-xl p-4 inline-block">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <span>🐝</span>
                  TI-GUY veille sur toi! Utilise des mots gentils.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => {
            const isMe = msg.senderId === childId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isMe
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white shadow-md text-gray-800 rounded-bl-none'
                  }`}
                >
                  {!isMe && (
                    <p className="text-xs font-medium text-green-700 mb-1">
                      {msg.senderName}
                    </p>
                  )}
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${isMe ? 'text-green-200' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('fr-CA', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Écris un message gentil..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Envoyer
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          🛡️ TI-GUY surveille les messages pour ta sécurité
        </p>
      </div>
    </div>
  );
};

export default ChildChat;
