import { QrCode, ScanLine, ArrowRightLeft, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PayPage() {
  return (
    <div className="h-full flex flex-col bg-wechat-green">
      {/* Header */}
      <header className="text-white px-4 py-4">
        <h1 className="text-lg font-medium">OuiPay</h1>
        <p className="text-sm opacity-80">Paiement mobile sécurisé</p>
      </header>

      {/* Balance card */}
      <div className="mx-4 bg-white rounded-xl p-6 shadow-lg">
        <p className="text-gray-500 text-sm">Solde disponible</p>
        <p className="text-3xl font-bold text-wechat-dark mt-1">$124.50</p>
        <div className="flex gap-4 mt-4">
          <button className="flex-1 bg-wechat-green text-white py-2 rounded-lg text-sm">
            Recharger
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm">
            Retirer
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-4 mt-4 bg-white rounded-xl p-4">
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: ScanLine, label: 'Scanner' },
            { icon: QrCode, label: 'Mon QR' },
            { icon: ArrowRightLeft, label: 'Envoyer' },
            { icon: Wallet, label: 'Portefeuille' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-wechat-light rounded-full flex items-center justify-center">
                  <Icon size={24} className="text-wechat-green" />
                </div>
                <span className="text-xs mt-2">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="flex-1 mx-4 mt-4 bg-white rounded-t-xl overflow-hidden">
        <h3 className="px-4 py-3 font-medium border-b">Transactions récentes</h3>
        <div className="p-4 text-center text-gray-500">
          Aucune transaction récente
        </div>
      </div>
    </div>
  )
}
