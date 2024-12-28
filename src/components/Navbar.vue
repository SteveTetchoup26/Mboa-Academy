<template>
    <nav class="w-full">
        <div class="flex w-full justify-between px-4 md:px-10 lg:px-10 lg:justify-between items-center py-3 border-b-[1px] border-solid border-gray-100 "
             :class="{'shadow-none' : showMenu}"        
        >
            <div>
                <h1 class="text-2xl font-extrabold">Logo</h1>
            </div>
            <div class="hidden md:flex items-center px-4 rounded-2xl gap-2 bg-gray-100 w-2/5 lg:w-1/5">
                <FontAwesomeIcon :icon="faSearch" color='gray' />
                <input type="text" class="bg-transparent outline-none flex-1 p-1 w-full" placeholder="Que voulez-vous apprendre ? ">
            </div>
            <ul v-if="!user" class="hidden lg:flex gap-[2px] text-gray-500">
                <li class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/" class="p-2 block h-full w-full">Acceuil</RouterLink></li>
                <li class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/about-us" class="p-2 block w-full">A propos</RouterLink></li>
                <li class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/contact-us" class="p-2 block w-full">Contact</RouterLink></li>
            </ul>
            <ul v-else class="hidden lg:flex gap-[2px] text-gray-500">
                <li class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/my-courses" class="p-2 block h-full w-full">Mes cours</RouterLink></li>
                <li class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/webinars" class="p-2 block w-full">Webinaires</RouterLink></li>
                <li class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/forums" class="p-2 block w-full">Forums</RouterLink></li>
            </ul>
            <div v-if="!user" class="hidden lg:flex gap-4">
                <button @click="router.push({name: 'login'})" class="cursor-pointer font-semibold">Se connecter</button>
                <button @click="router.push({name: 'signup'})" class="cursor-pointer text-white font-semibold bg-primary px-3 py-1 rounded-sm hover:bg-secondary transition-all duration-150">S'inscrire</button>
            </div>
            <div v-else class="hidden lg:flex gap-4 items-center">
                <FontAwesomeIcon :icon="faBell" class="h-5 cursor-pointer hover:text-primary" />
                <div class="cursor-pointer">
                    <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                        <p>ST</p>
                    </div>
                </div>
            </div>
            <div class="flex lg:hidden gap-4">
                <FontAwesomeIcon :icon="faSearch" class="h-5 block md:hidden cursor-pointer" />
                <FontAwesomeIcon @click="toggleMenu" :icon="faBars" class="block lg:hidden h-5 cursor-pointer" />
            </div>
        </div>
        <div class="lg:hidden" 
            :class="[showMenu ? 'mb-8 h-auto px-4 md:px-16 flex flex-col gap-4 opacity-100 transition-all duration-700 ease-in-out': 'w-full h-0 opacity-0 overflow-hidden']"
        >
            <div class="cursor-pointer mt-2 flex gap-2 items-center pb-2 border-b border-1 border-gray-400 group">
                <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                    <p>ST</p>
                </div>
                <p class="group-hover:text-primary font-semibold">Steve Tetchoup</p>
            </div>
            <ul v-if="!user" class="gap-[2px] text-gray-500">
                <li @click="toggleMenu" class="p-2 pl-0 hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/" class="block w-full">Acceuil</RouterLink></li>
                <li @click="toggleMenu" class="p-2 pl-0 hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/about-us" class="block w-full">A propos</RouterLink></li>
                <li @click="toggleMenu" class="p-2 pl-0 hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/contact-us" class="block w-full">Contact</RouterLink></li>
            </ul>
            <ul v-else class="gap-[2px] text-gray-500">
                <li @click="toggleMenu" class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/my-courses" class="p-2 pl-0 block h-full w-full">Mes cours</RouterLink></li>
                <li @click="toggleMenu" class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/webinars" class="p-2 pl-0 block w-full">Webinaires</RouterLink></li>
                <li @click="toggleMenu" class=" hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/forums" class="p-2 pl-0 block w-full">Forums</RouterLink></li>
            </ul>
            <div v-if="!user" class="w-full flex flex-col gap-4">
                <button @click="router.push({name: 'login'})" class="w-full text-primary font-semibold cursor-pointer border border-1 border-primary px-3 py-1">Se connecter</button>
                <button @click="router.push({name: 'signup'})" class="w-full cursor-pointer font-semibold text-white bg-primary px-3 py-1 rounded-sm hover:bg-secondary transition-all duration-150">S'inscrire</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons"
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ref } from 'vue';

const router = useRouter()
const showMenu:any = ref(false)
const user = ref(true)

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}
</script>

<style scoped>

</style>