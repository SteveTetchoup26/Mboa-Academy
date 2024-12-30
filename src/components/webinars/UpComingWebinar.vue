<template>
    <div
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
        <button @click="showModal=true" class="bg-primary text-sm md:text-[15px] text-white px-2 py-1 md:px-4 md:py-2 hover:bg-secondary transition-all duration-150">
            S'inscrire
        </button>
    </div>

    <WebinarRegistrationModal :showModal="showModal" :webinar="webinar" @close-modal="showModal = false" />
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import WebinarRegistrationModal from '@/components/modals/WebinarRegistrationModal.vue'

let showModal = ref(false)

defineProps({
    webinar: {
        type: Object,
        required: true
    },
})
</script>

<style>

</style>