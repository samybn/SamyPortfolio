# 🚀 Portfolio Monorepo

Projet de portfolio moderne et performant organisé en monorepo avec séparation claire entre le **Frontend** (React, Vite, Tailwind CSS, Motion) et le **Backend** (Cloudflare Worker API), intégration **Google Drive** pour l'hébergement et l'affichage dynamique des projets, et gestion sécurisée des variables d'environnement.

---

## 📁 Structure du Projet

```text
portfoliov1/
├── backend/                  # API Cloudflare Worker & helpers
│   ├── src/
│   │   ├── googleDrive.ts    # Parseur & résolveur Google Drive API / URLs CDN
│   │   └── index.ts          # Worker (API contact & projets Google Drive)
│   ├── .env.example          # Modèle d'environnement backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # Application React / Vite
│   ├── src/                  # Composants, styles et logique UI
│   │   ├── app/
│   │   │   ├── components/   # Sections Hero, About, Projects, Contact, Footer...
│   │   │   └── utils/        # Utilitaire de parsing Google Drive
│   │   ├── styles/           # Styles CSS & thèmes
│   │   └── main.tsx          # Point d'entrée React
│   ├── .env                  # Variables locales frontend (ignoré par git)
│   ├── .env.example          # Modèle d'environnement frontend
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .env                      # Variables d'environnement locales globales
├── .env.example              # Modèle documenté pour toutes les variables
├── .gitignore                # Protection stricte des fichiers .env et builds
├── package-lock.json
├── package.json              # Workspaces npm (frontend & backend)
├── README.md                 # Documentation
└── wrangler.toml             # Déploiement Cloudflare
```

---

## 🔐 Configuration des Variables d'Environnement (.env)

Toutes les informations sensibles sont isolées dans des fichiers `.env` et automatiquement exclues du suivi Git via `.gitignore`.

1. Copiez `.env.example` vers `.env` :
   ```bash
   cp .env.example .env
   ```

2. Renseignez vos valeurs dans `.env` :
   - `GOOGLE_DRIVE_API_KEY` : Votre clé d'API Google Cloud Console (avec *Google Drive API* activée).
   - `GOOGLE_DRIVE_FOLDER_ID` : L'identifiant de votre dossier Google Drive partagé contenant vos images/projets.
   - `CONTACT_RECEIVER_EMAIL` : Votre adresse email pour recevoir les messages du formulaire de contact.
   - `RESEND_API_KEY` : (Optionnel) Clé API [Resend](https://resend.com) pour l'envoi d'emails transactionnels.
   - `VITE_CONTACT_EMAIL` : Adresse email publique affichée sur le portfolio.
   - `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_TWITTER_URL` : Liens de vos profils sociaux.

---

## 🖼️ Utilisation de Google Drive pour les Projets

Vous pouvez afficher des images directement depuis Google Drive dans le portfolio de deux manières :

1. **Lien de partage direct Google Drive** :
   Collez simplement un lien Google Drive standard (ex: `https://drive.google.com/file/d/1AbCdEfGh.../view?usp=sharing`).
   Le système le convertit automatiquement en image haute résolution via le CDN Google `https://lh3.googleusercontent.com/d/{ID}`.

2. **Dossier partagé Google Drive** :
   En renseignant `GOOGLE_DRIVE_FOLDER_ID` et `GOOGLE_DRIVE_API_KEY`, le backend interroge dynamiquement l'API Google Drive (`/api/projects`) pour récupérer automatiquement les éléments stockés dans votre dossier.

---

## 🛠️ Commandes Disponibles

### Installation
```bash
npm install
```

### Développement
```bash
# Lancer le frontend (React / Vite)
npm run dev

# Ou lancer spécifiquement le frontend
npm run dev:frontend

# Lancer le backend (Cloudflare Worker local)
npm run dev:backend
```

### Build & Production
```bash
# Compiler le frontend
npm run build

# Déployer sur Cloudflare
npm run deploy
```