<template>
    <div class="w-full min-h-screen bg-white text-black">
        <Toast />
        <RouterView />

        <GlobalLoader v-if="appStore.loading" />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import useAppStore from "./stores/app";
import GlobalLoader from './components/loader/GlobalLoader.vue';
import Toast from "primevue/toast";

const appStore = useAppStore();
</script>

<style>

</style>
