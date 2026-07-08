<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <FontAwesomeIcon :icon="faTriangleExclamation" class="text-6xl text-red-300 mb-4" />
      <h3 class="text-xl font-semibold text-gray-500">{{ error }}</h3>
      <button @click="router.back()" class="mt-4 text-primary hover:underline">Retour</button>
    </div>

    <template v-else-if="institution">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div
          class="h-48 flex items-center justify-center relative"
          :style="{ backgroundColor: institution.brand_color || '#10b981' }"
        >
          <div v-if="institution.logo_url" class="w-28 h-28 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
            <img :src="getLogoUrl(institution.logo_url)" :alt="institution.name" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span class="text-5xl font-bold" :style="{ color: institution.brand_color || '#10b981' }">
              {{ institution.name?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ institution.name }}</h1>
                <span
                  class="px-3 py-1 text-sm font-medium rounded-full"
                  :class="statusBadgeClass(institution.status?.title)"
                >
                  {{ institution.status?.title }}
                </span>
              </div>
              <p class="text-gray-500">{{ institution.type?.title }}</p>
            </div>

            <!-- Actions pour l'admin -->
            <div v-if="isAdmin" class="mt-4 md:mt-0 flex gap-3">
              <RouterLink
                :to="`/institutions/${institution.id}/manage`"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200"
              >
                <FontAwesomeIcon :icon="faGear" />
                <span>Gérer</span>
              </RouterLink>
            </div>
          </div>

          <p v-if="institution.description" class="mt-4 text-gray-600">{{ institution.description }}</p>

          <!-- Coordonnées -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-if="institution.address" class="flex items-start gap-3">
              <FontAwesomeIcon :icon="faLocationDot" class="text-primary mt-1" />
              <div>
                <p class="text-sm text-gray-500">Adresse</p>
                <p class="text-sm font-medium">{{ institution.address }}</p>
              </div>
            </div>
            <div v-if="institution.city" class="flex items-start gap-3">
              <FontAwesomeIcon :icon="faCity" class="text-primary mt-1" />
              <div>
                <p class="text-sm text-gray-500">Ville</p>
                <p class="text-sm font-medium">{{ institution.city }}</p>
              </div>
            </div>
            <div v-if="institution.phone" class="flex items-start gap-3">
              <FontAwesomeIcon :icon="faPhone" class="text-primary mt-1" />
              <div>
                <p class="text-sm text-gray-500">Téléphone</p>
                <p class="text-sm font-medium">{{ institution.phone }}</p>
              </div>
            </div>
            <div v-if="institution.email" class="flex items-start gap-3">
              <FontAwesomeIcon :icon="faEnvelope" class="text-primary mt-1" />
              <div>
                <p class="text-sm text-gray-500">Email</p>
                <p class="text-sm font-medium">{{ institution.email }}</p>
              </div>
            </div>
          </div>

          <div v-if="institution.website" class="mt-4">
            <a :href="institution.website" target="_blank" class="text-primary hover:underline text-sm">
              {{ institution.website }}
            </a>
          </div>
        </div>
      </div>

      <!-- Statistiques -->
      <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <p class="text-3xl font-bold text-primary">{{ stats.totalCourses }}</p>
          <p class="text-sm text-gray-500 mt-1">Cours</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <p class="text-3xl font-bold text-primary">{{ stats.totalEnrollments }}</p>
          <p class="text-sm text-gray-500 mt-1">Inscriptions</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <p class="text-3xl font-bold text-primary">{{ stats.totalCertificates }}</p>
          <p class="text-sm text-gray-500 mt-1">Certificats</p>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <p class="text-3xl font-bold text-primary">{{ stats.totalAdmins }}</p>
          <p class="text-sm text-gray-500 mt-1">Administrateurs</p>
        </div>
      </div>

      <!-- Admins / Membres -->
      <div v-if="institution.admins?.length" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Administrateurs</h2>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="admin in institution.admins"
            :key="admin.id"
            class="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2"
          >
            <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {{ admin.user?.name?.charAt(0).toUpperCase() || '?' }}
            </div>
            <div>
              <p class="text-sm font-medium">{{ admin.user?.name }}</p>
              <p class="text-xs text-gray-400">{{ admin.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cours de l'institution -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold mb-4">Cours</h2>

        <div v-if="coursesLoading" class="flex justify-center py-8">
          <i class="pi pi-spin pi-spinner text-2xl text-primary"></i>
        </div>

        <div v-else-if="courses.length === 0" class="text-center py-8 text-gray-400">
          <p>Aucun cours pour cette institution</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="course in courses"
            :key="course.id"
            class="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200 cursor-pointer"
            @click="router.push(`/course-details/${course.id}`)"
          >
            <h3 class="font-semibold text-gray-900">{{ course.title }}</h3>
            <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ course.description }}</p>
            <div class="flex items-center justify-between mt-3">
              <span class="text-sm font-bold text-primary">{{ course.price?.toLocaleString() }} FCFA</span>
              <span
                class="px-2 py-0.5 text-xs rounded-full"
                :class="course.status?.title === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
              >
                {{ course.status?.title }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGear,
  faLocationDot,
  faCity,
  faPhone,
  faEnvelope,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/constants/API_URL";
import { InstitutionAPI } from "@/services/api/Institution";
import { useUserStore } from "@/stores/user";

const getLogoUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL}/${url}`;
};

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const token = computed(() => userStore.getToken());
const user = computed(() => userStore.user);

const institution = ref<Record<string, any> | null>(null);
const courses = ref<Array<Record<string, any>>>([]);
const stats = ref<Record<string, any> | null>(null);
const loading = ref(true);
const error = ref("");
const coursesLoading = ref(true);

const statusBadgeClass = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-700";
    case "Pending": return "bg-yellow-100 text-yellow-700";
    case "Rejected": return "bg-red-100 text-red-700";
    case "Suspended": return "bg-orange-100 text-orange-700";
    default: return "bg-gray-100 text-gray-600";
  }
};

const isAdmin = computed(() => {
  if (!token.value || !institution.value) return false;
  // Super Admin
  if (user.value?.roles?.some((r: any) => r.title === "Super Admin")) return true;
  // Institution admin
  return institution.value?.admins?.some(
    (a: any) => a.user_id === user.value?.id && a.role === "admin"
  );
});

onMounted(async () => {
  const id = Number(route.params.id);
  try {
    const { data } = await InstitutionAPI.getOne(id);
    institution.value = data.institution;
  } catch (e: any) {
    error.value = "Institution introuvable";
    console.error(e);
    loading.value = false;
    return;
  }

  // Charger stats
  try {
    const { data: statsData } = await InstitutionAPI.getStats(id);
    stats.value = statsData.stats;
  } catch (e) {
    console.error(e);
  }

  // Charger cours
  try {
    const { data: coursesData } = await InstitutionAPI.getCourses(id);
    courses.value = coursesData.courses;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    coursesLoading.value = false;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
