# 🚀 Guide de Configuration JNR Ourson 6000 E-Commerce

Ce guide vous aidera à transformer votre site mockup en véritable boutique e-commerce fonctionnelle.

## 📋 Prérequis

- Compte Supabase (gratuit)
- Compte Telegram (pour les notifications)
- Numéro WhatsApp Business (pour le service client)

---

## 1️⃣ Configuration Supabase (Base de données)

### Étape 1: Créer un compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Créez un compte (gratuit)

### Étape 2: Créer un nouveau projet

1. Dans le dashboard Supabase, cliquez sur "New Project"
2. Remplissez les informations:
   - **Name**: `jnr-ourson-vape` (ou votre choix)
   - **Database Password**: Notez ce mot de passe quelque part de sûr
   - **Region**: Choisissez une région proche (Europe West par exemple)
3. Attendez 1-2 minutes que le projet soit créé

### Étape 3: Exécuter le schéma de base de données

1. Dans votre projet Supabase, cliquez sur l'icône **SQL Editor** dans le menu latéral gauche
2. Cliquez sur "New query"
3. Ouvrez le fichier `supabase-schema.sql` dans votre éditeur
4. **COPIEZ TOUT LE CONTENU** du fichier
5. **COLLEZ-LE** dans l'éditeur SQL de Supabase
6. Cliquez sur "Run" (bouton en bas à droite)
7. Vous devriez voir "Success. No rows returned"

### Étape 4: Récupérer vos clés API

1. Dans Supabase, cliquez sur l'icône **Settings** (roue crantée) en bas du menu
2. Allez dans **API**
3. Vous verrez deux informations importantes:
   - **Project URL**: quelque chose comme `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public**: Une longue clé commençant par `eyJh...`
4. **COPIEZ CES DEUX VALEURS** - vous en aurez besoin pour l'étape suivante

---

## 2️⃣ Configuration Telegram Bot (Notifications)

### Étape 1: Créer un bot Telegram

1. Ouvrez Telegram et cherchez: **@BotFather**
2. Envoyez `/start`
3. Envoyez `/newbot`
4. Suivez les instructions:
   - Donnez un nom: `JNR Ourson Bot`
   - Donnez un username: `jnr_ourson_bot` (doit finir par '_bot')
5. **COPIEZ LE TOKEN** qu'il vous donne (quelque chose comme `6123456789:AAHdqT...`)

### Étape 2: Obtenir votre Chat ID

1. Cherchez **@userinfobot** dans Telegram
2. Envoyez `/start`
3. Il vous répondra avec votre **Chat ID** (un nombre comme `123456789`)
4. **COPIEZ CE NUMÉRO**

### Étape 3: Démarrer votre bot

1. Cherchez votre bot (le username que vous avez créé)
2. Cliquez sur "Start" ou envoyez `/start`
3. C'est là que vous recevrez les notifications de commandes

---

## 3️⃣ Configuration WhatsApp

Pour le service client via WhatsApp:

1. Utilisez votre numéro WhatsApp personnel ou professionnel
2. Format: **32** suivi de votre numéro sans le 0 initial
   - Exemple: Si votre numéro est `0487 12 34 56`
   - Utilisez: `32487123456` (sans espaces)

---

## 4️⃣ Configuration des Variables d'Environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez les valeurs par vos vraies informations:

```env
# Supabase (étape 1)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M....

# Telegram (étape 2)
VITE_TELEGRAM_BOT_TOKEN=6123456789:AAHdqTxxxxxxxxxxx
VITE_TELEGRAM_CHAT_ID=123456789

# WhatsApp (étape 3)
VITE_WHATSAPP_NUMBER=32487123456
```

3. **SAUVEGARDEZ** le fichier

---

## 5️⃣ Tester le site

### Redémarrer le serveur de développement

1. **ARRÊTEZ** le serveur actuel (Ctrl+C dans le terminal)
2. **RELANCEZ** le serveur:
   ```bash
   npm run dev
   ```

### Tester une commande

1. Ouvrez le site dans votre navigateur
2. Remplissez tous les champs du formulaire:
   - Sélectionnez une ou plusieurs saveurs
   - Entrez un numéro de téléphone
   - Entrez une adresse
   - Sélectionnez une date de livraison
3. Cliquez sur "COMMANDER"
4. **Vérifications**:
   - Vous devriez voir un modal de succès avec un numéro de commande
   - Vous devriez recevoir une notification dans Telegram
   - Dans Supabase, allez dans **Table Editor** > **orders** pour voir votre commande

---

## 🔍 Vérifications Post-Installation

### Dans Supabase:

1. **Table flavors**: Devrait contenir 50 saveurs avec stock=50
2. **Table orders**: Devrait contenir votre commande test
3. **Table order_items**: Devrait contenir les saveurs de votre commande test

### Dans Telegram:

Vous devriez recevoir un message formaté comme:
```
🛒 NOUVELLE COMMANDE 🛒

📋 Commande: JNR20261230XXXX
📞 Téléphone: +32 ...
📍 Adresse: ...
📅 Livraison: ...

Produits:
• 1x Strawberry Ice

💰 Total: 15.00€
✅ Paiement: À la livraison (cash)
```

---

## 📱 Utilisation des Boutons WhatsApp

### Bouton flottant (en bas à droite)

- Permet aux visiteurs de vous contacter avant commande
- Message pré-rempli: "Bonjour, j'ai une question sur JNR 6000 Puffs"

### Bouton dans le modal de succès

- Apparaît après une commande réussie
- Inclut automatiquement le numéro de commande
- Message pré-rempli: "Bonjour, j'ai une question sur ma commande JNR..."

---

## 🛠️ Gestion des Commandes

### Voir les commandes dans Supabase:

1. Allez dans **Table Editor**
2. Sélectionnez **orders**
3. Vous verrez toutes les commandes avec:
   - order_number
   - phone, address, delivery_date
   - status (pending par défaut)
   - payment_status (cash_on_delivery)
   - total_price
   - created_at

### Modifier le statut d'une commande:

1. Cliquez sur la ligne de commande
2. Changez le **status**:
   - `pending` → En attente
   - `confirmed` → Confirmée
   - `preparing` → En préparation
   - `delivering` → En livraison
   - `delivered` → Livrée
   - `cancelled` → Annulée

### Voir les saveurs commandées:

1. Notez l'**id** de la commande
2. Allez dans **order_items**
3. Vous verrez toutes les saveurs de cette commande

---

## 🎨 Personnalisation

### Modifier les saveurs:

1. Dans Supabase, allez dans **Table Editor** > **flavors**
2. Vous pouvez:
   - Modifier le stock d'une saveur
   - Ajouter de nouvelles saveurs (bouton "Insert row")
   - Marquer une saveur comme `hot` (🔥) ou `featured`
   - Changer la catégorie

### Modifier les prix:

1. Fichier: `src/components/OrderPage.jsx`
2. Ligne: `const PRICE_PER_UNIT = 15.00;`
3. Changez la valeur et sauvegardez

---

## ❗ Dépannage

### Le site ne se connecte pas à Supabase

- Vérifiez que vous avez bien redémarré le serveur après avoir modifié `.env.local`
- Vérifiez que les URLs et clés sont correctes
- Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs

### Pas de notifications Telegram

- Vérifiez que vous avez bien démarré votre bot avec `/start`
- Vérifiez que le token et chat_id sont corrects
- Regardez dans la console du navigateur (F12) pour les erreurs

### Stock ne se met pas à jour

- Vérifiez que le schéma SQL a bien été exécuté
- Vérifiez que la fonction `decrement_stock` existe dans Supabase
- Allez dans **Database** > **Functions** pour vérifier

### Erreur "flavors does not exist"

- Le schéma SQL n'a pas été exécuté correctement
- Retournez à l'étape 1.3 et réexécutez le script complet

---

## 📞 Support

Si vous avez des problèmes ou des questions:

1. Vérifiez les erreurs dans la console du navigateur (F12)
2. Vérifiez les logs dans Supabase (**Logs** dans le menu latéral)
3. Relisez attentivement ce guide

---

## 🎉 Félicitations !

Votre site e-commerce est maintenant fonctionnel avec:

✅ Gestion du stock en temps réel  
✅ Base de données PostgreSQL via Supabase  
✅ Notifications Telegram pour chaque commande  
✅ Service client via WhatsApp  
✅ Paiement à la livraison (cash)  
✅ Interface moderne et responsive  

Bonne vente ! 🧸🛒
