# 🚀 Déploiement sur GitHub Pages

Guide complet pour héberger votre site JNR Ourson 6000 **gratuitement** sur GitHub Pages.

## 📋 Prérequis

- ✅ Compte GitHub
- ✅ Git installé sur votre PC
- ✅ Votre projet prêt

## 🔧 Configuration initiale (à faire une seule fois)

### Étape 1: Créer un repository GitHub

1. Allez sur GitHub → **New repository**
2. Nom du repo : `jnr-ourson-vape` (ou votre choix)
3. Cochez **Public** ou **Private** (au choix)
4. **NE PAS** cocher "Initialize with README"
5. Cliquez sur **Create repository**

### Étape 2: Connecter votre projet local au repository

Dans le terminal (PowerShell), depuis le dossier `ourson6000` :

```powershell
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - JNR Ourson 6000 E-Commerce"

# Ajouter le repository distant (REMPLACEZ avec VOTRE URL)
git remote add origin https://github.com/VOTRE-USERNAME/jnr-ourson-vape.git

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

**IMPORTANT** : Remplacez `VOTRE-USERNAME/jnr-ourson-vape` par votre vraie URL GitHub !

### Étape 3: Configurer les Secrets GitHub

Vos variables d'environnement (.env.local) ne doivent JAMAIS être dans le code public !

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (⚙️)
3. Dans le menu de gauche : **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**
5. Ajoutez **UN PAR UN** les secrets suivants :

| Nom du secret | Valeur (depuis votre .env.local) |
|---------------|----------------------------------|
| `VITE_SUPABASE_URL` | Votre URL Supabase |
| `VITE_SUPABASE_ANON_KEY` | Votre clé anon Supabase |
| `VITE_TELEGRAM_BOT_TOKEN` | Votre token Telegram |
| `VITE_TELEGRAM_CHAT_ID` | Votre chat ID Telegram |
| `VITE_WHATSAPP_NUMBER` | Votre numéro WhatsApp |
| `VITE_ADMIN_PASSWORD` | Votre mot de passe admin |
| `VITE_ADMIN_PATH` | Votre chemin admin secret |

**Comment ajouter un secret** :
1. Cliquez sur "New repository secret"
2. Name: `VITE_SUPABASE_URL` (exactement comme ça)
3. Secret: Collez la valeur depuis votre .env.local
4. Cliquez sur "Add secret"
5. Répétez pour chaque secret

### Étape 4: Activer GitHub Pages

1. Sur votre repository GitHub → **Settings**
2. Dans le menu de gauche → **Pages**
3. Sous "Build and deployment" :
   - Source : **GitHub Actions** (pas "Deploy from a branch")
4. Cliquez sur **Save**

## 🎯 Déploiement automatique

Une fois configuré, **chaque fois que vous faites un push**, le site se redéploie automatiquement !

```powershell
# Après avoir fait des modifications :
git add .
git commit -m "Description de vos modifications"
git push
```

GitHub Actions va :
1. ✅ Installer les dépendances
2. ✅ Builder le site avec vos secrets
3. ✅ Déployer automatiquement
4. ✅ Site en ligne en 2-3 minutes !

## 🌐 URL de votre site

Après le premier déploiement (2-3 minutes), votre site sera accessible à :

```
https://VOTRE-USERNAME.github.io/jnr-ourson-vape/
```

**OU** si vous utilisez le nom `VOTRE-USERNAME.github.io` pour votre repo :

```
https://VOTRE-USERNAME.github.io/
```

### 🎨 Configurer votre URL dans le code

Si votre site n'est PAS à la racine (ex: `/jnr-ourson-vape/`), modifiez `vite.config.js` :

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/jnr-ourson-vape/', // Nom de votre repository
})
```

Puis re-commitez et pushez :

```powershell
git add vite.config.js
git commit -m "Update base path for GitHub Pages"
git push
```

## ✅ Vérifier le déploiement

1. Allez sur votre repository GitHub
2. Cliquez sur **Actions** (onglet en haut)
3. Vous verrez le workflow "Deploy to GitHub Pages"
4. Attendez qu'il soit ✅ vert (2-3 minutes)
5. Allez sur votre URL pour voir votre site en ligne !

## 🔍 En cas de problème

### Le build échoue ?

- Vérifiez que tous les **secrets** sont bien configurés (7 en tout)
- Les noms des secrets doivent être EXACTEMENT comme indiqué
- Allez dans Actions → Cliquez sur le workflow qui a échoué → Regardez les logs

### Le site s'affiche mais sans fonctionnalités ?

- Les secrets ne sont peut-être pas bien configurés
- Vérifiez chaque secret dans Settings → Secrets and variables → Actions

### Erreur 404 ?

- Vérifiez `vite.config.js` → la valeur de `base` doit correspondre au nom de votre repo
- Si le repo s'appelle `jnr-vape`, alors `base: '/jnr-vape/'`

## 📱 Domaine personnalisé (optionnel)

Vous voulez `www.jnr-ourson.com` au lieu de `github.io` ?

1. Achetez un nom de domaine (ex: Namecheap, OVH, etc.)
2. Dans Settings → Pages → Custom domain
3. Entrez votre domaine
4. Configurez les DNS chez votre fournisseur :
   - Type A vers `185.199.108.153`
   - Type A vers `185.199.109.153`
   - Type A vers `185.199.110.153`
   - Type A vers `185.199.111.153`

## 🎉 C'est tout !

Votre site est maintenant :
- ✅ Hébergé gratuitement sur GitHub
- ✅ HTTPS automatique (sécurisé)
- ✅ Déploiement automatique à chaque push
- ✅ Variables d'environnement sécurisées
- ✅ 100% fonctionnel avec Supabase, Telegram, WhatsApp

**Profitez de votre boutique en ligne !** 🧸🛒
