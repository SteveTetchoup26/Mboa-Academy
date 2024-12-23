<template>
    <div class="bg-white flex flex-col gap-2 rounded-lg p-3 min-w-[250px] group cursor-pointer hover:shadow-[1px_5px_5px_#9e9e9e] hover:-translate-y-2 transition-transform duration-200 ease-in-out">
        <div class="relative w-full h-[150px]">
            <span class="absolute left-1 top-1 px-2 py-1 rounded-md backdrop-blur-sm bg-[rgba(255,255,255,0.4)]">HTML</span>
            <img :src="course" class="w-full h-full object-cover rounded-lg" alt="">
        </div>
        <p>Apprendre JavaScript pour débutants</p>
        <div class="flex items-center gap-2">
            <div class="flex gap-1">
                <FontAwesomeIcon :icon="faStar" class="text-yellow-500" />  
                <FontAwesomeIcon :icon="faStar" class="text-yellow-500" />  
                <FontAwesomeIcon :icon="faStar" class="text-yellow-500" /> 
                <FontAwesomeIcon :icon="faStar" class="text-yellow-500" /> 
            </div>
            <span class="text-gray-400">(220)</span>
        </div>
        <p class="text-gray-400">Par John Doe</p>
        <p class="text-gray-400"><span>12 Hrs</span> | <span>30 Étudiants</span></p>
        <hr />
        <div class="flex w-full justify-between items-center">
            <p class="font-bold">4500 FCFA</p>
            <div class="border border-1 border-r-gray-100 px-2 text-gray-300 rounded-md group-hover:bg-primary group-hover:text-white transition-all duration-200 ease-in-out">
                <FontAwesomeIcon :icon="faArrowUp" class="rotate-45"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import course from './../assets/images/course-2.jpg'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowUp, faStar } from '@fortawesome/free-solid-svg-icons';
</script>

<style>

</style>