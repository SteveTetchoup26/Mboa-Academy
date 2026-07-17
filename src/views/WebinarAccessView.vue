<template>
  <div class="w-full px-4 py-10 xl:px-28 md:py-14 min-h-screen">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <FontAwesomeIcon :icon="faTriangleExclamation" class="text-5xl text-gray-300 mb-4" />
      <p class="text-gray-500 text-lg mb-2">Webinaire introuvable</p>
      <p class="text-gray-400 text-sm mb-6">{{ errorMessage }}</p>
      <button
        @click="goBack"
        class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Retour
      </button>
    </div>

    <!-- Webinar content -->
    <template v-else-if="webinar">
      <div class="max-w-3xl mx-auto">
        <!-- Back link -->
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <FontAwesomeIcon :icon="faArrowLeft" />
          <span>Retour</span>
        </button>

        <!-- Header card -->
        <div class="border rounded-lg p-6 md:p-8 mb-6">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div class="flex-1">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{{ webinar.title }}</h1>
              <p class="text-gray-500 text-sm flex items-center gap-4 flex-wrap">
                <span class="flex items-center gap-1">
                  <FontAwesomeIcon :icon="faCalendar" />
                  {{ formatDate }}
                </span>
                <span class="flex items-center gap-1">
                  <FontAwesomeIcon :icon="faClock" />
                  {{ formatTime }}
                </span>
                <span class="flex items-center gap-1">
                  <FontAwesomeIcon :icon="faHourglassHalf" />
                  {{ formatDuration }}
                </span>
              </p>
            </div>
            <!-- Status badge -->
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full shrink-0"
              :class="statusClass"
            >
              <span class="w-2 h-2 rounded-full" :class="statusDotClass"></span>
              {{ statusLabel }}
            </span>
          </div>

          <p v-if="webinar.description" class="text-gray-600 leading-relaxed mb-4">
            {{ webinar.description }}
          </p>

          <div class="flex items-center gap-3 text-sm text-gray-500 border-t pt-4">
            <FontAwesomeIcon :icon="faUserTie" />
            <span>Intervenant : <strong>{{ webinar.instructor?.name || 'À déterminer' }}</strong></span>
          </div>
        </div>

        <!-- Action card: Registration -->
        <div class="border rounded-lg p-6 md:p-8">
          <div v-if="registeringAuto" class="text-center py-4">
            <i class="pi pi-spin pi-spinner text-2xl text-primary mb-2"></i>
            <p class="text-gray-500">Inscription en cours...</p>
          </div>

          <!-- Already registered -->
          <div v-else-if="isRegistered" class="text-center py-4">
            <div class="text-green-600 text-5xl mb-3">✓</div>
            <h2 class="text-xl font-semibold text-gray-800 mb-1">Vous êtes inscrit !</h2>
            <p class="text-gray-500 mb-6">
              <template v-if="webinar.status?.title === 'Live'">
                Le webinaire est en cours, vous pouvez rejoindre la salle.
              </template>
              <template v-else>
                Vous recevrez une notification quand le webinaire commencera.
              </template>
            </p>
            <button
              v-if="webinar.status?.title === 'Live'"
              @click="joinWebinar"
              class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <FontAwesomeIcon :icon="faVideo" />
              Rejoindre le direct
            </button>
            <button
              v-else
              disabled
              class="bg-gray-100 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-default flex items-center gap-2 mx-auto"
            >
              <FontAwesomeIcon :icon="faClock" />
              Webinaire pas encore commencé
            </button>
          </div>

          <!-- Registration form (private) -->
          <div v-else-if="webinar.visibility === 'private' && !isRegistered">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Accès au webinaire privé</h2>
            <p class="text-gray-500 text-sm mb-4">
              Ce webinaire est privé. Saisissez le code d'accès fourni par l'organisateur pour vous inscrire.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <input
                v-model="accessCodeInput"
                type="text"
                placeholder="Entrez le code d'accès"
                class="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-center tracking-widest uppercase"
                @keyup.enter="handleRegister"
              />
              <button
                @click="handleRegister"
                :disabled="registering || !accessCodeInput.trim()"
                class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2"
              >
                <i v-if="registering" class="pi pi-spin pi-spinner"></i>
                <FontAwesomeIcon v-else :icon="faKey" />
                S'inscrire
              </button>
            </div>
            <p v-if="registerError" class="text-red-500 text-sm mt-2">{{ registerError }}</p>
          </div>

          <!-- Registration form (public) -->
          <div v-else class="text-center py-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Webinaire public</h2>
            <p class="text-gray-500 mb-6">Inscrivez-vous pour participer à ce webinaire.</p>
            <button
              @click="handleRegister"
              :disabled="registering"
              class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 font-medium flex items-center gap-2 mx-auto"
            >
              <i v-if="registering" class="pi pi-spin pi-spinner"></i>
              <FontAwesomeIcon v-else :icon="faUserPlus" />
              S'inscrire
            </button>
            <p v-if="registerError" class="text-red-500 text-sm mt-2">{{ registerError }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTriangleExclamation, faArrowLeft, faCalendar, faClock,
  faHourglassHalf, faUserTie, faVideo, faKey, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { WebinarAPI } from '@/services/api/Webinar';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const webinarId = computed(() => Number(route.params.id));
const codeFromUrl = computed(() => (route.query.code as string) || '');

const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const webinar = ref<Record<string, any> | null>(null);

const isRegistered = ref(false);
const registering = ref(false);
const registerError = ref('');
const accessCodeInput = ref('');
const registeringAuto = ref(false);

// ── Computed ──

const formatDate = computed(() => {
  if (!webinar.value?.start_date) return '';
  return new Date(webinar.value.start_date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
});

const formatTime = computed(() => {
  if (!webinar.value?.start_date) return '';
  return new Date(webinar.value.start_date).toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  });
});

const formatDuration = computed(() => {
  const d = webinar.value?.duration;
  if (!d) return '';
  const h = Math.floor(d / 60);
  const m = d % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m}`;
});

const statusLabel = computed(() => {
  switch (webinar.value?.status?.title) {
    case 'Upcoming': return 'À venir';
    case 'Live': return 'En direct';
    case 'Past': return 'Terminé';
    case 'Cancelled': return 'Annulé';
    default: return '';
  }
});

const statusClass = computed(() => {
  switch (webinar.value?.status?.title) {
    case 'Upcoming': return 'bg-blue-100 text-blue-700';
    case 'Live': return 'bg-red-100 text-red-700';
    case 'Past': return 'bg-gray-100 text-gray-600';
    case 'Cancelled': return 'bg-red-50 text-red-500';
    default: return 'bg-gray-100 text-gray-600';
  }
});

const statusDotClass = computed(() => {
  switch (webinar.value?.status?.title) {
    case 'Live': return 'bg-red-500 animate-pulse';
    case 'Upcoming': return 'bg-blue-500';
    case 'Past': return 'bg-gray-400';
    case 'Cancelled': return 'bg-red-400';
    default: return 'bg-gray-400';
  }
});

// ── Methods ──

const loadWebinar = async () => {
  loading.value = true;
  error.value = false;
  try {
    const { data } = await WebinarAPI.getOne(webinarId.value);
    webinar.value = data.webinar;
  } catch (e: any) {
    error.value = true;
    errorMessage.value = e.response?.data?.message || "Impossible de charger le webinaire.";
    return;
  } finally {
    loading.value = false;
  }

  // Si un code est présent dans l'URL, tenter l'inscription automatique
  if (codeFromUrl.value && webinar.value?.visibility === 'private') {
    accessCodeInput.value = codeFromUrl.value;
    await autoRegister();
  }
};

const autoRegister = async () => {
  if (!userStore.getToken()) {
    // Pas connecté → rediriger vers login avec un redirect contenant le code
    router.push({
      name: 'login',
      query: { redirect: route.fullPath },
    });
    return;
  }

  registeringAuto.value = true;
  try {
    await WebinarAPI.register(webinarId.value, {
      access_code: codeFromUrl.value,
    });
    isRegistered.value = true;
    toast.add({ severity: 'success', detail: 'Inscription réussie !', life: 3000 });
  } catch (e: any) {
    if (e.response?.status === 401) {
      userStore.logout();
      router.push({ name: 'login', query: { redirect: route.fullPath } });
      return;
    }
    // Si l'auto-inscription échoue (mauvais code, déjà inscrit, etc.),
    // on laisse l'utilisateur voir la page et réessayer manuellement
    registerError.value = e.response?.data?.message || "Inscription automatique échouée.";
    toast.add({ severity: 'warn', detail: registerError.value, life: 4000 });
  } finally {
    registeringAuto.value = false;
  }
};

const handleRegister = async () => {
  if (!userStore.getToken()) {
    router.push({
      name: 'login',
      query: { redirect: route.fullPath },
    });
    return;
  }

  registering.value = true;
  registerError.value = '';
  try {
    const body: Record<string, any> = {};
    if (webinar.value?.visibility === 'private') {
      body.access_code = accessCodeInput.value.trim();
    }
    await WebinarAPI.register(webinarId.value, body);
    isRegistered.value = true;
    toast.add({ severity: 'success', detail: 'Inscription réussie !', life: 3000 });
  } catch (e: any) {
    if (e.response?.status === 401) {
      userStore.logout();
      router.push({ name: 'login', query: { redirect: route.fullPath } });
      return;
    }
    registerError.value = e.response?.data?.message || "Erreur lors de l'inscription.";
  } finally {
    registering.value = false;
  }
};

const joinWebinar = () => {
  router.push({ name: 'webinarRoom', params: { id: webinarId.value } });
};

const goBack = () => {
  router.back();
};

onMounted(loadWebinar);
</script>
