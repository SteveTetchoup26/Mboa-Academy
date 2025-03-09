<template>
    <div v-if="showModal" class="fixed inset-0 z-40 overflow-y-auto">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('closeModal')"></div>

        <div class="flex h-screen xs:min-h-screen items-center justify-center p-0 xs:p-4">
                <div 
                    v-motion
                    :initial="{ opacity: 0, scale: 0.5}"
                    :enter="{ opacity: 1, scale: 1}"  
                    class="relative bg-white xs:rounded-lg w-full xs:max-w-lg mx-0 xs:mx-4 h-full xs:h-auto "
                >
                    
                    <div class="flex items-center justify-between p-4 border-b">
                        <h2 class="text-2xl font-bold text-gray-900">Devenir formateur</h2>
                        <button @click="$emit('closeModal')" class="font-bold text-2xl hover:text-gray-700">
                            <FontAwesomeIcon :icon="faCircleXmark"/>
                        </button>
                    </div>
                    
                    <form @submit.prevent="handleSubmit" class="space-y-6 p-6">
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                            <div>
                                <label class="block mb-1 font-medium">Nom</label>
                                <input 
                                    v-model="fields.name"
                                    type="text"
                                    class="w-full p-2 border rounded-md outline-primary"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label class="block mb-1 font-medium">Email</label>
                                <input 
                                    v-model="fields.email"
                                    type="email"
                                    class="w-full p-2 border rounded-md outline-primary"
                                    placeholder="johndoe@exemple.com"
                                />
                            </div>
            
                            <div>
                                <label class="block mb-1 font-medium">Téléphone</label>
                                <input 
                                    v-model="fields.phone_number"
                                    type="tel"
                                    class="w-full p-2 border rounded-md outline-primary"
                                    placeholder="698556677"
                                />
                            </div>
                        </div>
            
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900">Votre expertise</h3>
                            <div>
                                <label class="block mb-1 font-medium">Domaine</label>
                                <select 
                                    v-model="fields.domain"
                                    class="w-full outline-primary p-2 border rounded-md"
                                >
                                    <option value="">Sélectionnez un domaine</option>
                                    <option v-for="domain in domains" :key="domain" :value="domain">
                                        {{ domain }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block mb-1 font-medium">Intitulé de poste</label>
                                <input 
                                    v-model="fields.job_title"
                                    type="text"
                                    class="w-full outline-primary p-2 border rounded-md"
                                    placeholder="Developpeur frontend"
                                />
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
                                @click.prevent="handleSubmit"
                                type="submit"
                                class="text-white bg-primary w-max text-sm md:text-[15px] rounded-md py-2 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150"
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
  </template>
  
<script setup>
import { ref, defineProps, reactive } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'vue-router';
import { AuthAPI } from '@/services/api/Auth';
import { useUserStore } from "./../../stores/user";
import  useAppStore from './../../stores/app';

defineProps({
    showModal: {
        type: Boolean,
        required: true
    }
});
  

const router = useRouter();
// const isSubmitting = ref(false);
const userStore = useUserStore();
const appStore = useAppStore();
  
  const domains = [
    'Développement web',
    'Design',
    'Marketing digital',
    'Business & Entrepreneuriat',
    'Data Science',
    'Langues',
    'Soft Skills',
    'Autre'
  ];
  
  const fields = reactive({
    name: '',
    email: '',
    phone_number: '',
    domain: '',
    job_title: ''
  });

  const token = userStore.getToken();

  const handleSubmit = async () => {
    // isSubmitting.value = true;
    appStore.loading = true;
    try {
        const { data } = await AuthAPI.becomeInstructor({ ...fields }, token);

        fields.name = "";
        fields.email = "";
        fields.phone_number = "";
        fields.domain = "";
        fields.job_title = "";
        
        userStore.setUser(data.updatedUser);
        router.push('/instructor/dashboard'); 
    } catch (error) {
        console.error(error)
    } finally {
        // isSubmitting.value = false;
        appStore.loading = false;
    }
  };
</script>
  
<style scoped>


</style>