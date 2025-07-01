# BroskiDrive - Chauffeur Privé

Application web moderne pour services de chauffeur privé avec système de réservation intégré.

## 🚀 Fonctionnalités

- **Interface moderne** : Design responsive et élégant
- **Réservation Calendly** : Système de prise de rendez-vous intégré
- **Sections informatives** : Services, tarifs, et contact
- **Formulaire de contact** : Communication directe avec les clients
- **Responsive design** : Adapté mobile et desktop

## 🛠️ Stack Technique

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Vite** comme build tool
- **React Query** pour la gestion des données
- **React Hook Form** pour les formulaires
- **Radix UI** pour les composants

### Backend
- **Express.js** avec TypeScript
- **Drizzle ORM** pour la base de données
- **Zod** pour la validation

## 📁 Structure du Projet

```
├── client/
│   ├── src/
│   │   ├── components/        # Composants React
│   │   ├── pages/            # Pages de l'app  
│   │   ├── hooks/            # Hooks personnalisés
│   │   └── lib/              # Utilitaires
├── server/                   # API Express
├── shared/                   # Schémas partagés
└── attached_assets/         # Images et assets
```

## 🔧 API Endpoints

- `POST /api/bookings`: Créer une réservation
- `GET /api/bookings`: Récupérer toutes les réservations
- `POST /api/contact`: Envoyer un message de contact

## 🎯 Fonctionnalités Principales

1. **Réservation** : Les utilisateurs peuvent remplir leurs informations et utiliser Calendly pour planifier
2. **Services** : Présentation des différents services de transport
3. **Tarification** : Grille tarifaire transparente
4. **Contact** : Formulaire de contact et informations

## 🚀 Développement

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Démarrage production
npm start
```

## 📱 Responsive Design

L'application s'adapte automatiquement à tous les formats d'écran avec une attention particulière pour l'expérience mobile.