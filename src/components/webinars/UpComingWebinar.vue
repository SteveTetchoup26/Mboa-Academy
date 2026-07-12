<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        class="border rounded-lg p-4 md:hover:shadow-[1px_1px_5px_#9e9e9e]"
    >
        <div class="flex-col flex md:flex-row justify-between mb-4">
            <h3 class="text-md md:text-xl font-bold mb-2 md:mb-0">{{ webinar.title }}</h3>
            <span class="text-sm">{{ formatDate }} à {{ formatTime }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 mb-4">
            <div>
                <span class="font-semibold">Durée : </span>
                <span class="text-gray-400">{{ formatDuration }}</span>
            </div>
            <div>
                <span class="font-semibold">Intervenant(s) : </span>
                <span class="text-gray-400">{{ webinar.instructor?.name || 'À déterminer' }}</span>
            </div>
        </div>

        <p class="mb-4">{{ webinar.description }}</p>

        <div v-if="webinar.status?.title === 'Live'" class="flex gap-2">
            <span class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium flex items-center gap-1">
                <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                En direct
            </span>
            <button @click="joinWebinar" class="bg-red-600 text-sm md:text-[15px] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all">
                Rejoindre
            </button>
        </div>
        <button v-else-if="isRegistered" class="bg-green-100 text-green-700 text-sm md:text-[15px] px-4 py-2 rounded-lg font-medium cursor-default">
            ✓ Inscrit
        </button>
        <button v-else @click="handleRegister" :disabled="registering" class="bg-primary text-sm md:text-[15px] text-white px-4 py-2 rounded-lg hover:bg-secondary transition-all disabled:opacity-50">
            <i v-if="registering" class="pi pi-spin pi-spinner mr-1"></i>
            S'inscrire
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { WebinarAPI } from '@/services/api/Webinar'
import { useUserStore } from '@/stores/user'

const props = defineProps({
    webinar: {
        type: Object,
        required: true
    },
})

const router = useRouter()
const route = useRoute()
const toast = useToast()
const userStore = useUserStore()
const registering = ref(false)
const isRegistered = ref(false)

const formatDate = computed(() => {
    if (!props.webinar.start_date) return ''
    return new Date(props.webinar.start_date).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
})

const formatTime = computed(() => {
    if (!props.webinar.start_date) return ''
    return new Date(props.webinar.start_date).toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit'
    })
})

const formatDuration = computed(() => {
    const d = props.webinar.duration
    if (!d) return ''
    const h = Math.floor(d / 60)
    const m = d % 60
    if (h === 0) return `${m} min`
    if (m === 0) return `${h}h`
    return `${h}h${m}`
})

const handleRegister = async () => {
    if (!userStore.getToken()) {
        router.push({ name: 'login', query: { redirect: route.fullPath } })
        return
    }
    registering.value = true
    try {
        await WebinarAPI.register(props.webinar.id)
        isRegistered.value = true
        toast.add({ severity: 'success', detail: 'Inscription réussie !', life: 3000 })
    } catch (e: any) {
        if (e.response?.status === 401) {
            // Token expiré — rediriger vers login
            userStore.logout()
            router.push({ name: 'login', query: { redirect: route.fullPath } })
            return
        }
        const msg = e.response?.data?.message || "Erreur lors de l'inscription"
        toast.add({ severity: 'error', detail: msg, life: 4000 })
    } finally {
        registering.value = false
    }
}

const joinWebinar = () => {
    router.push({ name: 'webinarRoom', params: { id: props.webinar.id } })
}
</script>