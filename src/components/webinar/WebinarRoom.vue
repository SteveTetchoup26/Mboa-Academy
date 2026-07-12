<template>
  <div class="relative w-full h-full">
    <!-- Loading -->
    <div
      v-if="state === 'loading'"
      class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-10"
    >
      <i class="pi pi-spin pi-spinner text-4xl mb-4"></i>
      <p class="text-lg font-medium">Connexion à la salle de visioconférence...</p>
      <p class="text-sm text-gray-400 mt-1">Room: {{ roomName }}</p>
    </div>

    <!-- Error -->
    <div
      v-if="state === 'error'"
      class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-10"
    >
      <FontAwesomeIcon :icon="faTriangleExclamation" class="text-5xl text-red-400 mb-4" />
      <p class="text-lg font-medium">{{ errorMessage }}</p>
      <button
        @click="initJitsi"
        class="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Jitsi container -->
    <div ref="jitsiContainerRef" class="w-full h-full" :class="{ invisible: state !== 'ready' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const props = defineProps<{
  roomName: string;
  displayName?: string;
  email?: string;
  isHost?: boolean;
  onMeetingEnd?: () => void;
}>();

const emit = defineEmits<{
  participantCount: [count: number];
  meetingEnded: [];
}>();

const jitsiContainerRef = ref<HTMLDivElement | null>(null);
const state = ref<'loading' | 'ready' | 'error'>('loading');
const errorMessage = ref('');
let jitsiApi: any = null;

const JITSI_DOMAIN = 'meet.jit.si';

const loadJitsiScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.JitsiMeetExternalAPI) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://${JITSI_DOMAIN}/external_api.js`;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

const initJitsi = async () => {
  state.value = 'loading';
  errorMessage.value = '';

  const loaded = await loadJitsiScript();
  if (!loaded) {
    state.value = 'error';
    errorMessage.value = 'Impossible de charger la visioconférence. Vérifiez votre connexion internet.';
    return;
  }

  if (!jitsiContainerRef.value) return;

  // Nettoyer une éventuelle instance précédente
  if (jitsiApi) {
    jitsiApi.dispose();
    jitsiApi = null;
  }

  try {
    const options = {
      roomName: props.roomName,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.value,
      configOverrides: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        disableSimulcast: false,
        enableTalkWhileMuted: false,
        toolbarButtons: props.isHost
          ? [
              'microphone', 'camera', 'desktop', 'chat',
              'raisehand', 'tileview', 'fullscreen', 'settings',
            ]
          : [
              'microphone', 'camera', 'chat', 'raisehand',
              'tileview', 'fullscreen',
            ],
        lang: 'fr',
      },
      interfaceConfigOverrides: {
        SHOW_JITSI_WATERMARK: true,
        SHOW_WATERMARK_FOR_GUESTS: false,
        LANG: 'fr',
        FILM_STRIP_MAX_HEIGHT: 120,
        TOOLBAR_ALWAYS_VISIBLE: true,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        CONNECTION_INDICATOR_DISABLED: false,
      },
      userInfo: {
        displayName: props.displayName || 'Participant',
        email: props.email || '',
      },
    };

    jitsiApi = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, options);
    state.value = 'ready';

    // ── Events ──

    jitsiApi.addListener('videoConferenceJoined', () => {
      // Participant rejoint — nothing special needed
    });

    jitsiApi.addListener('participantJoined', () => {
      const count = jitsiApi.getNumberOfParticipants();
      emit('participantCount', count);
    });

    jitsiApi.addListener('participantLeft', () => {
      const count = jitsiApi.getNumberOfParticipants();
      emit('participantCount', count);
    });

    jitsiApi.addListener('readyToClose', () => {
      emit('meetingEnded');
    });

    jitsiApi.addListener('videoConferenceLeft', () => {
      emit('meetingEnded');
    });

    // Appeler le callback onMeetingEnd si fourni
    if (props.onMeetingEnd) {
      jitsiApi.addListener('readyToClose', props.onMeetingEnd);
    }
  } catch (e: any) {
    console.error('Jitsi init error:', e);
    state.value = 'error';
    errorMessage.value = 'Erreur lors du lancement de la visioconférence.';
  }
};

// Public methods exposées au parent via defineExpose
const endMeeting = () => {
  if (jitsiApi) {
    jitsiApi.executeCommand('hangup');
  }
};

defineExpose({ endMeeting });

onMounted(() => {
  initJitsi();
});

onUnmounted(() => {
  if (jitsiApi) {
    jitsiApi.removeListener('videoConferenceJoined');
    jitsiApi.removeListener('participantJoined');
    jitsiApi.removeListener('participantLeft');
    jitsiApi.removeListener('readyToClose');
    jitsiApi.removeListener('videoConferenceLeft');
    jitsiApi.dispose();
    jitsiApi = null;
  }
});
</script>

<style scoped>
.jitsi-container :deep(iframe) {
  border: none;
}
</style>
