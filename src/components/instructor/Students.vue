<template>
    <div class="space-y-6">
          <div class="rounded-lg bg-white shadow">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="p-4 text-left">Étudiant</th>
                  <th class="p-4 text-left">Cours</th>
                  <th class="p-4 text-left">Progression</th>
                  <th class="p-4 text-left">Dernière activité</th>
                  <th class="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="student in students" 
                  :key="student.id"
                  class="border-b"
                >
                  <td class="p-4">
                    <div class="flex items-center space-x-3">
                      <img :src="student.avatar" :alt="student.name" class="h-8 w-8 rounded-full" />
                      <div>
                        <p class="font-medium">{{ student.name }}</p>
                        <p class="text-sm text-gray-600">{{ student.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">{{ student.course }}</td>
                  <td class="p-4">
                    <div class="h-2 w-full rounded-full bg-gray-200">
                      <div 
                        class="h-2 rounded-full bg-blue-600"
                        :style="{ width: student.progress + '%' }"
                      ></div>
                    </div>
                  </td>
                  <td class="p-4">{{ student.lastActivity }}</td>
                  <td class="p-4">
                    <button class="text-blue-600 hover:text-blue-800">
                      Contacter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
</template>

<script setup lang="ts">
const students = [
    {
      id: 1,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marie',
      course: 'Vue.js Avancé',
      progress: 75,
      lastActivity: 'Il y a 2 heures'
    },
    // ... autres étudiants
];
  
</script>

<style>

</style>