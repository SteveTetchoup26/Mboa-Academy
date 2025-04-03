<template>
    <div class="w-full flex justify-end items-center gap-4 py-2 md:py-4 px-2 md:pr-24 text-sm md:text-md bg-primary text-white">
        <div class="border border-1 border-white rounded-md p-1">
            <FontAwesomeIcon :icon="faList" class="mr-1"/>
            <select name="" id="" class="bg-primary">
                <option value="">Categories</option>
                <option value="" v-for="category in categories" :key="category.id">{{ category.title }}</option>
            </select>
        </div>
        <div class="border border-1 border-white rounded-md p-1">
            <FontAwesomeIcon :icon="faTag" class="mr-1"/>
            <select name="" id="" class="bg-primary">
                <option value="">Prix</option>
                <option value="">Gratuit</option>
            </select>
        </div>
        <div class="border border-1 border-white rounded-md p-1">
            <FontAwesomeIcon :icon="faGlobe" class="mr-1"/>
            <select name="" id="" class="bg-primary">
                <option value="">Langue</option>
                <option value="">Anglais</option>
                <option value="">Lingala</option>
                <option value="">Swahili</option>
                <option value="">Ewondo</option>
                <option value="">Bamiléké</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { CourseAPI } from '@/services/api/Course';
import { faList, faTag, faGlobe } from "@fortawesome/free-solid-svg-icons"


const categories = ref<Array<Record<string, any>>>([]);

onMounted(async () => {
    try {
        const res = await CourseAPI.getAllCategories();

        categories.value = res.data.categories;
    } catch(e) {
        console.error(e);
    }
})
</script>

<style>

</style>
