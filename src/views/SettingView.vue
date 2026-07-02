<template>
    <div class="max-w-4xl mx-auto p-4 space-y-6 pb-10">
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon :icon="faUser" class="" />
                Compte
            </h2>
            <div class="space-y-4">
                <div class="space-y-2">
                    <label class="text-sm font-medium">Email</label>
                    <input
                    v-model="userData.email"
                    type="email"
                    class="w-full rounded-md text-gray-600 bg-white py-3 px-2 border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                </div>
                <div class="space-y-2">
                    <label class="text-sm font-medium">Mot de passe</label>
                <div class="relative">
                    <input
                        v-model="userData.password"
                        :type="showPassword ? 'text' : 'password'"
                        class="w-full rounded-md text-gray-600 bg-white py-3 px-2 border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                </div>
            </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon :icon="faBell" class="" />
                Notifications
            </h2>
            <div class="space-y-4">
                <div v-for="(notif, key) in notifications" :key="key" class="flex items-center justify-between">
                    <div>
                        <p class="font-medium">{{ notif.title }}</p>
                        <p class="text-sm text-gray-500">{{ notif.description }}</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': notif.enabled}" @click="notif.enabled = !notif.enabled">
                            <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-5': notif.enabled}"></div>
                        </div>
                    </div>
                    <!-- <Switch
                        v-model="notif.enabled"
                        @click="notif.enabled = !notif.enabled"
                        class="relative inline-flex h-6 w-11 items-center rounded-full"
                        :class="notif.enabled ? 'bg-primary' : 'bg-gray-200'"
                    >
                        <span
                            class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                            :class="notif.enabled ? 'translate-x-6' : 'translate-x-1'"
                        />
                    </Switch> -->
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon :icon="faGlobe" class="" />
                Langue
            </h2>
            <select
                 v-model="userData.language"
                  class="w-full rounded-md text-gray-600 bg-white py-3 px-2 border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
                <option
                    v-for="lang in availableLanguages"
                    :key="lang.code"
                    :value="lang.code"
                >
                    {{ lang.name }}
                </option>
            </select>
        </div>

        <div class="flex justify-end gap-4">
            <button
                class="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
                Annuler
            </button>
            <button
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            >
                Sauvegarder
            </button>
        </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faBellConcierge, faGlobe, faLanguage, faBell, faUser } from "@fortawesome/free-solid-svg-icons"
import { useUserStore } from './../stores/user';


  // États réactifs
  const showPassword = ref(false);
  const userStore = useUserStore();

  const userData = reactive({
    email: 'utilisateur@example.com',
    password: '••••••••',
    language: 'fr',
  })

  const notifications = reactive({
    courses: {
      title: 'Mises à jour des cours',
      description: 'Nouveaux contenus et annonces',
      enabled: true
    },
    messages: {
      title: 'Messages',
      description: 'Messages des formateurs et élèves',
      enabled: true
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Actualités et promotions',
      enabled: false
    }
  })

const availableLanguages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' }
]

const user = userStore.user;

onMounted(() => {
    userData.email = user?.email;
})

</script>
