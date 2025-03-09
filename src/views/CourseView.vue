<template>
    <div class="px-8 xl:px-28 py-8 md:py-14">
        <div class="w-full">
            <h1 class="text-2xl md:text-4xl font-bold">Mes cours</h1>
            <div class="pt-4 gap-2 flex justify-center md:justify-start flex-wrap w-full transition-transform duration-200 ease-in-out mb-10">
                <template v-if="!loading">
                  <CourseSaved 
                    v-for="(course, index) in allCourses" 
                    :key="index"
                    :course="course"
                    v-show="index < visibleCount"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :enter="{ opacity: 1, y: 0 }"
                  />
                </template>

                <template v-else>
                  <CourseEnrolledLoader 
                    v-for="n in 5" 
                    :key="n"
                  />
                </template>
            </div>
            <button v-show="allCourses.length > visibleCount" v-if="!isShowingAll" @click="loadMore" class="text-white bg-primary w-max text-sm md:text-[15px] py-1 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150">Afficher la suite </button>
            <button v-show="allCourses.length >= visibleCount" v-else @click="loadLess" class="text-white bg-primary w-max text-sm md:text-[15px] py-1 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150">Afficher moins </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faList, faTag, faGlobe } from "@fortawesome/free-solid-svg-icons"
import CourseSaved from '@/components/CourseSaved.vue'
import { ref, computed, onMounted } from 'vue';
import useAppStore from './../stores/app';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import { CourseAPI } from "@/services/api/Course";
import CourseEnrolledLoader from "@/components/loader/CourseEnrolledLoader.vue";


const appStore = useAppStore();
const userStore = useUserStore();
const token = userStore.getToken();
const loading = ref(false);

const coursesPerPage = 5;
const visibleCount = ref(coursesPerPage);
const allCourses = ref<Array<Record<string, any>>>([]);


const isShowingAll = computed(() => visibleCount.value >= allCourses.value.length)

const loadMore = () => {
  visibleCount.value = Math.min(
    visibleCount.value + coursesPerPage,
    allCourses.value.length
  )
}

const loadLess = () => {
  visibleCount.value = 5
}

onMounted(async () => {
  loading.value = true;

  try {
    const res = await CourseAPI.getAllCoursesEnrolled(token!);

    console.log(res?.data.coursesEnrolled);

    allCourses.value = res.data.coursesEnrolled;

    console.log(allCourses.value);

  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
})
</script>

<style>

</style>