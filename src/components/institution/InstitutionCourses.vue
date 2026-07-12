<template>
  <div class="space-y-6">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <template v-else>
      <!-- Header with create button -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Tous les cours</h2>
        <button
          @click="openCreateDrawer"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
        >
          <FontAwesomeIcon :icon="faPlus" />
          Créer un cours
        </button>
      </div>

      <!-- Empty -->
      <div v-if="courses.length === 0" class="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
        <FontAwesomeIcon :icon="faBookOpen" class="text-6xl text-gray-300 mb-4" />
        <h3 class="text-xl font-semibold text-gray-500 mb-2">Aucun cours</h3>
        <p class="text-gray-400">Créez votre premier cours pour votre institution</p>
      </div>

      <!-- Courses table -->
      <div v-else class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cours</th>
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Formateur</th>
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Visibilité</th>
                <th class="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Code</th>
                <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th class="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="course in courses" :key="course.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                      {{ course.title?.charAt(0)?.toUpperCase() || '?' }}
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{{ course.title }}</p>
                      <p class="text-xs text-gray-400">ID: #{{ course.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 hidden md:table-cell text-sm text-gray-600">
                  {{ course.instructor?.name || 'Non assigné' }}
                </td>
                <td class="px-4 py-4 hidden sm:table-cell">
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                    :class="course.visibility === 'private' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                  >
                    <FontAwesomeIcon :icon="course.visibility === 'private' ? faLock : faGlobe" />
                    {{ course.visibility === 'private' ? 'Privé' : 'Public' }}
                  </span>
                </td>
                <td class="px-4 py-4 hidden sm:table-cell">
                  <div v-if="course.visibility === 'private' && course.access_code" class="flex items-center gap-1">
                    <code class="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{{ course.access_code }}</code>
                    <button
                      @click="copyCode(course.access_code)"
                      class="text-gray-400 hover:text-primary transition-colors p-1"
                      title="Copier le code"
                    >
                      <FontAwesomeIcon :icon="faCopy" class="text-xs" />
                    </button>
                  </div>
                  <span v-else class="text-xs text-gray-400">—</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="statusBadge(course.status?.title)"
                  >
                    {{ statusLabel(course.status?.title) }}
                  </span>
                </td>
                <td class="px-4 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <!-- Partager le lien -->
                    <button
                      v-if="course.status?.title === 'Published'"
                      @click="shareCourseLink(course)"
                      class="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                      :title="'Copier le lien du cours'"
                    >
                      <FontAwesomeIcon :icon="faShareNodes" />
                    </button>
                    <!-- Publier -->
                    <button
                      v-if="course.status?.title === 'Submit'"
                      @click="handlePublish(course)"
                      class="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Publier le cours"
                    >
                      <FontAwesomeIcon :icon="faCheckCircle" />
                    </button>
                    <!-- Modifier -->
                    <button
                      @click="openEditDrawer(course)"
                      class="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <FontAwesomeIcon :icon="faPenToSquare" />
                    </button>
                    <!-- Régénérer code (privé uniquement) -->
                    <button
                      v-if="course.visibility === 'private'"
                      @click="handleRegenerateCode(course)"
                      class="p-2 text-gray-500 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Régénérer le code"
                    >
                      <FontAwesomeIcon :icon="faArrowsRotate" />
                    </button>
                    <!-- Supprimer -->
                    <button
                      @click="confirmDelete(course)"
                      class="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <FontAwesomeIcon :icon="faTrashCan" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- ════════════════════════════════════════════════════════
         DRAWER CRÉATION / ÉDITION
         ════════════════════════════════════════════════════════ -->
    <Transition name="drawer-slide">
      <div v-if="drawerOpen" class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40" @click="closeDrawer"></div>

        <!-- Panneau -->
        <div class="relative w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ editingCourse ? 'Modifier le cours' : 'Créer un cours' }}
            </h2>
            <button @click="closeDrawer" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FontAwesomeIcon :icon="faXmark" class="text-gray-500 h-5 w-5" />
            </button>
          </div>

          <div class="px-6 py-6 space-y-6">
            <!-- ═══ SECTION INFOS GÉNÉRALES ═══ -->
            <div class="bg-gray-50 rounded-lg p-5 space-y-4">
              <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Informations générales</h3>

              <!-- Titre -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre du cours *</label>
                <input
                  v-model="form.title"
                  type="text"
                  class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Introduction à l'algèbre"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Décrivez votre cours..."
                ></textarea>
              </div>

              <!-- Langue -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Langue d'enseignement</label>
                <select
                  v-model="form.language"
                  class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Lingala">Lingala</option>
                  <option value="Swahili">Swahili</option>
                  <option value="Ewondo">Ewondo</option>
                  <option value="Bamiléké">Bamiléké</option>
                </select>
              </div>

              <!-- Catégories -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="cat in categories"
                    :key="cat.id"
                    type="button"
                    @click="toggleCategory(cat.id)"
                    :class="[
                      'px-3 py-1.5 rounded-lg border text-sm transition-all',
                      form.categories.includes(cat.id)
                        ? 'border-primary bg-primary/5 text-primary font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    ]"
                  >
                    {{ cat.title }}
                  </button>
                </div>
                <p v-if="categories.length === 0" class="text-xs text-gray-400 mt-1">Chargement des catégories…</p>
              </div>

              <!-- Prix (visible seulement pour cours public) -->
              <div v-if="form.visibility !== 'private'" class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
                  <input
                    v-model.number="form.price"
                    type="number"
                    min="0"
                    class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0 = gratuit"
                  />
                  <p v-if="form.price === 0" class="mt-1 text-xs text-gray-400">Gratuit</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Prix original (FCFA)</label>
                  <input
                    v-model.number="form.original_price"
                    type="number"
                    min="0"
                    class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Prix avant réduction"
                  />
                  <p v-if="form.original_price > form.price" class="mt-1 text-xs text-green-500">Réduction de {{ Math.round((1 - form.price / form.original_price) * 100) }}%</p>
                </div>
              </div>

              <!-- Formateur -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Formateur</label>
                <select
                  v-model.number="form.instructor_id"
                  class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option :value="null">Aucun (assigner plus tard)</option>
                  <option :value="adminUserId">Moi-même ({{ adminName }})</option>
                  <option v-for="inst in instructors" :key="inst.id" :value="inst.user_id">
                    {{ inst.user?.name || 'Utilisateur #' + inst.user_id }}
                  </option>
                </select>
              </div>

              <!-- Visibilité -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Visibilité</label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    @click="form.visibility = 'public'"
                    :class="[
                      'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                      form.visibility === 'public'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    ]"
                  >
                    <FontAwesomeIcon :icon="faGlobe" />
                    <span class="font-medium">Public</span>
                  </button>
                  <button
                    type="button"
                    @click="form.visibility = 'private'"
                    :class="[
                      'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                      form.visibility === 'private'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    ]"
                  >
                    <FontAwesomeIcon :icon="faLock" />
                    <span class="font-medium">Privé</span>
                  </button>
                </div>
                <p v-if="form.visibility === 'private'" class="mt-2 text-xs text-purple-600">
                  Un code d'accès sera généré automatiquement. Les étudiants devront le saisir pour accéder au cours.
                  Le prix n'est pas applicable pour les cours privés.
                </p>
                <p v-else class="mt-2 text-xs text-gray-400">
                  Le cours sera accessible à tous (achat classique ou gratuit).
                </p>
              </div>
            </div>

            <!-- ═══ IMAGE DE COUVERTURE ═══ -->
            <div class="bg-gray-50 rounded-lg p-5 space-y-3">
              <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Image de couverture</h3>
              <div
                @click="coverInputRef?.click()"
                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <div v-if="coverPreview" class="mb-2">
                  <img :src="coverPreview" class="max-h-40 mx-auto rounded-lg object-cover" alt="Aperçu" />
                </div>
                <FontAwesomeIcon v-else :icon="faImage" class="text-3xl text-gray-300 mb-2" />
                <p class="text-sm text-gray-500">
                  {{ coverPreview ? 'Cliquez pour changer' : 'Cliquez pour ajouter une image de couverture' }}
                </p>
                <p class="text-xs text-gray-400 mt-1">Formats acceptés : JPG, PNG, WebP</p>
              </div>
              <input
                ref="coverInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onCoverSelected"
              />
            </div>

            <!-- ═══ SECTION OBJECTIFS ═══ -->
            <div class="bg-gray-50 rounded-lg p-5 space-y-3">
              <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Objectifs d'apprentissage</h3>
              <p class="text-xs text-gray-400">Ce que les étudiants apprendront dans ce cours</p>
              <div v-for="(obj, idx) in form.objectives" :key="idx" class="flex items-center gap-2">
                <input
                  v-model="form.objectives[idx]"
                  type="text"
                  placeholder="Ex: Maîtriser la Composition API"
                  class="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button @click="removeObjective(idx)" type="button" class="p-2 text-red-400 hover:text-red-600" title="Supprimer">
                  <FontAwesomeIcon :icon="faXmark" />
                </button>
              </div>
              <button @click="addObjective" type="button" class="text-sm text-primary hover:underline flex items-center gap-1">
                <FontAwesomeIcon :icon="faPlus" /> Ajouter un objectif
              </button>
            </div>

            <!-- ═══ SECTION FONCTIONNALITÉS ═══ -->
            <div class="bg-gray-50 rounded-lg p-5 space-y-3">
              <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Fonctionnalités du cours</h3>
              <p class="text-xs text-gray-400">Ce que le cours inclut (ex: Accès à vie, certificat, etc.)</p>
              <div v-for="(feat, idx) in form.features" :key="idx" class="flex items-center gap-2">
                <input
                  v-model="form.features[idx]"
                  type="text"
                  placeholder="Ex: Accès à vie au contenu"
                  class="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button @click="removeFeature(idx)" type="button" class="p-2 text-red-400 hover:text-red-600" title="Supprimer">
                  <FontAwesomeIcon :icon="faXmark" />
                </button>
              </div>
              <button @click="addFeature" type="button" class="text-sm text-primary hover:underline flex items-center gap-1">
                <FontAwesomeIcon :icon="faPlus" /> Ajouter une fonctionnalité
              </button>
            </div>

            <!-- ═══ SECTION MODULES & LEÇONS ═══ -->
            <div class="bg-gray-50 rounded-lg p-5 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Modules et leçons</h3>
                  <p class="text-xs text-gray-400">Structurez le contenu de votre cours</p>
                </div>
                <button @click="addModule" type="button" class="text-sm px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-secondary flex items-center gap-1">
                  <FontAwesomeIcon :icon="faPlus" /> Module
                </button>
              </div>

              <div v-for="(mod, modIdx) in form.modules" :key="modIdx" class="border border-gray-200 rounded-lg bg-white overflow-hidden">
                <!-- En-tête du module -->
                <div class="flex items-center gap-2 p-3 bg-gray-100/50 border-b border-gray-200">
                  <FontAwesomeIcon :icon="faFolderOpen" class="text-gray-400 text-sm" />
                  <input
                    v-model="mod.title"
                    type="text"
                    placeholder="Titre du module"
                    class="flex-1 bg-transparent border-none p-0 text-sm font-medium focus:outline-none focus:ring-0 placeholder-gray-400"
                  />
                  <button @click="removeModule(modIdx)" type="button" class="p-1 text-red-400 hover:text-red-600" title="Supprimer le module">
                    <FontAwesomeIcon :icon="faTrashCan" class="text-xs" />
                  </button>
                </div>

                <!-- Leçons du module -->
                <div class="p-3 space-y-3">
                  <div v-for="(lesson, lesIdx) in mod.lessons" :key="lesIdx" class="border border-gray-100 rounded-lg p-2.5 bg-gray-50/50 space-y-2">
                    <div class="flex items-center gap-2">
                      <select
                        v-model="lesson.type"
                        class="text-xs border border-gray-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="video">🎬 Vidéo</option>
                        <option value="document">📄 Document</option>
                        <option value="quiz">❓ Quiz</option>
                      </select>
                      <input
                        v-model="lesson.title"
                        type="text"
                        placeholder="Titre de la leçon"
                        class="flex-1 rounded-lg border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button @click="removeLesson(modIdx, lesIdx)" type="button" class="p-1.5 text-red-400 hover:text-red-600" title="Supprimer la leçon">
                        <FontAwesomeIcon :icon="faXmark" class="text-xs" />
                      </button>
                    </div>
                    <!-- Upload vidéo (pour le type video) -->
                    <div v-if="lesson.type === 'video'" class="flex items-center gap-2 pl-1">
                      <label
                        :for="`video-${modIdx}-${lesIdx}`"
                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs cursor-pointer hover:bg-blue-100 transition-colors"
                      >
                        <FontAwesomeIcon :icon="faVideo" />
                        <span>{{ lesson.videoFileName || 'Importer une vidéo' }}</span>
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        :id="`video-${modIdx}-${lesIdx}`"
                        class="hidden"
                        @change="handleVideoUpload($event, modIdx, lesIdx)"
                      />
                      <span v-if="lesson.videoFileName" class="text-xs text-gray-400">{{ lesson.videoFileSize }}</span>
                    </div>
                  </div>
                  <button @click="addLesson(modIdx)" type="button" class="text-xs text-primary hover:underline flex items-center gap-1">
                    <FontAwesomeIcon :icon="faPlus" /> Ajouter une leçon
                  </button>
                </div>
              </div>

              <p v-if="form.modules.length === 0" class="text-xs text-gray-400 italic">
                Aucun module pour le moment. Ajoutez-en un pour structurer votre cours.
              </p>
            </div>

            <!-- ═══ CODE D'ACCÈS (édition seulement) ═══ -->
            <div
              v-if="editingCourse && editingCourse.visibility === 'private' && editingCourse.access_code"
              class="bg-purple-50 border border-purple-200 rounded-lg p-5"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-semibold text-purple-800">Code d'accès actuel</h3>
                <button
                  @click="handleRegenerateCode(editingCourse)"
                  class="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  <FontAwesomeIcon :icon="faArrowsRotate" />
                  Régénérer
                </button>
              </div>
              <div class="flex items-center gap-2">
                <code class="bg-white px-3 py-1.5 rounded border border-purple-200 font-mono text-sm">
                  {{ editingCourse.access_code }}
                </code>
                <button @click="copyCode(editingCourse.access_code)" class="text-purple-600 hover:text-purple-800">
                  <FontAwesomeIcon :icon="faCopy" />
                </button>
              </div>
              <p class="mt-2 text-xs text-purple-500">
                Partagez ce code avec vos étudiants pour leur permettre d'accéder au cours.
              </p>
            </div>

            <!-- ═══ LIEN DE PARTAGE (après publication) ═══ -->
            <div
              v-if="createdCourseLink"
              class="bg-green-50 border border-green-200 rounded-lg p-5"
            >
              <h3 class="text-sm font-semibold text-green-800 mb-2">Cours créé avec succès !</h3>
              <p class="text-xs text-green-600 mb-3">Partagez ce lien avec vos étudiants :</p>
              <div class="flex items-center gap-2">
                <input
                  :value="createdCourseLink"
                  type="text"
                  readonly
                  class="w-full rounded-lg border border-green-200 p-2.5 text-sm bg-white font-mono focus:outline-none"
                  @focus="$event.target.select()"
                />
                <button
                  @click="copyLink(createdCourseLink)"
                  class="px-3 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-1"
                >
                  <FontAwesomeIcon :icon="faCopy" />
                  Copier
                </button>
              </div>
            </div>

            <!-- ═══ BOUTONS ACTION ═══ -->
            <div class="flex gap-3 pt-2 sticky bottom-0 bg-white pb-2">
              <template v-if="createdCourseLink">
                <button
                  @click="closeDrawer"
                  class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
                <button
                  @click="resetForm"
                  class="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors"
                >
                  Créer un autre cours
                </button>
              </template>
              <template v-else>
                <button
                  @click="closeDrawer"
                  class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  @click="handleSaveCourse"
                  :disabled="saving"
                  class="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <i v-if="saving" class="pi pi-spin pi-spinner"></i>
                  {{ editingCourse ? 'Enregistrer les modifications' : 'Créer le cours' }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ════════════════════════════════════════════════════════
         MODAL CONFIRMATION SUPPRESSION
         ════════════════════════════════════════════════════════ -->
    <div v-if="deleteConfirm" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Supprimer le cours</h3>
        <p class="text-sm text-gray-500 mb-4">
          Êtes-vous sûr de vouloir supprimer <strong>{{ deleteConfirm.title }}</strong> ?
          Cette action est irréversible.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="deleteConfirm = null"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="handleDelete"
            :disabled="saving"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <i v-if="saving" class="pi pi-spin pi-spinner"></i>
            Supprimer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faBookOpen, faPlus, faPenToSquare, faTrashCan, faCopy,
  faGlobe, faLock, faXmark, faArrowsRotate, faShareNodes,
  faCheckCircle, faFolderOpen, faFileLines, faImage, faVideo
} from '@fortawesome/free-solid-svg-icons';
import { InstitutionAPI } from '@/services/api/Institution';
import { CourseAPI } from '@/services/api/Course';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue/usetoast';

const userStore = useUserStore();
const toast = useToast();
const token = computed(() => userStore.getToken());
const adminName = computed(() => userStore.user?.name || 'Admin');
const adminUserId = computed(() => userStore.user?.id || null);

const institutionId = ref<number | null>(null);
const courses = ref<Array<Record<string, any>>>([]);
const instructors = ref<Array<Record<string, any>>>([]);
const loading = ref(true);
const saving = ref(false);

// Catégories disponibles
const categories = ref<Array<Record<string, any>>>([]);

// Cover image
const coverInputRef = ref<HTMLInputElement | null>(null);
const coverFile = ref<File | null>(null);
const coverPreview = ref<string | null>(null);

// Drawer
const drawerOpen = ref(false);
const editingCourse = ref<Record<string, any> | null>(null);

// Lien du cours créé (affiché après création)
const createdCourseLink = ref('');

// Vidéos uploadées par leçon (stockage pour FormData)
const videoFiles = ref<Array<Array<File>>>([]);

const form = ref({
  title: '',
  description: '',
  language: 'Français',
  price: 0,
  original_price: 0,
  categories: [] as number[],
  instructor_id: null as number | null,
  visibility: 'public',
  modules: [] as Array<{
    title: string;
    lessons: Array<{
      type: string;
      title: string;
      resume: string;
      videoFileName?: string;
      videoFileSize?: string;
    }>;
  }>,
  objectives: [] as string[],
  features: [] as string[],
});

// Delete
const deleteConfirm = ref<Record<string, any> | null>(null);

// ── Utilitaires ──

const statusBadge = (status: string) => {
  switch (status) {
    case 'Published': return 'bg-green-100 text-green-700';
    case 'Submit': return 'bg-yellow-100 text-yellow-700';
    case 'Archived': return 'bg-gray-100 text-gray-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'Published': return 'Publié';
    case 'Submit': return 'Soumis';
    case 'Archived': return 'Archivé';
    default: return status || '—';
  }
};

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    toast.add({ severity: 'success', detail: 'Code copié !', life: 2000 });
  });
};

const copyLink = (link: string) => {
  navigator.clipboard.writeText(link).then(() => {
    toast.add({ severity: 'success', detail: 'Lien copié !', life: 2000 });
  });
};

// ── Gestion des modules/leçons ──

const addModule = () => {
  form.value.modules.push({ title: '', lessons: [] });
};

const removeModule = (idx: number) => {
  form.value.modules.splice(idx, 1);
};

const addLesson = (modIdx: number) => {
  form.value.modules[modIdx].lessons.push({ type: 'video', title: '', resume: '' });
};

const removeLesson = (modIdx: number, lesIdx: number) => {
  form.value.modules[modIdx].lessons.splice(lesIdx, 1);
};

// ── Gestion des objectifs ──

const addObjective = () => {
  form.value.objectives.push('');
};

const removeObjective = (idx: number) => {
  form.value.objectives.splice(idx, 1);
};

// ── Gestion des fonctionnalités ──

const addFeature = () => {
  form.value.features.push('');
};

const removeFeature = (idx: number) => {
  form.value.features.splice(idx, 1);
};

// ── Gestion des catégories ──

const toggleCategory = (catId: number) => {
  const idx = form.value.categories.indexOf(catId);
  if (idx === -1) {
    form.value.categories.push(catId);
  } else {
    form.value.categories.splice(idx, 1);
  }
};

// ── Image de couverture ──

const onCoverSelected = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    coverFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => { coverPreview.value = e.target?.result as string; };
    reader.readAsDataURL(file);
  }
};

// ── Upload vidéo par leçon ──

const handleVideoUpload = (event: Event, modIdx: number, lesIdx: number) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (!videoFiles.value[modIdx]) videoFiles.value[modIdx] = [];
    videoFiles.value[modIdx][lesIdx] = file;

    const lesson = form.value.modules[modIdx].lessons[lesIdx];
    lesson.videoFileName = file.name;
    lesson.videoFileSize = (file.size / (1024 * 1024)).toFixed(1) + ' Mo';
  }
};

// ── Générer le lien de partage ──

const shareCourseLink = (course: Record<string, any>) => {
  const link = `${window.location.origin}/course-details/${course.id}`;
  navigator.clipboard.writeText(link).then(() => {
    toast.add({
      severity: 'success',
      detail: `Lien du cours "${course.title}" copié !`,
      life: 3000,
    });
  });
};

// ── Load data ──

const loadData = async () => {
  try {
    const { data: instData } = await InstitutionAPI.myInstitutions(token.value!);
    if (!instData.institutions?.length) return;
    institutionId.value = instData.institutions[0].id;

    const [coursesRes, detailRes, catRes] = await Promise.all([
      InstitutionAPI.getCourses(institutionId.value),
      InstitutionAPI.getOne(institutionId.value),
      CourseAPI.getAllCategories(),
    ]);

    courses.value = coursesRes.data?.courses || [];
    instructors.value = detailRes.data?.institution?.admins?.filter(
      (a: any) => a.role === 'instructor'
    ) || [];
    categories.value = catRes.data?.categories || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// ── Drawer ──

const openCreateDrawer = () => {
  editingCourse.value = null;
  createdCourseLink.value = '';
  coverFile.value = null;
  coverPreview.value = null;
  videoFiles.value = [];
  form.value = {
    title: '',
    description: '',
    language: 'Français',
    price: 0,
    original_price: 0,
    categories: [],
    instructor_id: null,
    visibility: 'public',
    modules: [],
    objectives: [],
    features: [],
  };
  drawerOpen.value = true;
};

const openEditDrawer = (course: Record<string, any>) => {
  editingCourse.value = course;
  createdCourseLink.value = '';
  coverFile.value = null;
  coverPreview.value = null;
  form.value = {
    title: course.title || '',
    description: course.description || '',
    language: course.language?.description || 'Français',
    price: course.price || 0,
    original_price: course.original_price || 0,
    categories: (course.categories || []).map((c: any) => typeof c === 'number' ? c : c.id),
    instructor_id: course.instructor_id || null,
    visibility: course.visibility || 'public',
    modules: (course.modules || []).map((m: any) => ({
      title: m.title || '',
      lessons: (m.lessons || []).map((l: any) => ({
        type: l.type || 'video',
        title: l.title || '',
        resume: l.resume || '',
      })),
    })),
    objectives: (course.objectives || []).map((o: any) => typeof o === 'string' ? o : o.title || ''),
    features: (course.features || []).map((f: any) => typeof f === 'string' ? f : f.title || ''),
  };
  drawerOpen.value = true;
};

const closeDrawer = () => {
  drawerOpen.value = false;
  editingCourse.value = null;
  createdCourseLink.value = '';
  coverFile.value = null;
  coverPreview.value = null;
  videoFiles.value = [];
};

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    language: 'Français',
    price: 0,
    original_price: 0,
    categories: [],
    instructor_id: null,
    visibility: 'public',
    modules: [],
    objectives: [],
    features: [],
  };
  createdCourseLink.value = '';
  coverFile.value = null;
  coverPreview.value = null;
  videoFiles.value = [];
  editingCourse.value = null;
};

// ── Save ──

const handleSaveCourse = async () => {
  if (!form.value.title.trim()) {
    toast.add({ severity: 'error', detail: 'Le titre est requis', life: 3000 });
    return;
  }
  if (!institutionId.value) return;

  saving.value = true;
  try {
    if (editingCourse.value) {
      // UPDATE (JSON only — no file upload on update for now)
      const { data } = await InstitutionAPI.updateCourse(
        institutionId.value,
        editingCourse.value.id,
        form.value
      );
      const idx = courses.value.findIndex((c) => c.id === editingCourse.value.id);
      if (idx !== -1) courses.value[idx] = data.course;
      toast.add({ severity: 'success', detail: 'Cours mis à jour', life: 3000 });
      closeDrawer();
    } else {
      // CREATE — utiliser FormData si image ou vidéos
      const hasCover = !!coverFile.value;
      const hasVideos = videoFiles.value.some(mod => mod?.some(f => !!f));

      let payload: Record<string, any> | FormData = form.value;
      if (hasCover || hasVideos) {
        const fd = new FormData();
        fd.append('data', JSON.stringify(form.value));
        if (coverFile.value) fd.append('cover_image', coverFile.value);

        // Videos : module 0 lesson 0, module 0 lesson 1, ..., module 1 lesson 0, ...
        for (const moduleVideos of videoFiles.value) {
          if (moduleVideos) {
            for (const video of moduleVideos) {
              if (video) fd.append('videos', video);
            }
          }
        }
        payload = fd;
      }

      const { data } = await InstitutionAPI.createCourse(institutionId.value, payload);
      courses.value.unshift(data.course);

      // Générer le lien de partage
      const link = `${window.location.origin}/course-details/${data.course.id}`;
      createdCourseLink.value = link;

      toast.add({ severity: 'success', detail: 'Cours créé avec succès !', life: 3000 });

      // On ne ferme pas — on affiche le lien pour partage
    }
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur lors de l'enregistrement";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
    console.error(e);
  } finally {
    saving.value = false;
  }
};

// ── Delete ──

const confirmDelete = (course: Record<string, any>) => {
  deleteConfirm.value = course;
};

const handleDelete = async () => {
  if (!deleteConfirm.value || !institutionId.value) return;
  saving.value = true;
  try {
    await InstitutionAPI.deleteCourse(institutionId.value, deleteConfirm.value.id);
    courses.value = courses.value.filter((c) => c.id !== deleteConfirm.value.id);
    toast.add({ severity: 'success', detail: 'Cours supprimé', life: 3000 });
    deleteConfirm.value = null;
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur lors de la suppression";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
    console.error(e);
  } finally {
    saving.value = false;
  }
};

// ── Publish ──

const handlePublish = async (course: Record<string, any>) => {
  if (!institutionId.value) return;
  try {
    const { data } = await InstitutionAPI.publishCourse(institutionId.value, course.id);
    const idx = courses.value.findIndex((c) => c.id === course.id);
    if (idx !== -1) courses.value[idx] = data.course;
    toast.add({ severity: 'success', detail: 'Cours publié avec succès !', life: 3000 });
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur lors de la publication";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
    console.error(e);
  }
};

// ── Regenerate code ──

const handleRegenerateCode = async (course: Record<string, any>) => {
  if (!institutionId.value) return;
  try {
    const { data } = await InstitutionAPI.generateAccessCode(institutionId.value, course.id);
    course.access_code = data.access_code;
    const idx = courses.value.findIndex((c) => c.id === course.id);
    if (idx !== -1) courses.value[idx].access_code = data.access_code;
    toast.add({ severity: 'success', detail: 'Nouveau code généré : ' + data.access_code, life: 4000 });
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur";
    toast.add({ severity: 'error', detail: msg, life: 4000 });
    console.error(e);
  }
};

onMounted(loadData);
</script>

<style scoped>
/* ── Drawer slide animation ── */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-slide-enter-active > div:last-child,
.drawer-slide-leave-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
}
.drawer-slide-enter-from > div:last-child,
.drawer-slide-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
