<script lang="ts" setup>
import Navbar from '../Navbar.vue';
import Footer from '../Footer.vue';
import { RouterView } from 'vue-router';
import useDropdownStore from '@/stores/dropdown';
import { onMounted } from 'vue';

const dropdown = useDropdownStore();

onMounted(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-dropdown]")) {
      dropdown.closeAllMenus();
    }
  });
});
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
