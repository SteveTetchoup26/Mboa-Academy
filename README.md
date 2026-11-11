# Mboa Academy

Site public de la plateforme de formation en ligne **Mboa Academy** : catalogue de cours, apprentissage en vidéo, webinaires en direct, forums, espace formateur et espace institution.

Démo : [mboa-academy.vercel.app](https://mboa-academy.vercel.app)

L'API est dans un dépôt séparé : [Mboa-Academy-Backend](https://github.com/SteveTetchoup26/Mboa-Academy-Backend).

![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Pinia](https://img.shields.io/badge/Pinia-2-ffd859?logo=pinia)
![PrimeVue](https://img.shields.io/badge/PrimeVue-4-41b883)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Pages](#pages)
- [Structure du projet](#structure-du-projet)
- [Déploiement](#déploiement)

---

## Fonctionnalités

### Apprenants

- Inscription, connexion et confirmation du compte par e-mail.
- Catalogue de cours : cours à la une, cours récemment consultés, recherche et filtres par catégorie, prix et langue.
- Page de détail d'un cours : objectifs, programme par modules et leçons, contenu inclus, formateur, avis et prix.
- Inscription à un cours, avec choix du moyen de paiement pour les cours payants.
- Lecteur de cours : navigation par modules et leçons vidéo, suivi de la progression.
- Webinaires : inscription, liste des webinaires à venir et passés, salle en direct intégrée avec Jitsi.
- Forums de discussion par sujet.
- Profil et paramètres du compte.

### Formateurs

- Demande pour devenir formateur depuis le site.
- Espace formateur : tableau de bord, cours, étudiants et webinaires.
- Création de cours : image de couverture, objectifs, fonctionnalités incluses, modules et leçons vidéo.

### Institutions

- Création d'une institution et liste des institutions.
- Espace institution : tableau de bord, cours, formateurs, étudiants et webinaires.
- Cours gratuits ou payants, publics ou privés (accessibles avec un code), assignés à un formateur.

---

## Technologies

| Domaine | Outils |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) (Composition API) avec TypeScript |
| Routage | [Vue Router 4](https://router.vuejs.org/) |
| État global | [Pinia](https://pinia.vuejs.org/) |
| Interface | [PrimeVue 4](https://primevue.org/), [Tailwind CSS](https://tailwindcss.com/), [Font Awesome](https://fontawesome.com/), [@vueuse/motion](https://motion.vueuse.org/) |
| Formulaires | [vue-tel-input](https://github.com/iamstevendao/vue-tel-input) pour les numéros de téléphone |
| Requêtes HTTP | [Axios](https://axios-http.com/) |
| Visioconférence | [Jitsi Meet](https://jitsi.org/) |
| Outillage | [Vite](https://vitejs.dev/), vue-tsc, ESLint, Prettier, Vitest |

---

## Prérequis

- Node.js 18 ou plus récent
- npm
- L'[API Mboa Academy](https://github.com/SteveTetchoup26/Mboa-Academy-Backend) lancée en local ou déployée

---

## Installation

```bash
git clone https://github.com/SteveTetchoup26/Mboa-Academy.git
cd Mboa-Academy
npm install
cp .env.example .env.local
npm run dev
```

L'application est servie sur `http://localhost:5173`.

---

## Configuration

| Variable | Description | Exemple |
|---|---|---|
| `VITE_API_URL` | Adresse de l'API | `http://localhost:7010` en local |

---

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualise le build de production |
| `npm run type-check` | Vérification des types avec vue-tsc |
| `npm run lint` | Analyse et correction ESLint |
| `npm run format` | Formatage du code avec Prettier |
| `npm run test:unit` | Tests unitaires avec Vitest |

---

## Pages

| Route | Page |
|---|---|
| `/` | Accueil et catalogue |
| `/courses` | Cours d'une catégorie |
| `/course-details/:courseId` | Détail d'un cours |
| `/my-courses` | Mes cours |
| `/my-courses/:courseSavedId` | Lecteur de cours |
| `/webinars`, `/webinar/:id` | Webinaires et accès à un webinaire |
| `/webinar-room/:id` | Salle de webinaire en direct |
| `/forums` | Forums |
| `/become-instructor` | Devenir formateur |
| `/institutions`, `/institutions/create`, `/institutions/:id` | Institutions |
| `/profile`, `/settings` | Profil et paramètres |
| `/connexion`, `/inscription`, `/confirm-account` | Authentification |
| `/instructor/*` | Espace formateur |
| `/institution/*` | Espace institution |

---

## Structure du projet

```
src/
├── assets/          images et styles
├── components/
│   ├── Auth/        connexion et inscription
│   ├── institution/ espace institution
│   ├── instructor/  espace formateur
│   ├── layout/      gabarits de page (site, formateur, institution)
│   ├── messages/    forums
│   ├── modals/      fenêtres d'inscription, de webinaire, de sujet…
│   ├── webinar/     salle de webinaire (Jitsi)
│   └── webinars/    webinaires à venir et passés
├── constants/       adresse de l'API
├── helpers/         instance Axios, URL des fichiers, formatage
├── router/          routes de l'application
├── services/api/    appels à l'API par domaine (cours, inscriptions, paiements…)
├── stores/          stores Pinia (utilisateur, application)
├── utils/           fonctions utilitaires
└── views/           pages
```

---

## Déploiement

Le site est déployé sur **Vercel**. Le fichier `vercel.json` redirige toutes les routes vers `index.html`, pour que le routage de Vue fonctionne quand on ouvre directement une URL.

Sur Vercel, définissez `VITE_API_URL` avec l'adresse de l'API en production.
