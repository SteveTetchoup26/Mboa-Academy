<template>
  <div class="w-full px-4 py-10 xl:px-28 md:py-14">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl md:text-4xl font-bold">Forum de Discussion</h1>
      <button
        class="text-white bg-primary w-max text-sm md:text-[15px] rounded-md xs:rounded-none py-1 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150"
      >
        <FontAwesomeIcon :icon="faPlus" class="block xs:hidden"/>
        <span class="hidden xs:block">Nouveau Sujet</span>
      </button>
    </div>
    <div class="flex gap-4 mb-8">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher dans le forum..."
          class="w-full px-4 py-2 border rounded-md outline-primary"
        />
      </div>
      <div class="flex gap-4">
        <div class="flex items-center gap-2">
          <TrendingUp class="w-5 h-5 text-blue-600" />
          <span>{{ totalTopics }} Sujets</span>
        </div>
      </div>
    </div>

    <div class="flex w-full border">
      <div :class="['w-full md:w-2/5 h-auto md:max-h-screen md:overflow-y-scroll',
        isSmallScreen ? 'hidden' : 'translate-x-0']"
      >
        <div class="p-4 border-b">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <FontAwesomeIcon :icon="faMessage"/>
            Discussions Récentes
          </h2>
        </div>
          <div>
            <Discussion
              v-for="topic in recentTopics"
              :key="topic.id"
              :topic="topic"
              @click="test"
            />
          </div>
      </div>
      <div 
        :class="['md:block flex-1 bg-green-50 md:max-h-screen md:overflow-y-scroll p-2',
        isSmallScreen ? 'block w-full h-auto' : 'hidden' ]"
      >
        <div class="mb-6">
          <h1 class="text-sm md:text-2xl font-bold mb-2">{{ topic.title }}</h1>
          <div class="flex items-center gap-4 text-xs md:text-sm text-gray-600">
            <span>Publié par {{ topic.author }}</span>
            <span>{{ topic.date }}</span>
            <span class="hidden md:block">{{ topic.views }} vues</span>
            <span class="text-blue-600">{{ topic.category }}</span>
          </div>
        </div>

        <div class="border rounded-lg mb-6">
          <div class="p-2">
            <div class="flex">
              <div class="flex-shrink-0 mr-4">
                <div class="size-8 md:size-10 bg-primary rounded-full flex items-center justify-center text-white">
                  {{ topic.author[0] }}
                </div>
              </div>
              <div class="flex-grow text-xs md:text-sm">
                <div class="prose max-w-none mb-4">
                  {{ topic.content }}
                </div>
                <div class="flex gap-4 text-gray-600">
                  <button 
                    v-for="action in postActions" 
                    :key="action.name"
                    class="flex items-center gap-1 hover:text-blue-600"
                  >
                  <!-- @click="handleAction(action.name)" -->
                    <span>{{ action.label }}</span>
                    <span v-if="action.count">({{ action.count }})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h2 class="text-sm md:text-xl font-bold">{{ replies.length }} Réponses</h2>
          <Message
            v-for="reply in replies" 
            :key="reply.id"
            :reply="reply"
            :replyActions="replyActions"
          />
        </div>

        <div class="border rounded-lg mt-6">
          <div class="p-2">
            <h3 class="text-sm md:text-xl font-bold mb-4">Répondre</h3>
            <textarea
              v-model="newReply"
              class="w-full p-2 border rounded-md outline-primary"
              rows="4"
              placeholder="Écrivez votre réponse..."
            />
            <button 
              class="bg-primary text-sm md:text-[15px] text-white px-2 py-1 md:px-4 md:py-2 hover:bg-secondary transition-all duration-150"
              :disabled="!newReply.trim()"
            >
            <!-- @click="submitReply" -->
              Publier la réponse
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Discussion from '@/components/messages/forums/Discussion.vue';
import Message from '@/components/messages/forums/Message.vue';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const searchQuery = ref('')
const activeCategory = ref('all')
const totalTopics = ref('2.5k')
const activeToday = ref('150')

let isSmallScreen = ref(false);

const test = () => {
  if(window.innerWidth <= 775) {
      isSmallScreen.value = true;
  }
}

const recentTopics = [
  {
    id: 1,
    title: 'Comment débuter avec Vue.js?',
    author: 'Marie L.',
    replies: 12,
    lastActivity: 'Il y a 2h',
  },
  {
    id: 2,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 3,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 4,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 5,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 6,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 7,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 8,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 9,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 10,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
  {
    id: 11,
    title: 'Avis sur la formation de React.js',
    author: 'Thomas D.',
    replies: 8,
    lastActivity: 'Il y a 4h',
  },
]

  const newReply = ref('')
    
    const topic = reactive({
      title: "Comment débuter avec Vue.js?",
      author: "Marie L.",
      date: "29 Dec 2024",
      content: "Bonjour à tous, Je commence tout juste à apprendre Vue.js et j'aimerais avoir vos conseils sur le meilleur chemin à suivre. Quelles ressources recommandez-vous ?",
      category: "Développement Web",
      views: 156,
      likes: 12
    })

    const replies = ref([
      {
        id: 1,
        author: "Thomas D.",
        date: "29 Dec 2024",
        content: "Je recommande de commencer par la documentation officielle de Vue.js, elle est très bien faite!",
        likes: 8
      },
      {
        id: 2,
        author: "Sophie M.",
        date: "29 Dec 2024",
        content: "Il y a aussi d'excellents tutoriels sur YouTube. Je peux partager ma playlist si ça t'intéresse.",
        likes: 5
      }
    ])

    const postActions = [
      { name: 'like', icon: '', label: 'J\'aime', count: topic.likes },
      { name: 'reply', icon: '', label: 'Répondre' },
      { name: 'share', icon: '', label: 'Partager' },
    ]

    const replyActions = [
      { name: 'like', icon: '', label: 'J\'aime', countField: 'likes' },
      { name: 'reply', icon: '', label: 'Répondre' },
    ]

    // const handleAction = (actionName: string) => {
    //   switch (actionName) {
    //     case 'like':
    //       topic.likes++
    //       break
    //     case 'share':
    //       // Logique de partage
    //       break
    //     // ... autres actions
    //   }
    // }

    // const handleReplyAction = (replyId: number, actionName: string) => {
    //   const reply = replies.value.find(r => r.id === replyId)
    //   if (reply) {
    //     switch (actionName) {
    //       case 'like':
    //         reply.likes++
    //         break
    //       // ... autres actions
    //     }
    //   }
    // }
</script>
