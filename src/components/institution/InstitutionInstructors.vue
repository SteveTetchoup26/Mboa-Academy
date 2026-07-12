<template>
    <div class="space-y-6">
        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-20">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <template v-else>
            <!-- Add instructor form -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Ajouter un formateur</h2>
                <div class="flex flex-col sm:flex-row gap-3">
                    <input
                        v-model.number="newInstructorId"
                        type="number"
                        placeholder="ID de l'utilisateur"
                        class="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <select
                        v-model="newInstructorRole"
                        class="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                        <option value="instructor">Formateur</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        @click="handleAddInstructor"
                        :disabled="!newInstructorId || adding"
                        class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                    >
                        <i v-if="adding" class="pi pi-spin pi-spinner"></i>
                        <span>Ajouter</span>
                    </button>
                </div>
                <p class="text-xs text-gray-400 mt-2">
                    Saisissez l'ID de l'utilisateur à ajouter comme formateur. Vous pouvez trouver l'ID dans le profil de l'utilisateur.
                </p>
            </div>

            <!-- Instructors list -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Formateurs et administrateurs</h2>

                <div v-if="instructors.length === 0" class="text-center py-8 text-gray-400">
                    <FontAwesomeIcon :icon="faChalkboardUser" class="text-4xl mb-2" />
                    <p>Aucun formateur pour le moment</p>
                </div>

                <div v-else class="space-y-3">
                    <div
                        v-for="admin in instructors"
                        :key="admin.id"
                        class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                {{ admin.user?.name?.charAt(0)?.toUpperCase() || '?' }}
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">{{ admin.user?.name || 'Utilisateur #' + admin.user_id }}</p>
                                <p class="text-xs text-gray-400">{{ admin.user?.email || '' }}</p>
                                <span
                                    class="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full"
                                    :class="admin.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                                >
                                    {{ admin.role === 'admin' ? 'Admin' : 'Formateur' }}
                                </span>
                            </div>
                        </div>
                        <button
                            v-if="admin.user_id !== currentUserId"
                            @click="handleRemoveInstructor(admin.user_id)"
                            class="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                            <FontAwesomeIcon :icon="faTrashCan" />
                        </button>
                        <span v-else class="text-xs text-gray-400">(vous)</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChalkboardUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { InstitutionAPI } from '@/services/api/Institution';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';

const userStore = useUserStore();
const toast = useToast();
const token = computed(() => userStore.getToken());
const currentUserId = computed(() => userStore.user?.id);

const institutionId = ref<number | null>(null);
const instructors = ref<Array<Record<string, any>>>([]);
const loading = ref(true);
const adding = ref(false);

const newInstructorId = ref<number | null>(null);
const newInstructorRole = ref('instructor');

const loadInstructors = async () => {
    try {
        const { data } = await InstitutionAPI.myInstitutions(token.value!);
        if (data.institutions?.length) {
            institutionId.value = data.institutions[0].id;
            const { data: detail } = await InstitutionAPI.getOne(data.institutions[0].id);
            instructors.value = detail.institution.admins || [];
        }
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const handleAddInstructor = async () => {
    if (!newInstructorId.value || !institutionId.value) return;
    adding.value = true;
    try {
        await InstitutionAPI.addAdmin(
            institutionId.value,
            { user_id: newInstructorId.value, role: newInstructorRole.value },
            token.value!
        );
        toast.add({ severity: "success", detail: "Formateur ajouté", life: 3000 });
        newInstructorId.value = null;
        await loadInstructors();
    } catch (e: any) {
        const msg = e.response?.data?.message || "Erreur lors de l'ajout";
        toast.add({ severity: "error", detail: msg, life: 4000 });
        console.error(e);
    } finally {
        adding.value = false;
    }
};

const handleRemoveInstructor = async (userId: number) => {
    if (!institutionId.value) return;
    try {
        await InstitutionAPI.removeAdmin(institutionId.value, userId, token.value!);
        toast.add({ severity: "success", detail: "Formateur retiré", life: 3000 });
        await loadInstructors();
    } catch (e: any) {
        const msg = e.response?.data?.message || "Erreur";
        toast.add({ severity: "error", detail: msg, life: 4000 });
        console.error(e);
    }
};

onMounted(loadInstructors);
</script>
