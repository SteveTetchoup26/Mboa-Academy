<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Institutions</h1>
        <p class="text-gray-500 mt-1">Découvrez les établissements partenaires</p>
      </div>
      <RouterLink
        v-if="token"
        to="/institutions/create"
        class="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200"
      >
        <FontAwesomeIcon :icon="faPlus" />
        <span>Créer une institution</span>
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <!-- Empty -->
    <div v-else-if="institutions.length === 0" class="text-center py-20">
      <FontAwesomeIcon :icon="faBuilding" class="text-6xl text-gray-300 mb-4" />
      <h3 class="text-xl font-semibold text-gray-500">Aucune institution pour le moment</h3>
      <p class="text-gray-400 mt-2">Soyez le premier à créer une institution</p>
      <RouterLink
        v-if="token"
        to="/institutions/create"
        class="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200"
      >
        Créer une institution
      </RouterLink>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="institution in institutions"
        :key="institution.id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
        @click="router.push(`/institutions/${institution.id}`)"
      >
        <!-- Header / Logo -->
        <div
          class="h-32 flex items-center justify-center relative"
          :style="{ backgroundColor: institution.brand_color || '#10b981' }"
        >
          <div v-if="institution.logo_url" class="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
            <img :src="getLogoUrl(institution.logo_url)" :alt="institution.name" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span class="text-3xl font-bold" :style="{ color: institution.brand_color || '#10b981' }">
              {{ institution.name?.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ institution.name }}</h3>
            <span
              class="px-2 py-1 text-xs font-medium rounded-full"
              :class="statusBadgeClass(institution.status?.title)"
            >
              {{ institution.status?.title }}
            </span>
          </div>
          <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ institution.description || 'Aucune description' }}</p>
          <div class="flex items-center gap-4 text-xs text-gray-400">
            <span v-if="institution.city">{{ institution.city }}</span>
            <span v-if="institution.type?.title">{{ institution.type.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/constants/API_URL";
import { InstitutionAPI } from "@/services/api/Institution";
import { useUserStore } from "@/stores/user";

const getLogoUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL}/${url}`;
};

const router = useRouter();
const userStore = useUserStore();
const token = computed(() => userStore.getToken());

const institutions = ref<Array<Record<string, any>>>([]);
const loading = ref(true);

const statusBadgeClass = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-700";
    case "Pending": return "bg-yellow-100 text-yellow-700";
    case "Rejected": return "bg-red-100 text-red-700";
    case "Suspended": return "bg-orange-100 text-orange-700";
    default: return "bg-gray-100 text-gray-600";
  }
};

onMounted(async () => {
  try {
    const { data } = await InstitutionAPI.getAll();
    institutions.value = data.institutions;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
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
