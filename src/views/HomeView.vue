<template>
    <div v-if="!token" class="flex flex-col items-center gap-24">
        <div class="relative w-full min-h-[500px] xl:h-screen overflow-hidden">
            <div class="absolute inset-0 flex"
                :class="{ 'duration-1000': isTransitioning }"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
                <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselOne" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class='text-xl md:text-2xl font-bold text-gray-400'>COMMENCEZ VERS LA RÉUSSITE</p>
                            <h1 class='text-5xl md:text-7xl font-extrabold text-white my-3'>Accédez à <span class="text-primary">5000+</span> cours <br />  dispensés par de nombreux formateurs africains et d'ailleurs</h1>
                            <p class='text-gray-400'>Développez des compétences pratiques, adaptées au marché africain, et donnez un nouvel élan à votre carrière grâce à nos formations interactives.</p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselTwo" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class='text-xl md:text-2xl font-bold text-gray-400'>MEILLEURES FORMATIONS EN LIGNE</p>
                            <h1 class='text-5xl md:text-7xl font-extrabold text-white my-3'>La meilleure plateforme <br /> d’apprentissage <span class="text-primary">en ligne</span></h1>
                            <p class='text-gray-400'>Apprenez à votre rythme grâce à des formations flexibles, pensées pour s’adapter à votre emploi du temps et aux réalités africaines.</p>
                        </div>
                    </div>
                </div>
             <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselOne" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class='text-xl md:text-2xl font-bold text-gray-400'>COMMENCEZ VERS LA RÉUSSITE</p>
                            <h1 class='text-5xl md:text-7xl font-extrabold text-white my-3'>Accédez à <span class="text-primary">5000+</span> cours <br />  dispensés par de nombreux formateurs africains et d'ailleurs</h1>
                            <p class='text-gray-400'>Développez des compétences pratiques, adaptées au marché africain, et donnez un nouvel élan à votre carrière grâce à nos formations interactives.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-11/12 xl:w-3/4 flex flex-wrap md:flex-nowrap gap-6 lg:gap-12">
            <div class="w-full md:w-1/2">
                <img :src="about" class="w-full h-full object-cover" alt="about">
            </div>
            <div class="w-full md:w-1/2 flex flex-col gap-6">
                <h3 class="text-primary font-semibold">À PROPOS DE NOUS</h3>
                <h1 class="text-3xl md:text-5xl font-bold">Bienvenue sur Mboa Academy</h1>
                <p class="text-gray-400">
                    Nous sommes une plateforme de formation en ligne dédiée à rendre l'apprentissage accessible et stimulant pour tous.
                    Avec un catalogue riche de cours dans des domaines variés et des formateurs expérimentés, nous aidons nos apprenants
                    à atteindre leurs objectifs.
                </p>
                <p class="text-gray-400">
                    Que vous soyez débutant ou expert, notre plateforme vous accompagne à chaque étape de votre parcours.
                </p>
                <RouterLink to="/about-us" class="text-white bg-primary w-max py-3 px-8 hover:bg-secondary transition-all duration-150">Lire Plus</RouterLink>
            </div>
        </div>

        <CatalogCourse />

        <div class="w-full px-4 flex flex-col items-center gap-10">
            <h3 class="text-primary font-semibold">LES CATEGORIES LES PLUS POPULAIRES</h3>
            <div class="grid grid-cols-3 lg:grid-cols-4 gap-4 w-full md:w-4/5">
                <CourseCategory
                    v-for="(category, index) in categories"
                    :key="index"
                    :category="category.title"
                    @click="navigationWithCategory(category.title)"
                />
            </div>
        </div>
        <div class="w-full bg-green-50 flex justify-center px-3 py-10 flex-wrap md:flex-nowrap gap-6 lg:gap-12">
            <div class="">
                <h1 class="text-4xl mb-3">Devenir un membre</h1>
                <p>créez un compte pour accéder à des milliers de cours en direct et à la demande</p>
            </div>
            <div class="bg-white rounded-md w-[400px]  flex flex-col items-center gap-y-6 p-4">
                <p class="">Pour</p>
                <p class="text-4xl font-bold">0 FCFA</p>
                <div class="flex flex-col gap-y-3">
                    <p class="text-gray-400 flex items-center gap-3">
                        <FontAwesomeIcon :icon="faCheck" class="text-primary"/>
                        Découvrez des centaines de formation adaptées à vos besoins
                    </p>
                    <p class="text-gray-400 flex items-center gap-3">
                        <FontAwesomeIcon :icon="faCheck" class="text-primary"/>
                        Rejoignez une communauté d'apprenants passionnés
                    </p>
                    <p class="text-gray-400 flex items-center gap-3">
                        <FontAwesomeIcon :icon="faCheck" class="text-primary"/>
                        Développez vos compétences et boostez votre carrière sans attendre
                    </p>
                </div>
                <RouterLink to="/inscription" class="text-white bg-primary w-max py-3 px-8 hover:bg-secondary transition-all duration-150">Inscris-toi gratuitement</RouterLink>
            </div>
        </div>

        <!-- Section Créer une institution -->
        <div class="w-full bg-white flex justify-center px-3 py-16">
            <div class="w-full md:w-4/5 flex flex-col items-center text-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <h1 class="text-3xl md:text-5xl font-bold text-gray-900">Vous représentez une <span class="text-primary">institution</span> ?</h1>
                    <p class="text-gray-500 max-w-2xl">Créez votre espace dédié et proposez vos formations à des milliers d'apprenants à travers l'Afrique</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <div class="flex flex-col items-center gap-3 p-6 rounded-xl bg-green-50">
                        <div class="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <FontAwesomeIcon :icon="faGraduationCap" class="text-white text-xl" />
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Publiez vos cours</h3>
                        <p class="text-sm text-gray-500">Créez et gérez vos formations avec nos outils pédagogiques complets</p>
                    </div>
                    <div class="flex flex-col items-center gap-3 p-6 rounded-xl bg-green-50">
                        <div class="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <FontAwesomeIcon :icon="faUsers" class="text-white text-xl" />
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Développez votre communauté</h3>
                        <p class="text-sm text-gray-500">Attirez des apprenants et construisez une communauté autour de vos formations</p>
                    </div>
                    <div class="flex flex-col items-center gap-3 p-6 rounded-xl bg-green-50">
                        <div class="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <FontAwesomeIcon :icon="faChartLine" class="text-white text-xl" />
                        </div>
                        <h3 class="text-lg font-bold text-gray-900">Suivez vos performances</h3>
                        <p class="text-sm text-gray-500">Accédez à des statistiques détaillées sur vos cours et vos apprenants</p>
                    </div>
                </div>
                <RouterLink
                    to="/institutions/create"
                    class="inline-flex items-center gap-2 text-white bg-primary px-8 py-3 rounded-lg hover:bg-secondary transition-all duration-150 font-semibold"
                >
                    <FontAwesomeIcon :icon="faPlus" />
                    <span>Créer mon institution</span>
                </RouterLink>
            </div>
        </div>
    </div>
    <div v-else class="min-h-screen flex flex-col">
        <Filterbar />
        <CatalogCourse v-for="(item, index) in catalogSections" :key="index"  :section="item"/>
    </div>
</template>

<script setup lang="ts">
import Filterbar from '@/components/Filterbar.vue'
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronLeft, faChevronRight, faCheck, faGraduationCap, faUsers, faChartLine, faPlus } from '@fortawesome/free-solid-svg-icons';
import carouselOne from './../assets/images/carousel-1.jpg';
import carouselTwo from './../assets/images/carousel-2.jpg';
import about from './../assets/images/about.jpg'
import Course from "@/components/Course.vue";
import CourseCategory from "@/components/CourseCategory.vue";
import CatalogCourse from "@/components/CatalogCourse.vue";
import { useUserStore } from "./../stores/user";
import { CourseAPI } from '@/services/api/Course';
import useAppStore from '@/stores/app';



const userStore = useUserStore();
const appStore = useAppStore();
const token = userStore.getToken();
const currentIndex = ref(0);
const isTransitioning = ref(true);
const slides = [carouselOne, carouselTwo, carouselOne]
const router = useRouter()

const categories = ref<Array<Record<string, any>>>([]);

const catalogSections = ['à la une', 'récemment regardés', 'populaires']

const nextSlide = () => {
    isTransitioning.value = true;
    if(currentIndex.value === slides.length - 1){
        setTimeout(() => {
            isTransitioning.value = false;
            currentIndex.value = 0;
        }, 2000)
    } else {
        currentIndex.value++;
    }
}

const startCarousel = () => {
    setInterval(() => {
        nextSlide();
    }, 4000)
}

const navigationWithCategory = (category: string) => {
    router.push({ name: 'CategoryCourse', query: { category: category, page: 1}})
}
onMounted(() => {
    startCarousel();
});

onMounted(async () => {
    try {
        const res = await CourseAPI.getAllCategories();
        categories.value = res.data.categories;
    } catch(e) {
        console.error(e);
    } finally {
        appStore.loading = false;
    }
});
</script>

<style>

</style>
