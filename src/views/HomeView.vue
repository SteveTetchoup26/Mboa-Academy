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
                            <p class='text-xl md:text-2xl font-bold text-gray-400'>START TO SUCCESS</p>
                            <h1 class='text-5xl md:text-7xl font-extrabold text-white my-3'>Access To <span class="text-primary">5000+</span> courses <br />  from many Instructors</h1>
                            <p class='text-gray-400'>Develop new skills and boost your career with our interactive training programs.</p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselTwo" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class='text-xl md:text-2xl font-bold text-gray-400'>BEST ONLINE COURSES</p>
                            <h1 class='text-5xl md:text-7xl font-extrabold text-white my-3'>The Best Online Learning <br /> Platform</h1>
                            <p class='text-gray-400'>Learn at your own pace with flexible training programs tailored to your schedule.</p>
                        </div>
                    </div>
                </div>
             <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselOne" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class=' text-xl md:text-2xl font-bold text-gray-400'>START TO SUCCESS</p>
                            <h1 class=' text-5xl md:text-7xl font-extrabold text-white my-3'>Access To <span class="text-primary">5000+</span> courses <br />  from many Instructors</h1>
                            <p class='text-gray-400'>Develop new skills and boost your career with our interactive training programs.</p>
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
                <p class="text-4xl font-bold">$0</p>
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
    </div>
    <div v-else>
        <Filterbar />
        <CatalogCourse v-for="(item, index) in catalogSections" :key="index"  :section="item"/>
    </div>
</template>

<script setup lang="ts">
import Filterbar from '@/components/Filterbar.vue'
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronLeft, faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
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
    appStore.loading = true;
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
