<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
     
      <div class="relative h-[350px] md:h-[500px] rounded-xl md:overflow-hidden mb-8">
        <img 
          :src="carouselOne" 
          class="w-full h-full object-cover brightness-50"
          alt="Couverture du cours"
        >

        <div class="absolute top-0 left-0 w-full h-max md:h-full flex md:items-center">
          <div class="w-full h-max md:h-full pt-4 md:max-w-4xl mx-auto px-6">
            <div class="flex flex-col h-max md:flex-row justify-between gap-8">
              <div class="text-white h-max space-y-6 flex-1">
                <div>
                  <div class="flex items-center gap-2 text-primary-200 mb-2  text-xs lg:text-[15px]">
                    <!-- <TagIcon class="w-5 h-5" /> -->
                    <span>{{ course.category }}</span>
                  </div>
                  <h1 class="text-xl lg:text-4xl font-bold mb-4">{{ course.title }}</h1>
                  <p class="text-sm lg:text-lg text-gray-200">{{ course.shortDescription }}</p>
                </div>
                
                <div class="flex flex-wrap gap-4 md:gap-6 text-xs lg:text-[15px]">
                  <div class="flex items-center gap-1">
                    <FontAwesomeIcon :icon="faStar" class=" text-yellow-500"/>
                    <span>{{ course.rating }} ({{ course.reviewsCount }} avis)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <FontAwesomeIcon :icon="faUsers" />
                    <span>{{ course.enrolledStudents }} étudiants</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <FontAwesomeIcon :icon="faClock" />
                    <span>{{ course.duration }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <FontAwesomeIcon :icon="faCalendar" />
                    <span>Dernière mise à jour {{ course.lastUpdate }}</span>
                  </div>
                </div>
  
                <div class="flex items-center gap-4">
                  <img 
                    :src="instutor" 
                    class="w-12 h-12 rounded-full"
                    :alt="course.instructor.name"
                  >
                  <div>
                    <div class="font-medium">{{ course.instructor.name }}</div>
                    <div class="text-sm text-gray-300">{{ course.instructor.title }}</div>
                  </div>
                </div>
              </div>

              <div class="w-full hidden md:block md:w-96">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="p-6">
                    <div class="flex items-baseline gap-3 mb-4">
                      <span class="text-xl md:text-3xl font-bold">{{ course.price }} FCFA</span>
                      <span class="text-lg text-gray-500 line-through">{{ course.originalPrice }} FCFA</span>
                      <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        -{{ course.discountPercentage }}%
                      </span>
                    </div>
                    
                    <div class="space-y-3 mb-6">
                      <button class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary">
                        S'inscrire maintenant
                      </button>
                      <div class="text-center text-sm text-gray-600">
                        <span>{{ course.offerEndsIn }} restants à ce prix</span>
                      </div>
                    </div>
  
                    <div class="space-y-4">
                      <h4 class="font-medium">Ce cours inclut :</h4>
                      <ul class="space-y-3 text-gray-600">
                        <li v-for="feature in course.features" :key="feature.text" class="flex items-center gap-3">
                          <FontAwesomeIcon :icon="faCircle" class=" mr-2 w-1"/>
                          <span>{{ feature.text }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full block md:hidden">
        <div class="bg-white overflow-hidden">
          <div class="p-6">
            <div class="flex items-baseline gap-3 mb-4">
              <span class="text-xl md:text-3xl font-bold">{{ course.price }} FCFA</span>
              <span class="text-lg text-gray-500 line-through">{{ course.originalPrice }} FCFA</span>
              <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                -{{ course.discountPercentage }}%
              </span>
            </div>
            
            <div class="space-y-3 mb-6">
              <button class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary">
                S'inscrire maintenant
              </button>
              <div class="text-center text-sm text-gray-600">
                <span>{{ course.offerEndsIn }} restants à ce prix</span>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="font-medium">Ce cours inclut :</h4>
              <ul class="space-y-3 text-gray-600">
                <li v-for="feature in course.features" :key="feature.text" class="flex items-center gap-3">
                  <span>{{ feature.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-gray-100 md:bg-white md:rounded-xl md:shadow-sm p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6">Ce que vous apprendrez</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="objective in course.learningObjectives" :key="objective" class="flex items-center gap-3">
                <FontAwesomeIcon :icon="faCircle" class=" mr-2 w-1"/>
                <span>{{ objective }}</span>
              </div>
            </div>
          </div>
  
          <div class="bg-white md:rounded-xl md:shadow-sm p-6 mb-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">Programme du cours</h2>
              <div class="text-sm text-gray-500">
                {{ course.modulesCount }} modules • {{ course.lessonsCount }} leçons • {{ course.duration }} au total
              </div>
            </div>
  
            <div class="space-y-4">
              <div 
                v-for="(module, index) in course.modules" 
                :key="index"
                class="border rounded-lg"
              >
                <div class="flex items-center justify-between p-4 bg-gray-50">
                  <div class="flex items-center gap-3">
                    <span class="font-medium">{{ module.title }}</span>
                    <span class="text-sm text-gray-500">{{ module.duration }}</span>
                  </div>
                </div>
                <div class="p-4 space-y-3">
                  <div 
                    v-for="lesson in module.previewLessons" 
                    :key="lesson.id"
                    class="flex items-center gap-3 text-gray-600"
                  >
                    <span>{{ lesson.title }}</span>
                    <span class="text-sm text-gray-500 ml-auto">{{ lesson.duration }}</span>
                  </div>
                  <div v-if="module.hiddenLessons" class="text-center text-sm text-gray-500 pt-2 border-t">
                    {{ module.hiddenLessons }} leçons supplémentaires dans ce module
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Témoignages -->
          <!-- <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">Avis des étudiants</h2>
              <div class="flex items-center gap-2">
                <div class="flex">
                  <StarIcon 
                    v-for="i in 5" 
                    :key="i"
                    class="w-5 h-5"
                    :class="i <= course.rating ? 'text-yellow-400' : 'text-gray-300'"
                  />
                </div>
                <span class="font-medium">{{ course.rating }}</span>
                <span class="text-gray-500">({{ course.reviewsCount }})</span>
              </div>
            </div>
  
            <div class="grid md:grid-cols-2 gap-6">
              <div 
                v-for="review in course.featuredReviews" 
                :key="review.id"
                class="border rounded-lg p-4"
              >
                <div class="flex items-center gap-3 mb-3">
                  <img 
                    :src="review.userAvatar" 
                    :alt="review.userName"
                    class="w-10 h-10 rounded-full"
                  >
                  <div>
                    <div class="font-medium">{{ review.userName }}</div>
                    <div class="flex">
                      <StarIcon 
                        v-for="i in 5" 
                        :key="i"
                        class="w-4 h-4"
                        :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                      />
                    </div>
                  </div>
                </div>
                <p class="text-gray-600">{{ review.comment }}</p>
              </div>
            </div>
          </div> -->
        </div>
  
        <!-- Sidebar -->
        <div class="block">
          <div class="sticky top-6 flex flex-col gap-4 lg:flex-col md:flex-row">
            <div class="bg-white h-max rounded-xl md:border-none border border-1 border-gray-200 md:shadow-[1px_1px_5px_#9e9e9e] p-6 mb-6">
              <div class="text-center space-y-2 md:space-y-4">
                <h3 class="text-xl font-bold">Promotion spéciale !</h3>
                <div class="text-xl md:text-3xl font-bold text-primary">-{{ course.discountPercentage }}%</div>
                <div class="space-y-2">
                  <p class="text-gray-600">L'offre se termine dans :</p>
                  <div class="flex justify-center gap-1 md:gap-3">
                    <div class="bg-gray-100 px-3 py-2 rounded">
                      <div class="text-xl font-bold">2</div>
                      <div class="text-sm text-gray-500">jours</div>
                    </div>
                    <div class="bg-gray-100 px-3 py-2 rounded">
                      <div class="text-xl font-bold">18</div>
                      <div class="text-sm text-gray-500">heures</div>
                    </div>
                    <div class="bg-gray-100 px-3 py-2 rounded">
                      <div class="text-xl font-bold">45</div>
                      <div class="text-sm text-gray-500">minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Certifications -->
            <div class="bg-white rounded-xl md:border-none border border-1 border-gray-200 md:shadow-[1px_1px_5px_#9e9e9e] p-6">
              <h3 class="text-xl font-bold mb-4">Certificat inclus</h3>
              <div class="space-y-4">
                <img 
                  :src="carouselOne" 
                  alt="Exemple de certificat"
                  class="w-full rounded-lg"
                >
                <p class="text-gray-600">
                  Obtenez un certificat officiel après avoir terminé le cours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCircle, faClock, faStar, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import carouselOne from './../assets/images/carousel-1.jpg';
import instutor from './../assets/images/instutor.jpg'

  
  const course = {
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    shortDescription: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    coverImage: "",
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    },
    features: [
      { icon: '', text: "Accès à vie au contenu" },
      { icon: '', text: "21 heures de vidéo HD" },
      { icon: '', text: "85 ressources téléchargeables" },
      { icon: '', text: "Certificat d'achèvement" },
      { icon: '', text: "Accès sur mobile et TV" }
    ],
    learningObjectives: [
      "Maîtriser la nouvelle Composition API de Vue 3",
      "Créer des applications réactives et performantes",
      "Comprendre le state management avec Pinia",
      "Implémenter une architecture scalable",
      "Utiliser TypeScript avec Vue.js",
      "Créer des tests unitaires et E2E",
      "Déployer vos applications en production",
      "Optimiser les performances"
    ],
    modulesCount: 12,
    lessonsCount: 148,
    modules: [
      {
        title: "Introduction à Vue.js 3",
        duration: "2h 30min",
        previewLessons: [
          {
            id: 1,
            type: "video",
            title: "Présentation du framework Vue.js",
            duration: "15:30"
          },
          {
            id: 2,
            type: "document",
            title: "Installation et configuration",
            duration: "10:45"
          }
        ],
        hiddenLessons: 8
      },
      {
        title: "La Composition API",
        duration: "3h 45min",
        previewLessons: [
          {
            id: 3,
            type: "video",
            title: "Introduction aux Composables",
            duration: "20:15"
          }
        ],
        hiddenLessons: 12
      }
    ],
    // featuredReviews: [
    //   {
    //     id: 1,
    //     userName: "Thomas Martin",
    //     userAvatar: "",
    //     rating: 5,
    //     comment: "Un cours excellent qui m'a permis de monter en compétence rapidement sur Vue.js 3. La section sur la Composition API est particulièrement bien expliquée."
    //   },
    //   {
    //     id: 2,
    //     userName: "Julie Dubois",
    //     userAvatar: "",
    //     rating: 5,
    //     comment: "Formation très complète avec des exercices pratiques pertinents. Le formateur est clair et pédagogue."
    //   },
    //   {
    //     id: 3,
    //     userName: "Marc Bernard",
    //     userAvatar: "",
    //     rating: 4,
    //     comment: "Très bonne formation, mise à jour régulièrement avec les dernières fonctionnalités de Vue.js."
    //   }
    // ]
  }
</script>