<template>
    <nav class="w-full">
        <div class="flex w-full justify-between px-4 md:px-10 lg:px-10 lg:justify-between items-center py-3 border-b-[1px] border-solid border-gray-100 "
             :class="{'shadow-none' : showMenu}"        
        >
            <div>
                <h1 class="text-2xl font-extrabold cursor-pointer"><RouterLink to="/">Logo</RouterLink></h1>
            </div>
            <div class="hidden md:flex items-center px-4 rounded-2xl gap-2 bg-gray-100 w-2/5 lg:w-1/5">
                <FontAwesomeIcon :icon="faSearch" color='gray' />
                <input type="text" class="bg-transparent outline-none flex-1 p-1 w-full" placeholder="Que voulez-vous apprendre ? ">
            </div>
            <ul v-if="!user" class="hidden lg:flex gap-[2px] text-gray-500">
                <li 
                    v-for="tab in tabsBeforeConnexion" 
                    :key="tab.id"   
                >
                    <RouterLink :to="`/${tab.path}`" @click="currentTab = tab.id"
                        :class="[
                            'px-6 py-4 text-sm font-medium',
                            currentTab === tab.id
                            ? 'border-b-2 border-primary text-primary'
                            : 'hover:text-primary transition-colors duration-200 ease-in'
                        ]"
                    >
                        {{ tab.name }}
                    </RouterLink>
                </li>
            </ul>
            <ul v-else class="hidden lg:flex gap-[2px] text-gray-500">
                <li 
                    v-for="tab in tabsAfterConnexion" 
                    :key="tab.id"   
                >
                    <RouterLink :to="`/${tab.path}`" @click="currentTab = tab.id"
                        :class="[
                            'px-6 py-4 text-sm font-medium',
                            currentTab === tab.id
                            ? 'border-b-2 border-primary text-primary'
                            : 'hover:text-primary transition-colors duration-200 ease-in'
                        ]"
                    >
                        {{ tab.name }}
                    </RouterLink>
                </li>
            </ul>
            <div v-if="!user" class="hidden lg:flex gap-4">
                <button @click="router.push({name: 'login'})" class="cursor-pointer font-semibold">Se connecter</button>
                <button @click="router.push({name: 'signup'})" class="cursor-pointer text-white font-semibold bg-primary px-3 py-1 rounded-sm hover:bg-secondary transition-all duration-150">S'inscrire</button>
            </div>
            <div v-else class="hidden lg:flex gap-4 items-center">
                <FontAwesomeIcon :icon="faBell" class="h-5 cursor-pointer hover:text-primary" />
                <div class="cursor-pointer">
                    <div @click="showProfile" class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
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
            <div @click="showProfile" class="cursor-pointer mt-2 flex gap-2 items-center pb-2 border-b border-1 border-gray-400 group">
                <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                    <p>ST</p>
                </div>
                <p class="group-hover:text-primary font-semibold">Steve Tetchoup</p>
            </div>
            <ul v-if="!user" class="gap-[2px] text-gray-500">
                <li 
                    v-for="tab in tabsBeforeConnexion" 
                    :key="tab.id"
                    @click="toggleMenu" 
                    class=" hover:text-primary transition-colors duration-200 ease-in"  
                >
                    <RouterLink :to="`/${tab.path}`" class="p-2 pl-0 block h-full w-full">{{ tab.name }}</RouterLink>
                </li>
            </ul>
            <ul v-else class="text-gray-500">
                <li 
                    v-for="tab in tabsAfterConnexion" 
                    :key="tab.id"
                    @click="toggleMenu" 
                    class=" hover:text-primary transition-colors duration-200 ease-in"  
                >
                    <RouterLink :to="`/${tab.path}`" class="p-2 pl-0 block h-full w-full">{{ tab.name }}</RouterLink>
                </li>
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { RefSymbol } from '@vue/reactivity';

const router = useRouter()
const showMenu:any = ref(false)
const user = ref(true)
let currentTab = ref(router.currentRoute.value.name)

const currentPath = router.currentRoute.value.name

let tabsAfterConnexion =  [
  { id: 'home', name: 'Acceuil', path: '' },
  { id: 'courses', name: 'Mes cours', path: 'my-courses' },
  { id: 'webinars', name: 'Webinaires', path: 'webinars' },
  { id: 'forums', name: 'Forums', path: 'forums' }
]
let tabsBeforeConnexion =  [
  { id: 'home', name: 'Acceuil', path: '' },
  { id: 'about', name: 'A propos', path: 'about-us' },
  { id: 'contact', name: 'Contact', path: 'contact-us' }
]

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}



const showProfile = () => {
    toggleMenu()
    currentTab.value = ''
    router.push({ name: 'profile'})
}

</script>

<style scoped>

</style>