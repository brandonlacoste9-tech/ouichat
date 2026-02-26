<<<<<<< HEAD
# ⚜️ OuiChat

**The Quebec Superapp** - Messaging, Payments & Mini-Apps for French Canada

> *"WeChat for Quebec"*

## 🎯 Vision

OuiChat brings the superapp revolution to Quebec:
- **Chat** with friends, family, businesses
- **Pay** with QR codes everywhere
- **Discover** mini-apps for local services
- **Connect** with Quebec businesses

Plus: Parents can monitor their children's **BEEChat** activity.

## ✨ Features

### 💬 Messaging
- Direct & group chats
- Voice & video messages
- End-to-end encryption
- French-first interface

### 💳 OuiPay (QR Payments)
- Scan QR to pay
- Send money to friends
- Business payments
- Transaction history

### 🏪 Mini-Apps
Run apps inside OuiChat - no download needed!
- 🍽️ Restaurant reservations
- 💇 Booking (barbers, salons)
- 🎫 Event tickets
- 🛒 Local ordering
- 🎁 Loyalty cards

### 🏢 Business Official Accounts
- Verified Quebec businesses
- Promos & updates
- Chat-based customer service
- In-app storefront

### 🤖 AI Concierge
- "Book a haircut in Laval tomorrow"
- Routes you to right mini-app
- Quebec-specific recommendations

## 🗺️ Quebec-First

- 🇫🇷 French primary, English toggle
- ⚜️ Built for Quebec culture
- 🏛️ Local business focus
- 💰 CAD currency
- 📍 Quebec regions & cities

## 🚀 Quick Start

```bash
git clone https://github.com/brandonlacoste9-tech/ouichat.git
cd ouichat
npm install
npm run dev
```

## 🏗️ Architecture

```
ouichat/
├── mobile/           # React Native app
├── web/             # Web version
├── backend/         # Node.js API
│   ├── chat/        # Messaging service
│   ├── payments/    # OuiPay
│   ├── miniapps/    # Mini-app runtime
│   └── business/    # Official accounts
└── miniapps/        # Partner mini-apps
    ├── booking/
    ├── ordering/
    └── loyalty/
```

## 🛣️ Roadmap

### Phase 1: Messaging (Weeks 1-3)
- [x] Basic chat
- [x] Groups
- [ ] Voice messages
- [ ] Video calls

### Phase 2: Payments (Weeks 4-6)
- [ ] QR code generation
- [ ] Wallet
- [ ] P2P transfers
- [ ] Business payments

### Phase 3: Mini-Apps (Weeks 7-12)
- [ ] Runtime environment
- [ ] Booking template
- [ ] Ordering template
- [ ] Partner SDK

### Phase 4: Business (Weeks 13-16)
- [ ] Official accounts
- [ ] Business dashboard
- [ ] Analytics
- [ ] Promotions

## 💼 BEEChat Integration

Parents can monitor their children's BEEChat (kids messaging app):
- View message history
- See location
- Manage contacts
- Set safety alerts

## 🤝 Partners

Want to build a mini-app for OuiChat?
Contact us: partners@ouichat.ca

---

**Made in Quebec** ⚜️ | *La révolution superapp arrive*
=======
# 🍁 OuiChat - Version québécoise de WeChat

**Par Northern-Ventures**

OuiChat est une plateforme SaaS québécoise qui combine les fonctionnalités de messagerie avec des outils spécifiques au Québec, notamment la vérification de licences professionnelles RBQ et REQ/CMEQ.

## 📋 Fonctionnalités

### Vérification de Licences
- ✅ **RBQ** (Régie du bâtiment du Québec) - Vérification des licences d'entrepreneurs en construction
- ✅ **REQ/CMEQ** (Corporation des maîtres électriciens du Québec) - Vérification des licences d'électriciens
- ✅ Vérification par lot (batch verification)
- ✅ API REST complète
- ✅ Intégration OpenClaw pour assistants IA (TI-GUY)

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/brandonlacoste9-tech/ouichat.git
cd ouichat

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Démarrer le serveur
npm start
```

## 📖 Utilisation

### Démarrage du serveur

```bash
# Mode production
npm start

# Mode développement avec rechargement automatique
npm run dev
```

Le serveur démarre par défaut sur le port 3000: `http://localhost:3000`

### Endpoints API

#### 1. Vérifier une licence RBQ

```bash
GET /api/license/rbq/:licenseNumber
```

**Exemple:**
```bash
curl http://localhost:3000/api/license/rbq/5678-1234-01
```

**Réponse:**
```json
{
  "licenseNumber": "5678-1234-01",
  "type": "RBQ",
  "valid": true,
  "status": "ACTIVE",
  "holder": {
    "name": "Entreprise Example Inc.",
    "address": "123 Rue Example, Montréal, QC"
  },
  "categories": ["Entrepreneur général", "Construction résidentielle"],
  "issueDate": "2020-01-15",
  "expiryDate": "2025-01-15",
  "message": "Licence vérifiée avec succès"
}
```

#### 2. Vérifier une licence REQ/CMEQ

```bash
GET /api/license/req/:licenseNumber
```

**Exemple:**
```bash
curl http://localhost:3000/api/license/req/123456
```

**Réponse:**
```json
{
  "licenseNumber": "123456",
  "type": "REQ/CMEQ",
  "valid": true,
  "status": "ACTIVE",
  "holder": {
    "name": "Électricien Example Ltée",
    "address": "456 Boulevard Example, Québec, QC"
  },
  "specialty": "Maître électricien",
  "message": "Licence vérifiée avec succès"
}
```

#### 3. Vérification par lot

```bash
POST /api/license/verify
Content-Type: application/json
```

**Exemple:**
```bash
curl -X POST http://localhost:3000/api/license/verify \
  -H "Content-Type: application/json" \
  -d '{
    "licenses": [
      {"number": "5678-1234-01", "type": "RBQ"},
      {"number": "123456", "type": "REQ"}
    ]
  }'
```

## 🤖 Intégration OpenClaw

OuiChat inclut une configuration de compétence (skill) OpenClaw pour l'intégration avec des assistants IA comme TI-GUY.

**Fichier de configuration:** `openclaw-skills/license-verification-skill.json`

### Exemples d'utilisation avec TI-GUY:

- "Vérifie la licence RBQ 5678-1234-01"
- "Check license REQ 123456"
- "Valider RBQ 5678-1234-01 et REQ 123456"

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Avec couverture de code
npm test -- --coverage
```

## 🏗️ Structure du projet

```
ouichat/
├── src/
│   ├── index.js                    # Point d'entrée de l'application
│   ├── routes/
│   │   └── license.js              # Routes API pour licences
│   └── services/
│       └── licenseVerification.js  # Logique de vérification
├── openclaw-skills/
│   └── license-verification-skill.json  # Config OpenClaw
├── __tests__/
│   └── license.test.js             # Tests automatisés
├── .env.example                     # Variables d'environnement
├── package.json
└── README.md
```

## 🔧 Configuration

Créez un fichier `.env` avec les variables suivantes:

```env
PORT=3000
NODE_ENV=development
COMPANY_NAME=Northern-Ventures
API_BASE_URL=http://localhost:3000
```

## 📝 Notes importantes

⚠️ **Version prototype**: Les fonctions de vérification actuelles sont des simulations. Pour une utilisation en production, il faut:

1. Intégrer les APIs officielles de la RBQ et de la CMEQ
2. Implémenter le scraping web réel des sites gouvernementaux
3. Gérer l'authentification et les limites de taux
4. Ajouter un système de cache pour optimiser les performances
5. **Implémenter la limitation de débit (rate limiting)** pour prévenir les abus
6. Ajouter une authentification API pour les endpoints publics

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Axios** - Client HTTP
- **Cheerio** - Scraping HTML
- **Jest** - Framework de tests
- **Supertest** - Tests API

## 👥 À propos de Northern-Ventures

Northern-Ventures est une entreprise québécoise spécialisée dans les solutions SaaS et l'automatisation IA pour le marché du Québec.

### Autres produits:
- **TI-GUY**: Assistant IA basé sur OpenClaw
- Outils de vérification de licences professionnelles
- Solutions TaskRabbit pour le Québec

## 📄 Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou un pull request.

---

**Développé avec ❤️ au Québec par Northern-Ventures** 🍁
>>>>>>> origin/main
