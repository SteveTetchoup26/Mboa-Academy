<template>
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('closeModal')"></div>

        <div class="flex h-screen xs:min-h-screen items-center justify-center p-0 xs:p-4">   
            <div v-motion
                :initial="{ opacity: 0, scale: 0.5}"
                :enter="{ opacity: 1, scale: 1}"  
                class="relative bg-white xs:rounded-lg w-full xs:max-w-lg mx-0 xs:mx-4 h-full xs:h-auto "
            >
                <div class="flex items-center justify-between p-4 border-b">
                    <h2 class="text-2xl font-bold text-gray-900">Nouveau webinaire</h2>
                    <button @click="$emit('closeModal')" class="font-bold text-2xl hover:text-gray-700">
                        <FontAwesomeIcon :icon="faCircleXmark"/>
                    </button>
                </div>

                <form class="space-y-4 p-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block mb-1 font-medium">Titre</label>
                            <input 
                                type="text"
                                class="w-full p-2 border rounded-md outline-primary"
                                placeholder="Introduction au JavaScript..."
                            />
                        </div>
                        <div>
                            <label class="block mb-1 font-medium">Date</label>
                            <input 
                                type="date"
                                class="w-full p-2 border rounded-md outline-primary"
                            />
                        </div>
                        <div>
                            <label class="block mb-1 font-medium">Heure de début</label>
                            <input 
                                type="time"
                                class="w-full p-2 border rounded-md outline-primary"
                            />
                        </div>
                        <div>
                            <label class="block mb-1 font-medium">Heure de fin</label>
                            <input 
                                type="time"
                                class="w-full p-2 border rounded-md outline-primary"
                            />
                        </div>
                        <div>
                            <label class="block mb-1 font-medium">Description</label>
                            <textarea
                                class="w-full p-2 border rounded-md outline-primary"
                                placeholder="Une description de votre webinaire..."
                                rows="4"
                                name="description" 
                            ></textarea>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 pt-4">
                        <button
                            type="reset"
                                @click="$emit('closeModal')"
                            class=" hover:bg-gray-50 border w-max text-sm md:text-[15px] rounded-md py-2 px-2 md:py-3 md:px-8 "
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            class="text-white bg-primary w-max text-sm md:text-[15px] rounded-md py-2 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150"
                            :disabled="isSubmitting"
                        >
                            {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import WebinarAdditionaModal from '@/components/modals/WebinarAdditionModal.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'vue-router';

defineProps({
    showModal: {
        type: Boolean,
        required: true
    }
})
  

const router = useRouter();
const isSubmitting = ref(false);
const newWebinar = ref({
  title: '',
  date: '',
  duration: 60,
  description: ''
}); 
 
</script>
  
<style scoped>


</style>