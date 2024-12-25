import Login from '@/components/Auth/Login.vue'
import Signup from '@/components/Auth/Signup.vue'
import Layout from '@/components/Layout.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
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
        {path: 'about-us', name: 'about', component: AboutView},
        {path: 'contact-us', name: 'contact', component: ContactView},
      ]
    },
    {
      path: '/connexion',
      name: 'login',
      component: Login,
    },
    {
      path: '/inscription',
      name: 'signup',
      component: Signup
    }
  ],
})

export default router
