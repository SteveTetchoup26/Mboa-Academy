<template>
    <div class="flex justify-center items-center w-full px-8 lg:p-0">
        <div class="w-full lg:w-4/5 py-10 lg:py-24 flex flex-wrap md:flex-nowrap gap-10 lg:gap-24 justify-between">
            <div class="w-full md:w-3/5 flex flex-col gap-4">
                <h2 class="text-4xl font-semibold text-primary">Entrez En Contact</h2>
                <p class="text-gray-400">
                    Faites-nous savoir comment nous pouvons mieux vous servir. Utilisez le formulaire de contact pour nous envoyer un e-mail. 
                    C'est un honneur de vous soutenir dans votre cheminement pour atteindre vos objectifs.
                </p>
                <div class="flex gap-4 items-center">
                    <FontAwesomeIcon :icon="faLocationDot" class="text-primary"/>
                    <div>
                        <p  class="text-primary font-semibold">Office</p>
                        <p>Douala, Cameroun</p>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <FontAwesomeIcon :icon="faPhone" class="text-primary"/>
                    <div>
                        <p class="text-primary font-semibold">Mobile</p>
                        <p>+237 698 254 965</p>
                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <FontAwesomeIcon :icon="faEnvelope" class="text-primary"/>
                    <div>
                        <p class="text-primary font-semibold">Email</p>
                        <p>test@gmail.com</p>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-2/5">
                <form class="w-full flex flex-col gap-3">
                    <input type="text" name="name" class="py-4 px-3 border border-1 border-gray-300 focus:outline-primary" placeholder="Your Name" required>
                    <input type="mail" name="email" class="py-4 px-3 border border-1 border-gray-300 focus:outline-primary" placeholder="Your Email" required>
                    <input type="text" name="subject" class="py-4 px-3 border border-1 border-gray-300 focus:outline-primary" placeholder="Subject" required>
                    <textarea name="comment" class="py-4 px-3 border border-1 border-gray-300 focus:outline-primary" placeholder="Comment"></textarea>
                    <button type="submit" class="bg-primary text-white py-3 px-8 hover:opacity-80 transition-opacity duration-150">Soumettre</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
</script>

<style>

</style>