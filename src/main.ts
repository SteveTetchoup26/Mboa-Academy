import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from '@primeuix/themes/aura';



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ToastService);
app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
});

app.use(createPinia())
app.use(router)

app.use(MotionPlugin)

app.mount('#app')
