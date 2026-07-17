<template>
    <div @click="viewCourse(course.id)" class="bg-white flex md:flex-col gap-2 rounded-lg p-3 w-full md:w-[220px] xl:w-[250px] group border border-1 border-gray-200 cursor-pointer hover:shadow-[1px_1px_5px_#9e9e9e]">
        <div class="w-full xs:w-1/4 md:w-full h-[100px] md:h-[150px]">
            <img :src="cover" class="w-full h-full object-cover rounded-lg" alt="">
        </div>
        <div>
            <p>{{ course.title }}</p>
            <p class="text-gray-400 text-sm md:text-[15px]">Par {{ course.instructor?.name || course.institution?.name || 'Instructeur' }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import cover from './../assets/images/course-2.jpg'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const props = defineProps({
    course: {
        type: Object,
        required: true
    }
})


const router = useRouter()

const viewCourse = (courseSavedId: number) => {
    router.push(`/my-courses/${courseSavedId}?name=${props.course.title}`);
}
</script>

<style>

</style>