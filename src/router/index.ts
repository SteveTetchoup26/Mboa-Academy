import Layout from '@/components/Layout.vue'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {path: '', name: 'home', component: HomeView},
        {path: 'about', name: 'about', component: AboutView}
      ]
    }
  ],
})

export default router
