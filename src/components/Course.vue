<template>
    <div 
        @click="viewDetails(1)" 
        :class="['bg-white gap-2 rounded-lg p-3 shrink-0  group border border-1 border-gray-200 cursor-pointer hover:shadow-[1px_1px_5px_#9e9e9e] hover:-translate-y-2 transition-transform duration-200 ease-in-out',
            isDisplayCategory ? 'flex flex-row md:flex-col w-full md:!w-[250px] hover:-translate-y-0 md:hover:-translate-y-2' : 'flex flex-col !w-[250px]'
        ]"
    >
        <div :class="[
                'relative ',
                isDisplayCategory ? 'w-28 h-28 md:w-full md:h-[150px]' : 'w-full h-[150px]'
            ]"
        >
            <span class="absolute left-1 top-1 px-2 py-1 rounded-md backdrop-blur-sm bg-[rgba(255,255,255,0.4)]">HTML</span>
            <img :src="course" class="w-full h-full object-cover rounded-lg" alt="">
        </div>
        <div class="w-full flex flex-col gap-1 md:gap-2">
            <p class="font-semibold">Apprendre JavaScript pour débutants</p>
            <div class="flex items-center gap-2">
                <div class="flex gap-1">
                    <FontAwesomeIcon :icon="faStar" class="text-yellow-500" />  
                    <FontAwesomeIcon :icon="faStar" class="text-yellow-500" />  
                    <FontAwesomeIcon :icon="faStar" class="text-yellow-500" /> 
                    <FontAwesomeIcon :icon="faStar" class="text-yellow-500" /> 
                </div>
                <span class="text-gray-400">(220)</span>
            </div>
            <p class="text-gray-400 text-sm md:text-[15px]">Par John Doe</p>
            <p class="text-gray-400 text-sm md:text-[15px]"><span>12 Hrs</span> | <span>30 Étudiants</span></p>
            <hr :class="[isDisplayCategory && 'hidden md:block']"/>
            <div class="flex w-full justify-between items-center">
                <p class="font-bold">4500 FCFA</p>
                <div class="border border-1 border-r-gray-100 px-2 text-gray-300 rounded-md group-hover:bg-primary group-hover:text-white transition-all duration-200 ease-in-out">
                    <FontAwesomeIcon :icon="faArrowUp" class="rotate-45"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import course from './../assets/images/course-2.jpg'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps({
    isDisplayCategory: {
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