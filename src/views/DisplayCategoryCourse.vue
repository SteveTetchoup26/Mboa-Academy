<template>
    <div class="w-full !px-4 lg:!px-28 flex flex-col py-10 gap-6">
        <h3 class="font-semibold text-2xl">Cours dans la categorie <span class="font-bold text-primary">{{ route.query.category }}</span></h3>
        <div class="gap-2 flex w-full flex-wrap  justify-center lg:justify-start pt-4">
          <template v-if="loading">
            <CourseLoader 
              v-for="n in 10"
              :key="n"
            />
          </template>  
          <template v-else>
              <Course
                v-for="(course, index) in displayedCourses"
                :key="index"
                :isDisplayCategory="isDisplayCategory"
                :course="course"
              />
            </template>
            
        </div>
  
        <div class="text-xs md:text-[15px] flex items-center justify-center gap-1 md:gap-4 mb-8">
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="py-3 px-4 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
                <FontAwesomeIcon :icon="faChevronLeft"/>
            </button>
    
            <!-- <button
                v-for="page in totalPages"
                :key="page"
                @click="anyPage(page)"
                :class="[
                    'w-8 h-8 rounded-full',
                    currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-200'
                ]"
            >
                {{ page }}
            </button> -->

            <!-- Numéros de pages -->
            <div class="flex gap-2 items-center">
                <!-- Première page -->
                <button
                    v-if="shouldShowFirst"
                    @click="anyPage(1)"
                    :class="getPageButtonClass(1)"
                >
                    1
                </button>

                <!-- Points de suspension début -->
                <span v-if="shouldShowFirstEllipsis" class="px-1 md:px-2">...</span>

                <!-- Pages du milieu -->
                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="anyPage(page)"
                    :class="getPageButtonClass(page)"
                >
                    {{ page }}
                </button>

                <!-- Points de suspension fin -->
                <span v-if="shouldShowLastEllipsis" class="px-1 md:px-2">...</span>

                <!-- Dernière page -->
                <button
                    v-if="shouldShowLast"
                    @click="anyPage(totalPages)"
                    :class="getPageButtonClass(totalPages)"
                >
                    {{ totalPages }}
                </button>
            </div>
    
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="py-3 px-4 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
                <FontAwesomeIcon :icon="faChevronRight"/>
            </button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import Course from '@/components/Course.vue'
import { ref, computed, onMounted } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRoute, useRouter } from 'vue-router';
import picture from './../assets/images/course-2.jpg'
import { CourseAPI } from './../services/api/Course';
import useAppStore from '@/stores/app';
import CourseLoader from "./../components/loader/CourseLoader.vue";


const isDisplayCategory = true
const route = useRoute()
const router = useRouter();
const appStore = useAppStore();
const loading = ref(false);
// const courses = Array(300)

const courses = ref<Record<string, any>[]>([]);

const windowSize = 5 // Nombre de pages visibles dans la fenêtre
  
const coursesPerPage = 10
const currentPage = ref(1)

const totalPages = computed(() => 
    Math.ceil(courses.value.length / coursesPerPage)
)

const displayedCourses = computed(() => {
    const start = (currentPage.value - 1) * coursesPerPage
    return courses.value.slice(start, start + coursesPerPage)
})


const visiblePages = computed(() => {
  let start = Math.max(currentPage.value - Math.floor(windowSize / 2), 1)
  let end = Math.min(start + windowSize - 1, totalPages.value)

  // Ajuster le début si on est proche de la fin
  if (end === totalPages.value) {
    start = Math.max(end - windowSize + 1, 1)
  }

  // Ajuster la fin si on est au début
  if (start === 1) {
    end = Math.min(windowSize, totalPages.value)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Gestion de l'affichage des points de suspension et des extrémités
const shouldShowFirst = computed(() => !visiblePages.value.includes(1))
const shouldShowLast = computed(() => !visiblePages.value.includes(totalPages.value))
const shouldShowFirstEllipsis = computed(() => shouldShowFirst.value && visiblePages.value[0] > 2)
const shouldShowLastEllipsis = computed(() => shouldShowLast.value && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1)

// Style des boutons de page
const getPageButtonClass = (page: number) => [
  'w-7 md:w-8 h-7 md:h-8 rounded-full transition-all duration-200 ease-in-out',
  currentPage.value === page 
    ? 'bg-primary text-white' 
    : 'hover:bg-gray-200'
]

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        router.push({
            name: route.name,
            query: {
                ...route.query,
                page: currentPage.value
            }
        })
    }
}

const anyPage = (page: number) => {
    currentPage.value = page
    router.push({
            name: route.name,
            query: {
                ...route.query,
                page
            }
        })
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
        router.push({
            name: route.name,
            query: {
                ...route.query,
                page: currentPage.value
            }
        })
    }
}

onMounted(async() => {
  appStore.loading = true;
  try {
    const res = await CourseAPI.getAll();

    courses.value = [...res?.data.courses];

  } catch (error) {
      console.error(error);
  } finally {
    appStore.loading = false;
  }
})
</script>