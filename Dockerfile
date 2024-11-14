# Utiliser l'image Node.js 20
FROM node:20.9.0

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . .

# Installer les dépendances du projet
RUN npm install --force

# Exposer le port utilisé par Vite (par défaut 5173)
EXPOSE 4200

# Commande pour lancer l'application en mode développement
CMD npm run start