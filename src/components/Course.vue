<template>
    <div
        v-if="!isInstructor"
        @click="viewDetails(course.id)"
        :class="['bg-white gap-2 rounded-lg p-3 shrink-0  group border border-1 border-gray-200 cursor-pointer hover:shadow-[1px_1px_5px_#9e9e9e] hover:-translate-y-2 transition-transform duration-200 ease-in-out',
            isDisplayCategory ? 'flex flex-row md:flex-col w-full md:!w-[250px] hover:-translate-y-0 md:hover:-translate-y-2' : 'flex flex-col !w-[250px]'
        ]"
    >
        <div :class="[
                'relative ',
                isDisplayCategory ? 'w-28 h-28 md:w-full md:h-[150px]' : 'w-full h-[150px]'
            ]"
        >
            <!-- <span class="absolute left-1 top-1 px-2 py-1 rounded-md backdrop-blur-sm bg-[rgba(255,255,255,0.4)]">HTML</span> -->
            <img :src="course.cover_courses?.[0] ? getFileUrl(course.cover_courses[0].file_name) : picture" class="w-full h-full object-cover rounded-lg" alt="" crossorigin="anonymous">
        </div>
        <div class="w-full flex flex-col gap-1 md:gap-2">
            <p class="font-semibold">{{ course.title ?? 'Apprendre JavaScript pour débutants' }}</p>
            <div v-if="course.rating" class="flex items-center gap-2">
                <div class="flex gap-1">
                    <FontAwesomeIcon
                        v-for="i in 5"
                        :key="i"
                        :icon="faStar"
                        :class="i <= Math.round(course.rating) ? 'text-yellow-500' : 'text-gray-300'"
                        class="text-xs"
                    />
                </div>
                <span class="text-gray-400">({{ course.reviewsCount || 0 }})</span>
            </div>
            <p class="text-gray-400 text-sm md:text-[15px]" v-if="course.instructor">Par {{ course.instructor.name }}</p>
            <p class="text-gray-400 text-sm md:text-[15px]" v-if="course.institution">{{ course.institution.name }}</p>
            <p class="text-gray-400 text-sm md:text-[15px]"> <span>{{ course.enrolledStudents || 0 }} Étudiants</span> • <span v-if="course.duration">{{ formatDuration(course.duration) }}</span></p>
            <hr :class="[isDisplayCategory && 'hidden md:block']"/>
            <div class="flex w-full justify-between items-center">
                <p class="font-bold">{{ course.price ?? 0 }} FCFA</p>
                <div class="border border-1 border-r-gray-100 px-2 text-gray-300 rounded-md group-hover:bg-primary group-hover:text-white transition-all duration-200 ease-in-out">
                    <FontAwesomeIcon :icon="faArrowUp" class="rotate-45"/>
                </div>
            </div>
        </div>
    </div>
    <div
        v-else
        :class="['flex flex-row xl:flex-col w-full xl:w-[280px] bg-white gap-2 rounded-lg p-3 shrink-0  group border border-1 border-gray-200 cursor-pointer hover:shadow-[1px_1px_5px_#9e9e9e] transition-transform duration-200 ease-in-out',
        ]"

    >
        <div :class="[
                'relative w-60 h-24 xl:!w-full xl:h-[150px]'
            ]"
        >
            <!-- <span class="absolute left-1 top-1 px-2 py-1 rounded-md backdrop-blur-sm bg-[rgba(255,255,255,0.4)]">HTML</span> -->
            <img :src="course.cover_courses?.[0] ? getFileUrl(course.cover_courses[0].file_name) : picture" class="w-full h-full object-cover rounded-lg" alt="" crossorigin="anonymous">
        </div>
        <div class="w-full flex flex-col gap-1 md:gap-2">
            <p class="font-semibold">{{ course.title ?? 'Apprendre JavaScript pour débutants' }}</p>
            <p class="hidden xl:block text-gray-400">{{ course.description }}</p>
            <hr :class="[
                    isDisplayCategory && 'hidden md:block',
                    isInstructor && 'hidden'
                ]"
            />
            <div class="flex w-full justify-between items-center">
                <p class="text-gray-600 text-sm md:text-[15px]">{{ course.enrolledStudents || 0 }} Étudiants</p>
                <button class="bg-primary text-sm md:text-[15px] text-white px-2 py-1 md:px-4 md:py-2 hover:bg-secondary transition-all duration-150">
                    Editer
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import picture from './../assets/images/course-2.jpg'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
import { getFileUrl } from '../helpers/file-url';
import { formatDuration } from '@/helpers/format';

const router = useRouter()

defineProps({
    course: {
        type: Object,
        required: true,
    },
    isDisplayCategory: {
        type: Boolean,
        required: false,
    },
    isInstructorCourses: {
        type: Boolean,
        required: false,
    },
    isInstructor: {
        type: Boolean,
        required: false,
    }
})

const viewDetails = (courseId: number) => {
    router.push({ name: 'courseDetails', params: { courseId } })
}

</script>

<style>

</style>
