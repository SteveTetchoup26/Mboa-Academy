<template>
  <div class="w-full pl-4 md:pl-24 flex flex-col py-10">
        <div class="w-full flex justify-between pr-4">
            <h3 class="font-semibold text-2xl">Cours {{ section }}</h3>
            <p @click="navigationWithCategory(section)" class="text-primary hover:text-secondary underline cursor-pointer">Voir plus</p>
        </div>
        <div class="w-full flex flex-col items-center gap-y-8">
            <div class="gap-2 flex w-full transition-transform duration-200 ease-in-out overflow-x-scroll pt-4"
                ref="courseContainer"
            >
                <Course
                    v-for="course in courses"
                    :key="course.id"
                    :course="course"
                /> 
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
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronLeft, faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { RouterLink, useRouter } from "vue-router";
import Course from "@/components/Course.vue";
import picture from './../assets/images/course-2.jpg'

defineProps({
    section: {
        type: String,
        required: true,
    }
})

const router = useRouter()
const currentCourse = ref(0); 
const courseWidth = 250;
const courseContainer = useTemplateRef("courseContainer");
const visibleCourses = ref(1); 
const totalCourses = ref(10);


const courses = [
  {
    id: 1,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 2,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 3,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 4,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 5,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 6,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 7,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 8,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 9,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  },
  {
    id: 10,
    title: "Maîtrisez le Développement Web Moderne avec Vue.js",
    category: "Développement Web",
    description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
    image: picture,
    rating: 4.8,
    reviewsCount: 2547,
    enrolledStudents: "12,354",
    duration: "21 heures",
    lastUpdate: "Novembre 2024",
    price: 4500,
    originalPrice: 8300,
    discountPercentage: 75,
    offerEndsIn: "2 jours",
    instructor: {
      name: "Marie Dupont",
      title: "Senior Frontend Developer & Tech Lead",
      avatar: ""
    }
  }
]

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
}

const navigationWithCategory = (section: string) => {
    router.push({ name: 'CategoryCourse', query: { category: section, page: 1}})
}

onMounted(() => {
    updateVisibleCourses();
    window.addEventListener("resize", updateVisibleCourses);
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateVisibleCourses);
});
</script>

<style scoped>
*::-webkit-scrollbar {
    display: none;
}
</style>