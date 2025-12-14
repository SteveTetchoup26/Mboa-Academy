<template>
    <div class="w-full flex flex-col gap-5 bg-gray-800 text-white px-4 pt-16 pb-4">
        <div class="grid justify-center xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 md:gap-8 w-full">
            <div class="flex justify-center">
              <RouterLink to="/">
                  <img :src="logoFooter" alt="" class="xs:w-48 w-40">
              </RouterLink>
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="font-bold text-xl">Rejoignez-nous</h2>
                <RouterLink to="/about-us" class="hover:underline"><FontAwesomeIcon :icon="faCircle" class="w-1 mr-2"/>À propos</RouterLink>
                <RouterLink to="/contact-us" class="hover:underline"><FontAwesomeIcon :icon="faCircle" class="w-1 mr-2"/>Contactez-nous</RouterLink>
                <RouterLink to="" class="hover:underline"><FontAwesomeIcon :icon="faCircle" class="w-1 mr-2"/>Politiques de confidentialité</RouterLink>
                <RouterLink to="" class="hover:underline"><FontAwesomeIcon :icon="faCircle" class="w-1 mr-2"/>Termes & Conditions</RouterLink>
                <RouterLink to="" class="hover:underline"><FontAwesomeIcon :icon="faCircle" class="w-1 mr-2"/>FAQs & Aide</RouterLink>
            </div>
            <div class="flex flex-col gap-2 ">
                <h2 class="font-bold text-xl">Contact</h2>
                <RouterLink to="" class="hover:underline"><FontAwesomeIcon :icon="faLocationDot" class=" mr-2"/>Douala, Cameroun</RouterLink>
                <RouterLink to="" class="hover:underline"><FontAwesomeIcon :icon="faPhone" class=" mr-2"/>+237 699 555 333</RouterLink>
                <RouterLink to="" class="hover:underline"><FontAwesomeIcon :icon="faEnvelope" class="mr-2"/>test@gmail.com</RouterLink>
                <div class="w-1/2 flex justify-between mt-2">
                    <RouterLink to=""><FontAwesomeIcon :icon="faFacebook"/></RouterLink>
                    <RouterLink to=""><FontAwesomeIcon :icon="faTwitter"/></RouterLink>
                    <RouterLink to=""><FontAwesomeIcon :icon="faYoutube"/></RouterLink>
                    <RouterLink to=""><FontAwesomeIcon :icon="faLinkedin"/></RouterLink>
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <h2 class="font-bold text-xl">Téléchargez l'application</h2>
                <RouterLink to="/about"><img :src="playStore" alt="play-store" class="w-32"></RouterLink>
                <RouterLink to="/about"><img :src="appStore" alt="app-store" class="w-32"></RouterLink>
            </div>
        </div>
        <hr class=""/>
        <div class="flex justify-around w-full">
            <p>©2025 Mboa Academy. Tous droits reservés.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faEnvelope, faPhone, faLocationDot, faCircle  } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { RouterLink } from 'vue-router';
import playStore from './../assets/images/play-store.png'
import appStore from './../assets/images/app-store.png'
import logoFooter from './../assets/images/logo-footer.png'

</script>

<style scoped>

</style>
