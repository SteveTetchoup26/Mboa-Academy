<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Sidebar desktop -->
      <aside :class="[
        'fixed left-0 top-0 h-full w-64 bg-white shadow-lg hidden lg:block z-10',
        isSmallScreen && '!block'
      ]">
        <div class="flex h-16 items-center justify-center border-b">
          <h1 class="text-xl font-bold text-primary">Espace Institution</h1>
        </div>

        <nav class="p-4">
          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.id">
              <button
                @click="navigationToSection(item.path, item.id)"
                :class="[
                  'flex w-full items-center rounded-lg p-3 gap-3 text-gray-700 transition-colors',
                  currentSection === item.id ? 'bg-green-50 text-primary' : 'hover:bg-gray-100'
                ]"
              >
                <FontAwesomeIcon :icon="item.icon" />
                {{ item.name }}
              </button>
            </li>
          </ul>
        </nav>

        <div class="absolute bottom-0 left-0 right-0 border-t">
          <!-- Bannière si institution en attente -->
          <div
            v-if="institution?.status?.title === 'Pending'"
            class="px-4 py-3 bg-yellow-50 border-b border-yellow-100"
          >
            <div class="flex items-start gap-2">
              <FontAwesomeIcon :icon="faClock" class="text-yellow-600 mt-0.5" />
              <div>
                <p class="text-xs font-medium text-yellow-800">En attente de validation</p>
                <p class="text-xs text-yellow-600">L'institution sera accessible dès qu'un administrateur l'aura approuvée.</p>
              </div>
            </div>
          </div>
          <div
            v-else-if="institution?.status?.title === 'Rejected'"
            class="px-4 py-3 bg-red-50 border-b border-red-100"
          >
            <div class="flex items-start gap-2">
              <FontAwesomeIcon :icon="faXmarkCircle" class="text-red-600 mt-0.5" />
              <div>
                <p class="text-xs font-medium text-red-800">Demande rejetée</p>
                <p class="text-xs text-red-600">Votre demande n'a pas été approuvée. Contactez le support pour plus d'informations.</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 px-4 py-3">
            <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
              {{ institution?.name?.charAt(0)?.toUpperCase() || '?' }}
            </div>
            <div class="truncate">
              <p class="font-medium text-gray-800 truncate">{{ institution?.name || 'Institution' }}</p>
              <p class="text-xs text-gray-400" v-if="institution?.type?.title">{{ institution.type.title }}</p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="flex w-full items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border-t text-sm"
          >
            <FontAwesomeIcon :icon="faRightFromBracket" />
            Déconnexion
          </button>
        </div>
      </aside>

      <!-- Overlay mobile -->
      <div
        v-if="isSmallScreen"
        @click="isSmallScreen = false"
        class="fixed inset-0 bg-black/50 z-[5] lg:hidden"
      ></div>

      <!-- Main content -->
      <main class="ml-0 lg:ml-64 px-4 py-8 md:p-8 w-full lg:w-auto">
        <header class="mb-8 flex items-start justify-between">
          <div class="space-y-10 lg:space-y-0">
            <FontAwesomeIcon @click="toogleMenu" :icon="faBars" class="h-5 block lg:hidden cursor-pointer"/>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ currentSectionTitle }}</h2>
              <p class="text-sm text-gray-500 mt-1" v-if="institution?.name">
                {{ institution.name }} — {{ institution.city || '' }}
              </p>
            </div>
          </div>

          <div></div>
        </header>

        <RouterView />

      </main>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faChartPie, faBookOpen, faUsers, faChalkboardUser, faGraduationCap,
  faBars, faClock, faXmarkCircle, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { InstitutionAPI } from '@/services/api/Institution';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const currentSection = ref(router.currentRoute.value.name);
const isSmallScreen = ref(false);
const institution = ref<Record<string, any> | null>(null);
const loading = ref(true);

const token = computed(() => userStore.getToken());
const user = computed(() => userStore.user);

const menuItems = [
  { id: 'institutionDashboard', name: 'Tableau de bord', icon: faChartPie, path: 'dashboard' },
  { id: 'institutionCourses', name: 'Cours', icon: faBookOpen, path: 'courses' },
  { id: 'institutionInstructors', name: 'Formateurs', icon: faChalkboardUser, path: 'instructors' },
  { id: 'institutionStudents', name: 'Étudiants', icon: faGraduationCap, path: 'students' },
];

const currentSectionTitle = computed(() => {
  const section = menuItems.find(item => item.id === currentSection.value);
  return section ? section.name : '';
});

const navigationToSection = (path: string, id: string) => {
  isSmallScreen.value = false;
  currentSection.value = id;
  router.push(`/institution/${path}`);
};

const toogleMenu = () => {
  isSmallScreen.value = true;
};

const handleLogout = () => {
  userStore.logout();
  router.push({ name: 'login' });
};

onMounted(async () => {
  try {
    const { data } = await InstitutionAPI.myInstitutions(token.value!);
    if (data.institutions?.length) {
      institution.value = data.institutions[0];
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(100%);
    width: 0;
}

.v-enter-to,
.v-leave-from {
    transform: translateX(0);
    width: auto;
}
</style>
