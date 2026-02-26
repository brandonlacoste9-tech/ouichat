import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ParentDashboard } from './components/ParentDashboard';
import { ChildChat } from './components/ChildChat';

const SOCKET_URL = 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userType, setUserType] = useState<'none' | 'parent' | 'child'>('none');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [parentId, setParentId] = useState('');
  const [userId, setUserId] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    
    newSocket.on('connect', () => {
      console.log('✅ Connected to BEEChat');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('child:registered', (data) => {
      setUserId(data.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const registerParent = () => {
    if (!socket || !username) return;
    
    socket.emit('parent:register', {
      username,
      email: `${username}@example.com`,
    });
    
    setUserId(socket.id);
    setUserType('parent');
  };

  const registerChild = () => {
    if (!socket || !username || !age || !parentId) return;
    
    socket.emit('child:register', {
      username,
      age: Number(age),
      parentId,
      restrictions: {
        timeLimit: 120,
        allowedHours: { start: 7, end: 21 },
        contentFilter: true,
      }
    });
    
    setUserType('child');
  };

  // Parent Dashboard
  if (userType === 'parent' && socket) {
    return <ParentDashboard socket={socket} parentId={userId} />;
  }

  // Child Chat
  if (userType === 'child' && socket && userId) {
    return (
      <ChildChat 
        socket={socket} 
        childId={userId} 
        username={username}
        parentId={parentId}
      />
    );
  }

  // Landing / Registration
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-6xl">🐝</span>
          <h1 className="text-3xl font-bold text-green-800 mt-4">BEEChat</h1>
          <p className="text-gray-600 mt-2">
            La messagerie sécurisée pour ados du Québec
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-green-700">
            <span>🔒</span>
            <span>Approuvé par les parents</span>
          </div>
        </div>

        {!isConnected && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg p-3 mb-4 text-center">
            ⏳ Connexion au serveur...
          </div>
        )}

        {/* Mode Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setUserType('none')}
            className={`p-4 rounded-xl border-2 transition ${
              userType === 'none' 
                ? 'border-green-600 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <span className="text-2xl">👨‍👩‍👧</span>
            <p className="font-medium mt-2">Je suis un parent</p>
          </button>
          <button
            onClick={() => setUserType('none')}
            className={`p-4 rounded-xl border-2 transition ${
              userType === 'none' 
                ? 'border-green-600 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <span className="text-2xl">👦👧</span>
            <p className="font-medium mt-2">Je suis un ado</p>
          </button>
        </div>

        {/* Registration Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ton pseudo"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Child-specific fields */}
          {(
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="11-16"
                  min={11}
                  max={16}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Parent (demande à tes parents)
                </label>
                <input
                  type="text"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  placeholder="ex: parent_123"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
              <button
                onClick={registerChild}
                disabled={!username || !age || !parentId || !isConnected}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                🚀 Commencer à chatter!
              </button>
            </>
          ) }

          {/* Parent registration */}
          {(
            <button
              onClick={registerParent}
              disabled={!username || !isConnected}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              👨‍👩‍👧 Créer un compte parent
            </button>
          )}
        </div>

        {/* Safety Info */}
        <div className="mt-6 bg-green-50 rounded-lg p-4 text-sm text-green-800">
          <p className="flex items-center gap-2 font-medium">
            <span>🛡️</span>
            Sécurité avant tout!
          </p>
          <ul className="mt-2 space-y-1 text-green-700">
            <li>• Les parents approuvent les contacts</li>
            <li>• Filtrage de langage automatique</li>
            <li>• Historique des messages visible par les parents</li>
            <li>• Géolocalisation partagée</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
