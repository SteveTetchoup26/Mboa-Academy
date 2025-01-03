import Login from '@/components/Auth/Login.vue'
import Signup from '@/components/Auth/Signup.vue'
import Layout from '@/components/Layout.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import CourseView from '@/views/CourseView.vue'
import ForumView from '@/views/ForumView.vue'
import HomeView from '@/views/HomeView.vue'
import WebinarView from '@/views/WebinarView.vue'
import UserProfile from '@/views/UserProfile.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SettingView from '@/views/SettingView.vue'
import CourseDetail from '@/views/CourseDetail.vue'
import CourseSaved from '@/components/CourseSaved.vue'
import CourseSavedDetail from '@/views/CourseSavedDetail.vue'

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
        {path: 'my-courses', name: 'courses', component: CourseView},
        {path: 'webinars', name: 'webinars', component: WebinarView},
        {path: 'forums', name: 'forums', component: ForumView},
        {path: 'profile', name: 'profile', component: UserProfile},
        {path: 'settings', name: 'settings', component: SettingView},
        {path: 'course-details/:courseId(\\d+)', name: 'courseDetails', component: CourseDetail, props: true},
        {path: 'course-saved-details/:courseSavedId(\\d+)', name: 'courseSavedDetails', component: CourseSavedDetail, props: true},
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
