<template>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0.5}"
        :enter="{ opacity: 1, scale: 1}" 
        class="bg-white xs:rounded-lg w-full xs:max-w-lg h-full mx-0 xs:mx-4 xs:h-auto"
      >
        <div class="border-b p-4 flex justify-between items-center">
          <h2 class="text-xl font-bold">Créer un nouveau sujet</h2>
          <button @click="$emit('closeModal')" class="font-bold text-2xl hover:text-gray-700">
            <FontAwesomeIcon :icon="faCircleXmark"/>
          </button>
        </div>
  
        <form class="p-6">
          <div class="mb-6">
            <label class="block mb-2 font-medium">Titre</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full p-2 border rounded-md outline-primary"
              placeholder="Titre de votre sujet"
            />
            <!-- :class="{ 'border-red-500': errors.title }" -->
            <!-- <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</span> -->
          </div>
  
          <div class="mb-6">
            <label class="block mb-2 font-medium">Message</label>
            <textarea
              v-model="form.content"
              rows="6"
              class="w-full p-2 border rounded-md outline-primary"
              placeholder="Décrivez votre sujet en détail..."
            ></textarea>
            <!-- :class="{ 'border-red-500': errors.content }" -->
            <!-- <span v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</span> -->
          </div>
  
          <!-- Tags
          <div class="mb-6">
            <label class="block mb-2 font-medium">Tags (séparés par des virgules)</label>
            <input
              v-model="form.tags"
              type="text"
              class="w-full p-2 border rounded-md"
              placeholder="javascript, débutant, aide"
            />
          </div> -->
  
          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="$emit('closeModal')"
              class="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary disabled:opacity-50"
            >
              <span v-if="isSubmitting">Publication...</span>
              <span v-else>Publier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, reactive } from 'vue'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps({
    showModal: {
        type: Boolean,
        required: true
    }
})


const isSubmitting = ref(false)

const form = reactive({
    category: '',
    title: '',
    content: '',
    tags: ''
})
  
//   const errors = reactive({
//     category: '',
//     title: '',
//     content: ''
//   })
  
  
//   const validateForm = () => {
//     let isValid = true
//     errors.category = ''
//     errors.title = ''
//     errors.content = ''
  
//     if (!form.category) {
//       errors.category = 'La catégorie est requise'
//       isValid = false
//     }
//     if (!form.title || form.title.length < 5) {
//       errors.title = 'Le titre doit contenir au moins 5 caractères'
//       isValid = false
//     }
//     if (!form.content || form.content.length < 20) {
//       errors.content = 'Le message doit contenir au moins 20 caractères'
//       isValid = false
//     }
  
//     return isValid
//   }
  
//   const handleSubmit = async () => {
//     if (!validateForm()) return
  
//     isSubmitting.value = true
//     try {
//       // Simule un appel API
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // Reset form
//       form.category = ''
//       form.title = ''
//       form.content = ''
//       form.tags = ''
      
//       showModal.value = false
//     } catch (error) {
//       console.error('Erreur lors de la publication:', error)
//     } finally {
//       isSubmitting.value = false
//     }
//   }
  
  </script>