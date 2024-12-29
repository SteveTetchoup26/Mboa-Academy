<template>
  <div class="w-full pl-4 md:pl-24 flex flex-col py-10">
            <h3 class="font-semibold text-2xl">Cours à la une</h3>
            <div class="w-full flex flex-col items-center gap-y-8">
                <div class="gap-2 flex w-full transition-transform duration-200 ease-in-out overflow-x-scroll pt-4"
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
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronLeft, faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import Course from "@/components/Course.vue";

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