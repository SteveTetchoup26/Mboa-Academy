<template>
  <div class="h-screen flex flex-col bg-gray-900">
    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-white">
      <div class="text-center">
        <i class="pi pi-spin pi-spinner text-4xl mb-4"></i>
        <p class="text-lg">Chargement du webinaire...</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center text-white">
      <div class="text-center max-w-md mx-auto px-4">
        <FontAwesomeIcon :icon="faTriangleExclamation" class="text-5xl text-red-400 mb-4" />
        <p class="text-xl font-semibold mb-2">Impossible d'accéder à la salle</p>
        <p class="text-gray-400 mb-6">{{ errorMessage }}</p>
        <div class="flex gap-3 justify-center">
          <button
            @click="loadRoom"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Réessayer
          </button>
          <button
            @click="goBack"
            class="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    </div>

    <!-- Room ready -->
    <template v-else-if="webinar">
      <!-- Top bar -->
      <header class="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shrink-0">
        <div class="flex items-center gap-3">
          <button
            @click="handleLeave"
            class="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <FontAwesomeIcon :icon="faPhoneSlash" />
            <span class="hidden sm:inline">Quitter</span>
          </button>
          <div class="h-6 w-px bg-gray-600 hidden sm:block"></div>
          <div class="hidden sm:block">
            <p class="text-sm font-medium">{{ webinar.title }}</p>
            <p v-if="isLive" class="text-xs text-green-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              En direct
            </p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-400 flex items-center gap-1">
            <FontAwesomeIcon :icon="faUsers" />
            {{ participantCount }}
          </span>
          <button
            v-if="isHost"
            @click="confirmEnd"
            class="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            :disabled="ending"
          >
            <i v-if="ending" class="pi pi-spin pi-spinner"></i>
            <FontAwesomeIcon v-else :icon="faSquare" />
            <span>Terminer</span>
          </button>
        </div>
      </header>

      <!-- Jitsi container -->
      <main class="flex-1 relative">
        <WebinarRoom
          ref="roomRef"
          :roomName="roomName"
          :displayName="userName"
          :email="userEmail"
          :isHost="isHost"
          @participant-count="participantCount = $event"
          @meeting-ended="handleMeetingEnded"
        />
      </main>
    </template>

    <!-- Confirm end modal -->
    <div v-if="showEndConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Terminer le webinaire ?</h3>
        <p class="text-sm text-gray-500 mb-4">
          Le webinaire sera marqué comme terminé et tous les participants seront déconnectés.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showEndConfirm = false"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="endWebinar"
            :disabled="ending"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <i v-if="ending" class="pi pi-spin pi-spinner"></i>
            Terminer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faTriangleExclamation, faPhoneSlash, faUsers, faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { WebinarAPI } from '@/services/api/Webinar';
import { useUserStore } from '@/stores/user';
import WebinarRoom from '@/components/webinar/WebinarRoom.vue';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const webinarId = computed(() => Number(route.params.id));
const user = computed(() => userStore.user);

const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');
const webinar = ref<Record<string, any> | null>(null);
const roomName = ref('');
const participantCount = ref(0);
const isHost = ref(false);
const isLive = ref(false);
const ending = ref(false);
const showEndConfirm = ref(false);
const roomRef = ref<InstanceType<typeof WebinarRoom> | null>(null);

const userName = computed(() => user.value?.name || 'Participant');
const userEmail = computed(() => user.value?.email || '');

const loadRoom = async () => {
  loading.value = true;
  error.value = false;
  errorMessage.value = '';

  try {
    // Générer la salle (ou récupérer l'existante)
    const { data } = await WebinarAPI.generateRoom(webinarId.value);
    webinar.value = data.webinar;
    isLive.value = data.webinar?.status?.title === 'Live';

    // Extraire le room name depuis le meeting_link
    const link: string = data.meeting_link || data.webinar?.meeting_link;
    if (!link || !link.includes('meet.jit.si')) {
      error.value = true;
      errorMessage.value = 'Impossible de créer la salle de visioconférence.';
      return;
    }

    roomName.value = link.replace('https://meet.jit.si/', '').split('?')[0];

    // Déterminer si l'utilisateur est l'hôte
    isHost.value = data.webinar?.instructor_id === user.value?.id;
  } catch (e: any) {
    console.error(e);
    error.value = true;
    errorMessage.value = e.response?.data?.message || "Erreur lors de l'accès à la salle.";
  } finally {
    loading.value = false;
  }
};

const handleLeave = () => {
  if (roomRef.value) {
    roomRef.value.endMeeting();
  }
  router.push({ name: user.value ? 'institutionWebinars' : 'webinars' });
};

const confirmEnd = () => {
  showEndConfirm.value = true;
};

const endWebinar = async () => {
  ending.value = true;
  try {
    // Terminer la visio côté Jitsi
    if (roomRef.value) {
      roomRef.value.endMeeting();
    }

    // Mettre à jour le statut en "Past"
    await WebinarAPI.updateStatus(webinarId.value, 'Past');

    router.push({ name: 'institutionWebinars' });
  } catch (e: any) {
    console.error(e);
  } finally {
    ending.value = false;
    showEndConfirm.value = false;
  }
};

const handleMeetingEnded = () => {
  // Si l'utilisateur n'est pas l'hôte, le rediriger simplement
  if (!isHost.value) {
    router.push({ name: 'home' });
  }
};

const goBack = () => {
  router.back();
};

onMounted(loadRoom);
</script>
