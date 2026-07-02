<template>
    <div v-if="showModal" class="fixed z-10 inset-0 !mt-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div 
            v-motion
            :initial="{ opacity: 0, scale: 0.5}"
            :enter="{ opacity: 1, scale: 1}"     
            class="bg-white xs:rounded-lg w-full xs:max-w-lg mx-0 xs:mx-4 h-full xs:h-auto "
        >
            <div class="border-b p-4 flex justify-between items-center">
                <h2 class="text-xl font-bold">Inscription au webinaire</h2>
                <button @click="$emit('closeModal')" class="font-bold text-2xl hover:text-gray-700">
                    <FontAwesomeIcon :icon="faCircleXmark"/>
                </button>
            </div>
    
            <div class="p-6 border-b">
                <h3 class="text-lg font-bold mb-2">{{ webinar.title }}</h3>
                <div class="flex gap-4 text-gray-600">
                    <span class="flex items-center gap-1">
                        <FontAwesomeIcon :icon="faCalendar"/>
                        {{ webinar.date }}
                    </span>
                    <span class="flex items-center gap-1">
                        <FontAwesomeIcon :icon="faClock"/>
                        {{ webinar.time }}
                    </span>
                </div>
            </div>
    
            <form class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block mb-1 font-medium">Nom</label>
                        <input
                            v-model="form.name"
                            type="text"
                            class="w-full p-2 border rounded-md outline-primary"
                            placeholder="John Doe"
                            
                        />
                    <!-- :class="{ 'border-red-500': errors.name }"
                    <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span> -->
                    </div>
        
                    <div>
                        <label class="block mb-1 font-medium">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            class="w-full p-2 border rounded-md outline-primary"
                            placeholder="joe@example.com"
                            
                        />
                    <!-- :class="{ 'border-red-500': errors.email }"
                    <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span> -->
                    </div>
        
                    <div>
                        <label class="block mb-1 font-medium">Questions</label>
                        <textarea
                            v-model="form.questions"
                            rows="3"
                            class="w-full p-2 border rounded-md outline-primary"
                            placeholder="Avez-vous des questions ?"
                        ></textarea>
                    </div>
        
                    <div class="flex items-start gap-2">
                        <input
                            v-model="form.reminder"
                            type="checkbox"
                            class="mt-1"
                        />
                        <label>Recevoir un rappel 24h avant</label>
                    </div>
                </div>
        
                <!-- <div v-if="success" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                    Inscription confirmée ! Vous recevrez un email avec les détails.
                </div> -->
        
                <div class="mt-6 flex justify-end gap-4">
                    <button
                        @click="$emit('closeModal')"
                        type="button"
                        class="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary disabled:opacity-50"
                    >
                        {{ isSubmitting ? 'Inscription...' : 'Confirmer' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { faCircleXmark, faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps({
    webinar: {
        type: Object,
        required: true
    },
    showModal: {
        type: Boolean,
        required: true
    }
})

const isSubmitting = ref(false)
const success = ref(false)


const form = reactive({
name: '',
email: '',
level: '',
questions: '',
reminder: true
})
  
//   const errors = reactive({
//     name: '',
//     email: '',
//     level: ''
//   })
  
//   const validateForm = () => {
//     let isValid = true
//     errors.name = ''
//     errors.email = ''
//     errors.level = ''
  
//     if (!form.name) {
//       errors.name = 'Le nom est requis'
//       isValid = false
//     }
//     if (!form.email) {
//       errors.email = "L'email est requis"
//       isValid = false
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       errors.email = "L'email n'est pas valide"
//       isValid = false
//     }
//     if (!form.level) {
//       errors.level = 'Le niveau est requis'
//       isValid = false
//     }
  
//     return isValid
//   }
  
//   const handleSubmit = async () => {
//     if (!validateForm()) return
  
//     isSubmitting.value = true
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000))
//       success.value = true
//       setTimeout(() => closeModal(), 2000)
//     } catch (error) {
//       console.error('Erreur:', error)
//     } finally {
//       isSubmitting.value = false
//     }
//   }

  </script>