<template>
    <div class="h-screen flex justify-center px-10 md:px-0">
        <div class="w-1/2 lg:w-3/5 bg-primary hidden md:flex items-center justify-center">
            <div class="w-4/5 lg:w-3/5">
                <h1 class="text-5xl text-white font-bold">Plateforme <br> Digitale <br>Pour l'Apprenstissage <br><span class="text-black">En ligne</span></h1>
            </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center pt-24 gap-10">
            <div class="w-full md:w-4/5 lg:w-3/5 flex flex-col gap-10">
                <div class="w-full flex justify-center">
                  <img :src="logoFooter" alt="" class="w-48">
                </div>
                <div class="">
                    <p class="text-4xl font-bold">Hey,</p>
                    <p class="text-gray-400">Saisissez vos informations pour vous inscrire.</p>
                </div>
                <form @submit.prevent="handleSubmit()" class="w-full flex flex-col gap-4">
                    <input
                        type="text"
                        v-model="fields.name"
                        class="bg-white py-3 px-2 border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        :class="{ 'border-gray-300': !fieldsErrors.email, 'border-red-500': fieldsErrors.email }"
                        name="name"
                        placeholder="Nom"
                        required>
                    <input
                        type="email"
                        v-model="fields.email"
                        class="bg-white py-3 px-2 border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        :class="{ 'border-gray-300': !fieldsErrors.email, 'border-red-500': fieldsErrors.email }"
                        name="email"
                        placeholder="Email"
                    >
                    <input
                        type="password"
                        v-model="fields.password"
                        class="bg-white py-3 px-2 border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        :class="{ 'border-gray-300': !fieldsErrors.email, 'border-red-500': fieldsErrors.email }"
                        name="password"
                        placeholder="Mot de passe"
                    >
                    <p v-if="error" class="bg-red-100 text-red-600 text-center py-2">{{ error }}</p>
                    <button @click.prevent="handleSubmit()" class="flex items-center justify-center bg-primary text-white py-3 px-8 hover:opacity-80 transition-opacity duration-150">
                        <LocalLoader v-if="isLoading" />
                        <span v-else>S'inscrire</span>
                    </button>
                    <RouterLink to="/connexion" class="text-center hover:text-primary">Vous avez déjà un compte ? Connectez-vous.</RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AuthAPI } from '@/services/api/Auth';
import { reactive, ref } from 'vue';
import LocalLoader from '../loader/LocalLoader.vue';
import { useToast } from "primevue/usetoast";
import logoFooter from '../../assets/images/logo-footer.png'

const isLoading = ref(false);
const toast = useToast();

const fields = reactive({
  name: "",
  email: "",
  password: "",
});

const error = ref('');

const fieldsErrors = reactive<any>({
  name: null,
  email: null,
  password: null,
});

const clearError = () => {
  error.value = '';
  fieldsErrors.name = null;
  fieldsErrors.email = null;
  fieldsErrors.password = null;
};

const handleSubmit = async () => {
    clearError();
    fieldsErrors.email = !fields.email;
    fieldsErrors.password = !fields.password;
    fieldsErrors.name = !fields.name;
    isLoading.value = true;

  try {
    if(fields.email === "" || fields.password === "" || fields.name === "") {
      error.value = "Veuillez remplir tous les champs";
      return;
    } else {
      const { data } = await AuthAPI.register({ ...fields });

      toast.add({
          severity: "success",
          detail: data?.message,
          life: 3000,
      });

      fields.name = "";
      fields.email = "";
      fields.password = "";
    }

  } catch (e: any) {
    console.error(e);

    const errors = e.response?.data?.errors;

    if (errors) {
      for (let item of errors) {
        fieldsErrors[item.field] = item.message;
      }

      if (errors.length > 1) {
        error.value = "Erreurs lors de la validation du formulaire";
      } else {
        error.value = errors[0].message;
      }
    } else {
      toast.add({
          severity: "error",
          detail: e.response?.data?.message,
          life: 3000,
      });
    }
  } finally {
    isLoading.value = false;
  }
}

</script>

<style>

</style>
