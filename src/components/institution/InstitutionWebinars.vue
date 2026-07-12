<template>
  <div class="space-y-6">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <template v-else>
      <!-- Header with create button -->
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-semibold text-gray-900">Webinaires</h2>
          <div class="flex bg-gray-100 rounded-lg p-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="currentTab = tab.id"
              :class="[
                'px-3 py-1.5 text-sm rounded-md transition-all',
                currentTab === tab.id
                  ? 'bg-white text-primary shadow-sm font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
        <button
          @click="openCreateDrawer"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
        >
          <FontAwesomeIcon :icon="faPlus" />
          Créer un webinaire
        </button>
      </div>

      <!-- Empty -->
      <div v-if="filteredWebinars.length === 0" class="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
        <FontAwesomeIcon :icon="faVideo" class="text-6xl text-gray-300 mb-4" />
        <h3 class="text-xl font-semibold text-gray-500 mb-2">Aucun webinaire</h3>
        <p class="text-gray-400">
          {{ currentTab === 'past' ? 'Aucun webinaire passé pour le moment.' : 'Créez votre premier webinaire pour votre institution' }}
        </p>
      </div>

      <!-- Webinars table -->
      <div v-else class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Webinaire</th>
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Date</th>
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Statut</th>
                <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Accès</th>
                <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Inscrits</th>
                <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="webinar in filteredWebinars" :key="webinar.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <FontAwesomeIcon :icon="faVideo" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{{ webinar.title }}</p>
                      <p class="text-xs text-gray-400 line-clamp-1 max-w-xs">{{ webinar.description || '—' }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 hidden md:table-cell">
                  <div class="text-sm text-gray-600">
                    <p>{{ formatDate(webinar.start_date) }}</p>
                    <p class="text-xs text-gray-400">
                      {{ formatTime(webinar.start_date) }} — {{ formatTime(webinar.end_date) }}
                      <span v-if="webinar.duration">({{ webinar.duration }} min)</span>
                    </p>
                  </div>
                </td>
                <td class="px-4 py-4 hidden sm:table-cell">
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                    :class="statusClass(webinar.status?.title)"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="statusDotClass(webinar.status?.title)"></span>
                    {{ statusLabel(webinar.status?.title) }}
                  </span>
                </td>
                <td class="px-4 py-4 text-center hidden sm:table-cell">
                  <div class="flex flex-col items-center gap-1">
                    <span
                      class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full"
                      :class="webinar.visibility === 'private' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                    >
                      <FontAwesomeIcon :icon="webinar.visibility === 'private' ? faLock : faGlobe" />
                      {{ webinar.visibility === 'private' ? 'Privé' : 'Public' }}
                    </span>
                    <div v-if="webinar.visibility === 'private' && webinar.access_code" class="flex items-center gap-1 mt-1">
                      <code class="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono">{{ webinar.access_code }}</code>
                      <button
                        @click="copyAccessCode(webinar.access_code)"
                        class="text-gray-400 hover:text-primary transition-colors"
                        title="Copier le code"
                      >
                        <FontAwesomeIcon :icon="faCopy" class="text-[10px]" />
                      </button>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-center hidden sm:table-cell">
                  <span class="text-sm text-gray-600">
                    {{ webinar.registrationsCount || 0 }}
                  </span>
                </td>
                <td class="px-4 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <!-- Démarrer (si Upcoming) -->
                    <button
                      v-if="webinar.status?.title === 'Upcoming'"
                      @click="handleStartWebinar(webinar)"
                      class="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                      title="Démarrer le webinaire"
                    >
                      <FontAwesomeIcon :icon="faPlay" />
                    </button>
                    <!-- Rejoindre (si Live) -->
                    <button
                      v-if="webinar.status?.title === 'Live'"
                      @click="handleStartWebinar(webinar)"
                      class="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      title="Rejoindre le direct"
                    >
                      <FontAwesomeIcon :icon="faVideo" />
                    </button>
                    <!-- Copier le lien de partage -->
                    <button
                      @click="shareWebinarLink(webinar)"
                      class="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copier le lien du webinaire"
                    >
                      <FontAwesomeIcon :icon="faShareNodes" />
                    </button>
                    <!-- Modifier (si pas Past/Cancelled) -->
                    <button
                      v-if="webinar.status?.title !== 'Past' && webinar.status?.title !== 'Cancelled'"
                      @click="openEditDrawer(webinar)"
                      class="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <FontAwesomeIcon :icon="faPenToSquare" />
                    </button>
                    <!-- Voir inscriptions -->
                    <button
                      @click="showRegistrations(webinar)"
                      class="p-2 text-gray-500 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Voir les inscriptions"
                    >
                      <FontAwesomeIcon :icon="faUsers" />
                    </button>
                    <!-- Annuler (si Upcoming/Live) -->
                    <button
                      v-if="webinar.status?.title === 'Upcoming' || webinar.status?.title === 'Live'"
                      @click="handleCancelWebinar(webinar)"
                      class="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Annuler"
                    >
                      <FontAwesomeIcon :icon="faBan" />
                    </button>
                    <!-- Supprimer -->
                    <button
                      @click="confirmDelete(webinar)"
                      class="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <FontAwesomeIcon :icon="faTrashCan" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- ════════════════════════════════════════════════════════
         DRAWER CRÉATION / ÉDITION
         ════════════════════════════════════════════════════════ -->
    <Transition name="drawer-slide">
      <div v-if="drawerOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/40" @click="closeDrawer"></div>

        <div class="relative w-full max-w-xl bg-white shadow-xl overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ editingWebinar ? 'Modifier le webinaire' : 'Créer un webinaire' }}
            </h2>
            <button @click="closeDrawer" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FontAwesomeIcon :icon="faXmark" class="text-gray-500 h-5 w-5" />
            </button>
          </div>

          <div class="px-6 py-6 space-y-6">
            <!-- Titre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
              <input
                v-model="form.title"
                type="text"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: Session d'information sur nos formations"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Décrivez l'objectif du webinaire..."
              ></textarea>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début *</label>
                <input
                  v-model="form.start_date"
                  type="datetime-local"
                  class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin *</label>
                <input
                  v-model="form.end_date"
                  type="datetime-local"
                  class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <!-- Durée calculée -->
            <div v-if="computedDuration" class="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2">
              Durée : <strong>{{ computedDuration }}</strong>
            </div>

            <!-- Lien de réunion -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Lien de la réunion
                <span class="text-xs text-gray-400 font-normal">(Google Meet, Zoom, etc.)</span>
              </label>
              <input
                v-model="form.meeting_link"
                type="url"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://meet.google.com/..."
              />
            </div>

            <!-- Participants max -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nombre maximum de participants
                <span class="text-xs text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input
                v-model.number="form.max_participants"
                type="number"
                min="0"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Illimité"
              />
            </div>

            <!-- Visibilité -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Visibilité</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="form.visibility = 'public'"
                  :class="[
                    'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                    form.visibility === 'public'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  ]"
                >
                  <FontAwesomeIcon :icon="faGlobe" />
                  <span class="font-medium">Public</span>
                </button>
                <button
                  type="button"
                  @click="form.visibility = 'private'"
                  :class="[
                    'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                    form.visibility === 'private'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  ]"
                >
                  <FontAwesomeIcon :icon="faLock" />
                  <span class="font-medium">Privé</span>
                </button>
              </div>
              <p v-if="form.visibility === 'private'" class="mt-2 text-xs text-purple-600">
                Un code d'accès sera requis. Seuls les étudiants avec le code pourront s'inscrire.
              </p>
            </div>

            <!-- Code d'accès (privé) -->
            <div v-if="form.visibility === 'private'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Code d'accès
                <span class="text-xs text-gray-400 font-normal">(laisser vide pour génération automatique)</span>
              </label>
              <input
                v-model="form.access_code"
                type="text"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: WEBINAR-2025"
              />
            </div>

            <!-- Boutons -->
            <div class="flex gap-3 pt-2 sticky bottom-0 bg-white pb-2">
              <button
                @click="closeDrawer"
                class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                @click="handleSave"
                :disabled="saving"
                class="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <i v-if="saving" class="pi pi-spin pi-spinner"></i>
                {{ editingWebinar ? 'Enregistrer' : 'Créer le webinaire' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ════════════════════════════════════════════════════════
         MODAL INSCRIPTIONS
         ════════════════════════════════════════════════════════ -->
    <div v-if="registrationsModal.open" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Inscriptions</h3>
          <button @click="registrationsModal.open = false" class="p-1 rounded hover:bg-gray-100">
            <FontAwesomeIcon :icon="faXmark" class="text-gray-500 h-5 w-5" />
          </button>
        </div>
        <p class="text-sm text-gray-500 mb-4">
          <strong>{{ registrationsModal.webinar?.title }}</strong>
          — {{ registrationsModal.list.length }} inscrit(s)
        </p>
        <div v-if="registrationsModal.list.length === 0" class="text-center py-8 text-gray-400 text-sm">
          Aucune inscription pour le moment.
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="reg in registrationsModal.list"
            :key="reg.id"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              {{ reg.user?.name?.charAt(0)?.toUpperCase() || '?' }}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ reg.user?.name || '—' }}</p>
              <p class="text-xs text-gray-400">{{ reg.user?.email || '—' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════════════════════════════
         MODAL CONFIRMATION SUPPRESSION
         ════════════════════════════════════════════════════════ -->
    <div v-if="deleteConfirm" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Supprimer le webinaire</h3>
        <p class="text-sm text-gray-500 mb-4">
          Êtes-vous sûr de vouloir supprimer <strong>{{ deleteConfirm.title }}</strong> ?
          Cette action est irréversible.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="deleteConfirm = null"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="handleDelete"
            :disabled="saving"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <i v-if="saving" class="pi pi-spin pi-spinner"></i>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faPlus, faPenToSquare, faTrashCan, faXmark, faVideo,
  faGlobe, faLock, faLink, faPlay, faBan, faUsers,
  faCopy, faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { WebinarAPI } from '@/services/api/Webinar';
import { InstitutionAPI } from '@/services/api/Institution';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const token = computed(() => userStore.getToken());

const institutionId = ref<number | null>(null);
const loading = ref(true);
const saving = ref(false);
const webinars = ref<Array<Record<string, any>>>([]);
const currentTab = ref('upcoming');

const tabs = [
  { id: 'upcoming', label: 'À venir' },
  { id: 'past', label: 'Passés' },
];

// Drawer
const drawerOpen = ref(false);
const editingWebinar = ref<Record<string, any> | null>(null);

// Delete
const deleteConfirm = ref<Record<string, any> | null>(null);

// Registrations modal
const registrationsModal = ref<{
  open: boolean;
  webinar: Record<string, any> | null;
  list: Array<Record<string, any>>;
}>({
  open: false,
  webinar: null,
  list: [],
});

const form = ref({
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  meeting_link: '',
  visibility: 'public',
  access_code: '',
  max_participants: null as number | null,
});

// ── Computed ──

const filteredWebinars = computed(() => {
  if (currentTab.value === 'upcoming') {
    return webinars.value.filter(w =>
      w.status?.title === 'Upcoming' || w.status?.title === 'Live'
    );
  }
  return webinars.value.filter(w => w.status?.title === 'Past');
});

const computedDuration = computed(() => {
  if (!form.value.start_date || !form.value.end_date) return '';
  const start = new Date(form.value.start_date);
  const end = new Date(form.value.end_date);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return 'Date de fin antérieure à la date de début';
  const minutes = Math.round(diffMs / 60000);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
});

// ── Formatters ──

const formatDate = (date: string) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (date: string) => {
  if (!date) return '—';
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'Upcoming': return 'À venir';
    case 'Live': return 'En direct';
    case 'Past': return 'Terminé';
    case 'Cancelled': return 'Annulé';
    default: return status || '—';
  }
};

const statusClass = (status: string) => {
  switch (status) {
    case 'Upcoming': return 'bg-blue-100 text-blue-700';
    case 'Live': return 'bg-red-100 text-red-700';
    case 'Past': return 'bg-gray-100 text-gray-600';
    case 'Cancelled': return 'bg-red-50 text-red-500';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const statusDotClass = (status: string) => {
  switch (status) {
    case 'Live': return 'bg-red-500 animate-pulse';
    case 'Upcoming': return 'bg-blue-500';
    case 'Past': return 'bg-gray-400';
    case 'Cancelled': return 'bg-red-400';
    default: return 'bg-gray-400';
  }
};

// ── Data loading ──

const loadData = async () => {
  try {
    const { data: instData } = await InstitutionAPI.myInstitutions(token.value!);
    if (!instData.institutions?.length) return;
    institutionId.value = instData.institutions[0].id;

    const { data } = await WebinarAPI.getByInstitution(institutionId.value!);
    webinars.value = data.webinars || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// ── Drawer ──

const openCreateDrawer = () => {
  editingWebinar.value = null;
  form.value = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    meeting_link: '',
    visibility: 'public',
    access_code: '',
    max_participants: null,
  };
  drawerOpen.value = true;
};

const openEditDrawer = (webinar: Record<string, any>) => {
  editingWebinar.value = webinar;
  form.value = {
    title: webinar.title || '',
    description: webinar.description || '',
    // Convertir en format datetime-local
    start_date: webinar.start_date ? toDatetimeLocal(webinar.start_date) : '',
    end_date: webinar.end_date ? toDatetimeLocal(webinar.end_date) : '',
    meeting_link: webinar.meeting_link || '',
    visibility: webinar.visibility || 'public',
    access_code: webinar.access_code || '',
    max_participants: webinar.max_participants || null,
  };
  drawerOpen.value = true;
};

const closeDrawer = () => {
  drawerOpen.value = false;
  editingWebinar.value = null;
};

const toDatetimeLocal = (date: string) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

// ── Save ──

const handleSave = async () => {
  if (!form.value.title.trim()) {
    toast.add({ severity: 'error', detail: 'Le titre est requis', life: 3000 });
    return;
  }
  if (!form.value.start_date || !form.value.end_date) {
    toast.add({ severity: 'error', detail: 'Les dates de début et fin sont requises', life: 3000 });
    return;
  }

  saving.value = true;
  try {
    const webinar = editingWebinar.value;
    if (webinar) {
      const { data } = await WebinarAPI.update(webinar.id, form.value);
      const idx = webinars.value.findIndex((w) => w.id === webinar.id);
      if (idx !== -1) webinars.value[idx] = data.webinar;
      toast.add({ severity: 'success', detail: 'Webinaire mis à jour', life: 3000 });
      closeDrawer();
    } else {
      const { data } = await WebinarAPI.create({
        ...form.value,
        institution_id: institutionId.value!,
      });
      webinars.value.unshift(data.webinar);
      toast.add({ severity: 'success', detail: 'Webinaire créé avec succès !', life: 3000 });
      closeDrawer();
    }
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur lors de l'enregistrement";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
    console.error(e);
  } finally {
    saving.value = false;
  }
};

// ── Status actions ──

const handleStartWebinar = (webinar: Record<string, any>) => {
  router.push({ name: 'webinarRoom', params: { id: webinar.id } });
};

const handleCancelWebinar = async (webinar: Record<string, any>) => {
  try {
    const { data } = await WebinarAPI.updateStatus(webinar.id, 'Cancelled');
    Object.assign(webinar, data.webinar);
    toast.add({ severity: 'info', detail: 'Webinaire annulé', life: 3000 });
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
  }
};

// ── Meeting link ──

const copyMeetingLink = (webinar: Record<string, any>) => {
  if (webinar.meeting_link) {
    navigator.clipboard.writeText(webinar.meeting_link).then(() => {
      toast.add({ severity: 'success', detail: 'Lien copié !', life: 2000 });
    });
  }
};

// ── Access code ──

const copyAccessCode = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    toast.add({ severity: 'success', detail: 'Code d\'accès copié !', life: 2000 });
  });
};

// ── Share link ──

const shareWebinarLink = (webinar: Record<string, any>) => {
  let url = `${window.location.origin}/webinar/${webinar.id}`;
  if (webinar.visibility === 'private' && webinar.access_code) {
    url += `?code=${encodeURIComponent(webinar.access_code)}`;
  }
  navigator.clipboard.writeText(url).then(() => {
    toast.add({ severity: 'success', detail: 'Lien du webinaire copié !', life: 2000 });
  });
};

// ── Registrations ──

const showRegistrations = async (webinar: Record<string, any>) => {
  registrationsModal.value = {
    open: true,
    webinar,
    list: [],
  };
  try {
    const { data } = await WebinarAPI.getRegistrations(webinar.id);
    registrationsModal.value.list = data.registrations || [];
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
  }
};

// ── Delete ──

const confirmDelete = (webinar: Record<string, any>) => {
  deleteConfirm.value = webinar;
};

const handleDelete = async () => {
  const target = deleteConfirm.value;
  if (!target) return;
  saving.value = true;
  try {
    await WebinarAPI.delete(target.id);
    webinars.value = webinars.value.filter((w) => w.id !== target.id);
    toast.add({ severity: 'success', detail: 'Webinaire supprimé', life: 3000 });
    deleteConfirm.value = null;
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur lors de la suppression";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
    console.error(e);
  } finally {
    saving.value = false;
  }
};

onMounted(loadData);
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
