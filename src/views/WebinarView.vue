<template>
    <div class="w-full px-4 py-10 xl:px-28 md:py-14 min-h-screen">
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
                <UpComingWebinar v-for="webinar in upcomingWebinars" :webinar="webinar" :key="webinar.id" />
            </div>

            <div v-if="activeTab === 'past'" class="space-y-6">
                <PastWebinar v-for="webinar in pastWebinars" :webinar="webinar" :key="webinar.id" />
            </div>
        </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCalendar, faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import UpComingWebinar from '@/components/webinars/UpComingWebinar.vue'
import PastWebinar from '@/components/webinars/PastWebinar.vue'


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

