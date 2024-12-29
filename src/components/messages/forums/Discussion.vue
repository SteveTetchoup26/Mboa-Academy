<template>
    <div class="p-3 border-b cursor-pointer hover:bg-gray-50">
        <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">
                {{ topic.title }}
            </h3>
            <span class="text-sm text-gray-500">{{ topic.lastActivity }}</span>
        </div>
        <div class="flex gap-4 text-sm text-gray-600">
            <span>Par {{ topic.author }}</span>
            <span>{{ topic.replies }} réponses</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    topic: {
        type: Object,
        required: true
    }
})
</script>

<style>

</style>