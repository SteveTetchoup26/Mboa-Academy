<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-4xl mx-auto text-center mb-6 md:mb-16">
        <h1 class="text-xl md:text-4xl font-bold text-gray-900 mb-6">
          {{ title }}
        </h1>
        <p class="text-sm md:text-xl text-gray-600">
          {{ subtitle }}
        </p>
      </div>
  

        <div class="max-w-5xl mx-auto mb-6 md:mb-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div 
                v-for="(avantage, index) in avantages" 
                :key="index"
                class="bg-white rounded-lg shadow p-6"
                >
                    <div class="text-center">
                        <div class="flex justify-center mb-4">
                            <FontAwesomeIcon :icon="avantage.icon" class="text-primary text-lg md:text-4xl"/>
                        </div>
                        <h3 class="text-sm md:text-xl font-semibold mb-3">
                            {{ avantage.titre }}
                        </h3>
                        <p class="text-xs md:text-[15px] text-gray-600">
                            {{ avantage.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-16">
        <h2 class="text-xl md:text-3xl font-bold mb-8 text-center">
          Comment devenir formateur ?
        </h2>
        <div class="space-y-6">
          <div 
            v-for="(etape, index) in etapes" 
            :key="index"
            class="flex items-center space-x-4"
          >
            <div class="text-xs text-[15px] flex-shrink-0 w-5 md:w-8 h-5 md:h-8 bg-primary text-white rounded-full flex items-center justify-center md:font-bold">
              {{ index + 1 }}
            </div>
            <p class="text-sm md:text-lg">{{ etape }}</p>
          </div>
        </div>
      </div>
  
      <div class="max-w-3xl mx-auto text-center">
        <button 
          @click="showModal=true"
          class="text-white bg-primary w-max text-sm md:text-[15px] rounded-md xs:rounded-none py-2 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150"
        >
          Devenir formateur
          <ChevronRight class="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>

    <BecomeInstructorModal :showModal="showModal"  @close-modal="showModal=false"/>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faUserGroup, faTrophy, faCoins } from '@fortawesome/free-solid-svg-icons';
import BecomeInstructorModal from '@/components/modals/BecomeInstructorModal.vue';
  

let showModal = ref(false)
const title = ref('Devenez formateur et partagez votre expertise');
const subtitle = ref('Rejoignez notre communauté de formateurs et transformez votre expertise en opportunité d\'enseignement');
  
  const avantages = ref([
    {
      icon: faUserGroup,
      titre: "Partagez votre expertise",
      description: "Transmettez vos connaissances à une communauté d'apprenants motivés et contribuez à leur réussite professionnelle."
    },
    {
      icon: faCoins,
      titre: "Générez des revenus",
      description: "Créez des cours de qualité et soyez rémunéré pour chaque inscription à vos formations."
    },
    {
      icon: faTrophy,
      titre: "Développez votre notoriété",
      description: "Construisez votre réputation en tant qu'expert et élargissez votre réseau professionnel."
    }
  ]);
  
  const etapes = ref([
    "Remplissez le formulaire en détaillant votre expertise",
    "Proposez une ébauche de votre premier cours",
    "Échangez avec notre équipe pédagogique",
    "Publiez votre premier cours et commencez à enseigner !"
  ]);
  
</script>
  
<style scoped>

</style>