<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex justify-between gap-4">
            <div class="flex w-4/5 items-center px-4 rounded-2xl gap-2 bg-gray-100 md:w-2/5">
                <FontAwesomeIcon :icon="faSearch" color="gray" />
                <input v-model="searchQuery" type="text" class="bg-transparent outline-none flex-1 p-1 w-full" placeholder="Recherchez un cours...">
            </div>
            <button
                @click="openCreateDrawer"
                class="flex items-center gap-2 text-white bg-primary w-max text-sm md:text-[15px] rounded-md py-1 px-2 md:py-2 md:px-4 hover:bg-secondary transition-all duration-150"
            >
                <FontAwesomeIcon :icon="faPlus" />
                <span class="hidden md:block">Nouveau</span>
            </button>
        </div>

        <!-- Loading -->
        <div v-if="appStore.loading" class="flex justify-center py-20">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <!-- Empty -->
        <div v-else-if="filteredCourses.length === 0" class="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <FontAwesomeIcon :icon="faBookOpen" class="text-6xl text-gray-300 mb-4" />
            <h3 class="text-xl font-semibold text-gray-500 mb-2">Aucun cours</h3>
            <p class="text-gray-400">Créez votre premier cours pour commencer</p>
        </div>

        <!-- Courses table -->
        <div v-else class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-200">
                            <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cours</th>
                            <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Statut</th>
                            <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Visibilité</th>
                            <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Étudiants</th>
                            <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="course in displayedCourses" :key="course.id" class="hover:bg-gray-50 transition-colors">
                            <td class="px-4 py-4">
                                <div class="flex items-center gap-3">
                                    <img
                                        v-if="course.cover_courses?.[0]"
                                        :src="getFileUrl(course.cover_courses[0].file_name)"
                                        class="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                        alt=""
                                    />
                                    <div v-else class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                                        {{ course.title?.charAt(0)?.toUpperCase() || '?' }}
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-800 text-sm">{{ course.title }}</p>
                                        <p class="text-xs text-gray-400">
                                            {{ course.categories?.length ? course.categories.map((c: any) => c.title).join(', ') : '' }}
                                            <span v-if="course.price !== undefined"> &middot; {{ course.price }} FCFA</span>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-4 hidden md:table-cell">
                                <span
                                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                                    :class="statusBadge(course.status?.title)"
                                >
                                    {{ statusLabel(course.status?.title) }}
                                </span>
                            </td>
                            <td class="px-4 py-4 hidden sm:table-cell">
                                <span
                                    v-if="course.visibility"
                                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                                    :class="course.visibility === 'private' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                                >
                                    <FontAwesomeIcon :icon="course.visibility === 'private' ? faLock : faGlobe" />
                                    {{ course.visibility === 'private' ? 'Privé' : 'Public' }}
                                </span>
                                <span v-else class="text-xs text-gray-400">&mdash;</span>
                            </td>
                            <td class="px-4 py-4 text-center hidden sm:table-cell">
                                <span class="text-sm font-medium text-gray-700">{{ course.enrolledStudents || 0 }}</span>
                            </td>
                            <td class="px-4 py-4">
                                <div class="flex items-center justify-center gap-2">
                                    <button
                                        @click="viewCourse(course.id)"
                                        class="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Voir"
                                    >
                                        <FontAwesomeIcon :icon="faEye" />
                                    </button>
                                    <button
                                        @click="openEditDrawer(course)"
                                        class="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Modifier"
                                    >
                                        <FontAwesomeIcon :icon="faPenToSquare" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="text-xs md:text-[15px] flex items-center justify-center gap-1 md:gap-4 mb-8">
            <button @click="prevPage" :disabled="currentPage === 1" class="py-3 px-4 rounded-full hover:bg-gray-200 disabled:opacity-50">
                <FontAwesomeIcon :icon="faChevronLeft"/>
            </button>
            <div class="flex gap-2 items-center">
                <button v-if="shouldShowFirst" @click="anyPage(1)" :class="getPageButtonClass(1)">1</button>
                <span v-if="shouldShowFirstEllipsis" class="px-1 md:px-2">...</span>
                <button v-for="page in visiblePages" :key="page" @click="anyPage(page)" :class="getPageButtonClass(page)">{{ page }}</button>
                <span v-if="shouldShowLastEllipsis" class="px-1 md:px-2">...</span>
                <button v-if="shouldShowLast" @click="anyPage(totalPages)" :class="getPageButtonClass(totalPages)">{{ totalPages }}</button>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="py-3 px-4 rounded-full hover:bg-gray-200 disabled:opacity-50">
                <FontAwesomeIcon :icon="faChevronRight"/>
            </button>
        </div>

        <!-- ════════════════════════════════════════════════════════
             DRAWER CRÉATION / ÉDITION DE COURS
             ════════════════════════════════════════════════════════ -->
        <Transition name="drawer-slide">
            <div v-if="drawerOpen" class="fixed inset-0 z-50 flex justify-end">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/40" @click="closeDrawer"></div>

                <!-- Panneau -->
                <div class="relative w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
                    <!-- Header -->
                    <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <h2 class="text-lg font-semibold text-gray-800">
                            {{ editingCourse ? 'Modifier le cours' : 'Créer un cours' }}
                        </h2>
                        <button @click="closeDrawer" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <FontAwesomeIcon :icon="faXmark" class="text-gray-500 h-5 w-5" />
                        </button>
                    </div>

                    <div class="px-6 py-6 space-y-6">
                        <!-- ═══ INFOS GÉNÉRALES ═══ -->
                        <div class="bg-gray-50 rounded-lg p-5 space-y-4">
                            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Informations générales</h3>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Titre du cours *</label>
                                <input
                                    v-model="form.title"
                                    type="text"
                                    class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ex: Introduction à Vue Js"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    v-model="form.description"
                                    rows="3"
                                    class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Décrivez votre cours..."
                                ></textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Langue d'enseignement</label>
                                <select v-model="form.language" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                                    <option value="Français">Français</option>
                                    <option value="Anglais">Anglais</option>
                                    <option value="Lingala">Lingala</option>
                                    <option value="Swahili">Swahili</option>
                                    <option value="Ewondo">Ewondo</option>
                                    <option value="Bamiléké">Bamiléké</option>
                                </select>
                            </div>

                            <!-- Catégories -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        v-for="cat in categories"
                                        :key="cat.id"
                                        type="button"
                                        @click="toggleCategory(cat.id)"
                                        :class="[
                                            'px-3 py-1.5 rounded-lg border text-sm transition-all',
                                            form.categories.includes(cat.id)
                                                ? 'border-primary bg-primary/5 text-primary font-medium'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                        ]"
                                    >
                                        {{ cat.title }}
                                    </button>
                                </div>
                                <p v-if="categories.length === 0" class="text-xs text-gray-400 mt-1">Chargement des catégories&hellip;</p>
                            </div>

                            <!-- Prix -->
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
                                    <input
                                        v-model.number="form.price"
                                        type="number"
                                        min="0"
                                        class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="0 = gratuit"
                                    />
                                    <p v-if="form.price === 0" class="mt-1 text-xs text-gray-400">Gratuit</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Prix original (FCFA)</label>
                                    <input
                                        v-model.number="form.original_price"
                                        type="number"
                                        min="0"
                                        class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Prix avant réduction"
                                    />
                                    <p v-if="form.original_price > form.price" class="mt-1 text-xs text-green-500">
                                        Réduction de {{ Math.round((1 - form.price / form.original_price) * 100) }}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- ═══ IMAGE DE COUVERTURE ═══ -->
                        <div class="bg-gray-50 rounded-lg p-5 space-y-3">
                            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Image de couverture</h3>
                            <div
                                @click="coverInputRef?.click()"
                                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                            >
                                <div v-if="coverPreview" class="mb-2">
                                    <img :src="coverPreview" class="max-h-40 mx-auto rounded-lg object-cover" alt="Aperçu" />
                                </div>
                                <FontAwesomeIcon v-else :icon="faImage" class="text-3xl text-gray-300 mb-2" />
                                <p class="text-sm text-gray-500">
                                    {{ coverPreview ? 'Cliquez pour changer' : 'Cliquez pour ajouter une image de couverture' }}
                                </p>
                                <p class="text-xs text-gray-400 mt-1">Formats acceptés : JPG, PNG, WebP</p>
                            </div>
                            <input ref="coverInputRef" type="file" accept="image/*" class="hidden" @change="onCoverSelected" />
                        </div>

                        <!-- ═══ OBJECTIFS ═══ -->
                        <div class="bg-gray-50 rounded-lg p-5 space-y-3">
                            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Objectifs d'apprentissage</h3>
                            <p class="text-xs text-gray-400">Ce que les étudiants apprendront dans ce cours</p>
                            <div v-for="(obj, idx) in form.objectives" :key="idx" class="flex items-center gap-2">
                                <input
                                    v-model="form.objectives[idx]"
                                    type="text"
                                    placeholder="Ex: Maîtriser la Composition API"
                                    class="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button @click="removeObjective(idx)" type="button" class="p-2 text-red-400 hover:text-red-600" title="Supprimer">
                                    <FontAwesomeIcon :icon="faXmark" />
                                </button>
                            </div>
                            <button @click="addObjective" type="button" class="text-sm text-primary hover:underline flex items-center gap-1">
                                <FontAwesomeIcon :icon="faPlus" /> Ajouter un objectif
                            </button>
                        </div>

                        <!-- ═══ FONCTIONNALITÉS ═══ -->
                        <div class="bg-gray-50 rounded-lg p-5 space-y-3">
                            <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Fonctionnalités du cours</h3>
                            <p class="text-xs text-gray-400">Ce que le cours inclut (ex: Accès à vie, certificat, etc.)</p>
                            <div v-for="(feat, idx) in form.features" :key="idx" class="flex items-center gap-2">
                                <input
                                    v-model="form.features[idx]"
                                    type="text"
                                    placeholder="Ex: Accès à vie au contenu"
                                    class="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button @click="removeFeature(idx)" type="button" class="p-2 text-red-400 hover:text-red-600" title="Supprimer">
                                    <FontAwesomeIcon :icon="faXmark" />
                                </button>
                            </div>
                            <button @click="addFeature" type="button" class="text-sm text-primary hover:underline flex items-center gap-1">
                                <FontAwesomeIcon :icon="faPlus" /> Ajouter une fonctionnalité
                            </button>
                        </div>

                        <!-- ═══ MODULES & LEÇONS ═══ -->
                        <div class="bg-gray-50 rounded-lg p-5 space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Modules et leçons</h3>
                                    <p class="text-xs text-gray-400">Structurez le contenu de votre cours</p>
                                </div>
                                <button @click="addModule" type="button" class="text-sm px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-1">
                                    <FontAwesomeIcon :icon="faPlus" /> Module
                                </button>
                            </div>

                            <div v-for="(mod, modIdx) in form.modules" :key="modIdx" class="border border-gray-200 rounded-lg bg-white overflow-hidden">
                                <div class="flex items-center gap-2 p-3 bg-gray-100/50 border-b border-gray-200">
                                    <FontAwesomeIcon :icon="faFolderOpen" class="text-gray-400 text-sm" />
                                    <input
                                        v-model="mod.title"
                                        type="text"
                                        placeholder="Titre du module"
                                        class="flex-1 bg-transparent border-none p-0 text-sm font-medium focus:outline-none focus:ring-0 placeholder-gray-400"
                                    />
                                    <button @click="removeModule(modIdx)" type="button" class="p-1 text-red-400 hover:text-red-600" title="Supprimer le module">
                                        <FontAwesomeIcon :icon="faTrashCan" class="text-xs" />
                                    </button>
                                </div>

                                <div class="p-3 space-y-3">
                                    <div v-for="(lesson, lesIdx) in mod.lessons" :key="lesIdx" class="border border-gray-100 rounded-lg p-2.5 bg-gray-50/50 space-y-2">
                                        <div class="flex items-center gap-2">
                                            <select
                                                v-model="lesson.type"
                                                class="text-xs border border-gray-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="video">🎬 Vidéo</option>
                                                <option value="document">📄 Document</option>
                                                <option value="quiz">❓ Quiz</option>
                                            </select>
                                            <input
                                                v-model="lesson.title"
                                                type="text"
                                                placeholder="Titre de la leçon"
                                                class="flex-1 rounded-lg border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                            <button @click="removeLesson(modIdx, lesIdx)" type="button" class="p-1.5 text-red-400 hover:text-red-600" title="Supprimer la leçon">
                                                <FontAwesomeIcon :icon="faXmark" class="text-xs" />
                                            </button>
                                        </div>
                                        <div v-if="lesson.type === 'video'" class="flex items-center gap-2 pl-1">
                                            <label
                                                :for="`video-${modIdx}-${lesIdx}`"
                                                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs cursor-pointer hover:bg-blue-100 transition-colors"
                                            >
                                                <FontAwesomeIcon :icon="faVideo" />
                                                <span>{{ lesson.videoFileName || 'Importer une vidéo' }}</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                :id="`video-${modIdx}-${lesIdx}`"
                                                class="hidden"
                                                @change="handleVideoUpload($event, modIdx, lesIdx)"
                                            />
                                            <span v-if="lesson.videoFileName" class="text-xs text-gray-400">{{ lesson.videoFileSize }}</span>
                                        </div>
                                    </div>
                                    <button @click="addLesson(modIdx)" type="button" class="text-xs text-primary hover:underline flex items-center gap-1">
                                        <FontAwesomeIcon :icon="faPlus" /> Ajouter une leçon
                                    </button>
                                </div>
                            </div>

                            <p v-if="form.modules.length === 0" class="text-xs text-gray-400 italic">
                                Aucun module pour le moment. Ajoutez-en un pour structurer votre cours.
                            </p>
                        </div>

                        <!-- ═══ BOUTONS ACTION ═══ -->
                        <div class="flex gap-3 pt-2 sticky bottom-0 bg-white pb-2">
                            <button
                                @click="closeDrawer"
                                class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                @click="handleSaveCourse"
                                :disabled="saving"
                                class="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <i v-if="saving" class="pi pi-spin pi-spinner"></i>
                                {{ editingCourse ? 'Enregistrer les modifications' : 'Soumettre le cours' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
    faChevronLeft, faChevronRight, faPlus, faSearch, faBookOpen,
    faEye, faPenToSquare, faGlobe, faLock, faXmark,
    faFolderOpen, faImage, faVideo, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from "./../../stores/user";
import { CourseAPI } from './../../services/api/Course';
import useAppStore from './../../stores/app';
import { getFileUrl } from '../../helpers/file-url';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();
const toast = useToast();

const searchQuery = ref('');
const courses = ref<Record<string, any>[]>([]);

const windowSize = 4;
const coursesPerPage = 8;
const currentPage = ref(1);

const totalPages = computed(() =>
    Math.ceil(filteredCourses.value.length / coursesPerPage)
);

const filteredCourses = computed(() => {
    let result = courses.value;
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(c =>
            c.title?.toLowerCase().includes(q) ||
            c.instructor?.name?.toLowerCase().includes(q)
        );
    }
    return result;
});

const displayedCourses = computed(() => {
    const start = (currentPage.value - 1) * coursesPerPage;
    return filteredCourses.value.slice(start, start + coursesPerPage);
});

const visiblePages = computed(() => {
    let start = Math.max(currentPage.value - Math.floor(windowSize / 2), 1);
    let end = Math.min(start + windowSize - 1, totalPages.value);
    if (end === totalPages.value) {
        start = Math.max(end - windowSize + 1, 1);
    }
    if (start === 1) {
        end = Math.min(windowSize, totalPages.value);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const shouldShowFirst = computed(() => !visiblePages.value.includes(1));
const shouldShowLast = computed(() => !visiblePages.value.includes(totalPages.value));
const shouldShowFirstEllipsis = computed(() => shouldShowFirst.value && visiblePages.value[0] > 2);
const shouldShowLastEllipsis = computed(() => shouldShowLast.value && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1);

const getPageButtonClass = (page: number) => [
    'w-7 md:w-8 h-7 md:h-8 rounded-full transition-all duration-200 ease-in-out',
    currentPage.value === page ? 'bg-primary text-white' : 'hover:bg-gray-200'
];

const statusBadge = (status: string) => {
    switch (status) {
        case 'Published': return 'bg-green-100 text-green-700';
        case 'Submit': return 'bg-yellow-100 text-yellow-700';
        case 'Draft': return 'bg-gray-100 text-gray-600';
        case 'Archived': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const statusLabel = (status: string) => {
    switch (status) {
        case 'Published': return 'Publié';
        case 'Submit': return 'Soumis';
        case 'Draft': return 'Brouillon';
        case 'Archived': return 'Archivé';
        default: return status || '—';
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        router.push({ name: route.name, query: { ...route.query, page: currentPage.value } });
    }
};

const anyPage = (page: number) => {
    currentPage.value = page;
    router.push({ name: route.name, query: { ...route.query, page } });
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        router.push({ name: route.name, query: { ...route.query, page: currentPage.value } });
    }
};

const viewCourse = (id: number) => {
    router.push({ name: 'courseDetails', params: { courseId: id } });
};

// ─────────────────────────────────────────────────────────
// DRAWER — STATE
// ─────────────────────────────────────────────────────────

const drawerOpen = ref(false);
const editingCourse = ref<Record<string, any> | null>(null);
const saving = ref(false);

const categories = ref<Array<Record<string, any>>>([]);

// Cover image
const coverInputRef = ref<HTMLInputElement | null>(null);
const coverFile = ref<File | null>(null);
const coverPreview = ref<string | null>(null);

// Videos upload
const videoFiles = ref<Array<Array<File>>>([]);

const form = ref({
    title: '',
    description: '',
    language: 'Français',
    price: 0,
    original_price: 0,
    categories: [] as number[],
    modules: [] as Array<{
        title: string;
        lessons: Array<{
            type: string;
            title: string;
            resume: string;
            duration: number;
            videoFileName?: string;
            videoFileSize?: string;
        }>;
    }>,
    objectives: [] as string[],
    features: [] as string[],
});

// ─────────────────────────────────────────────────────────
// DRAWER — METHODS
// ─────────────────────────────────────────────────────────

const toggleCategory = (catId: number) => {
    const idx = form.value.categories.indexOf(catId);
    if (idx === -1) {
        form.value.categories.push(catId);
    } else {
        form.value.categories.splice(idx, 1);
    }
};

const addModule = () => {
    form.value.modules.push({ title: '', lessons: [] });
};

const removeModule = (idx: number) => {
    form.value.modules.splice(idx, 1);
};

const addLesson = (modIdx: number) => {
    form.value.modules[modIdx].lessons.push({ type: 'video', title: '', resume: '', duration: 0 });
};

const removeLesson = (modIdx: number, lesIdx: number) => {
    form.value.modules[modIdx].lessons.splice(lesIdx, 1);
};

const addObjective = () => {
    form.value.objectives.push('');
};

const removeObjective = (idx: number) => {
    form.value.objectives.splice(idx, 1);
};

const addFeature = () => {
    form.value.features.push('');
};

const removeFeature = (idx: number) => {
    form.value.features.splice(idx, 1);
};

const onCoverSelected = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        coverFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => { coverPreview.value = e.target?.result as string; };
        reader.readAsDataURL(file);
    }
};

const handleVideoUpload = (event: Event, modIdx: number, lesIdx: number) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        if (!videoFiles.value[modIdx]) videoFiles.value[modIdx] = [];
        videoFiles.value[modIdx][lesIdx] = file;

        const lesson = form.value.modules[modIdx].lessons[lesIdx];
        lesson.videoFileName = file.name;
        lesson.videoFileSize = (file.size / (1024 * 1024)).toFixed(1) + ' Mo';
    }
};

const openCreateDrawer = () => {
    editingCourse.value = null;
    coverFile.value = null;
    coverPreview.value = null;
    videoFiles.value = [];
    form.value = {
        title: '',
        description: '',
        language: 'Français',
        price: 0,
        original_price: 0,
        categories: [],
        modules: [],
        objectives: [],
        features: [],
    };
    drawerOpen.value = true;
};

const openEditDrawer = (course: Record<string, any>) => {
    editingCourse.value = course;
    coverFile.value = null;
    coverPreview.value = null;
    form.value = {
        title: course.title || '',
        description: course.description || '',
        language: course.language?.description || 'Français',
        price: course.price || 0,
        original_price: course.original_price || 0,
        categories: (course.categories || []).map((c: any) => typeof c === 'number' ? c : c.id),
        modules: (course.modules || []).map((m: any) => ({
            title: m.title || '',
            lessons: (m.lessons || []).map((l: any) => ({
                type: l.type || 'video',
                title: l.title || '',
                resume: l.resume || '',
                duration: l.duration || 0,
            })),
        })),
        objectives: (course.objectives || []).map((o: any) => typeof o === 'string' ? o : o.title || ''),
        features: (course.features || []).map((f: any) => typeof f === 'string' ? f : f.title || ''),
    };
    drawerOpen.value = true;
};

const closeDrawer = () => {
    drawerOpen.value = false;
    editingCourse.value = null;
    coverFile.value = null;
    coverPreview.value = null;
    videoFiles.value = [];
};

const loadCourses = async () => {
    try {
        const res = await CourseAPI.getAllCoursesByInstructor(userStore.getToken()!);
        const enriched = (res?.data.courses || []).map((course: any) => ({
            ...course,
            enrolledStudents: (course.enrollments || []).length || 0,
        }));
        courses.value = enriched;
    } catch (error) {
        console.error(error);
    }
};

const handleSaveCourse = async () => {
    if (!form.value.title.trim()) {
        toast.add({ severity: 'error', detail: 'Le titre est requis', life: 3000 });
        return;
    }

    saving.value = true;
    try {
        if (editingCourse.value) {
            // UPDATE — TODO: implement update endpoint if needed
            toast.add({ severity: 'info', detail: 'Mode édition pas encore implémenté', life: 3000 });
            closeDrawer();
            return;
        }

        // CREATE
        const hasCover = !!coverFile.value;
        const hasVideos = videoFiles.value.some(mod => mod?.some(f => !!f));

        const courseData = {
            title: form.value.title,
            description: form.value.description,
            price: form.value.price,
            original_price: form.value.original_price,
            language: { code: form.value.language === 'Anglais' ? 'EN' : 'FR', description: form.value.language },
            categories: form.value.categories,
            modules: form.value.modules.map(m => ({
                title: m.title,
                lessons: m.lessons.map(l => ({
                    type: l.type,
                    title: l.title,
                    resume: l.resume || '',
                    duration: l.duration,
                    video: { file_name: '', format: '' },
                })),
            })),
            objectives: form.value.objectives,
            features: form.value.features,
            cover_course: { file_name: 'photo.png', format: 'png' },
            certificateEnabled: false,
        };

        const fd = new FormData();
        fd.append('data', JSON.stringify(courseData));
        if (coverFile.value) fd.append('cover_image', coverFile.value);

        for (const moduleVideos of videoFiles.value) {
            if (moduleVideos) {
                for (const video of moduleVideos) {
                    if (video) fd.append('videos', video);
                }
            }
        }

        const token = userStore.getToken();
        await CourseAPI.create(fd, token!);

        toast.add({ severity: 'success', detail: 'Cours soumis avec succès !', life: 3000 });
        closeDrawer();
        await loadCourses();

    } catch (e: any) {
        const msg = e.response?.data?.message || "Erreur lors de l'enregistrement";
        toast.add({ severity: 'error', detail: msg, life: 4000 });
        console.error(e);
    } finally {
        saving.value = false;
    }
};

// ─────────────────────────────────────────────────────────
// LIFECYCLE
// ─────────────────────────────────────────────────────────

onMounted(async () => {
    appStore.loading = true;
    await loadCourses();
    try {
        const catRes = await CourseAPI.getAllCategories();
        categories.value = catRes.data?.categories || [];
    } catch (e) {
        console.error(e);
    } finally {
        appStore.loading = false;
    }
});
</script>

<style scoped>
.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: opacity 0.2s ease;
}
.drawer-slide-enter-active > div:last-child,
.drawer-slide-leave-active > div:last-child {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
    opacity: 0;
}
.drawer-slide-enter-from > div:last-child,
.drawer-slide-leave-to > div:last-child {
    transform: translateX(100%);
}
</style>
