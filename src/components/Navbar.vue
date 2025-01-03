<template>
    <nav class="w-full">
        <div class="flex w-full justify-between px-4 md:px-10 lg:px-10 lg:justify-between items-center pt-3 border-b-[1px] border-solid border-gray-100"
             :class="[ !user ? 'pb-[10px]' : 'pb-[6px]']"        
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
                            ? 'border-b-[3px] border-primary text-primary'
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
                            ? 'border-b-[3px] border-primary text-primary'
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
                <FontAwesomeIcon :icon="faBell" class="h-5 cursor-pointer px-2 py-1 hover:text-primary" />
                <div class="relative cursor-pointer group px-2 py-1">
                    <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                        <p>ST</p>
                    </div>
                    <div 
                        v-motion
                        :initial="{ opacity: 0, scale: 0.5}"
                        :enter="{ opacity: 1, scale: 1}" 
                        class="invisible group-hover:visible z-10 w-40 h-max bg-white absolute top-[45px] right-1 border border-solid border-primary rounded-md shadow-[1px_1px_5px_#9e9e9e]"
                    >
                        <ul class="w-full h-full rounded-md font-semibold text-md text-gray-600">
                            <li @click="currentTab=''">
                                <RouterLink class="pl-2 py-3 rounded-t-md block border-b border-primary w-full hover:bg-green-50" to="/profile">
                                    <FontAwesomeIcon :icon="faUser" class="mr-2" />
                                    Profil
                                </RouterLink>
                            </li>
                            <li  @click="currentTab=''">
                                <RouterLink class="pl-2 py-3 block border-b border-primary w-full hover:bg-green-50" to="/settings">
                                    <FontAwesomeIcon :icon="faGear" class="mr-2" />
                                    Paramètres
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink class="pl-2 py-3 block rounded-md w-full hover:bg-green-50" to="">
                                    <FontAwesomeIcon :icon="faArrowRightFromBracket" class="mr-2" />
                                    Déconnexion
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex items-center lg:hidden gap-4">
                <FontAwesomeIcon :icon="faSearch" class="h-5 block md:hidden cursor-pointer" />
                <FontAwesomeIcon v-if="!showMenu" @click="toggleMenu" :icon="faBars" class="block lg:hidden h-5 cursor-pointer" />
                <FontAwesomeIcon v-else @click="toggleMenu" :icon="faXmark" class="block lg:hidden h-6 cursor-pointer" />
            </div>
        </div>
        <div class="lg:hidden" 
            :class="[showMenu ? 'relative mb-8 h-auto md:px-16 flex flex-col gap-4 opacity-100 transition-all duration-700 ease-in-out': 'w-full h-0 opacity-0 overflow-hidden']"
        >
            <div v-if="user" @click="isProfile=true" class="cursor-pointer px-4 mt-2 flex gap-2 items-center justify-between pb-2 border-b border-1 border-gray-400 group">
                <div class="flex items-center gap-1 ">
                    <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                        <p>ST</p>
                    </div>
                    <p class="group-hover:text-primary font-semibold">Steve Tetchoup</p>
                </div>
                <FontAwesomeIcon :icon="faChevronRight" />
            </div>
            <Transition>
                <div 
                    v-if="isProfile"
                    class="z-40 absolute left-0 bg-white h-screen w-full text-gray-600"
                >
                    <div  @click="isProfile=false" class="w-full flex items-center pl-4 py-3 font-semibold text-md text-black hover:text-gray-600 cursor-pointer">
                        <FontAwesomeIcon :icon="faChevronLeft" class="mr-2" />
                        Retour
                    </div>
                    <ul class="w-full h-full rounded-md font-semibold text-md">
                        <li @click="showProfile">
                            <RouterLink class="pl-4 py-3 block  w-full hover:bg-green-50" to="/profile">
                                <FontAwesomeIcon :icon="faUser" class="mr-2 hidden xs:inline-block" />
                                Profil
                            </RouterLink>
                        </li>
                        <li  @click="showSetting">
                            <RouterLink class="pl-4 py-3 block  w-full hover:bg-green-50" to="/settings">
                                <FontAwesomeIcon :icon="faGear" class="mr-2 hidden xs:inline-block" />
                                Paramètres
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink class="pl-4 py-3 block rounded-md w-full hover:bg-green-50" to="">
                                <FontAwesomeIcon :icon="faArrowRightFromBracket" class="mr-2 hidden xs:inline-block"  />
                                Déconnexion
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </Transition>
            <ul v-if="!user" class="gap-[2px] text-gray-600 font-semibold text-md">
                <li 
                    v-for="tab in tabsBeforeConnexion" 
                    :key="tab.id"
                    @click="toggleMenu" 
                    class=" hover:text-primary transition-colors duration-200 ease-in"  
                >
                    <RouterLink :to="`/${tab.path}`" class="block h-full w-full pl-4 py-3 hover:bg-green-50">{{ tab.name }}</RouterLink>
                </li>
            </ul>
            <ul v-else class="text-gray-600 font-semibold text-md">
                <li 
                    v-for="tab in tabsAfterConnexion" 
                    :key="tab.id"
                    @click="toggleMenu" 
                    class="transition-colors duration-200 ease-in"  
                >
                    <RouterLink :to="`/${tab.path}`" class="pl-4 py-3  block h-full w-full hover:bg-green-50">{{ tab.name }}</RouterLink>
                </li>
            </ul>
            <div v-if="!user" class="w-full flex flex-col items-center gap-4">
                <button @click="router.push({name: 'login'})" class="w-11/12 text-primary font-semibold cursor-pointer border border-1 border-primary px-3 py-1">Se connecter</button>
                <button @click="router.push({name: 'signup'})" class="w-11/12 cursor-pointer font-semibold text-white bg-primary px-3 py-1 rounded-sm hover:bg-secondary transition-all duration-150">S'inscrire</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faSearch, faBars, faGear, faUser, faArrowRightFromBracket, faChevronRight, faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ref, Transition, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { RefSymbol } from '@vue/reactivity';

const router = useRouter()
const showMenu:any = ref(false)
let isProfile:any = ref(false)
const user = ref(false)
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
    isProfile.value = false
}


const showProfile = () => {
    toggleMenu()
    currentTab.value = ''
    isProfile.value = false
}
const showSetting = () => {
    toggleMenu()
    currentTab.value = ''
    isProfile.value = false
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(100%);
}

.v-enter-to,
.v-leave-from {
    transform: translateX(0);
}
</style>