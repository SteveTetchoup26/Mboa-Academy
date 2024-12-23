<template>
    <div class="flex justify-between items-center group py-1 px-2 md:p-4 shadow-[0px_1px_3px_#9e9e9e] cursor-pointer rounded-md border-2 border-transparent hover:border-2 hover:border-primary transition-all duration-200 ease-in-out">
        <p>Design</p>
        <div class="px-2 md:px-3 py-[2px] md:py-1 text-primary rounded-md group-hover:bg-primary group-hover:text-white transition-all duration-200 ease-in-out">
            <FontAwesomeIcon :icon="faArrowUp" class="rotate-45"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
</script>

<style>

</style>