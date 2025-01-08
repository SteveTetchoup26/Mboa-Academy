<template>
    <div class="w-full flex justify-end items-center gap-4 py-2 md:py-4 px-2 md:pr-24 text-sm md:text-md bg-primary text-white">
        <div class="border border-1 border-white rounded-md p-1">
            <FontAwesomeIcon :icon="faList" class="mr-1"/>
            <select name="" id="" class="bg-primary">
                <option value="">Categories</option>
                <option value="" >Developpemmt web</option>
            </select>
        </div>
        <div class="border border-1 border-white rounded-md p-1">
            <FontAwesomeIcon :icon="faTag" class="mr-1"/>
            <select name="" id="" class="bg-primary">
                <option value="">Prix</option>
            </select>
        </div>
        <div class="border border-1 border-white rounded-md p-1">
            <FontAwesomeIcon :icon="faGlobe" class="mr-1"/>
            <select name="" id="" class="bg-primary">
                <option value="">Langue</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faList, faTag, faGlobe } from "@fortawesome/free-solid-svg-icons"
</script>

<style>

</style>