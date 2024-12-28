<template>
    <div class="px-8 xl:px-28 py-8 md:py-14">
        <div class="w-full">
            <h1 class="text-2xl md:text-4xl font-bold">Mes cours</h1>
            <div class="pt-4 gap-2 flex justify-center md:justify-start flex-wrap w-full transition-transform duration-200 ease-in-out mb-10">
                <CourseSaved 
                    v-for="(course, index) in allCourses" 
                    :key="index"
                    v-show="index < visibleCount"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :enter="{ opacity: 1, y: 0 }"
                />
            </div>
            <button v-if="!isShowingAll" @click="loadMore" class="text-white bg-primary w-max text-sm md:text-[15px] py-1 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150">Afficher la suite </button>
            <button v-else @click="loadLess" class="text-white bg-primary w-max text-sm md:text-[15px] py-1 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150">Afficher moins </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faList, faTag, faGlobe } from "@fortawesome/free-solid-svg-icons"
import CourseSaved from '@/components/CourseSaved.vue'
import { ref, computed } from 'vue'

const coursesPerPage = 5
const visibleCount = ref(coursesPerPage)
const allCourses = Array(12)


const isShowingAll = computed(() => visibleCount.value >= allCourses.length)

const loadMore = () => {
  visibleCount.value = Math.min(
    visibleCount.value + coursesPerPage,
    allCourses.length
  )
}

const loadLess = () => {
  visibleCount.value = 5
}
</script>

<style>

</style>