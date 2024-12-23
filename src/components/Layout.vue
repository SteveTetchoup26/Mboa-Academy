<script lang="ts" setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import { RouterView } from 'vue-router';
</script>


<template>
    <div>
        <Navbar />
        <main>
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<style scoped>

</style>
