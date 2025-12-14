<template>
    <div class="w-full h-screen flex items-center justify-center bg-gray-100">
        <div v-if="success" class="bg-white py-5 px-8 rounded-lg shadow-lg flex flex-col items-center">
            <div class="mb-5 text-center">
                <FontAwesomeIcon :icon="faCheckCircle" class="text-primary text-4xl"/>
                <p class="text-lg text-center">{{ message }}</p>
            </div>
            <p >You can now log in securely.</p>
            <div class="w-max flex items-center justify-center mt-4 bg-primary text-white py-1 px-3 hover:opacity-80 transition-opacity duration-150">
                <router-link to="/connexion">Login</router-link>
            </div>
        </div>
        <div v-else class="bg-white py-5 px-8 rounded-lg shadow-lg flex flex-col items-center">
            <div class="mb-5 text-center">
                <FontAwesomeIcon :icon="faCircleXmark" class="text-red-500 text-4xl"/>
                <p class="text-lg text-center">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAppStore from "./../stores/app";
import { AuthAPI } from '@/services/api/Auth';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons"


const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const message = ref("");
const success = ref(false);


onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    message.value = "Token invalide.";
    appStore.loading = false;
    return;
  }

  appStore.loading = true;

  try {
    const res = await AuthAPI.confirm({ token });

    if (res.data.success) {
      success.value = true;
      message.value = res.data.message;
    } else {
      message.value = res.data.message;
    }

  } catch (error) {
    message.value = "Erreur lors de l'authentification.";

  } finally {

    appStore.loading = false;
  }
});
</script>