<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
      <FontAwesomeIcon :icon="faArrowLeft" />
      <span>Retour</span>
    </button>

    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Créer une institution</h1>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <!-- ══════ Compte du créateur ══════ -->
      <div v-if="!token" class="border border-yellow-200 bg-yellow-50 rounded-lg p-5 space-y-4">
        <div class="flex items-center gap-2 text-yellow-800 font-semibold">
          <FontAwesomeIcon :icon="faUserPlus" />
          <span>Créez votre compte administrateur</span>
        </div>
        <p class="text-sm text-yellow-700">Ces informations serviront à créer votre compte sur la plateforme. Vous pourrez vous connecter dès que votre institution sera validée.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
            <input
              v-model="creator.name"
              type="text"
              required
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              v-model="creator.phone"
              type="tel"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="+237 6XX XXX XXX"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              v-model="creator.email"
              type="email"
              required
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="vous@email.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
            <input
              v-model="creator.password"
              type="password"
              required
              minlength="6"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Minimum 6 caractères"
            />
          </div>
        </div>
      </div>

      <!-- ══════ Infos de l'institution ══════ -->
      <div class="border-t border-gray-200 pt-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations de l'institution</h2>

        <!-- Nom -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'institution *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Ex: Université de Douala"
          />
        </div>

        <!-- Slug -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input
            v-model="form.slug"
            type="text"
            required
            class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Ex: universite-de-douala"
          />
          <p class="text-xs text-gray-400 mt-1">Identifiant unique utilisé dans l'URL (lettres minuscules, tirets)</p>
        </div>

        <!-- Type -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Type d'institution *</label>
          <select
            v-model="form.type"
            required
            class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
          >
            <option value="" disabled>Sélectionner un type</option>
            <option value="University">Université</option>
            <option value="School">École</option>
            <option value="Training Center">Centre de formation</option>
            <option value="Other">Autre</option>
          </select>
        </div>

        <!-- Description -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            placeholder="Présentez votre institution..."
          ></textarea>
        </div>

        <!-- Coordonnées -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              v-model="form.address"
              type="text"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Adresse"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <input
              v-model="form.city"
              type="text"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Ville"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pays</label>
            <input
              v-model="form.country"
              type="text"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Pays"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="+237 6XX XXX XXX"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="contact@institution.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Site web</label>
            <input
              v-model="form.website"
              type="url"
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="https://..."
            />
          </div>
        </div>

        <!-- Branding -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Couleur de marque</label>
            <div class="flex gap-3 items-center">
              <input
                v-model="form.brand_color"
                type="color"
                class="w-12 h-12 rounded border border-gray-300 cursor-pointer"
              />
              <input
                v-model="form.brand_color"
                type="text"
                class="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="#10b981"
              />
            </div>
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
          </div>
        </div>
      </div>

      <!-- Logo preview -->
      <div v-if="logoPreview" class="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-4">
        <img :src="logoPreview" class="w-16 h-16 rounded-lg object-cover border" alt="Aperçu du logo" />
        <div>
          <p class="text-sm font-medium">Aperçu du logo</p>
          <p class="text-xs text-gray-400">{{ logoFile?.name }}</p>
        </div>
      </div>

      <!-- Submit -->
      <div class="flex items-center gap-4 pt-4">
        <button
          type="submit"
          :disabled="submitting"
          class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <i v-if="submitting" class="pi pi-spin pi-spinner"></i>
          <span>{{ submitting ? 'Création en cours...' : 'Créer l\'institution' }}</span>
        </button>
        <button
          type="button"
          @click="router.back()"
          class="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faUserPlus, faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { InstitutionAPI } from "@/services/api/Institution";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();
const token = computed(() => userStore.getToken());

const submitting = ref(false);

const creator = reactive({
  name: "",
  email: "",
  password: "",
  phone: "",
});

const form = reactive({
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

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const handleSubmit = async () => {
  submitting.value = true;
  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug || generateSlug(form.name));
    formData.append("type", form.type);
    formData.append("description", form.description);
    formData.append("address", form.address);
    formData.append("city", form.city);
    formData.append("country", form.country);
    formData.append("phone", form.phone);
    formData.append("email", form.email);
    formData.append("website", form.website);
    formData.append("brand_color", form.brand_color);

    // Ajouter les infos du créateur si pas connecté
    if (!token.value) {
      formData.append("creator_name", creator.name);
      formData.append("creator_email", creator.email);
      formData.append("creator_password", creator.password);
      formData.append("creator_phone", creator.phone);
    }

    // Ajouter le logo si un fichier est sélectionné
    if (logoFile.value) {
      formData.append("logo", logoFile.value);
      formData.append("fileType", "institutionLogo");
    }

    const res = await InstitutionAPI.create(formData);

    const msg = res.data.user
      ? "Institution créée ! Votre compte a été créé, vous pouvez vous connecter."
      : "Institution créée avec succès";

    toast.add({ severity: "success", detail: msg, life: 5000 });

    router.push(`/institutions/${res.data.institution.id}`);
  } catch (e: any) {
    const msg = e.response?.data?.message || "Erreur lors de la création";
    toast.add({ severity: "error", detail: msg, life: 4000 });
    console.error(e);
  } finally {
    submitting.value = false;
  }
};
</script>
