  <template>
    <div class="container mx-auto p-6">
      <form @submit.prevent="submitCourse" class="space-y-6">
        <!-- Basic Course Information -->
        <div class="grid md:grid-cols-2 gap-6">
          <input 
            v-model="course.title" 
            placeholder="Titre du Cours" 
            required 
            class="w-full px-3 py-2 border rounded-lg"
          />
          <select v-model="course.category" required class="w-full px-3 py-2 border rounded-lg">
            <option value="">Catégorie</option>
            <option value="web">Développement Web</option>
            <option value="mobile">Développement Mobile</option>
          </select>
        </div>
  
        <!-- Modules Management -->
        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Modules du Cours</h3>
          
          <div 
            v-for="(module, moduleIndex) in course.modules" 
            :key="moduleIndex" 
            class="mb-6 p-4 border rounded-lg"
          >
            <div class="flex justify-between items-center mb-4">
              <input 
                v-model="module.title" 
                placeholder="Titre du Module" 
                class="w-full px-3 py-2 border rounded-lg flex-grow mr-4"
              />
              <button 
                type="button" 
                @click="removeModule(moduleIndex)" 
                class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
  
            <!-- Lessons within Module -->
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
                  class="w-full px-3 py-2 border rounded-lg flex-grow"
                />
                
                <input 
                  v-model="lesson.duration" 
                  placeholder="Durée" 
                  class=" px-3 py-2 border rounded-lg w-1/4"
                />
                
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
  
        <!-- Learning Objectives -->
        <div>
          <h3 class="text-xl font-bold mb-4">Objectifs d'Apprentissage</h3>
          <div class="space-y-2">
            <div 
              v-for="(objective, index) in course.learningObjectives" 
              :key="index" 
              class="flex"
            >
              <input 
                v-model="course.learningObjectives[index]" 
                placeholder="Objectif" 
                class="w-full px-3 py-2 border rounded-lg flex-grow mr-2"
              />
              <button 
                type="button" 
                @click="course.learningObjectives.splice(index, 1)" 
                class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
            <button 
              type="button" 
              @click="course.learningObjectives.push('')" 
              class="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              + Ajouter un Objectif
            </button>
          </div>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary w-full">
          Créer le Cours
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const course = ref({
        title: '',
        category: '',
        modules: [],
        learningObjectives: [],
        price: 0,
        duration: '',
        certificateEnabled: false
      })
  
      const addModule = () => {
        course.value.modules.push({
          title: '',
          lessons: []
        })
      }
  
      const removeModule = (index) => {
        course.value.modules.splice(index, 1)
      }
  
      const addLesson = (module) => {
        module.lessons.push({
          type: 'video',
          title: '',
          duration: ''
        })
      }
  
      const removeLesson = (module, lessonIndex) => {
        module.lessons.splice(lessonIndex, 1)
      }
  
      const submitCourse = () => {
        // Validation and submission logic
        console.log('Course Details:', course.value)
      }
  
      return {
        course,
        addModule,
        removeModule,
        addLesson,
        removeLesson,
        submitCourse
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>