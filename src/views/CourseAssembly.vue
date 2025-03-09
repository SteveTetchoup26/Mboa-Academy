  <template>
    <div class="container mx-auto p-0 md:p-6">
      <form @submit.prevent="submitCourse" class="space-y-6">
        <!-- Basic Course Information -->
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label for="">Titre</label>
            <input 
              v-model="course.title" 
              placeholder="Introduction à Vue Js" 
              required 
              class="w-full px-3 py-2 border rounded-lg outline-primary"
            />
          </div>
          <!-- <div>
            <label for="">Catégories</label>
            <select v-model="course.category" required class="w-full px-3 py-2 border rounded-lg">
              <option value="">Catégorie</option>
              <option value="web">Développement Web</option>
              <option value="mobile">Développement Mobile</option>
            </select>
          </div> -->
          <div>
            <label for="">Prix</label>
            <input 
              v-model="course.price" 
              type="number"
              required 
              class="w-full px-3 py-2 border rounded-lg outline-primary"
            />
          </div>
          <div>
            <label for="">Langue</label>
            <select v-model="course.language.description" required class="w-full px-3 py-2 border rounded-lg">
              <option value="">Choisir une langue</option>
              <option value="French">Français</option>
              <option value="English">Anglais</option>
            </select>
          </div>
        </div>
  
        
        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Modules du Cours</h3>
          
          <div 
            v-for="(module, moduleIndex) in course.modules" 
            :key="moduleIndex" 
            class="mb-6 p-4 border rounded-lg "
          >
            <div class="flex justify-between items-center mb-4">
              <input 
                v-model="module.title" 
                placeholder="Titre du Module" 
                class="w-full px-3 py-2 border rounded-lg flex-grow mr-4 outline-primary"
              />
              <button 
                type="button" 
                @click="removeModule(moduleIndex)" 
                class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
  
            
            <div class="space-y-3">
              <div 
                v-for="(lesson, lessonIndex) in module.lessons" 
                :key="lessonIndex" 
                class="flex items-center space-x-2"
              >
                <select v-model="lesson.type" class="px-3 py-2 border rounded-lg w-1/4">
                  <option value="video">Vidéo</option>
                  <option value="document">Document</option>
                  <option value="quiz">Quiz</option>
                </select>
                
                <input 
                  v-model="lesson.title" 
                  placeholder="Titre de la Leçon" 
                  class="w-full px-3 py-2 border rounded-lg flex-grow outline-primary"
                />
                
                <!-- <input 
                  v-model="lesson.duration" 
                  placeholder="Durée" 
                  class=" px-3 py-2 border rounded-lg w-1/4 outline-primary"
                /> -->
                
                <button 
                  type="button" 
                  @click="removeLesson(module, lessonIndex)" 
                  class="px-4 py-2 rounded-lg btn-sm bg-red-500 text-white hover:bg-red-600"
                >
                  -
                </button>
              </div>
              
              <button 
                type="button" 
                @click="addLesson(module)" 
                class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                + Ajouter une Leçon
              </button>
            </div>
          </div>
  
          <button 
            type="button" 
            @click="addModule" 
            class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary w-full"
          >
            + Ajouter un Module
          </button>
        </div>
  
        
        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Objectifs d'Apprentissage</h3>
          <div class="space-y-2">
            <div 
              v-for="(objective, index) in course.objectives" 
              :key="index" 
              class="flex"
            >
              <input 
                v-model="course.objectives[index]" 
                placeholder="Utiliser TypeScript avec Vue Js" 
                class="w-full px-3 py-2 outline-primary border rounded-lg flex-grow mr-2"
              />
              <button 
                type="button" 
                @click="removeObjectives(index)" 
                class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
            <button 
              type="button" 
              @click="addObjectives" 
              class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              + Ajouter un Objectif
            </button>
          </div>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Fonctionnalités liées</h3>
          <div class="space-y-2">
            <div 
              v-for="(feature, index) in course.features" 
              :key="index" 
              class="flex"
            >
              <input 
                v-model="course.features[index]" 
                placeholder="Accès a vie au contenu" 
                class="w-full px-3 py-2 outline-primary border rounded-lg flex-grow mr-2"
              />
              <button 
                type="button" 
                @click="removeFeatures(index)" 
                class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
            <button 
              type="button" 
              @click="addFeatures" 
              class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              + Ajouter une fonctionnalité 
            </button>
          </div>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Image de couverture</h3>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Description du Cours</h3>
          <textarea 
            v-model="course.description"
            name="description" 
            id="" 
            class="w-full outline-primary px-3 py-2 border rounded-lg flex-grow mr-4" 
            placeholder="Apprenez à créer des applications web..."
          >
          </textarea>
        </div>
  
        
        <button @click.prevent="submitCourse" type="submit" class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary w-full">
          Soumettre
        </button>
      </form>
    </div>
  </template>
  
<script setup lang="ts">
import type { Course, Lesson, Module } from './../utils';
import { reactive, ref } from 'vue'
import { CourseAPI } from './../services/api/Course';
import { useToast } from "primevue/usetoast";
import  useAppStore from './../stores/app';
import { useUserStore } from './../stores/user';

const toast = useToast();
const appStore = useAppStore();
const userStore = useUserStore();
const token= userStore.getToken();

const course = reactive<Course>({
  title: '',
  description: '',
  categories: [
    {
      title: 'Design',
      description: 'bla bla'
    }, 
    {
      title: 'Development Web',
      description: 'bla bla'
    }
  ],
  modules: [],
  objectives: [],
  language: {
    code: 'FR',
    description: ''
  },
  price: 0,
  original_price: 0,
  features: [],
  cover_course: {
    file_name: 'photo.png',
    format: 'png',
  },
  certificateEnabled: false
});
  
const addModule = () => {
  course.modules.push({
    title: '',
    lessons: []
  });
}
  
const removeModule = (index: number) => {
  course.modules.splice(index, 1)
}
  
const addLesson = (module: Module) => {
  module.lessons.push({
    type: 'video',
    title: '',
    resume: '',
    video: {
      file_name: '',
      format: ''
    }
  })
}
  
const removeLesson = (module: Module, lessonIndex: number) => {
  module.lessons.splice(lessonIndex, 1);
}

const addFeatures = () => {
  course.features.push('');
}

const removeFeatures = (index: number) => {
  course.features.splice(index, 1);
}

const addObjectives = () => {
  course.objectives.push('');
}

const removeObjectives = (index: number) => {
  course.objectives.splice(index, 1);
}
  
const submitCourse = async () => {
  appStore.loading = true;

  try {
      const res = await CourseAPI.create({...course}, token!);

      toast.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: res?.data.message,
        life: 3000
      });

      course.title = '';
      course.description = '';
      course.categories = [];
      course.modules = [];
      course.objectives = [];
      course.language = {
        code: 'FR',
        description: ''
      };
      course.price = 0;
      course.original_price = 0;
      course.features = [];
      course.cover_course = {
        file_name: 'photo.png',
        format: 'png',
      };
      course.certificateEnabled = false;

  } catch (error) {
      console.log(error);
  } finally {
    appStore.loading = false;
  }
}
  
    
</script>
  
<style scoped>

</style>