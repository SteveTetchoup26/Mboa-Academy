<template>
    <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        class="border rounded-lg p-6 md:hover:shadow-[1px_1px_5px_#9e9e9e]"
    >
        <div class="flex-col flex md:flex-row justify-between mb-4">
            <h3 class="text-md md:text-xl font-bold mb-2 md:mb-0">{{ webinar.title }}</h3>
            <span class="text-sm">{{ formatDate }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 mb-4">
            <div>
                <span class="font-semibold">Intervenant:</span>
                <span class="text-gray-400">{{ webinar.instructor?.name || 'Non spécifié' }}</span>
            </div>
            <div>
                <span class="font-semibold">Durée:</span>
                <span class="text-gray-400">{{ formatDuration }}</span>
            </div>
            <div v-if="webinar.registrationsCount">
                <span class="font-semibold">Participants:</span>
                <span class="text-gray-400">{{ webinar.registrationsCount }}</span>
            </div>
        </div>

        <button
            v-if="webinar.meeting_link"
            @click="copyLink"
            class="bg-primary text-sm text-white px-4 py-2 rounded-lg hover:bg-secondary transition-all duration-150"
        >
            Voir le replay
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
    webinar: {
        type: Object,
        required: true
    },
})

const toast = useToast()

const formatDate = computed(() => {
    if (!props.webinar.start_date) return ''
    return new Date(props.webinar.start_date).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
})

const formatDuration = computed(() => {
    const d = props.webinar.duration
    if (!d) return '-'
    const h = Math.floor(d / 60)
    const m = d % 60
    if (h === 0) return `${m} min`
    if (m === 0) return `${h}h`
    return `${h}h${m}`
})

const copyLink = () => {
    if (props.webinar.meeting_link) {
        navigator.clipboard.writeText(props.webinar.meeting_link)
        toast.add({ severity: 'success', detail: 'Lien copié !', life: 2000 })
    }
}
</script>