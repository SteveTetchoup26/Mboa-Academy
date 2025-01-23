<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center">
            <div class="flex space-x-4">
                <button 
                    v-for="tab in webinarTabs" 
                    :key="tab.id"
                    @click="currentWebinarTab = tab.id"
                    :class="[
                    'px-2 md:px-4 py-1 md:py-2 rounded-lg',
                    currentWebinarTab === tab.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                >
                    {{ tab.name }}
                </button>
            </div>
            
            <button 
                @click="showModal = true"
                class="flex items-center gap-2 text-white bg-primary w-max text-sm md:text-[15px] rounded-md md:rounded-none py-1 px-2 md:py-2 md:px-4 hover:bg-secondary transition-all duration-150"
            >
                <FontAwesomeIcon :icon="faPlus" class=""/>
                <span class="hidden md:block">Nouveau</span>
            </button>
        </div>

        <div v-if="currentWebinarTab === 'upcoming'" class="grid gap-6 grid-cols-1 2xl:grid-cols-2">
            <div 
                v-for="webinar in upcomingWebinars" 
                :key="webinar.id"
                class="bg-white rounded-lg shadow p-3 md:p-6 flex flex-col justify-between"  
            >
                <div class="flex justify-between items-start mb-2 md:mb-4">
                    <div>
                        <span class="text-xs md:text-sm text-blue-600 font-medium">
                            {{ formatDate(webinar.date) }}
                        </span>
                        <h3 class="text-sm md:text-xl font-semibold mt-1">{{ webinar.title }}</h3>
                    </div>
                    <span :class="[
                        'px-3 py-1 rounded-full text-xs md:text-sm font-medium flex items-center gap-1',
                        webinar.status === 'live' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    ]"
                    > 
                            <LiveWebinar v-if="webinar.status === 'live'" />
                            {{ webinar.status === 'live' ? 'En direct' : 'À venir' }}
                    </span>
                </div>
            
                <p class="text-sm md:text-[15px] text-gray-600 mb-2 md:mb-4">{{ webinar.description }}</p>
            
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center text-xs md:text-sm">
                            <FontAwesomeIcon :icon="faUsers" class="text-gray-400 mr-2"/>
                            <span v-if="webinar.status != 'live'">{{ webinar.participants }} inscrits</span>
                            <span v-else>{{ webinar.participants }} participants</span>
                        </div>
                        <div class="flex items-center text-xs md:text-sm">
                            <FontAwesomeIcon :icon="faClock" class="text-gray-400 mr-2"/>
                            <span>{{ webinar.duration }} min</span>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button 
                            v-if="webinar.status === 'live'"
                            class="bg-red-600 text-sm md:text-[15px] text-white py-1 px-2 md:py-2 md:px-4 rounded-lg  hover:bg-red-700"
                        >
                            Rejoindre
                        </button>
                        <button 
                            v-else
                            class="bg-blue-600 text-sm md:text-[15px] text-white py-1 px-2 md:py-2 md:px-4 rounded-lg  hover:bg-blue-700"
                        >
                            Configurer
                        </button>
                    </div>
                </div>
            </div>
        </div>

      
        <div v-else-if="currentWebinarTab === 'past'" class="grid gap-6 grid-cols-1 xl:grid-cols-2">
            <div 
                v-for="webinar in pastWebinars" 
                :key="webinar.id"
                class="bg-white rounded-lg shadow p-3 md:p-6"
            >
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-xs md:text-sm flex items-center space-x-2">
                            <span class=" text-gray-500">{{ formatDate(webinar.date) }}</span>
                            <span class=" text-gray-500">•</span>
                            <span class=" text-gray-500">{{ webinar.duration }} min</span>
                        </div>
                        <h3 class="text-[16px] md:text-lg font-semibold mt-1">{{ webinar.title }}</h3>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <div class="hidden md:block text-right">
                            <div class="text-sm text-gray-500">Participants</div>
                            <div class="font-semibold">{{ webinar.participants }}</div>
                        </div>
                        <div class="hidden md:block text-right">
                            <div class="text-sm text-gray-500">Satisfaction</div>
                            <div class="font-semibold">{{ webinar.satisfaction }}%</div>
                        </div>
                        <button class="text-blue-600 hover:text-blue-800 hover:bg-gray-100 rounded-full py-2 md:py-3 px-3 md:px-[14px]">
                            <FontAwesomeIcon :icon="faDownload" class="h-4 md:h-5 w-4 md:w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <WebinarAdditionModal :showModal="showModal"  @close-modal="showModal=false"/>
</template>

<script setup lang="ts">
import { faClock, faDownload, faFileWaveform, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, computed } from 'vue';
import LiveWebinar from '../../loader/LiveWebinar.vue';
import WebinarAdditionModal from '@/components/modals/WebinarAdditionModal.vue';


let showModal = ref(false);
const currentWebinarTab = ref('upcoming');
const showNewWebinarModal = ref(false);
const newWebinar = ref({
  title: '',
  date: '',
  duration: 60,
  description: ''
});

const webinarTabs = [
  { id: 'upcoming', name: 'À venir' },
  { id: 'past', name: 'Passés' }
];



const upcomingWebinars = [
  {
    id: 1,
    title: "Les meilleures pratiques de Vue.js en 2025",
    date: "2025-01-20T14:00:00",
    description: "Découvrez les patterns et pratiques modernes pour développer des applications Vue.js performantes.",
    participants: 45,
    duration: 90,
    status: 'upcoming'
  },
  {
    id: 2,
    title: "Workshop: Création d'une API REST",
    date: "2025-01-15T16:00:00",
    description: "Session pratique sur la création d'APIs REST sécurisées et scalables.",
    participants: 32,
    duration: 120,
    status: 'upcoming'
  },
  {
    id: 3,
    title: "Workshop: Création d'une API REST",
    date: "2025-01-15T16:00:00",
    description: "Session pratique sur la création d'APIs REST sécurisées et scalables.",
    participants: 32,
    duration: 120,
    status: 'upcoming'
  }
];

const pastWebinars = [
  {
    id: 4,
    title: "Introduction à TypeScript",
    date: "2025-01-10T15:00:00",
    participants: 78,
    duration: 60,
    satisfaction: 95
  },
  {
    id: 5,
    title: "Introduction à TypeScript",
    date: "2025-01-10T15:00:00",
    participants: 78,
    duration: 60,
    satisfaction: 95
  }
];


const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

</script>