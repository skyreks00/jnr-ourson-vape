# 🧸 JNR Ourson 6000 - E-Commerce Vape Shop

Site e-commerce complet pour JNR 6000 Puffs avec gestion des stocks, notifications et service client.

## 🌐 Site en ligne

**Live Demo** : Votre site sera en ligne sur GitHub Pages après déploiement

## ✨ Fonctionnalités

### 🛒 E-Commerce Complet
- **Gestion des stocks en temps réel** via Supabase (PostgreSQL)
- **Commandes enregistrées** dans une base de données
- **Numéros de commande uniques** générés automatiquement
- **Paiement à la livraison** (cash on delivery)
- **Mise à jour automatique du stock** à chaque commande

### 📦 Produits
- **JNR 6000 Puffs** à 15.00€ l'unité
- **50+ saveurs** avec catégories (Ice, Fruity, Candy, Mint, Soda)
- **Sélection multiple** : Une saveur différente par puff
- **Indicateur de stock** : Affiche le stock restant pour chaque saveur
- **Filtrage automatique** : Les saveurs en rupture sont masquées

### 🔔 Notifications
- **Telegram Bot** : Reçoit une notification pour chaque nouvelle commande
- Format détaillé avec toutes les infos (numéro, téléphone, adresse, saveurs, montant)

### 💬 Service Client
- **Bouton WhatsApp flottant** : Contact avant commande
- **Lien WhatsApp post-commande** : Avec numéro de commande pré-rempli
- **Modal de confirmation** : Affiche le numéro de commande après validation

### 🔐 Panel Admin Sécurisé
- **URL secrète personnalisable** (pas d'URL évidente)
- **Mot de passe** de connexion
- **Gestion des commandes** : Voir, filtrer, changer le statut
- **Gestion du stock** : Modifier le stock en temps réel
- **Recherche avancée** : Par numéro, téléphone, adresse

### 🎨 Design
- **Interface moderne** avec gradients et glassmorphism
- **Couleurs personnalisées** : Electric Blue (#35CFFF) + Cotton Pink (#FF7ACD)
- **Calendrier stylé** pour la date de livraison
- **Responsive** : Mobile, tablette et desktop
- **Animations fluides** avec Framer Motion

## 🚀 Déploiement sur GitHub Pages

**Suivez le guide complet** : [DEPLOY-GITHUB.md](DEPLOY-GITHUB.md)

**En résumé** :
1. Créer un repository GitHub
2. Configurer les secrets (variables d'environnement)
3. Activer GitHub Pages
4. Push votre code → Déploiement automatique ! 🎉

## 💻 Installation Locale

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE-USERNAME/jnr-ourson-vape.git
cd jnr-ourson-vape
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

1. Copiez `.env.example` en `.env.local`
2. Remplissez vos vraies valeurs
3. Suivez [SETUP.md](SETUP.md) pour configurer Supabase, Telegram, WhatsApp

### 4. Lancer le projet

```bash
npm run dev
```

Ouvrir `http://localhost:5173`

## 📁 Structure du Projet

```
ourson6000/
├── .github/
│   └── workflows/
│       └── deploy.yml         # Déploiement automatique GitHub Pages
├── src/
│   ├── components/
│   │   ├── OrderPage.jsx      # Page de commande client
│   │   └── AdminPage.jsx      # Panel admin
│   ├── lib/
│   │   ├── supabase.js        # Client Supabase
│   │   └── telegram.js        # Notifications Telegram
│   ├── data/
│   │   └── flavors.js         # Liste des saveurs (legacy)
│   └── index.css              # Styles Tailwind personnalisés
├── public/
│   └── mascot.png             # Image de la mascotte
├── .env.example               # Template des variables d'environnement
├── .gitignore                 # Fichiers ignorés par Git
├── SETUP.md                   # Guide de configuration Supabase/Telegram/WhatsApp
├── DEPLOY-GITHUB.md           # Guide de déploiement GitHub Pages
├── ADMIN-ACCESS.md            # Accès au panel admin
└── README.md                  # Ce fichier
```

## 🗄️ Base de Données

### Tables Supabase

**flavors** : Saveurs disponibles
- `name`, `category`, `price`, `stock`, `hot`, `featured`

**orders** : Commandes clients
- `order_number`, `phone`, `address`, `delivery_date`
- `quantity`, `total_price`, `status`, `payment_status`

**order_items** : Détail des saveurs par commande
- `order_id`, `flavor_name`, `quantity`, `price`

### Fonctions SQL

- `generate_order_number()` : Génère un numéro unique (ex: JNR202612300347)
- `decrement_stock()` : Décrémente le stock de manière atomique

## 🔧 Gestion des Commandes

### Voir les commandes
1. Accédez au panel admin : `https://votresite.com/?access=VOTRE_CHEMIN_SECRET`
2. Connectez-vous avec votre mot de passe
3. Onglet **Commandes** : Voir toutes les commandes
4. Cliquez sur une commande pour voir les détails

### Statuts disponibles
- 🟡 **En attente** (toutes les commandes non terminées)
- 🟢 **Terminée** (livrée avec succès)
- 🔴 **Annulée** (commande annulée)

### Modifier le stock
1. Panel admin → Onglet **Stock**
2. Cliquez sur l'icône crayon ✏️
3. Modifiez le nombre
4. Cliquez sur ✅ pour sauvegarder

## 🛠️ Technologies Utilisées

- **React 18** : Framework frontend
- **Vite 5** : Build tool ultra-rapide
- **Tailwind CSS 3** : Styling
- **Supabase** : Backend as a Service (PostgreSQL)
- **Telegram Bot API** : Notifications
- **WhatsApp Business API** : Service client
- **Framer Motion 11** : Animations
- **Lucide React** : Icônes
- **GitHub Pages** : Hébergement gratuit
- **GitHub Actions** : CI/CD automatique

## ⚡ Scripts Disponibles

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
```

## 🔐 Sécurité

- ✅ Variables d'environnement dans GitHub Secrets
- ✅ `.env.local` ignoré par Git (.gitignore)
- ✅ Panel admin avec URL secrète + mot de passe
- ✅ HTTPS automatique sur GitHub Pages
- ✅ Row Level Security sur Supabase

## 📞 Support

### Configuration
- [SETUP.md](SETUP.md) : Configuration Supabase, Telegram, WhatsApp
- [DEPLOY-GITHUB.md](DEPLOY-GITHUB.md) : Déploiement sur GitHub Pages
- [ADMIN-ACCESS.md](ADMIN-ACCESS.md) : Accès au panel admin

### En cas de problème
- Vérifiez les logs dans GitHub Actions
- Vérifiez les secrets dans Settings → Secrets and variables
- Consultez les logs Supabase
- Regardez la console du navigateur (F12)

## 📄 Licence

Ce projet est privé et confidentiel.

---

**Fait avec ❤️ pour JNR Ourson 6000** 🧸🛒

## 🏗️ Structure

```
src/
├── components/
│   └── OrderPage.jsx    # Page complète de commande
├── data/
│   └── flavors.js       # 50 saveurs
└── App.jsx              # Point d'entrée
```

## ⚠️ Important

**Produit contenant de la nicotine**
Réservé aux adultes de +18 ans

## 🚀 Production

```bash
npm run build
```

Les fichiers seront dans `dist/`.

