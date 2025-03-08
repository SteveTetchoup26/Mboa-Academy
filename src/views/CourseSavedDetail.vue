<template>
  <div class="flex min-h-screen bg-gray-50">
    
    <div :class="[
        'bg-white shadow-lg transition-all duration-300 overflow-hidden',
        showSidebar ? 'md:w-80' : 'w-0',
        isSmallScreen ? 'w-0' : 'w-full'
      ]"
    >
      <div class="p-4 border-b">
        <h1 class="text-xl font-bold">{{ courseData.title }}</h1>
        <div class="mt-2 flex items-center gap-2">
          <div class="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              class="h-full bg-green-500 rounded-full"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <span class="text-sm">{{ progress }}%</span>
        </div>
      </div>

      <div class="p-4 space-y-4">
        <div v-for="(module, moduleIndex) in courseData.modules" 
          :key="moduleIndex"
          class="border-b pb-2"
        >
          <button 
            @click="toggleModule(moduleIndex)"
            class="w-full flex items-center justify-between font-semibold mb-2"
          >
            <span>{{ module.title }}</span>
            <FontAwesomeIcon v-if=" expandedModules[moduleIndex]" :icon="faChevronDown" />
            <FontAwesomeIcon v-else :icon="faChevronRight"/>
          </button>
          
          <div v-show="expandedModules[moduleIndex]" class="space-y-2">
            <button
              v-for="(lesson, lessonIndex) in getAllLessons(module)"
              :key="lessonIndex"
              @click="selectLesson(moduleIndex, lessonIndex, lesson)"
              class="w-full p-2 rounded text-left flex items-center gap-2 hover:bg-gray-50"
              :class="[
                currentModule === moduleIndex && currentLessonIndex === lessonIndex 
                  ? 'bg-green-50 text-primary' 
                  : ''
              ]"
            >
              <FontAwesomeIcon v-if="lesson.type === 'video'" :icon="faPlayCircle"/>
              <FontAwesomeIcon v-else-if="lesson.type === 'reading'" :icon="faBook"/>
              <FontAwesomeIcon v-else :icon="faChartBar"/>
              <span class="flex-1">{{ lesson.title }}</span>
              <FontAwesomeIcon v-if="lesson.completed"  :icon="faCheckCircle" class="text-primary"/>
              <FontAwesomeIcon v-else :icon="faClock" class="text-gray-400"/>
            </button>
          </div>
        </div>
      </div>
    </div>

    
    <div :class="['flex-1 md:flex flex-col',
        isSmallScreen ? 'w-full' : 'hidden'
    ]">
      <div class="bg-white p-4 shadow flex items-center gap-4">
        <button 
          @click="toggleSidebar"
          class="px-2 py-1 hover:bg-gray-100 rounded-full"
        >
          <FontAwesomeIcon  :icon="faBars"/>
        </button>
        <div>
          <h2 class="font-semibold">
            {{ currentLesson?.title }}
          </h2>
          <p class="text-sm text-gray-500">
            {{ currentModuleTitle }}
          </p>
        </div>
      </div>

      <div class="flex-1 p-2 md:p-6">
        <div class="bg-white rounded-lg shadow-lg p-2 md:p-6">
          <div v-if="currentLesson?.type === 'video'" 
               class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center text-white relative">
            <div class="text-center">
              <button class=" text-sm lg:text-6xl hover:text-primary transition-colors" @click="togglePlay">
                <FontAwesomeIcon v-if="isPlaying"  :icon="faPauseCircle"/>
                <FontAwesomeIcon v-else  :icon="faPlayCircle"/>
              </button>
              <p class="hidden lg:block mt-4">{{ currentLesson.title }}</p>
            </div>
            
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-4">
              <div class="flex items-center justify-between text-white">
                <div class="flex items-center gap-4">
                  <select v-model="playbackSpeed" class="bg-transparent border border-white/20 rounded px-0 lg:px-2">
                    <option v-for="speed in [0.5, 1, 1.5, 2]" :key="speed" :value="speed">
                      {{ speed }}x
                    </option>
                  </select>
                  <span class="text-xs lg:text-[15px]">{{ currentTime }} / {{ currentLesson.duration }}</span>
                </div>
                <button @click="toggleFullscreen" class="hover:text-primary text-sm lg:text-lg">
                  <FontAwesomeIcon :icon="faExpand"/>
                </button>
              </div>
              <div class="mt-2 h-1 bg-white/20 rounded-full cursor-pointer" @click="seekVideo">
                <div class="h-full bg-primary rounded-full" :style="{ width: `${videoProgress}%` }"></div>
              </div>
            </div>
          </div>

          
          <div v-if="currentLesson?.type === 'reading'" class="prose max-w-none">
            <h1 class="font-semibold">{{ currentLesson.title }}</h1>
            <p class="text-sm md:text-[15px]">{{ currentLesson.content || 'Contenu de lecture...' }}</p>
          </div>

          
          <div v-if="currentLesson?.type === 'exercise'" class="space-y-4">
            <h3 class="font-bold md:text-lg">Exercice Pratique</h3>
            <p class="text-sm md:text-[15px]">{{ currentLesson.instructions || 'Instructions de l\'exercice...' }}</p>
            <div class="flex gap-4">
              <button class="text-sm md:text-[15px] px-2 md:px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">
                Démarrer
              </button>
              <button class="text-sm md:text-[15px] px-2 md:px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
                <FontAwesomeIcon :icon="faDownload"/>
                Ressources
              </button>
            </div>
          </div>
        </div>

        
        <div class="mt-6 flex justify-between">
          <button 
            @click="previousLesson"
            class="text-sm md:text-[15px] px-2 md:px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2"
            :disabled="isFirstLesson"
          >
            <FontAwesomeIcon :icon="faChevronLeft"/>
            Précédent
          </button>
          <button 
            @click="nextLesson"
            class="text-sm md:text-[15px] px-2 md:px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary flex items-center gap-2"
          >
            Continuer
            <FontAwesomeIcon :icon="faChevronRight"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faBars, faBook, faBookAtlas, faChartBar, faCheckCircle, faChevronDown, faChevronLeft, faChevronRight, faClock, faDownload, faExpand, faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons"

const courseData = ref({
  title: "Maîtrisez le Développement Web Moderne avec Vue.js",
  progress: 35,
  modules: [
    {
      title: "Introduction à Vue.js 3",
      lessons: [
        {
          title: "Présentation du framework Vue.js",
          type: "video",
          duration: "15:30",
          completed: true
        },
        {
          title: "Installation et configuration",
          type: "reading",
          duration: "10:45",
          completed: true
        },
        {
          title: "TP: Créer une application Vue",
          type: "exercise",
          duration: "30:00",
          completed: false
        }
      ]
    },
    {
      title: "La Composition API",
      lessons: [
        {
          title: "Introduction aux Composables",
          type: "video",
          duration: "20:15",
          completed: false
        },
        {
          title: "Gestion d'état avec Refs et Reactive",
          type: "reading",
          duration: "15:00",
          completed: false
        }
      ]
    }
  ]
})

let isSmallScreen = ref(false);
const showSidebar = ref(true);
const expandedModules = ref({});
const currentModule = ref(0);
const currentLessonIndex = ref(0);
const currentLesson = computed(() => courseData.value.modules[currentModule.value]?.lessons[currentLessonIndex.value])
const currentModuleTitle = computed(() => courseData.value.modules[currentModule.value]?.title)
const isPlaying = ref(false)
const playbackSpeed = ref(1)
const currentTime = ref('00:00')
const progress = ref(35)
const videoProgress = ref(30)


const isFirstLesson = computed(() => {
  return currentModule.value === 0 && currentLessonIndex.value === 0
})


const toggleSidebar = () => {
  if(window.innerWidth <= 770) {
      isSmallScreen.value = false;
  } else {
    showSidebar.value = !showSidebar.value
  }
}


const toggleModule = (moduleIndex) => {
  expandedModules.value[moduleIndex] = !expandedModules.value[moduleIndex]
}

const getAllLessons = (module) => {
  return module.lessons
}

const selectLesson = (moduleIndex, lessonIndex, lesson) => {
  if(window.innerWidth <= 775) {
      isSmallScreen.value = true;
  }
  currentModule.value = moduleIndex
  currentLessonIndex.value = lessonIndex
  currentLesson.value = lesson
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const toggleFullscreen = () => {
  // Logique fullscreen
}

const seekVideo = (event) => {
  if (!currentLesson.value) return
  const rect = event.target.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  videoProgress.value = percent * 100
}

const previousLesson = () => {
  if (currentLessonIndex.value > 0) {
    currentLessonIndex.value--
  } else if (currentModule.value > 0) {
    currentModule.value--
    currentLessonIndex.value = courseData.value.modules[currentModule.value].lessons.length - 1
  }
}

const nextLesson = () => {
  const currentModuleLessons = courseData.value.modules[currentModule.value].lessons
  if (currentLessonIndex.value < currentModuleLessons.length - 1) {
    currentLessonIndex.value++
  } else if (currentModule.value < courseData.value.modules.length - 1) {
    currentModule.value++
    currentLessonIndex.value = 0
  }
  
  if (currentLesson.value) {
    currentLesson.value.completed = true
  }
}
</script>