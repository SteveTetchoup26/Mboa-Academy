<template>
    <div class="flex flex-col items-center gap-24">
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
                            <p class='text-gray-400'>Lorem Lorem lorem lorem lorem lorem lorem </p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselTwo" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class='text-xl md:text-2xl font-bold text-gray-400'>BEST ONLINE COURSES</p>
                            <h1 class='text-5xl md:text-7xl font-extrabold text-white my-3'>The Best Online Learning <br /> Platform</h1>
                            <p class='text-gray-400'>Lorem Lorem lorem lorem lorem lorem lorem </p>
                        </div>
                    </div>
                </div>
                <div class="w-full h-full relative flex-shrink-0">
                    <img :src="carouselOne" alt="" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex items-center pl-3 md:pl-32">
                        <div>
                            <p class=' text-xl md:text-2xl font-bold text-gray-400'>START TO SUCCESS</p>
                            <h1 class=' text-5xl md:text-7xl font-extrabold text-white my-3'>Access To <span class="text-primary">5000+</span> courses <br />  from many Instructors</h1>
                            <p class='text-gray-400'>Lorem Lorem lorem lorem lorem lorem lorem </p>
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
                <h1 class="text-3xl md:text-5xl font-bold">Bienvenue sur Lorem</h1>
                <p class="text-gray-400">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo harum, perspiciatis officiis repudiandae nulla autem 
                    sunt necessitatibus natus quis deserunt in recusandae molestiae dignissimos magni omnis minima totam. Corporis, 
                    assumenda!
                </p>
                <p class="text-gray-400">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo harum, perspiciatis officiis repudiandae nulla autem 
                    sunt necessitatibus natus quis deserunt in recusandae molestiae dignissimos magni omnis minima totam. Corporis, 
                    assumenda!
                </p>
                <RouterLink to="" class="text-white bg-primary w-max py-3 px-8 hover:opacity-80 transition-opacity duration-150">Lire Plus</RouterLink>
            </div>
        </div>
        <div class="w-full pl-4 md:pl-24 bg-green-50 flex flex-col items-center gap-10 py-10">
            <h3 class="text-primary font-semibold">LES COURS LES PLUS POPULAIRES</h3>
            <div class="w-full flex flex-col items-center gap-y-8">
                <div class=" gap-2 flex w-full transition-transform duration-200 ease-in-out overflow-x-scroll"
                    ref="courseContainer"
                >
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />  
                    <Course />  
                    <Course />  
                </div>
                <div class="flex gap-4">
                    <button @click="previousCourse" class="text-center bg-white rounded-md px-4 py-2 shadow-[0px_2px_3px_#9e9e9e]">
                        <FontAwesomeIcon :icon="faChevronLeft" />
                    </button>
                    <button @click="nextCourse" class="text-center text-white bg-primary rounded-md px-4 py-2 shadow-[0px_2px_3px_#9e9e9e]">
                        <FontAwesomeIcon :icon="faChevronRight"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full px-4 flex flex-col items-center gap-10">
            <h3 class="text-primary font-semibold">LES CATEGORIES LES PLUS POPULAIRES</h3>
            <div class="grid grid-cols-3 lg:grid-cols-4 gap-4 w-full md:w-4/5">
                <CourseCategory />
                <CourseCategory />
                <CourseCategory />
                <CourseCategory />
                <CourseCategory />
                <CourseCategory />
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
                <RouterLink to="" class="text-white bg-primary w-max py-3 px-8 hover:opacity-80 transition-opacity duration-150">Inscris-toi gratuitement</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronLeft, faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import carouselOne from './../assets/images/carousel-1.jpg';
import carouselTwo from './../assets/images/carousel-2.jpg';
import about from './../assets/images/about.jpg'
import Course from "@/components/Course.vue";
import CourseCategory from "@/components/CourseCategory.vue";



const currentIndex = ref(0);
const isTransitioning = ref(true);
const slides = [carouselOne, carouselTwo, carouselOne]

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


const currentCourse = ref(0); 
const courseWidth = 250;
const courseContainer = useTemplateRef("courseContainer");
const visibleCourses = ref(1); 
const totalCourses = ref(10);

const updateVisibleCourses = () => {
    if (courseContainer.value) {
        const containerWidth = courseContainer.value.offsetWidth; 
        visibleCourses.value = Math.floor(containerWidth / courseWidth);
    }
};

const nextCourse = () => {
    if (currentCourse.value < totalCourses.value - visibleCourses.value) {
        currentCourse.value += 1;
        courseContainer.value!.scrollTo({
            left: currentCourse.value * courseWidth,
            behavior: "smooth",
        });
    }
};

const previousCourse = () => {
    if (currentCourse.value > 0) {
        currentCourse.value -= 1;
        courseContainer.value!.scrollTo({
            left: currentCourse.value * courseWidth,
            behavior: "smooth",
        });
    }
};

onMounted(() => {
    startCarousel();
    updateVisibleCourses();
    window.addEventListener("resize", updateVisibleCourses);
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateVisibleCourses);
});
</script>

<style>

</style>