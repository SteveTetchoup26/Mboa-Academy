<template>
    <div class="w-full px-4 py-10 xl:px-28 md:py-14">
      <h1 class="text-2xl md:text-4xl font-bold">Nos Webinaires</h1>
        <div class="w-full pt-4 ">
            <div class="grid w-full grid-cols-2 mb-8 border bg-gray-100 p-1 rounded-lg overflow-hidden">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.value"
                    @click="activeTab = tab.value"
                    :class="[
                        'p-2 flex items-center justify-center gap-2 rounded-md transition-all duration-100 ease-in',
                        activeTab === tab.value ? 'bg-primary text-white' : 'bg-gray-100'
                    ]"
                >
                    <FontAwesomeIcon :icon="tab.icon" class="hidden md:block" />
                    {{ tab.label }}
                </button>
            </div>
  
            <div v-if="activeTab === 'upcoming'" class="space-y-4">
                <div v-for="webinar in upcomingWebinars" :key="webinar.id"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :enter="{ opacity: 1, y: 0 }"
                     class="border rounded-lg p-4 md:hover:shadow-[1px_1px_5px_#9e9e9e]"
                >
                    <div class="flex-col flex md:flex-row justify-between mb-4">
                        <h3 class="text-md md:text-xl font-bold mb-2 md:mb-0">{{ webinar.title }}</h3>
                        <span class="text-sm">{{ webinar.date }} à {{ webinar.time }}</span>
                    </div>
                
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 mb-4">
                        <div>
                            <span class="font-semibold">Durée:</span> <span class="text-gray-400">{{ webinar.duration }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Intervenant:</span> <span class="text-gray-400">{{ webinar.speaker }}</span>
                        </div>
                    </div>
                        
                    <p class="mb-4">{{ webinar.description }}</p>
                    <button class="bg-primary text-sm md:text-[15px] text-white px-2 py-1 md:px-4 md:py-2 hover:bg-secondary transition-all duration-150">
                        S'inscrire
                    </button>
                </div>
            </div>
  
            <div v-if="activeTab === 'past'"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0 }"
                class="space-y-6"
            >
                <div v-for="webinar in pastWebinars" :key="webinar.id" class="border rounded-lg p-6  md:hover:shadow-[1px_1px_5px_#9e9e9e]">
                    <div class="flex-col flex md:flex-row justify-between mb-4">
                        <h3 class="text-md md:text-xl font-bold mb-2 md:mb-0">{{ webinar.title }}</h3>
                        <span class="text-sm">{{ webinar.date }}</span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 mb-4">
                    <div>
                        <span class="font-semibold">Intervenant:</span> <span class="text-gray-400">{{ webinar.speaker }}</span>
                    </div>
                    <div>
                        <span class="font-semibold">Durée:</span> <span class="text-gray-400">{{ webinar.duration }}</span>
                    </div>
                    </div>
                    
                    <button class="bg-primary text-sm text-white px-2 py-1 md:px-4 md:py-2 hover:bg-secondary transition-all duration-150">
                        Voir le replay
                    </button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCalendar, faCirclePlay } from '@fortawesome/free-regular-svg-icons'
  
    const activeTab = ref('upcoming')
    const suggestion = ref('')
  
      const tabs = [
        { label: 'À venir', value: 'upcoming', icon: faCalendar },
        { label: 'Replay', value: 'past', icon: faCirclePlay },
        // { label: 'Communauté', value: 'community', icon: '' },
      ]
  
      const upcomingWebinars = [
        {
          id: 1,
          title: "Introduction au Marketing Digital",
          date: "15 janvier 2025",
          time: "14:00",
          duration: "1h30",
          speaker: "Marie Laurent, John Doe",
          description: "Découvrez les fondamentaux du marketing digital et les meilleures pratiques actuelles."
        },
        {
          id: 2,
          title: "SEO Avancé",
          date: "22 janvier 2025",
          time: "15:00",
          duration: "2h",
          speaker: "Thomas Dubois",
          description: "Optimisation avancée pour les moteurs de recherche et stratégies de référencement."
        }
      ]
  
      const pastWebinars = [
        {
          id: 3,
          title: "Stratégies de Content Marketing",
          date: "1 décembre 2024",
          speaker: "Julie Martin",
          duration: "1h45",
          recording: true
        },
        {
          id: 4,
          title: "Analytics et KPIs",
          date: "15 décembre 2024",
          speaker: "Pierre Durand",
          duration: "2h",
          recording: true
        }
      ]
  
 </script>

 <style>
.test {
    background-color: green;
}
</style>
