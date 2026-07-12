<template>
    <div class="space-y-6">
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-20">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <template v-else>
            <!-- Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <p class="text-sm text-gray-500">Total inscriptions</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ totalEnrollments }}</p>
                </div>
                <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <p class="text-sm text-gray-500">Étudiants uniques</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ uniqueStudents }}</p>
                </div>
                <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <p class="text-sm text-gray-500">Cours avec inscriptions</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ coursesWithEnrollments }}</p>
                </div>
            </div>

            <!-- Students per course -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Inscriptions par cours</h2>

                <div v-if="courses.length === 0" class="text-center py-8 text-gray-400">
                    <FontAwesomeIcon :icon="faGraduationCap" class="text-4xl mb-2" />
                    <p>Aucun cours avec inscription</p>
                </div>

                <div v-else class="space-y-4">
                    <div
                        v-for="course in courses"
                        :key="course.id"
                        class="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                {{ course.title?.charAt(0)?.toUpperCase() || '?' }}
                            </div>
                            <div>
                                <p class="font-medium text-gray-800 text-sm">{{ course.title }}</p>
                                <p class="text-xs text-gray-400">{{ course.instructor?.name || '—' }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-lg">{{ course.enrolledCount || 0 }}</p>
                            <p class="text-xs text-gray-400">inscrit(s)</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { InstitutionAPI } from '@/services/api/Institution';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const token = computed(() => userStore.getToken());

const courses = ref<Array<Record<string, any>>>([]);
const loading = ref(true);

const totalEnrollments = computed(() =>
    courses.value.reduce((sum, c) => sum + (c.enrolledCount || 0), 0)
);
const uniqueStudents = computed(() => courses.value.length);
const coursesWithEnrollments = computed(() =>
    courses.value.filter(c => (c.enrolledCount || 0) > 0).length
);

onMounted(async () => {
    try {
        const { data: instData } = await InstitutionAPI.myInstitutions(token.value!);
        if (instData.institutions?.length) {
            const id = instData.institutions[0].id;
            const { data } = await InstitutionAPI.getCourses(id);
            courses.value = data.courses || [];

            // Le backend renvoie désormais le vrai enrolledCount via la sous-requête Sequelize
        }
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
});
</script>
