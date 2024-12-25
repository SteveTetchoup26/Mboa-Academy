<template>
    <nav class="flex w-full justify-between px-4 md:px-10 lg:px-0 lg:justify-around items-center py-3 border-b-[1px] border-solid border-gray-100 shadow-[0_0px_6px_1px_rgba(0,0,0,0.3)]">
        <div>
            <h1 class="text-2xl font-extrabold">Logo</h1>
        </div>
        <div class="hidden md:flex items-center gap-2 border-b-[1px] border-solid border-gray-400 w-2/5 lg:w-1/5">
            <FontAwesomeIcon :icon="faSearch" color='gray' />
            <input type="text" class="outline-none flex-1 p-1 w-full" placeholder="Que voulez-vous apprendre ? ">
        </div>
        <ul class="hidden lg:flex gap-[2px]">
            <li class="p-2 hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/">Acceuil</RouterLink></li>
            <li class="p-2 hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/about-us">A propos</RouterLink></li>
            <li class="p-2 hover:text-primary transition-colors duration-200 ease-in"><RouterLink to="/contact-us">Contact</RouterLink></li>
        </ul>
        <div class="hidden lg:flex gap-4">
            <button @click="router.push({name: 'login'})" class="cursor-pointer">Se connecter</button>
            <button @click="router.push({name: 'signup'})" class="cursor-pointer text-white bg-primary px-3 py-1 rounded-sm hover:opacity-80 transition-opacity duration-150">S'inscrire</button>
        </div>
        <div class="flex lg:hidden gap-4">
            <FontAwesomeIcon :icon="faSearch" class="h-5 block md:hidden cursor-pointer" />
            <FontAwesomeIcon :icon="faBars" class="block lg:hidden h-5 cursor-pointer" />
        </div>
    </nav>
    <nav>
        
    </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons"

const router = useRouter()
</script>

<style scoped>

</style>