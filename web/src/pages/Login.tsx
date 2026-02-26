import { useState } from 'react'
import { useAuthStore } from '../stores/auth'

export function LoginPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const { setAuth } = useAuthStore()

  const requestCode = () => {
    // API call to request SMS code
    setStep('code')
  }

  const login = () => {
    // Mock login
    setAuth('mock-token', {
      id: '1',
      phone,
      username: 'user',
      displayName: 'Utilisateur',
    })
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-wechat-bg p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-2 text-wechat-dark">OuiChat</h1>
        <p className="text-center text-gray-500 mb-8">Le superapp québécois</p>
        
        {step === 'phone' ? (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-b border-gray-300 py-3 mb-4 focus:outline-none focus:border-wechat-green"
            />
            <button
              onClick={requestCode}
              className="w-full bg-wechat-green text-white py-3 rounded-lg font-medium"
            >
              Continuer
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-4">Code envoyé à {phone}</p>
            <input
              type="text"
              placeholder="Code de vérification"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border-b border-gray-300 py-3 mb-4 focus:outline-none focus:border-wechat-green"
            />
            <button
              onClick={login}
              className="w-full bg-wechat-green text-white py-3 rounded-lg font-medium"
            >
              Se connecter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
