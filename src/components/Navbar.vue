<template>
    <nav class="w-full">
        <div class="flex w-full justify-between px-4 md:px-10 lg:px-10 lg:justify-between items-center pt-3 border-b-[1px] border-solid border-gray-100"
             :class="[ !user ? 'pb-[10px]' : 'pb-[6px]']"
        >
            <div>
                <RouterLink to="/">
                  <img :src="logo" alt="" class="w-10 h-10">
                </RouterLink>
            </div>
            <div class="hidden md:flex items-center px-4 rounded-2xl gap-2 bg-gray-100 w-2/5 lg:w-1/5">
                <FontAwesomeIcon :icon="faSearch" color='gray' />
                <input type="text" class="bg-transparent outline-none flex-1 p-1 w-full" placeholder="Que voulez-vous apprendre ? ">
            </div>
            <ul v-if="!token" class="hidden lg:flex gap-[2px] text-gray-500">
                <li
                    v-for="(tab) in tabsBeforeConnexion"
                    :key="tab.id"
                >
                    <RouterLink :to="`/${tab.path}`" @click="currentTab = tab.id"
                        :class="[
                            'px-6 py-4 text-sm font-medium',
                            route.path === `/${tab.path}`
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
                    v-for="(tab) in tabsAfterConnexion"
                    :key="tab.id"
                >
                    <RouterLink :to="`/${tab.path}`" @click="currentTab = tab.id"
                        :class="[
                            'px-6 py-4 text-sm font-medium',
                            currentTab === tab.id
                            ? 'border-b-[3px] border-primary text-primary'
                            : 'hover:text-primary transition-colors duration-200 ease-in',
                        ]"
                    >
                        {{ tab.name }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="isInstructor ? '/instructor/dashboard' : '/become-instructor'"
                        :class="[
                                isInstructor ?
                                'hover:text-primary bg-transparent text-gray-500 px-6 py-4 text-sm font-medium' :
                                'transition-colors duration-200 ease-in rounded-3xl px-4 py-2 bg-primary text-white hover:bg-secondary '
                            ]"
                    >
                        {{  isInstructor ? 'Formateur' : 'Devenir formateur' }}
                    </RouterLink>
                </li>
            </ul>
            <div v-if="!token" class="hidden lg:flex gap-4">
                <button @click="router.push({name: 'login'})" class="cursor-pointer font-semibold">Se connecter</button>
                <button @click="router.push({name: 'signup'})" class="cursor-pointer text-white font-semibold bg-primary px-3 py-1 rounded-sm hover:bg-secondary transition-all duration-150">S'inscrire</button>
            </div>
            <div v-else class="hidden lg:flex gap-4 items-center">
                <!-- <FontAwesomeIcon :icon="faBell" class="h-5 cursor-pointer px-2 py-1 hover:text-primary" /> -->
                <div class="relative">
                    <button
                        @click="toggleNotifications()"
                        class="py-2 px-3 rounded-full hover:bg-gray-100 relative hover:cursor-pointer"
                    >
                        <FontAwesomeIcon :icon="faBell" class="text-[22px] text-gray-600"/>
                        <span v-if="unreadNotifications > 0" class="absolute -top-[2px] -right-[2px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {{ unreadNotifications }}
                        </span>
                    </button>
                    <div
                        v-if="showNotifications"
                        class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                    >
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex justify-between items-center">
                                <h3 class="text-sm font-semibold text-gray-700">Notifications</h3>
                                <button
                                    v-if="notifications.length > 0"
                                    @click="markAllAsRead()"
                                    class="text-xs text-indigo-600 hover:text-indigo-800"
                                >
                                    Marquer tout comme lu
                                </button>
                            </div>
                        </div>
                        <div class="max-h-64 overflow-y-auto">
                            <div v-if="notifications.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
                                Aucune notification
                            </div>
                            <div
                                v-for="notification in notifications"
                                :key="notification.id"
                                class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                :class="{ 'bg-blue-50': !notification.read }"
                                @click="readNotification(notification.id)"
                            >
                                <div class="flex justify-between">
                                    <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                                    <p class="text-xs text-gray-500">{{ notification.time }}</p>
                                </div>
                                <p class="text-xs text-gray-600 mt-1">{{ notification.message }}</p>
                            </div>
                        </div>
                        <div class="px-4 py-2 border-t border-gray-200">
                            <router-link to="/notifications" class="text-xs text-indigo-600 hover:text-indigo-800">
                                Voir toutes les notifications
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <button @click="toggleUserMenu" class="flex items-center space-x-2 hover:cursor-pointer">
                        <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                            <p>{{ avatar }}</p>
                        </div>
                        <FontAwesomeIcon :icon="faChevronDown" class="h-4 w-4 text-gray-600"/>
                    </button>
                    <div
                        v-if="showUserMenu"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                    >
                        <router-link @click="showUserMenu = false" to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profil
                        </router-link>
                        <router-link @click="showUserMenu = false" to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Paramètres
                        </router-link>
                        <div class="border-t border-gray-200 mt-1"></div>
                        <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center lg:hidden gap-4">
                <FontAwesomeIcon :icon="faSearch" class="h-5 block md:hidden cursor-pointer text-black" />
                <FontAwesomeIcon v-if="!showMenu" @click="toggleMenu" :icon="faBars" class="block lg:hidden h-5 cursor-pointer text-black" />
                <FontAwesomeIcon v-else @click="toggleMenu" :icon="faXmark" class="block lg:hidden h-6 cursor-pointer text-black" />
            </div>
        </div>
        <div class="lg:hidden"
            :class="[showMenu ? 'relative mb-8 h-auto md:px-16 flex flex-col gap-4 opacity-100 transition-all duration-700 ease-in-out': 'w-full h-0 opacity-0 overflow-hidden']"
        >
            <div v-if="token" @click="isProfile=true" class="cursor-pointer px-4 mt-2 flex gap-2 items-center justify-between pb-2 border-b border-1 border-gray-400 group">
                <div class="flex items-center gap-1 ">
                    <div class="h-6 w-6 text-white rounded-full bg-black flex items-center justify-center p-[18px] font-semibold">
                        <p>{{ avatar }}</p>
                    </div>
                    <p class="group-hover:text-primary font-semibold">{{ user?.name }}</p>
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
                        <li @click="logout">
                            <RouterLink class="pl-4 py-3 block rounded-md w-full hover:bg-green-50" to="">
                                <FontAwesomeIcon :icon="faArrowRightFromBracket" class="mr-2 hidden xs:inline-block"  />
                                Déconnexion
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </Transition>
            <ul v-if="!token" class="gap-[2px] text-gray-600 font-semibold text-md">
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
                <li>
                    <RouterLink :to="isInstructor ? '/instructor/dashboard' : '/become-instructor'"
                        :class="[
                            isInstructor ?
                            'hover:text-primary bg-transparent text-gray-500 px-6 py-4 text-sm font-medium' :
                            'transition-colors duration-200 ease-in rounded-3xl px-4 py-2 bg-primary text-white hover:bg-secondary '
                        ]"
                    >
                        {{  isInstructor ? 'Formateur' : 'Devenir formateur' }}
                    </RouterLink>
                </li>
            </ul>
            <div v-if="!token" class="w-full flex flex-col items-center gap-4">
                <button @click="router.push({name: 'login'})" class="w-11/12 text-primary font-semibold cursor-pointer border border-1 border-primary px-3 py-1">Se connecter</button>
                <button @click="router.push({name: 'signup'})" class="w-11/12 cursor-pointer font-semibold text-white bg-primary px-3 py-1 rounded-sm hover:bg-secondary transition-all duration-150">S'inscrire</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faSearch, faBars, faGear, faUser, faArrowRightFromBracket, faChevronRight, faChevronLeft, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { computed, ref, Transition, watch, watchEffect, onMounted } from 'vue';
import { useUserStore } from "./../stores/user";
import logo from "../assets/images/logo.png"



const userStore = useUserStore();
const token = computed(() => userStore.getToken());
let user = ref<Record<string, any>>();
const showNotifications = ref(false);
const showUserMenu = ref(false);
const route = useRoute()

const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value;
    if (showUserMenu.value) showUserMenu.value = false;
};

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
    if (showNotifications.value) showNotifications.value = false;
};

const notifications = ref([
    {
      id: 1,
      title: 'Nouveau cours soumis',
      message: 'Le formateur Jean Dupont a soumis un nouveau cours "Vue.js Avancé" pour validation.',
      time: 'Il y a 20 min',
      read: false
    },
    {
      id: 2,
      title: 'Nouvel utilisateur',
      message: 'Un nouveau formateur s\'est inscrit à la plateforme.',
      time: 'Il y a 1 heure',
      read: false
    },
    {
      id: 3,
      title: 'Rapport hebdomadaire',
      message: 'Le rapport d\'activité hebdomadaire est disponible.',
      time: 'Il y a 2 jours',
      read: true
    }
  ]);

  const unreadNotifications = computed(() => {
    return notifications.value.filter(n => !n.read).length;
  });

  const readNotification = (id: number) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };

const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true);
};

const avatar = computed(() => {
  return user?.value?.name ? user.value.name.charAt(0).toUpperCase() : '?';
});

const isInstructor = ref(false);
const router = useRouter();
const showMenu:any = ref(false);
let isProfile:any = ref(false);

let currentTab = ref(router.currentRoute.value.name)

const currentPath = router.currentRoute.value.name

let tabsAfterConnexion =  [
  { id: 'home', name: 'Acceuil', path: '' },
  { id: 'courses', name: 'Mes cours', path: 'my-courses' },
  { id: 'webinars', name: 'Webinaires', path: 'webinars' },
  { id: 'forums', name: 'Forums', path: 'forums' },
//   { id: 'becomeInstructor', name:'Devenir formateur', path: 'become-instructor' }
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
const logout = () => {
    userStore.logout()
    router.push("/connexion");
}

onMounted(() => {
    user.value = userStore.user;
    isInstructor.value = user.value?.roles?.some((role: any) => role.title === 'Instructor');
})

onMounted(() => {
    document.addEventListener('click', (event) => {
      const target = event.target as Element;
      if (!target.closest('.relative')) {
        showNotifications.value = false;
        showUserMenu.value = false;
      }
    });
});

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
