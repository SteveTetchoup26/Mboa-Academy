<template>
    <div class="space-y-6">
          <div class="flex justify-between gap-4">
            <div class="flex w-4/5 items-center px-4 !rounded-2xl gap-2 bg-gray-100 md:w-2/5">
                <FontAwesomeIcon :icon="faSearch" color='gray' />
                <input type="text" class="bg-transparent outline-none flex-1 p-1 w-full" placeholder="Recherchez un cours ">
            </div>
            <button
              @click="router.push({ name: 'createCourse'})"
              class="flex items-center gap-2 text-white bg-primary w-max text-sm md:text-[15px] rounded-md md:rounded-none py-1 px-2 md:py-2 md:px-4 hover:bg-secondary transition-all duration-150"
            >
              <FontAwesomeIcon :icon="faPlus" class=""/>
              <span class="hidden md:block">Nouveau</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 2xl:gap-4">
            <Course
              v-for="course in displayedCourses"
              :key="course.id"
              :course="course"
              :isInstructor="isInstructor"
            />
          </div>
          <div class="text-xs md:text-[15px] flex items-center justify-center gap-1 md:gap-4 mb-8">
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="py-3 px-4 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
                <FontAwesomeIcon :icon="faChevronLeft"/>
            </button>

            <div class="flex gap-2 items-center">
                <button
                    v-if="shouldShowFirst"
                    @click="anyPage(1)"
                    :class="getPageButtonClass(1)"
                >
                    1
                </button>

                <span v-if="shouldShowFirstEllipsis" class="px-1 md:px-2">...</span>

                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="anyPage(page)"
                    :class="getPageButtonClass(page)"
                >
                    {{ page }}
                </button>

                <span v-if="shouldShowLastEllipsis" class="px-1 md:px-2">...</span>

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
import { computed, onMounted, reactive, ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronLeft, faChevronRight, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import picture from './../../assets/images/course-2.jpg'
import Course from '../Course.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from "./../../stores/user";
import { CourseAPI } from './../../services/api/Course';
import  useAppStore from './../../stores/app';



const userStore = useUserStore();
const appStore = useAppStore();


const searchCourse = ref('');
const showNewCourseModal = ref(false);
const isInstructor = ref(true);
const route = useRoute()
const router = useRouter()

const courses = ref([]);

const windowSize = 4

const coursesPerPage = 8
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

  if (end === totalPages.value) {
    start = Math.max(end - windowSize + 1, 1)
  }

  if (start === 1) {
    end = Math.min(windowSize, totalPages.value)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})


const shouldShowFirst = computed(() => !visiblePages.value.includes(1))
const shouldShowLast = computed(() => !visiblePages.value.includes(totalPages.value))
const shouldShowFirstEllipsis = computed(() => shouldShowFirst.value && visiblePages.value[0] > 2)
const shouldShowLastEllipsis = computed(() => shouldShowLast.value && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1)

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

const token = userStore.getToken();
onMounted(async() => {
  appStore.loading = true;
  try {
    const res = await CourseAPI.getAllCoursesByInstructor(token!);

    console.log(res?.data.courses);

    courses.value = [...res?.data.courses];

  } catch (error) {
      console.error(error);
  } finally {
    appStore.loading = false;
  }
})
</script>

<style>

</style>
