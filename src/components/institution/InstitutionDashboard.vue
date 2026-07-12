<template>
    <div class="space-y-6">
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-20">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <!-- Stats cards -->
        <div v-else class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
            <div
                v-for="stat in statistics"
                :key="stat.title"
                class="flex flex-col justify-between rounded-lg bg-white p-4 xl:p-6 shadow-sm border border-gray-100 space-y-3"
            >
                <div class="w-full flex gap-3 items-center">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="stat.bg">
                        <FontAwesomeIcon :icon="stat.icon" :class="stat.color" class="h-5" />
                    </div>
                    <h3 class="text-sm font-medium text-gray-600">{{ stat.title }}</h3>
                </div>
                <div class="w-full flex items-end justify-between">
                    <p class="text-2xl xl:text-3xl font-bold">{{ stat.value }}</p>
                </div>
            </div>
        </div>

        <!-- Derniers cours -->
        <div class="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Derniers cours</h3>
                <RouterLink
                    to="/institution/courses"
                    class="text-sm text-primary hover:underline"
                >
                    Voir tout
                </RouterLink>
            </div>

            <div v-if="coursesLoading" class="flex justify-center py-8">
                <i class="pi pi-spin pi-spinner text-2xl text-primary"></i>
            </div>

            <div v-else-if="courses.length === 0" class="text-center py-8 text-gray-400">
                <FontAwesomeIcon :icon="faBookOpen" class="text-4xl mb-2" />
                <p>Aucun cours pour le moment</p>
            </div>

            <div v-else class="space-y-3">
                <div
                    v-for="course in courses.slice(0, 5)"
                    :key="course.id"
                    class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {{ course.title?.charAt(0)?.toUpperCase() || '?' }}
                        </div>
                        <div>
                            <p class="font-medium text-gray-800 text-sm">{{ course.title }}</p>
                            <p class="text-xs text-gray-400">{{ course.instructor?.name || '—' }}</p>
                        </div>
                    </div>
                    <span
                        class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                            'bg-green-100 text-green-700': course.status?.title === 'Published',
                            'bg-yellow-100 text-yellow-700': course.status?.title === 'Submit',
                            'bg-gray-100 text-gray-600': true,
                        }"
                    >
                        {{ course.status?.title === 'Published' ? 'Publié' : course.status?.title === 'Submit' ? 'Soumis' : course.status?.title || '—' }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Erreur -->
        <div v-if="error" class="text-center py-10">
            <p class="text-red-500">{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
    faBookOpen, faUsers, faAward, faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { InstitutionAPI } from '@/services/api/Institution';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const token = computed(() => userStore.getToken());

const institution = ref<Record<string, any> | null>(null);
const stats = ref<Record<string, any> | null>(null);
const courses = ref<Array<Record<string, any>>>([]);
const loading = ref(true);
const coursesLoading = ref(true);
const error = ref('');

const statistics = computed(() => [
    { title: 'Cours', value: stats.value?.totalCourses || 0, icon: faBookOpen, bg: 'bg-blue-50', color: 'text-blue-600' },
    { title: 'Inscriptions', value: stats.value?.totalEnrollments || 0, icon: faUsers, bg: 'bg-green-50', color: 'text-green-600' },
    { title: 'Certificats', value: stats.value?.totalCertificates || 0, icon: faAward, bg: 'bg-purple-50', color: 'text-purple-600' },
    { title: 'Administrateurs', value: stats.value?.totalAdmins || 0, icon: faUserTie, bg: 'bg-orange-50', color: 'text-orange-600' },
]);

onMounted(async () => {
    try {
        const { data } = await InstitutionAPI.myInstitutions(token.value!);
        if (!data.institutions?.length) {
            error.value = 'Aucune institution trouvée';
            return;
        }
        institution.value = data.institutions[0];
        const id = institution.value.id;

        // Charger stats et cours en parallèle
        const [statsRes, coursesRes] = await Promise.all([
            InstitutionAPI.getStats(id).catch(() => null),
            InstitutionAPI.getCourses(id),
        ]);

        if (statsRes?.data?.stats) {
            stats.value = statsRes.data.stats;
        }
        courses.value = coursesRes?.data?.courses || [];
    } catch (e: any) {
        error.value = e.response?.data?.message || 'Erreur lors du chargement';
        console.error(e);
    } finally {
        loading.value = false;
        coursesLoading.value = false;
    }
});
</script>
