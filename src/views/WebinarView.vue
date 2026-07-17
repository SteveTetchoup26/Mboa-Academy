<template>
    <div class="w-full px-4 py-10 xl:px-28 md:py-14 min-h-screen">
      <h1 class="text-2xl md:text-4xl font-bold">Nos Webinaires</h1>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
      </div>

      <template v-else>
        <div class="w-full pt-4">
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

            <!-- Empty -->
            <div v-if="upcomingWebinars.length === 0 && activeTab === 'upcoming'" class="text-center py-16">
                <FontAwesomeIcon :icon="faCalendar" class="text-5xl text-gray-300 mb-4" />
                <p class="text-gray-500 text-lg">Aucun webinaire à venir pour le moment.</p>
            </div>
            <div v-else-if="activeTab === 'upcoming'" class="space-y-4">
                <UpComingWebinar v-for="webinar in upcomingWebinars" :webinar="webinar" :key="webinar.id" />
            </div>

            <div v-if="pastWebinars.length === 0 && activeTab === 'past'" class="text-center py-16">
                <FontAwesomeIcon :icon="faCirclePlay" class="text-5xl text-gray-300 mb-4" />
                <p class="text-gray-500 text-lg">Aucun replay disponible pour le moment.</p>
            </div>
            <div v-else-if="activeTab === 'past'" class="space-y-6">
                <PastWebinar v-for="webinar in pastWebinars" :webinar="webinar" :key="webinar.id" />
            </div>
        </div>
      </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCalendar, faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import UpComingWebinar from '@/components/webinars/UpComingWebinar.vue'
import PastWebinar from '@/components/webinars/PastWebinar.vue'
import { WebinarAPI } from '@/services/api/Webinar'

const activeTab = ref('upcoming')
const loading = ref(true)
const webinars = ref<Array<Record<string, any>>>([])

const tabs = [
    { label: 'À venir', value: 'upcoming', icon: faCalendar },
    { label: 'Replay', value: 'past', icon: faCirclePlay },
]

const upcomingWebinars = computed(() =>
    webinars.value.filter(w => w.status?.title === 'Upcoming' || w.status?.title === 'Live')
)

const pastWebinars = computed(() =>
    webinars.value.filter(w => w.status?.title === 'Past')
)

onMounted(async () => {
    try {
        const { data } = await WebinarAPI.getAll();
        webinars.value = data.webinars || [];
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
})
</script>

