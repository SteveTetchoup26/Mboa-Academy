<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
      <FontAwesomeIcon :icon="faArrowLeft" />
      <span>Retour</span>
    </button>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <!-- Not admin -->
    <div v-else-if="!isAuthorized" class="text-center py-20">
      <FontAwesomeIcon :icon="faLock" class="text-6xl text-red-300 mb-4" />
      <h3 class="text-xl font-semibold text-gray-500">Accès non autorisé</h3>
      <p class="text-gray-400 mt-2">Vous n'êtes pas administrateur de cette institution</p>
      <RouterLink :to="`/institutions/${id}`" class="mt-4 inline-block text-primary hover:underline">
        Voir l'institution
      </RouterLink>
    </div>

    <template v-else-if="institution">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Gérer : {{ institution.name }}</h1>

      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex gap-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'pb-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab: Informations -->
      <div v-if="activeTab === 'info'" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                v-model="editForm.name"
                type="text"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                v-model="editForm.slug"
                type="text"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                v-model="editForm.type"
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="University">Université</option>
                <option value="School">École</option>
                <option value="Training Center">Centre de formation</option>
                <option value="Other">Autre</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Couleur de marque</label>
              <div class="flex gap-3 items-center">
                <input v-model="editForm.brand_color" type="color" class="w-12 h-12 rounded border cursor-pointer" />
                <input v-model="editForm.brand_color" type="text" class="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="editForm.description"
              rows="3"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input v-model="editForm.address" type="text" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input v-model="editForm.city" type="text" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <input v-model="editForm.country" type="text" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input v-model="editForm.phone" type="tel" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="editForm.email" type="email" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Site web</label>
              <input v-model="editForm.website" type="url" class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Logo de l'institution</label>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <FontAwesomeIcon :icon="faImage" class="text-gray-500" />
                  <span class="text-sm text-gray-600">{{ logoFile ? logoFile.name : 'Choisir un fichier' }}</span>
                  <input
                    ref="logoInputRef"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    @change="onLogoFileChange"
                    class="hidden"
                  />
                </label>
                <button
                  v-if="logoFile"
                  @click="removeLogoFile"
                  type="button"
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  <FontAwesomeIcon :icon="faXmark" />
                  Supprimer
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-1">Formats acceptés : JPG, PNG. Taille max : 15 Mo</p>

              <!-- Preview -->
              <div v-if="logoPreview" class="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img :src="logoPreview" class="w-12 h-12 rounded object-cover border" alt="Aperçu" />
                <p class="text-xs text-gray-500">{{ logoFile?.name }}</p>
              </div>
              <div v-else-if="editForm.logo_url && !logoFile" class="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img :src="getLogoUrl(editForm.logo_url)" class="w-12 h-12 rounded object-cover border" alt="Logo actuel" />
                <p class="text-xs text-gray-500">Logo actuel</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="saving"
            class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            <i v-if="saving" class="pi pi-spin pi-spinner"></i>
            <span>{{ saving ? 'Enregistrement...' : 'Enregistrer les modifications' }}</span>
          </button>
        </form>
      </div>

      <!-- Tab: Admins -->
      <div v-if="activeTab === 'admins'" class="space-y-6">
        <!-- Add admin form -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold mb-4">Ajouter un administrateur</h2>
          <div class="flex gap-3">
            <input
              v-model.number="newAdminUserId"
              type="number"
              placeholder="ID de l'utilisateur"
              class="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              v-model="newAdminRole"
              class="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="admin">Admin</option>
              <option value="instructor">Formateur</option>
            </select>
            <button
              @click="handleAddAdmin"
              :disabled="!newAdminUserId"
              class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50"
            >
              Ajouter
            </button>
          </div>
        </div>

        <!-- Admins list -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-lg font-semibold mb-4">Administrateurs actuels</h2>
          <div v-if="admins.length === 0" class="text-center py-8 text-gray-400">
            Aucun administrateur
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="admin in admins"
              :key="admin.id"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {{ admin.user?.name?.charAt(0).toUpperCase() || '?' }}
                </div>
                <div>
                  <p class="text-sm font-medium">{{ admin.user?.name || 'Utilisateur #' + admin.user_id }}</p>
                  <p class="text-xs text-gray-400">{{ admin.role }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="admin.user_id === userStore.user?.id" class="text-xs text-gray-400">(vous)</span>
                <button
                  v-if="admin.user_id !== userStore.user?.id"
                  @click="handleRemoveAdmin(admin.user_id)"
                  class="text-red-500 hover:text-red-700 text-sm"
                >
                  <FontAwesomeIcon :icon="faTrashCan" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faLock, faTrashCan, faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/constants/API_URL";
import { InstitutionAPI } from "@/services/api/Institution";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const token = computed(() => userStore.getToken());

const id = Number(route.params.id);
const institution = ref<Record<string, any> | null>(null);
const admins = ref<Array<Record<string, any>>>([]);
const loading = ref(true);
const saving = ref(false);
const isAuthorized = ref(false);
const activeTab = ref("info");

const newAdminUserId = ref<number | null>(null);
const newAdminRole = ref("admin");

const tabs = [
  { id: "info", name: "Informations" },
  { id: "admins", name: "Administrateurs" },
];

const editForm = reactive({
  name: "",
  slug: "",
  type: "",
  description: "",
  address: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  website: "",
  brand_color: "#10b981",
  logo_url: "",
});

const logoInputRef = ref<HTMLInputElement | null>(null);
const logoFile = ref<File | null>(null);
const logoPreview = ref<string | null>(null);

const onLogoFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    logoFile.value = target.files[0];
    logoPreview.value = URL.createObjectURL(target.files[0]);
  }
};

const removeLogoFile = () => {
  logoFile.value = null;
  logoPreview.value = null;
  if (logoInputRef.value) {
    logoInputRef.value.value = "";
  }
};

const getLogoUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL}/${url}`;
};

const checkAuthorization = () => {
  const user = userStore.user;
  if (user?.roles?.some((r: any) => r.title === "Super Admin")) return true;

  // L'utilisateur est-il admin de cette institution ?
  const admin = admins.value.find((a: any) => a.user_id === user?.id);
  return admin?.role === "admin";
};

onMounted(async () => {
  try {
    const { data } = await InstitutionAPI.getOne(id);
    institution.value = data.institution;
    admins.value = data.institution.admins || [];

    isAuthorized.value = checkAuthorization();
    if (!isAuthorized.value) {
      loading.value = false;
      return;
    }

    // Remplir le formulaire
    editForm.name = data.institution.name || "";
    editForm.slug = data.institution.slug || "";
    editForm.type = data.institution.type?.title || "";
    editForm.description = data.institution.description || "";
    editForm.address = data.institution.address || "";
    editForm.city = data.institution.city || "";
    editForm.country = data.institution.country || "";
    editForm.phone = data.institution.phone || "";
    editForm.email = data.institution.email || "";
    editForm.website = data.institution.website || "";
    editForm.brand_color = data.institution.brand_color || "#10b981";
    editForm.logo_url = data.institution.logo_url || "";
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const handleUpdate = async () => {
  saving.value = true;
  try {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("slug", editForm.slug);
    formData.append("type", editForm.type);
    formData.append("description", editForm.description);
    formData.append("address", editForm.address);
    formData.append("city", editForm.city);
    formData.append("country", editForm.country);
    formData.append("phone", editForm.phone);
    formData.append("email", editForm.email);
    formData.append("website", editForm.website);
    formData.append("brand_color", editForm.brand_color);

    // Ajouter le logo si un fichier est sélectionné
    if (logoFile.value) {
      formData.append("logo", logoFile.value);
      formData.append("fileType", "institutionLogo");
    }

    await InstitutionAPI.update(id, formData, token.value!);
    toast.add({ severity: "success", detail: "Institution mise à jour", life: 3000 });
    // Recharger
    const { data } = await InstitutionAPI.getOne(id);
    institution.value = data.institution;
    editForm.logo_url = data.institution.logo_url || "";
    // Réinitialiser le fichier
    removeLogoFile();
  } catch (e: any) {
    toast.add({
      severity: "error",
      detail: e.response?.data?.message || "Erreur lors de la mise à jour",
      life: 4000,
    });
    console.error(e);
  } finally {
    saving.value = false;
  }
};

const handleAddAdmin = async () => {
  if (!newAdminUserId.value) return;
  try {
    await InstitutionAPI.addAdmin(id, { user_id: newAdminUserId.value, role: newAdminRole.value }, token.value!);
    toast.add({ severity: "success", detail: "Administrateur ajouté", life: 3000 });
    newAdminUserId.value = null;

    // Recharger
    const { data } = await InstitutionAPI.getOne(id);
    admins.value = data.institution.admins || [];
  } catch (e: any) {
    toast.add({
      severity: "error",
      detail: e.response?.data?.message || "Erreur",
      life: 4000,
    });
    console.error(e);
  }
};

const handleRemoveAdmin = async (userId: number) => {
  try {
    await InstitutionAPI.removeAdmin(id, userId, token.value!);
    toast.add({ severity: "success", detail: "Administrateur retiré", life: 3000 });

    const { data } = await InstitutionAPI.getOne(id);
    admins.value = data.institution.admins || [];
  } catch (e: any) {
    toast.add({
      severity: "error",
      detail: e.response?.data?.message || "Erreur",
      life: 4000,
    });
    console.error(e);
  }
};
</script>
