import Login from '@/components/Auth/Login.vue'
import Signup from '@/components/Auth/Signup.vue'
import Layout from '@/components/layout/Layout.vue'
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
import DisplayCategoryCourse from '@/views/DisplayCategoryCourse.vue'
import BecomeInstructor from '@/views/BecomeInstructor.vue'
import InstructorLayout from '@/components/layout/InstructorLayout.vue'
import Dashboard from '@/components/instructor/Dashboard.vue'
import Courses from '@/components/instructor/Courses.vue'
import Students from '@/components/instructor/Students.vue'
import Webinars from '@/components/instructor/webinars/Webinars.vue'
import CourseAssembly from '@/views/CourseAssembly.vue'
import EmailConfirmation from '@/views/EmailConfirmation.vue'
import { useUserStore } from '@/stores/user'

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
        {path: 'my-courses', name: 'courses', component: CourseView, meta: {requiresAuth: true}},
        {path: 'webinars', name: 'webinars', component: WebinarView, meta: {requiresAuth: true}},
        {path: 'forums', name: 'forums', component: ForumView, meta: {requiresAuth: true}},
        {path: 'profile', name: 'profile', component: UserProfile, meta: {requiresAuth: true}},
        {path: 'settings', name: 'settings', component: SettingView, meta: {requiresAuth: true}},
        {path: 'course-details/:courseId(\\d+)', name: 'courseDetails', component: CourseDetail, props: true, meta: {requiresAuth: true}},
        {path: 'my-courses/:courseSavedId(\\d+)', name: 'courseSavedDetails', component: CourseSavedDetail, props: true, meta: {requiresAuth: true}},
        {path: 'courses', name: 'CategoryCourse', component: DisplayCategoryCourse},
        {path: 'become-instructor', name: 'becomeInstructor', component: BecomeInstructor, meta: {requiresAuth: true}},
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
    },
    {
      path: '/instructor',
      name: 'instructorLayout',
      component: InstructorLayout,
      children: [
        {path: '', redirect: '/instructor/dashboard'},
        {path: 'dashboard', name: 'dashboard', component: Dashboard, meta: {requiresAuth: true}},
        {path: 'courses', name: 'publishedCourses', component: Courses, meta: {requiresAuth: true}},
        {path: 'webinars', name: 'instructorWebinars', component: Webinars, meta: {requiresAuth: true}},
        {path: '/reate-course', name: 'createCourse', component: CourseAssembly,meta: {requiresAuth: true}
        }
        // {path: 'students', name: 'students', component: Students}
      ]
    },
    {
      path: '/confirm-account',
      name: 'confirmAccount',
      component: EmailConfirmation
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
});


router.beforeEach((to, from, next) => {
  const token = useUserStore().getToken();
  if (to.meta.requiresAuth && !token) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
})

export default router
