<template>
    <div class="w-full flex justify-end items-center gap-4 py-2 md:py-4 px-2 md:pr-24 mt-1 text-sm md:text-md bg-primary text-white">
        <div data-dropdown class="relative border border-1 border-white rounded-md p-1 cursor-pointer" @click="toggleCategories()">
          <FontAwesomeIcon :icon="faList" class="mr-1"/>
          <span>Categories</span>
          <FontAwesomeIcon :icon="faChevronDown" class="ml-1"/>
          <div
              v-if="dropdown.openMenu === 'categories'"
              class="bg-green-100 absolute -left-12 md:-left-20 mt-2 w-56 h-80 overflow-y-scroll rounded-md shadow-lg py-4 z-10 border border-gray-200"

          >
            <p
              class="py-2 px-4 text-sm text-gray-700 hover:bg-green-200"
              v-for="category in categories" :key="category.id"
              >{{ category.title }}</p>
          </div>
        </div>
        <div data-dropdown class="relative border border-1 border-white rounded-md p-1 cursor-pointer" @click="togglePrices()">
            <FontAwesomeIcon :icon="faTag" class="mr-1"/>
            <span>Prix</span>
            <FontAwesomeIcon :icon="faChevronDown" class="ml-1"/>
            <div
                v-if="dropdown.openMenu === 'prices'"
                class="bg-green-100 absolute -left-20 mt-2 w-56 h-80 overflow-y-scroll rounded-md shadow-lg py-1 z-10 border border-gray-200"

            >
              <p class="py-2 px-4 text-sm text-gray-700 hover:bg-green-200" v-for="(price, index) in prices" :key="index">{{ price }}</p>
            </div>
        </div>
        <div data-dropdown class="relative border border-1 border-white rounded-md p-1 cursor-pointer" @click="toggleLanguages()">
            <FontAwesomeIcon :icon="faGlobe" class="mr-1"/>
            <span>Langues</span>
            <FontAwesomeIcon :icon="faChevronDown" class="ml-1"/>
            <div
                v-if="dropdown.openMenu === 'languages'"
                class="bg-green-100 absolute -left-32 md:-left-20 mt-2 w-56 h-80 overflow-y-scroll rounded-md shadow-lg py-1 z-10 border border-gray-200"

            >
              <p class="py-2 px-4 text-sm text-gray-700 hover:bg-green-200" v-for="(language, index) in languages" :key="index">{{ language }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { onMounted, ref } from "vue";
import { CourseAPI } from '@/services/api/Course';
import { faList, faTag, faGlobe, faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import useDropdownStore from "@/stores/dropdown";


// const categories = ref<Array<Record<string, any>>>([]);
const categories = ref<Array<Record<string, any>>>([
  {
    id: 1,
    title: 'Développement Web',
    description: 'Apprenez à créer des sites et applications modernes avec HTML, CSS, JavaScript et frameworks populaires.',
  },
  {
    id: 2,
    title: 'Développement Mobile',
    description: 'Créez des applications Android et iOS performantes adaptées aux besoins du marché africain.',
  },
  {
    id: 3,
    title: 'Design & UX/UI',
    description: 'Maîtrisez le design graphique, le prototypage et l’expérience utilisateur.',
  },
  {
    id: 4,
    title: 'Data & Intelligence Artificielle',
    description: 'Analyse de données, machine learning et intelligence artificielle appliquée.',
  },
  {
    id: 5,
    title: 'Réseaux & Cybersécurité',
    description: 'Sécurisez les systèmes et réseaux informatiques contre les menaces numériques.',
  },
  {
    id: 6,
    title: 'Bureautique & Outils Numériques',
    description: 'Maîtrisez Word, Excel, PowerPoint et les outils collaboratifs modernes.',
  },
  {
    id: 7,
    title: 'Entrepreneuriat & Business',
    description: 'Lancez et développez votre entreprise avec des stratégies adaptées au contexte africain.',
  },
  {
    id: 8,
    title: 'Marketing Digital',
    description: 'Apprenez le marketing sur les réseaux sociaux, le SEO et la publicité en ligne.',
  },
  {
    id: 9,
    title: 'Marketing Digital',
    description: 'Apprenez le marketing sur les réseaux sociaux, le SEO et la publicité en ligne.',
  },
  {
    id: 10,
    title: 'Marketing Digital',
    description: 'Apprenez le marketing sur les réseaux sociaux, le SEO et la publicité en ligne.',
  },
  {
    id: 11,
    title: 'Marketing Digital',
    description: 'Apprenez le marketing sur les réseaux sociaux, le SEO et la publicité en ligne.',
  }
]);

const prices = ref<String[]>([
  'Gratuit',
  '< 2500 XAF',
  '2500 - 5000 XAF',
  '5000 - 20000 XAF',
  '20000 - 50000 XAF',
]);

const languages = ref<String[]>([
  'Français',
  'Anglais',
  'Lingala',
  'Bulu',
  'Ewondo',
  'Swahili',
]);

const dropdown = useDropdownStore();

const toggleCategories = () => {
  dropdown.toggleMenu('categories');
};

const togglePrices = () => {
    dropdown.toggleMenu('prices');
};

const toggleLanguages = () => {
  dropdown.toggleMenu('languages');
};



// onMounted(async () => {
//     try {
//         const res = await CourseAPI.getAllCategories();

//         categories.value = res.data.categories;
//     } catch(e) {
//         console.error(e);
//     }
// });

</script>

<style>

</style>
