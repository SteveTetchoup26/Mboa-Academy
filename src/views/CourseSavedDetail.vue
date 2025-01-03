<!-- <template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    
    <header class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold">{{ courseData.title }}</h1>
          <div class="text-sm text-gray-600">
            <i class="fas fa-clock mr-2"></i>{{ courseData.duration }}
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-48 bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 rounded-full h-2" :style="{ width: `${progress}%` }"></div>
          </div>
          <button class="text-primary hover:underline text-sm" @click="showResources = !showResources">
            Ressources
          </button>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      
      <nav class="w-80 bg-white border-r overflow-y-auto">
        <div v-for="(module, moduleIndex) in courseData.modules" 
             :key="moduleIndex" 
             class="border-b"
        >
          <button 
            @click="toggleModule(moduleIndex)"
            class="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div class="flex-1">
              <h3 class="font-medium text-left">{{ module.title }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ module.duration }}</p>
            </div>
            <i :class="[
              'fas transition-transform',
              expandedModules[moduleIndex] ? 'fa-chevron-down' : 'fa-chevron-right'
            ]"></i>
          </button>
          
          <div v-show="expandedModules[moduleIndex]" 
               class="space-y-2 p-2 bg-gray-50"
          >
            <button
              v-for="lesson in getAllLessons(module)"
              :key="lesson.id"
              @click="selectLesson(lesson)"
              class="w-full p-3 rounded-lg text-left flex items-center gap-3 bg-white border border-gray-100"
              :class="[
                currentLesson?.id === lesson.id ? 'bg-blue-50 text-primary border-blue-200' : 'hover:bg-gray-50',
                lesson.completed ? 'text-gray-600' : ''
              ]"
            >
              <i :class="[
                'text-lg',
                lesson.type === 'video' ? 'fas fa-play-circle' : 'fas fa-file-alt'
              ]"></i>
              <div class="flex-1">
                <p class="font-medium">{{ lesson.title }}</p>
                <p class="text-sm text-gray-500">{{ lesson.duration }}</p>
              </div>
              <i v-if="lesson.completed" class="fas fa-check text-green-500"></i>
            </button>
          </div>
        </div>
      </nav>

      <main class="flex-1 flex flex-col">
        <div class="flex-1 bg-gray-900 relative">
          <div v-if="currentLesson" class="absolute inset-0 flex items-center justify-center text-white">
            <div class="text-center">
              <button class="text-6xl hover:text-blue-400 transition-colors" @click="togglePlay">
                <i :class="isPlaying ? 'fas fa-pause-circle' : 'fas fa-play-circle'"></i>
              </button>
              <p class="mt-4">{{ currentLesson.title }}</p>
            </div>
          </div>

          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-4">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center gap-4">
                <select v-model="playbackSpeed" class="bg-transparent border border-white/20 rounded px-2">
                  <option v-for="speed in [0.5, 1, 1.5, 2]" :key="speed" :value="speed">
                    {{ speed }}x
                  </option>
                </select>
                <span>{{ currentTime }} / {{ currentLesson?.duration || '00:00' }}</span>
              </div>
              <button @click="toggleFullscreen" class="hover:text-blue-400">
                <i class="fas fa-expand"></i>
              </button>
            </div>
            <div class="mt-2 h-1 bg-white/20 rounded-full cursor-pointer" @click="seekVideo">
              <div class="h-full bg-blue-500 rounded-full" :style="{ width: `${videoProgress}%` }"></div>
            </div>
          </div>
        </div>

        <div class="bg-white border-t">
          <div class="border-b px-4">
            <div class="flex" role="tablist">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
                :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent'"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <div class="p-4">
            <div v-if="activeTab === 'contenu'" class="prose max-w-none">
              <div v-if="currentLesson">
                <h3>{{ currentLesson.title }}</h3>
                <p>{{ currentLesson.description || 'Description de la leçon...' }}</p>
              </div>
            </div>
            <div v-else-if="activeTab === 'exercices'" class="space-y-4">
              <div v-if="currentLesson" class="border rounded-lg p-4">
                <h4 class="font-medium">Exercice pratique</h4>
                <p class="text-gray-600 mt-2">Mettez en pratique les concepts appris dans cette leçon.</p>
              </div>
            </div>
            <div v-else-if="activeTab === 'notes'" class="space-y-4">
              <textarea
                v-model="notes[currentLesson?.id]"
                class="w-full h-40 p-3 border rounded-lg"
                placeholder="Prendre des notes..."
              ></textarea>
            </div>
          </div>
        </div>
      </main>

      <aside v-if="showResources" class="w-72 bg-white border-l p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium">Ressources</h3>
          <button @click="showResources = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-3">
          <RouterLink
            v-for="resource in currentLesson?.resources"
            :key="resource.id"
            :to="resource.url"
            class="block p-3 border rounded-lg hover:bg-gray-50"
          >
            <div class="flex items-center gap-3">
              <i class="fas fa-download text-blue-500"></i>
              <span>{{ resource.title }}</span>
            </div>
          </RouterLink>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// État
const courseData = ref({
  title: "Maîtrisez le Développement Web Moderne avec Vue.js",
  category: "Développement Web",
  duration: "21 heures",
  modules: [
    {
      title: "Introduction à Vue.js 3",
      duration: "2h 30min",
      previewLessons: [
        {
          id: 1,
          type: "video",
          title: "Présentation du framework Vue.js",
          duration: "15:30",
          completed: false,
          resources: [
            { id: 1, title: 'Support PDF', url: '#' },
            { id: 2, title: 'Code source', url: '#' }
          ]
        },
        {
          id: 2,
          type: "document",
          title: "Installation et configuration",
          duration: "10:45",
          completed: false,
          resources: [
            { id: 1, title: 'Support PDF', url: '#' },
            { id: 2, title: 'Code source', url: '#' }
          ]
        }
      ],
      hiddenLessons: 8
    },
    {
      title: "La Composition API",
      duration: "3h 45min",
      previewLessons: [
        {
          id: 3,
          type: "video",
          title: "Introduction aux Composables",
          duration: "20:15",
          completed: false,
          resources: [
            { id: 1, title: 'Support PDF', url: '#' },
            { id: 2, title: 'Code source', url: '#' }
          ]
        }
      ],
      hiddenLessons: 12
    }
  ],
  features: [
    { text: "Accès à vie au contenu" },
    { text: "21 heures de vidéo HD" },
    { text: "85 ressources téléchargeables" },
    { text: "Certificat d'achèvement" },
    { text: "Accès sur mobile et TV" }
  ]
})

// Nouvel état pour gérer l'expansion des modules
const expandedModules = ref({})

const currentLesson = ref(null)
const isPlaying = ref(false)
const playbackSpeed = ref(1)
const currentTime = ref('00:00')
const showResources = ref(false)
const activeTab = ref('contenu')
const notes = ref({})
const progress = ref(0)

// Computed
const videoProgress = computed(() => {
  if (!currentLesson.value) return 0
  return 30 // Exemple de progression
})

const tabs = [
  { id: 'contenu', label: 'Contenu' },
  { id: 'exercices', label: 'Exercices' },
  { id: 'notes', label: 'Notes' }
]

// Nouvelle méthode pour basculer l'état d'expansion d'un module
function toggleModule(moduleIndex) {
  expandedModules.value[moduleIndex] = !expandedModules.value[moduleIndex]
}

// Méthodes
function getAllLessons(module) {
  return [...module.previewLessons]
}

function selectLesson(lesson) {
  currentLesson.value = lesson
  currentTime.value = '00:00'
  isPlaying.value = false
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
}

function toggleFullscreen() {
  // Logique fullscreen
}

function seekVideo(event) {
  if (!currentLesson.value) return
  const rect = event.target.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  // Mise à jour de la position de la vidéo
}
</script> -->





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
const showSidebar = ref(true)
const expandedModules = ref({})
const currentModule = ref(0)
const currentLessonIndex = ref(0)
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