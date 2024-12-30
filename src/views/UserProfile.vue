<template>
    <div class="max-w-5xl mx-auto p-4 space-y-6">
      <div class="relative bg-white rounded-lg shadow pb-4">
        <div class="h-32 bg-primary rounded-t-lg"></div>
        <div class="relative px-6">
          <div class="flex flex-col sm:flex-row sm:items-end  sm:gap-4 -mt-12">
            <div class="relative">
              <label for="picture">
                <div 
                  class="relative w-24 h-24 font-bold text-2xl flex items-center justify-center rounded-full border-4 border-white bg-gray-200"
                >
                  <img v-if="image" :src="image" class="w-full h-full object-cover rounded-full" alt="">
                  <span v-else>ST</span>
                  <div class="absolute bottom-0 right-0 py-2 px-2 text-sm flex items-center justify-center text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-200">
                    <FontAwesomeIcon :icon="faCamera" />
                  </div>
                </div>
              </label>
              <input @change="handleImageChange" type="file" id="picture" hidden>
              
            </div>
            
            <div class="sm:text-left mt-0 flex-grow">
              <h1 class="text-nd md:text-2xl font-bold">{{ user.name }}</h1>
              <p class="text-sm md:text-md text-gray-600">{{ user.role }}</p>
            </div>
  
            <button 
              @click="isEditing = true"
              class="absolute top-14 right-4 px-2 md:px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 flex items-center"
            >
              <span class="hidden md:block">Modifier le profil</span>
              <FontAwesomeIcon :icon="faPenToSquare" class="block md:hidden"/>
            </button>
          </div>
        </div>
      </div>
  
      <div class="bg-white rounded-lg shadow">
        <div class="border-b">
          <nav class="flex">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="currentTab = tab.id"
              :class="[
                'px-6 py-4 text-sm font-medium',
                currentTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
  
        <!-- Contenu des onglets -->
        <div class="p-6">
          <!-- Aperçu -->
          <div v-if="currentTab === 'overview'" class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h2 class="text-lg font-semibold">Informations personnelles</h2>
              <div v-if="!isEditing">
                <div class="space-y-3">
                  <div>
                    <label class="text-sm text-gray-500">Nom complet</label>
                    <p>{{ user.name }}</p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">Email</label>
                    <p>{{ user.email }}</p>
                  </div>
                </div>
              </div>
              <div v-else>
                <form @submit.prevent="saveProfile" class="space-y-4">
                  <div>
                    <label class="text-sm text-gray-500">Nom complet</label>
                    <input 
                      v-model="editedUser.name"
                      type="text"
                      class="mt-1 block w-full outline-primary p-2 rounded-md border-gray-300 shadow-sm"
                    >
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">Email</label>
                    <input 
                      v-model="editedUser.email"
                      type="email"
                      class="mt-1 block w-full outline-primary p-2 rounded-md border-gray-300 shadow-sm"
                    >
                  </div>
                  <div class="flex gap-3">
                    <button 
                      type="submit"
                      class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
                    >
                      Sauvegarder
                    </button>
                    <button 
                      type="reset"
                      @click="cancelEdit"
                      class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  
          <!-- Formations -->
          <div v-else-if="currentTab === 'courses'" class="space-y-4">
            <h2 class="text-lg font-semibold">Mes cours</h2>
            <div v-if="user.courses.length" class="space-y-4">
              <div 
                v-for="course in user.courses" 
                :key="course.id"
                class="border rounded-lg p-4"
              >
                <h3 class="font-medium">{{ course.name }}</h3>
                <p class="text-sm text-gray-600">{{ course.progress }}% complété</p>
              </div>
            </div>
            <p v-else class="text-gray-600">Aucune formation en cours</p>
          </div>
  
          <!-- Paramètres -->
          <div v-else-if="currentTab === 'settings'" class="space-y-6">
            <div class="space-y-4">
              <h2 class="text-lg font-semibold">Notifications</h2>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    type="checkbox"
                    v-model="user.settings.emailNotifications"
                    class=""
                  >
                  <span class="ml-2">Recevoir les notifications par email</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


let currentTab =  ref('overview')
let isEditing =  ref(false)
let image = ref('')


let tabs =  [
  { id: 'overview', name: 'Aperçu' },
  { id: 'courses', name: 'Cours' },
  { id: 'settings', name: 'Paramètres' }
]

let user =  {
  name: 'Steve Tetchoup',
  email: 'test@gmail.com',
  role: 'Étudiant',
  imageUrl: '',
  courses: [
    { id: 1, name: 'Introduction au développement web', progress: 75 },
    { id: 2, name: 'Vue.js avancé', progress: 30 }
  ],
  settings: {
    emailNotifications: true
  }
}

let editedUser: any = ref({})

const created = ()  => {
  editedUser = { ...user }
}

const saveProfile = () => {
  user  = { ...editedUser }
  isEditing.value = false
}
const cancelEdit = () => {
  editedUser = { ...user }
  isEditing.value = false
}

const handleImageChange = (e: any) => {
  image.value = URL.createObjectURL(e.target.files[0])
}

</script>