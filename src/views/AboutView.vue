<template>
    <div class="flex flex-col items-center gap-24 pt-14">
        <div class="w-11/12 xl:w-4/5 px-4 lg:px-24 flex flex-wrap md:flex-nowrap gap-6 lg:gap-12">
            <div class="w-full md:w-1/2">
                <img :src="about" class="w-full h-full object-cover" alt="about">
            </div>
            <div class="w-full md:w-1/2 flex flex-col gap-6">
                <h1 class="text-2xl md:text-5xl font-semibold text-primary">Qui sommes-nous ?</h1>
                <p>
                    Nous sommes une plateforme de formation en ligne dédiée à rendre l'apprentissage accessible et stimulant pour tous.
                    Avec un catalogue riche de cours dans des domaines variés et des formateurs expérimentés, nous aidons nos apprenants
                    à atteindre leurs objectifs.
                </p>
                <p>Que vous soyez débutant ou expert, notre plateforme vous accompagne à chaque étape de votre parcours.</p>
            </div>
        </div>
        <div class="w-full bg-green-50 flex items-center justify-center py-10">
            <div class="w-11/12 xl:w-4/5 px-4 lg:px-24 flex flex-wrap-reverse md:flex-nowrap gap-6 lg:gap-12">
                <div class="w-full md:w-1/2 flex flex-col gap-6">
                    <h1 class="text-2xl md:text-5xl font-semibold text-primary">Notre mission</h1>
                    <p>
                        Nous croyons que l'éducation est la clé pour transformer des vies et ouvrir de nouvelles opportunités. Notre mission
                        est de rendre l'apprentissage accessible à tous, en proposant des formations de qualité adaptées aux besoins des apprenanats
                        du monde entier. Grâce à nos cours interactifs, flexibles et abordables, nous aidons chacun à développer ses compétences, atteindre
                        ses objectifs professionnels et personnels.
                    </p>
                    <p>Rejoignez-nous dans notre mission de démocratiser l'éducation et de bâtir un avenir meilleur.</p>
                </div>
                <div class="w-full md:w-1/2">
                    <img :src="about" class="w-full h-full object-cover" alt="about">
                </div>
            </div>
        </div>
        <div class="w-11/12 xl:w-4/5 px-4 lg:px-24 flex flex-wrap md:flex-nowrap gap-6 lg:gap-12">
            <div class="w-full md:w-1/2">
                <img :src="about" class="w-full h-full object-cover" alt="about">
            </div>
            <div class="w-full md:w-1/2 flex flex-col gap-6">
                <h1 class="text-2xl md:text-5xl font-semibold text-primary">Notre histoire</h1>
                <p>
                    Nous sommes une plateforme de formation en ligne dédiée à rendre l'apprentissage accessible et stimulant pour tous.
                    Avec un catalogue riche de cours dans des domaines variés et des formateurs expérimentés, nous aidons nos apprenants
                    à atteindre leurs objectifs.
                </p>
                <p>Que vous soyez débutant ou expert, notre plateforme vous accompagne à chaque étape de votre parcours.</p>
            </div>
        </div>
        <div class="w-full bg-green-50 flex flex-col items-center py-10 gap-8">
            <h3 class="text-2xl md:text-4xl font-semibold">Alors prêt à nous rejoindre ?</h3>
            <RouterLink to="/inscription" class="text-white bg-primary w-max py-3 px-4 md:px-8 hover:opacity-80 transition-opacity duration-150">Inscris-toi maintenant</RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import about from './../assets/images/about.jpg'
import { RouterLink } from 'vue-router';
</script>

<style>

</style>