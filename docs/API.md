# API Documentation - OuiChat

**Version:** 1.0.0  
**Entreprise:** Northern-Ventures  
**Base URL:** `http://localhost:3000`

## Vue d'ensemble

OuiChat est une plateforme SaaS québécoise qui fournit des services de vérification de licences professionnelles pour le Québec. Cette API permet de vérifier les licences RBQ (construction) et REQ/CMEQ (électricité).

## Authentification

⚠️ **Note:** Version prototype - Aucune authentification n'est requise actuellement. Pour la production, implémenter une authentification par clé API.

## Endpoints

### 1. Page d'accueil

**GET** `/`

Retourne les informations sur l'API.

**Réponse (200 OK):**
```json
{
  "message": "Bienvenue à OuiChat - Quebec SaaS Platform",
  "company": "Northern-Ventures",
  "description": "Version québécoise de WeChat avec vérification de licences RBQ/REQ",
  "version": "1.0.0"
}
```

---

### 2. Vérification RBQ

**GET** `/api/license/rbq/:licenseNumber`

Vérifie une licence de la Régie du bâtiment du Québec (RBQ).

**Paramètres:**
- `licenseNumber` (path) - Numéro de licence au format XXXX-XXXX-XX

**Exemples:**
```bash
curl http://localhost:3000/api/license/rbq/5678-1234-01
```

---

### 3. Vérification REQ/CMEQ

**GET** `/api/license/req/:licenseNumber`

Vérifie une licence REQ (ancienne Régie de l'électricité et du gaz) ou CMEQ (Corporation des maîtres électriciens du Québec).

**Paramètres:**
- `licenseNumber` (path) - Numéro de licence (4 à 6 chiffres)

---

### 4. Vérification par lot

**POST** `/api/license/verify`

Vérifie plusieurs licences en une seule requête.

**Headers:**
- `Content-Type: application/json`

**Body:**
```json
{
  "licenses": [
    {"number": "5678-1234-01", "type": "RBQ"},
    {"number": "123456", "type": "REQ"}
  ]
}
```

## Intégration OpenClaw

Cette API peut être intégrée avec des assistants OpenClaw comme TI-GUY.

**Fichier de configuration:** `openclaw-skills/license-verification-skill.json`

**Commandes vocales supportées:**
- "Vérifie la licence RBQ 5678-1234-01"
- "Check license REQ 123456"

---

**Développé par:** Northern-Ventures 🍁
