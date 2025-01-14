<template>
    <div class="min-h-screen bg-gray-50">
      <Transition>
        <aside :class="[
          'fixed  left-0 top-0 h-full w-64 bg-white shadow-lg hidden lg:block z-10',
          isSmallScreen && '!block'
        ]">
          <div class="flex h-16 items-center justify-center border-b">
            <h1 class="text-xl font-bold text-primary">Espace Formateur</h1>
          </div>
          
          <nav class="p-4">
            <ul class="space-y-2">
              <li v-for="item in menuItems" :key="item.id">
                <button
                  @click="navigationTosection(item.path, item.id)"
                  :class="[
                    'flex w-full items-center rounded-lg p-3 gap-3 text-gray-700 transition-colors',
                    currentSection === item.id ? 'bg-green-50 text-primary' : 'hover:bg-gray-100'
                  ]"
                >
                  <FontAwesomeIcon :icon="item.icon" class=""/>
                  {{ item.name }}
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      </Transition>  
  
      
      <main class="ml-0 lg:ml-64 p-8 w-full lg:w-auto">
        <header class="mb-8 flex items-start justify-between">
          <div class="space-y-10 lg:space-y-0">
            <FontAwesomeIcon @click="toogleMenu" :icon="faBars" class="h-5 block lg:hidden cursor-pointer"/>
            <h2 class=" text-2xl font-bold text-gray-900">{{ currentSectionTitle }}</h2>
            <!-- <p class="text-gray-600">{{ getCurrentDate() }}</p> -->
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              @click="showNotifications = !showNotifications"
              class="relative rounded-full py-2 px-3 hover:bg-gray-100 group"
            >
                <FontAwesomeIcon :icon="faBell" class="h-5 group-hover:text-primary"/>
                <span v-if="notifications.length" class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {{ notifications.length }}
                </span>
            </button>
            
            <!-- <div class="relative">
              <button 
                @click="showProfileMenu = !showProfileMenu"
                class="flex items-center space-x-3 rounded-full p-2 hover:bg-gray-100"
              >
                <img 
                  :src="formateurInfo.avatar" 
                  alt="Profile" 
                  class="h-8 w-8 rounded-full"
                />
                <span>{{ formateurInfo.name }}</span>
              </button>
            </div> -->
          </div>
        </header>

        <RouterView />

      </main>
    </div>
  </template>
  
<script setup lang="ts">
import { computed, ref, Transition } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChartPie, faBookOpen, faUsers, faMessage, faGear, faBars,  } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

  
const router = useRouter();
const currentSection = ref(router.currentRoute.value.name);
const showNotifications = ref(false);
const showProfileMenu = ref(false);
const isSmallScreen = ref(false);
 

// :class="[
//           'fixed  left-0 top-0 h-full w-64 bg-white shadow-lg lg:block lg:translate-x-0',
//           !isSmallScreen && 'hidden -translate-x-full'
//         ] 
  const menuItems = [
    { id: 'dashboard', name: 'Tableau de bord', icon: faChartPie, path: 'dashboard'},
    { id: 'publishedCourses', name: 'Mes cours', icon: faBookOpen, path: 'courses'},
    // { id: 'students', name: 'Étudiants', icon: faUsers, path: 'students'},
    { id: 'messages', name: 'Messages', icon: faMessage, path: 'messages'},
    { id: 'settings', name: 'Paramètres', icon: faGear, path: 'settings'},
  ];
  

  const formateurInfo = {
    name: 'Jean Dupont',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    email: 'jean.dupont@email.com'
  };

  
  const notifications = [
    {
      id: 1,
      title: 'Nouvelle évaluation',
      message: 'Un étudiant a évalué votre cours',
      time: 'Il y a 1 heure'
    }
  ];
  
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const currentSectionTitle = computed(() => {
    const section = menuItems.find(item => item.id === currentSection.value);
    return section ? section.name : '';
  });

  const navigationTosection = (path: string, id: string) => {
    isSmallScreen.value = false;
    currentSection.value = id;
    router.push(`/instructor/${path}`);
  }

  const toogleMenu = () => {
    isSmallScreen.value = true;
  }
  </script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(100%);
    width: 0;
}

.v-enter-to,
.v-leave-from {
    transform: translateX(0);
    width: auto;
}
</style>