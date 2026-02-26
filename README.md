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
