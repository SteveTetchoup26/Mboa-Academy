<template>
    <div class="border rounded-lg">
        <div class="p-2">
            <div class="flex">
                <div class="flex-shrink-0 mr-4">
                    <div class="size-8 md:size-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
                    {{ reply.author[0] }}
                    </div>
                </div>
                <div class="flex-grow text-xs md:text-sm">
                    <div class="flex justify-between mb-2">
                        <div>
                            <span class="font-medium">{{ reply.author }}</span>
                            <span class="text-gray-600 text-sm ml-2">{{ reply.date }}</span>
                        </div>
                    </div>
                    <div class="prose max-w-none mb-4">
                        {{ reply.content }}
                    </div>
                    <div class="flex gap-4 text-gray-600">
                        <button 
                            v-for="action in replyActions" 
                            :key="action.name"
                            class="flex items-center gap-1 hover:text-blue-600"
                        >
                            <span>{{ action.label }}</span>
                            <!-- @click="handleReplyAction(reply.id, action.name)" -->
                            <!-- <span v-if="reply[action.countField]">({{ reply[action.countField] }})</span> -->
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    reply: {
        type: Object,
        required: true
    },
    replyActions: {
        type: Array<any>,
        required: true
    }
})
</script>

<style scoped>

</style>