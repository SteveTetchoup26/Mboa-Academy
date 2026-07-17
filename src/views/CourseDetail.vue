<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="appStore.loading" class="flex justify-center py-20">
        <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
      </div>

      <!-- Course not found -->
      <div v-else-if="!course && !appStore.loading" class="text-center py-20">
        <FontAwesomeIcon :icon="faBookOpen" class="text-6xl text-gray-300 mb-4" />
        <h3 class="text-xl font-semibold text-gray-500">Cours introuvable</h3>
        <p class="text-gray-400 mt-2">Ce cours n'existe pas ou a été supprimé.</p>
      </div>

      <template v-else-if="course">
        <div class="relative h-[350px] md:h-[500px] rounded-xl md:overflow-hidden mb-8">
          <div class="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.7)]"></div>
          <img :src="course?.cover_courses?.[0] ? getFileUrl(course.cover_courses[0].file_name) : picture" class="w-full h-full object-cover rounded-lg" alt="" crossorigin="anonymous">
        <div class="absolute top-0 left-0 w-full h-max md:h-full flex md:items-center">
          <div class="w-full h-max md:h-full pt-4 md:max-w-4xl mx-auto px-6">
            <div class="flex flex-col h-max md:flex-row justify-between gap-8">
              <div class="text-white h-max space-y-6 flex-1">
                <div>
                  <div class="flex items-center gap-2 text-primary-200 mb-2  text-xs lg:text-[15px]">
                    <!-- <TagIcon class="w-5 h-5" /> -->
                    <p class="flex">
                      <span v-for="(category, index) in course?.categories" :key="category.id">
                        {{ index > 0 ? ', ' : '' }} {{ category.title }}
                      </span>
                    </p>
                  </div>
                  <h1 class="text-xl lg:text-4xl font-bold mb-4">{{ course?.title }}</h1>
                  <p class="text-sm lg:text-lg text-gray-200">{{ course?.description }}</p>
                </div>

                <div class="flex flex-wrap gap-4 md:gap-6 text-xs lg:text-[15px]">
                  <div class="flex items-center gap-1">
                    <FontAwesomeIcon :icon="faStar" class=" text-yellow-500"/>
                    <span>{{ course?.rating }} ({{ course?.reviewsCount }} avis)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <FontAwesomeIcon :icon="faUsers" />
                    <span>{{ enrolledStudents }} étudiants</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <FontAwesomeIcon :icon="faClock" />
                    <span>{{ formatDuration(course?.duration) }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <FontAwesomeIcon :icon="faCalendar" />
                    <span>Dernière mise à jour le {{ course?.updatedAt.split("T")[0] }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="bg-gray-100 rounded-full flex items-center justify-center w-12 h-12">
                      <img
                      :src="instutor"
                      class=""
                      :alt="[course?.instructor?.name, course?.institution?.name].filter(Boolean).join(' & ') || 'Instructeur'"
                    >
                  </div>
                  <div>
                    <div class="font-medium" v-if="course?.instructor">{{ course.instructor.name }}</div>
                    <div class="font-medium text-sm text-gray-300" v-if="course?.institution">{{ course.institution.name }}</div>
                    <div class="text-sm text-gray-300" v-if="course?.instructor?.expertise?.job_title">{{ course.instructor.expertise.job_title }}</div>
                  </div>
                </div>
              </div>

              <div class="w-full hidden md:block md:w-96">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="p-6">
                    <!-- ── Private course: access code ── -->
                    <template v-if="course?.visibility === 'private'">
                      <div class="text-center mb-4">
                        <div class="w-14 h-14 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-3">
                          <FontAwesomeIcon :icon="faLock" class="text-purple-600 text-xl" />
                        </div>
                        <h3 class="font-semibold text-gray-800">Cours privé</h3>
                        <p class="text-sm text-gray-500 mt-1">Ce cours est protégé par un code d'accès</p>
                      </div>
                      <div v-if="!isEnrolled" class="space-y-3 mb-6">
                        <input
                          v-model="accessCode"
                          type="text"
                          placeholder="Entrez le code d'accès"
                          class="w-full rounded-lg border border-gray-300 p-3 text-center font-mono text-lg tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-purple-500"
                          maxlength="14"
                          @keyup.enter="handleEnrollWithCode"
                        />
                        <button
                          @click="handleEnrollWithCode"
                          :disabled="codeEnrolling"
                          class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <i v-if="codeEnrolling" class="pi pi-spin pi-spinner"></i>
                          <FontAwesomeIcon v-else :icon="faKey" />
                          Accéder au cours
                        </button>
                        <p v-if="codeError" class="text-xs text-red-500 text-center">{{ codeError }}</p>
                      </div>
                      <div v-else class="space-y-3 mb-6">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p class="text-sm font-medium text-green-700">✓ Vous êtes inscrit à ce cours</p>
                        </div>
                        <button
                          @click="enrollement"
                          class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                        >
                          Commencer le cours
                        </button>
                      </div>
                    </template>

                    <!-- ── Public course: price + purchase ── -->
                    <template v-else>
                      <div class="flex items-baseline gap-3 mb-4">
                        <span class="text-xl md:text-3xl font-bold">{{ course?.price }} FCFA</span>
                      </div>
                      <div class="space-y-3 mb-6">
                        <button
                          @click="enrollement"
                          class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary"
                        >
                          {{ isEnrolled ? 'Commencer le cours' : "S'inscrire maintenant" }}
                        </button>
                      </div>
                    </template>

                    <div class="space-y-4">
                      <h4 class="font-medium">Ce cours inclut :</h4>
                      <ul class="space-y-3 text-gray-600">
                        <li v-for="feature in course?.features" :key="feature.text" class="flex items-center gap-3">
                          <FontAwesomeIcon :icon="faCircle" class=" mr-2 w-1"/>
                          <span>{{ feature.title }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full block md:hidden">
        <div class="bg-white overflow-hidden">
          <div class="p-6">
            <!-- ── Private course: access code (mobile) ── -->
            <template v-if="course?.visibility === 'private'">
              <div class="text-center mb-4">
                <div class="w-14 h-14 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <FontAwesomeIcon :icon="faLock" class="text-purple-600 text-xl" />
                </div>
                <h3 class="font-semibold text-gray-800">Cours privé</h3>
                <p class="text-sm text-gray-500 mt-1">Ce cours est protégé par un code d'accès</p>
              </div>
              <div v-if="!isEnrolled" class="space-y-3 mb-6">
                <input
                  v-model="accessCode"
                  type="text"
                  placeholder="Entrez le code d'accès"
                  class="w-full rounded-lg border border-gray-300 p-3 text-center font-mono text-lg tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxlength="14"
                  @keyup.enter="handleEnrollWithCode"
                />
                <button
                  @click="handleEnrollWithCode"
                  :disabled="codeEnrolling"
                  class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <i v-if="codeEnrolling" class="pi pi-spin pi-spinner"></i>
                  <FontAwesomeIcon v-else :icon="faKey" />
                  Accéder au cours
                </button>
                <p v-if="codeError" class="text-xs text-red-500 text-center">{{ codeError }}</p>
              </div>
              <div v-else class="space-y-3 mb-6">
                <div class="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p class="text-sm font-medium text-green-700">✓ Vous êtes inscrit à ce cours</p>
                </div>
                <button
                  @click="enrollement"
                  class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                >
                  Commencer le cours
                </button>
              </div>
            </template>

            <!-- ── Public course: price + purchase (mobile) ── -->
            <template v-else>
              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-xl md:text-3xl font-bold">{{ course?.price }} FCFA</span>
              </div>
              <div class="space-y-3 mb-6">
                <button
                  @click="enrollement"
                  class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary"
                >
                  {{ isEnrolled ? 'Commencer le cours' : "S'inscrire maintenant" }}
                </button>
              </div>
            </template>

            <div class="space-y-4">
              <h4 class="font-medium">Ce cours inclut :</h4>
              <ul class="space-y-3 text-gray-600">
                <li v-for="feature in course?.features" :key="feature.title || feature.text" class="flex items-center gap-3">
                  <span>{{ feature.title || feature.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-gray-100 md:bg-white md:rounded-xl md:shadow-sm p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6">Ce que vous apprendrez</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="objective in course?.objectives" :key="objective" class="flex items-center gap-3">
                <FontAwesomeIcon :icon="faCircle" class=" mr-2 w-1"/>
                <span>{{ objective.title }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white md:rounded-xl md:shadow-sm p-6 mb-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">Programme du cours</h2>
              <div class="text-sm text-gray-500">
                {{ course?.modules.length }} modules • {{ lessonsCount }} leçons • {{ formatDuration(course?.duration) }}
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="(module, index) in course?.modules"
                :key="index"
                class="border rounded-lg"
              >
                <div @click="toggleModule(index)" class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer">
                  <div class="flex items-center gap-3">
                    <span class="font-medium">{{ module.title }}</span>
                    <FontAwesomeIcon v-if=" expandedModules[index]" :icon="faChevronUp" />
                    <FontAwesomeIcon v-else :icon="faChevronDown"/>
                    <!-- <span class="text-sm text-gray-500">{{ module.duration }}</span> -->
                  </div>
                </div>
                <div v-show="expandedModules[index]" class="p-4 space-y-3">
                  <div
                    v-for="lesson in module.lessons"
                    :key="lesson.id"
                    class="flex items-center gap-3 text-gray-600"
                  >
                    <span>{{ lesson.title }}</span>
                    <span class="text-sm text-gray-500 ml-auto">{{ lesson.duration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Student Reviews -->
          <div class="bg-white md:rounded-xl md:shadow-sm p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6">Avis des étudiants</h2>

            <!-- Average rating summary -->
            <div class="flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-800">{{ averageRating || course?.rating || 0 }}</div>
                <div class="flex gap-1 mt-1 justify-center">
                  <FontAwesomeIcon
                    v-for="i in 5" :key="i"
                    :icon="faStar"
                    :class="i <= Math.round(averageRating || course?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'"
                    class="text-sm"
                  />
                </div>
                <div class="text-sm text-gray-500 mt-1">{{ reviewsCount || course?.reviewsCount || 0 }} avis</div>
              </div>
            </div>

            <!-- Review form for enrolled students -->
            <div v-if="isEnrolled" class="border rounded-lg p-4 mb-6">
              <h3 class="font-semibold mb-3">
                {{ userReview ? 'Modifier votre avis' : 'Donner votre avis sur ce cours' }}
              </h3>
              <div class="flex items-center gap-1 mb-3">
                <FontAwesomeIcon
                  v-for="i in 5" :key="i"
                  :icon="faStar"
                  :class="['text-xl cursor-pointer transition-colors', i <= (hoverRating || newRating) ? 'text-yellow-500' : 'text-gray-300']"
                  @click="newRating = i"
                  @mouseenter="hoverRating = i"
                  @mouseleave="hoverRating = 0"
                />
              </div>
              <textarea
                v-model="newComment"
                :placeholder="userReview ? 'Modifiez votre commentaire (optionnel)' : 'Partagez votre expérience (optionnel)'"
                class="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3 resize-none"
                rows="3"
              ></textarea>
              <div class="flex items-center gap-2">
                <button
                  @click="submitReview"
                  :disabled="submittingReview || !newRating"
                  class="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <i v-if="submittingReview" class="pi pi-spin pi-spinner"></i>
                  {{ submittingReview ? 'Publication...' : (userReview ? 'Mettre à jour' : 'Publier') }}
                </button>
                <button
                  v-if="userReview"
                  @click="deleteReview"
                  class="text-red-500 text-sm hover:underline hover:text-red-700 transition-colors"
                >
                  Supprimer mon avis
                </button>
              </div>
              <p v-if="reviewError" class="text-red-500 text-sm mt-2">{{ reviewError }}</p>
            </div>

            <!-- Reviews list -->
            <div v-if="reviews.length" class="space-y-4">
              <div
                v-for="review in reviews"
                :key="review.id"
                class="border rounded-lg p-4"
              >
                <div class="flex items-center gap-3 mb-2">
                  <img
                    :src="review.user?.avatar ? getFileUrl(review.user.avatar) : instutor"
                    class="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <div class="font-medium text-sm">{{ review.user?.name || 'Anonyme' }}</div>
                    <div class="flex items-center gap-2">
                      <div class="flex gap-0.5">
                        <FontAwesomeIcon
                          v-for="i in 5" :key="i"
                          :icon="faStar"
                          :class="i <= review.rating ? 'text-yellow-500' : 'text-gray-300'"
                          class="text-sm"
                        />
                      </div>
                      <span class="text-xs text-gray-400">{{ review.createdAt?.split('T')[0] }}</span>
                    </div>
                  </div>
                </div>
                <p v-if="review.comment" class="text-gray-600 text-sm ml-[52px]">{{ review.comment }}</p>
              </div>
            </div>
            <div v-else-if="!reviewsLoading" class="text-center py-8 text-gray-400">
              <FontAwesomeIcon :icon="faStar" class="text-3xl text-gray-200 mb-3 block mx-auto" />
              <p>Aucun avis pour le moment.</p>
              <p v-if="!isEnrolled" class="text-sm mt-1">Inscrivez-vous au cours et soyez le premier à donner votre avis !</p>
            </div>
            <div v-else class="text-center py-8">
              <i class="pi pi-spin pi-spinner text-2xl text-primary"></i>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="block">
          <div class="sticky top-6 flex flex-col gap-4 lg:flex-col md:flex-row">
            <!-- <div class="bg-white h-max rounded-xl md:border-none border border-1 border-gray-200 md:shadow-[1px_1px_5px_#9e9e9e] p-6 mb-6">
              <div class="text-center space-y-2 md:space-y-4">
                <h3 class="text-xl font-bold">Promotion spéciale !</h3>
                <div class="text-xl md:text-3xl font-bold text-primary">-{{ course?.discountPercentage }}%</div>
                <div class="space-y-2">
                  <p class="text-gray-600">L'offre se termine dans :</p>
                  <div class="flex justify-center gap-1 md:gap-3">
                    <div class="bg-gray-100 px-3 py-2 rounded">
                      <div class="text-xl font-bold">2</div>
                      <div class="text-sm text-gray-500">jours</div>
                    </div>
                    <div class="bg-gray-100 px-3 py-2 rounded">
                      <div class="text-xl font-bold">18</div>
                      <div class="text-sm text-gray-500">heures</div>
                    </div>
                    <div class="bg-gray-100 px-3 py-2 rounded">
                      <div class="text-xl font-bold">45</div>
                      <div class="text-sm text-gray-500">minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- Certifications -->
            <!-- <div class="bg-white rounded-xl md:border-none border border-1 border-gray-200 md:shadow-[1px_1px_5px_#9e9e9e] p-6">
              <h3 class="text-xl font-bold mb-4">Certificat inclus</h3>
              <div class="space-y-4">
                <img
                  :src="carouselOne"
                  alt="Exemple de certificat"
                  class="w-full rounded-lg"
                >
                <p class="text-gray-600">
                  Obtenez un certificat officiel après avoir terminé le cours
                </p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <RegistrationCourseModal
        :showModal="registrationCourseModal"
        :courseTitle="course?.title"
        :coursePrice="course?.price"
        :courseImage="course?.cover_courses?.[0]?.file_name || ''"
        :courseId="course?.id"
        @close-modal="confirmPayment"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChevronCircleDown, faChevronDown, faChevronUp, faCircle, faClock, faStar, faUser, faUsers, faLock, faKey, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import carouselOne from './../assets/images/carousel-1.jpg';
import instutor from './../assets/images/user.png'
import RegistrationCourseModal from '@/components/modals/RegistrationCourseModal.vue';
import { CourseAPI } from './../services/api/Course';
import { ReviewAPI } from '@/services/api/Review';
import useAppStore from './../stores/app';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import { EnrollmentAPI } from '@/services/api/Enrollment';
import { getFileUrl } from '@/helpers/file-url';
import { formatDuration } from '@/helpers/format';
import picture from './../assets/images/course-2.jpg'
import { useToast } from 'primevue/usetoast';


const appStore = useAppStore();
const userStore = useUserStore();
const token = userStore.getToken();
// const successPayement = ref(false);
const isEnrolled = ref(false);

const registrationCourseModal = ref(false);
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Access code enrollment
const accessCode = ref('');
const codeEnrolling = ref(false);
const codeError = ref('');

const course = ref<Record<string, any>>();
let lessonsCount = ref(0);
let enrolledStudents = ref(0);
const expandedModules = ref<{ [key: number]: boolean }>({});

// Reviews
const reviews = ref<any[]>([]);
const averageRating = ref(0);
const reviewsCount = ref(0);
const reviewsLoading = ref(false);
const userReview = ref<any>(null);
const newRating = ref(0);
const hoverRating = ref(0);
const newComment = ref('');
const submittingReview = ref(false);
const reviewError = ref('');

  // const course = {
  //   title: "Maîtrisez le Développement Web Moderne avec Vue.js",
  //   category: "Développement Web",
  //   description: "Apprenez à créer des applications web professionnelles avec Vue.js 3, des bases aux concepts avancés.",
  //   coverImage: "",
  //   rating: 4.8,
  //   reviewsCount: 2547,
  //   enrolledStudents: "12,354",
  //   duration: "21 heures",
  //   lastUpdate: "Novembre 2024",
  //   price: 4500,
  //   originalPrice: 8300,
  //   discountPercentage: 75,
  //   offerEndsIn: "2 jours",
  //   instructor: {
  //     name: "Marie Dupont",
  //     title: "Senior Frontend Developer & Tech Lead",
  //     avatar: ""
  //   },
  //   features: [
  //     { icon: '', text: "Accès à vie au contenu" },
  //     { icon: '', text: "21 heures de vidéo HD" },
  //     { icon: '', text: "85 ressources téléchargeables" },
  //     { icon: '', text: "Certificat d'achèvement" },
  //     { icon: '', text: "Accès sur mobile et TV" }
  //   ],
  //   learningObjectives: [
  //     "Maîtriser la nouvelle Composition API de Vue 3",
  //     "Créer des applications réactives et performantes",
  //     "Comprendre le state management avec Pinia",
  //     "Implémenter une architecture scalable",
  //     "Utiliser TypeScript avec Vue.js",
  //     "Créer des tests unitaires et E2E",
  //     "Déployer vos applications en production",
  //     "Optimiser les performances"
  //   ],
  //   modulesCount: 12,
  //   lessonsCount: 148,
  //   modules: [
  //     {
  //       title: "Introduction à Vue.js 3",
  //       duration: "2h 30min",
  //       previewLessons: [
  //         {
  //           id: 1,
  //           type: "video",
  //           title: "Présentation du framework Vue.js",
  //           duration: "15:30"
  //         },
  //         {
  //           id: 2,
  //           type: "document",
  //           title: "Installation et configuration",
  //           duration: "10:45"
  //         }
  //       ],
  //       hiddenLessons: 8
  //     },
  //     {
  //       title: "La Composition API",
  //       duration: "3h 45min",
  //       previewLessons: [
  //         {
  //           id: 3,
  //           type: "video",
  //           title: "Introduction aux Composables",
  //           duration: "20:15"
  //         }
  //       ],
  //       hiddenLessons: 12
  //     }
  //   ],
  //   // featuredReviews: [
  //   //   {
  //   //     id: 1,
  //   //     userName: "Thomas Martin",
  //   //     userAvatar: "",
  //   //     rating: 5,
  //   //     comment: "Un cours excellent qui m'a permis de monter en compétence rapidement sur Vue.js 3. La section sur la Composition API est particulièrement bien expliquée."
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     userName: "Julie Dubois",
  //   //     userAvatar: "",
  //   //     rating: 5,
  //   //     comment: "Formation très complète avec des exercices pratiques pertinents. Le formateur est clair et pédagogue."
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     userName: "Marc Bernard",
  //   //     userAvatar: "",
  //   //     rating: 4,
  //   //     comment: "Très bonne formation, mise à jour régulièrement avec les dernières fonctionnalités de Vue.js."
  //   //   }
  //   // ]
  // }

const enrollement = () => {
  if(token){
    if(isEnrolled.value){
      router.push(`/my-courses/${course.value?.id}?name=${course.value?.title}`);
    } else {
      registrationCourseModal.value = true;
    }
  } else {
    router.push(`/connexion?redirect=${encodeURIComponent(route.fullPath)}`);
  }
}

const confirmPayment = (data: any) => {
  registrationCourseModal.value = false;
  if(data.success) {
    // successPayement.value = true;
    isEnrolled.value = true;
    fetchReviews();
    fetchUserReview();
  }
}
const toggleModule = (moduleIndex: number) => {
  expandedModules.value[moduleIndex] = !expandedModules.value[moduleIndex];
}

const handleEnrollWithCode = async () => {
  const code = accessCode.value.trim().toUpperCase();
  if (!code) {
    codeError.value = 'Veuillez entrer un code d\'accès';
    return;
  }
  if (!token) {
    router.push(`/connexion?redirect=${encodeURIComponent(route.fullPath)}`);
    return;
  }

  codeError.value = '';
  codeEnrolling.value = true;
  try {
    const courseId = Array.isArray(route.params.courseId) ? route.params.courseId[0] : route.params.courseId;
    await EnrollmentAPI.enrollWithCode(parseInt(courseId), code);
    isEnrolled.value = true;
    toast.add({ severity: 'success', detail: 'Inscription réussie ! Vous pouvez maintenant accéder au cours.', life: 4000 });
  } catch (e: any) {
    const msg = e.response?.data?.message || 'Code d\'accès invalide';
    codeError.value = msg;
    toast.add({ severity: 'error', detail: msg, life: 4000 });
  } finally {
    codeEnrolling.value = false;
  }
};

/** ── Reviews ── */
const submitReview = async () => {
  if (!newRating.value || newRating.value < 1 || newRating.value > 5) return;
  submittingReview.value = true;
  reviewError.value = '';
  try {
    const courseId = Array.isArray(route.params.courseId) ? route.params.courseId[0] : route.params.courseId;
    await ReviewAPI.create({
      courseId: parseInt(courseId),
      rating: newRating.value,
      comment: newComment.value,
    });
    // Reset form and refresh
    newRating.value = 0;
    newComment.value = '';
    await fetchReviews();
    toast.add({ severity: 'success', detail: 'Votre avis a été publié', life: 3000 });
  } catch (e: any) {
    const msg = e.response?.data?.message || 'Erreur lors de la publication';
    reviewError.value = msg;
    toast.add({ severity: 'error', detail: msg, life: 4000 });
  } finally {
    submittingReview.value = false;
  }
};

const deleteReview = async () => {
  if (!userReview.value?.id) return;
  if (!confirm('Supprimer votre avis ?')) return;
  try {
    await ReviewAPI.destroy(userReview.value.id);
    userReview.value = null;
    newRating.value = 0;
    newComment.value = '';
    await fetchReviews();
    toast.add({ severity: 'success', detail: 'Votre avis a été supprimé', life: 3000 });
  } catch (e: any) {
    const msg = e.response?.data?.message || 'Erreur lors de la suppression';
    toast.add({ severity: 'error', detail: msg, life: 4000 });
  }
};

const fetchReviews = async () => {
  const courseId = Array.isArray(route.params.courseId) ? route.params.courseId[0] : route.params.courseId;
  reviewsLoading.value = true;
  try {
    const res = await ReviewAPI.byCourse(parseInt(courseId));
    reviews.value = res.data.reviews || [];
    averageRating.value = res.data.averageRating || 0;
    reviewsCount.value = res.data.reviewsCount || 0;
  } catch {
    // Silently fail for reviews
  } finally {
    reviewsLoading.value = false;
  }
};

const fetchUserReview = async () => {
  if (!token) return;
  const courseId = Array.isArray(route.params.courseId) ? route.params.courseId[0] : route.params.courseId;
  try {
    const res = await ReviewAPI.userReview(parseInt(courseId));
    if (res.data.review) {
      userReview.value = res.data.review;
      newRating.value = res.data.review.rating;
      newComment.value = res.data.review.comment || '';
    }
  } catch {
    // Not enrolled or no review yet
  }
};

onMounted(async() => {
  appStore.loading = true;
  try {
    const courseId = Array.isArray(route.params.courseId) ? route.params.courseId[0] : route.params.courseId;
    const res = await CourseAPI.getOne(parseInt(courseId));

    if(res?.data?.course){
      course.value = {...res?.data.course};
      enrolledStudents.value = res?.data.enrolledStudents;

      for(const module of res?.data.course.modules){
        lessonsCount.value += module.lessons.length;
      }

      isEnrolled.value = !!userStore.user && !!course.value?.enrollments?.some(
        (enrollment: any) => enrollment.student_id === userStore.user?.id
      );

      // Load reviews
      fetchReviews();
      fetchUserReview();
    } else {
      course.value = null as any;
    }
  } catch(error: any) {
    console.error(error);
    if (error?.response?.status === 404) {
      course.value = null as any;
    }
  } finally {
    appStore.loading = false;
  }
})
</script>
