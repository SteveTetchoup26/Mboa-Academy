<template>
  <div class="w-full pl-4 md:pl-24 flex flex-col py-10">
        <div class="w-full flex justify-between pr-4">
            <h3 class="font-semibold text-2xl">Cours {{ section }}</h3>
            <p v-if="courses.length > 4" @click="navigationWithCategory(section)" class="text-primary hover:text-secondary underline cursor-pointer">Voir plus</p>
        </div>
        <div class="w-full flex flex-col items-center gap-y-8">
            <div class="gap-2 flex w-full transition-transform duration-200 ease-in-out overflow-x-scroll pt-4"
                ref="courseContainer"
            >
                <template v-if="loading">
                    <CourseLoader
                        v-for="n in 10"
                        :key="n"
                    />
                </template>
                <template v-else>
                    <Course
                        v-for="course in courses"
                        :key="course.id"
                        :course="course"
                    />
                </template>
            </div>
            <div class="flex gap-4" v-if="courses.length != 0">
                <button @click="previousCourse" class="text-center bg-white rounded-md px-4 py-2 shadow-[0px_2px_3px_#9e9e9e]">
                    <FontAwesomeIcon :icon="faChevronLeft" />
                </button>
                <button @click="nextCourse" class="text-center text-white bg-primary rounded-md px-4 py-2 shadow-[0px_2px_3px_#9e9e9e]">
                    <FontAwesomeIcon :icon="faChevronRight" />
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
import { CourseAPI } from './../services/api/Course';
import CourseLoader from "./loader/CourseLoader.vue";

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
const loading = ref(false);

let courses = ref<Array<Record<string, any>>>([]);

const updateVisibleCourses = () => {
    if (courseContainer.value) {
        const containerWidth = (courseContainer.value as HTMLElement).offsetWidth;
        visibleCourses.value = Math.floor(containerWidth / courseWidth);
    }
};

const nextCourse = () => {
    if (currentCourse.value < totalCourses.value - visibleCourses.value) {
        currentCourse.value += 1;
        (courseContainer.value as HTMLElement).scrollTo({
            left: currentCourse.value * courseWidth,
            behavior: "smooth",
        });
    }
};

const previousCourse = () => {
    if (currentCourse.value > 0) {
        currentCourse.value -= 1;
        (courseContainer.value as HTMLElement).scrollTo({
            left: currentCourse.value * courseWidth,
            behavior: "smooth",
        });
    }
}

const navigationWithCategory = (section: string) => {
    router.push({ name: 'CategoryCourse', query: { category: section, page: 1}})
}

onMounted(async() => {
    loading.value = true;

    // await new Promise(resolve => setTimeout(resolve, 10000));
    try {
        const res = await CourseAPI.getAll();

        courses.value = res.data.courses;

    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
})

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
