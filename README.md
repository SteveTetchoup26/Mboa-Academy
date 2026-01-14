# BTS-app

Ce projet constitue le **frontend** de la plateforme Mboa Academy, développé avec **Vue.js** . Il permet aux utilisateurs (apprenants, instructeurs et administrateurs) d’interagir avec la plateforme via une interface web moderne et réactive.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Fonctionnalités

### Pour les apprenants
- Inscription et connexion
- Navigation dans le catalogue de cours
- Recherche et filtrage de cours
- Visionnage des contenus de cours
- Participation aux webinaires
- Téléchargement de ressources et certificats
- Interaction via forum et messagerie privée

### Pour les instructeurs
- Création, mise à jour et soumission de cours
- Gestion de plusieurs leçons et vidéos par cours
- Communication avec les étudiants
- Organisation de sessions live
- Consultation du solde et retrait de revenus

### Pour les administrateurs
- Gestion des utilisateurs (apprenants et instructeurs)
- Gestion des cours et de la plateforme
- Analyse des données et rapports
- Gestion financière et mise à jour de la plateforme

## Technologies utilisées
- [Vue.js 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [ou Pinia](https://pinia.vuejs.org/) pour la gestion d’état
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) pour les requêtes HTTP
- [Vite](https://vitejs.dev/) pour le bundling et le développement rapide
- [ESLint & Prettier](https://eslint.org/) pour le linting et le formatage

## Prérequis
- Node.js >= 18
- npm ou yarn
- Accès au backend de la plateforme (API)

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/SteveTetchoup26/Mboa-Academy.git
cd Mboa-Academy
npm install
npm run dev
```
