# 🔐 Accès Admin Sécurisé

## URL Admin Personnalisée

Votre panel admin n'est plus accessible via une URL évidente !

Pour une meilleure sécurité, l'URL admin est maintenant **personnalisable** et **secrète**.

## 🔑 Comment accéder ?

Votre URL admin actuelle :
```
http://localhost:5174/?access=admin-8k2p9x3j
```

**En production** :
```
https://votresite.com/?access=admin-8k2p9x3j
```

## 🛡️ Personnaliser votre URL admin

1. Ouvrez le fichier `.env.local`
2. Modifiez la ligne :
   ```env
   VITE_ADMIN_PATH=admin-8k2p9x3j
   ```
3. Changez `admin-8k2p9x3j` par **votre propre code secret**

### Exemples de chemins sécurisés :

```env
VITE_ADMIN_PATH=gestion-jnr-2026
VITE_ADMIN_PATH=panel-secret-xyz123
VITE_ADMIN_PATH=admin-9k4m2p8x
VITE_ADMIN_PATH=backoffice-a7b3c9
```

**Important** : 
- Utilisez un chemin unique et imprévisible
- Ne partagez jamais cette URL publiquement
- Changez-la régulièrement si nécessaire

## 🔒 Double sécurité

Votre admin est protégé par :
1. ✅ **URL secrète** (définie dans `.env.local`)
2. ✅ **Mot de passe** (aussi dans `.env.local`)

Quelqu'un doit connaître **les deux** pour accéder au panel admin.

## ⚙️ Après changement

Redémarrez le serveur :
```bash
npm run dev
```

Puis accédez à votre nouvelle URL admin !

## 📝 Note de sécurité

Pour une sécurité maximale en production, considérez :
- Utiliser Supabase Auth pour une vraie authentification
- Restreindre l'accès admin par IP
- Activer HTTPS obligatoire
- Utiliser des mots de passe forts (20+ caractères)
