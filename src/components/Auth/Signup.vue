<template>
    <div class="h-screen flex justify-center px-10 md:px-0">
        <div class="w-1/2 lg:w-3/5 bg-primary hidden md:flex items-center justify-center">
            <div class="w-4/5 lg:w-3/5">
                <h1 class="text-5xl text-white font-bold">Digital <br> Platform <br> For Distance <br><span class="text-black">Learning</span></h1>
            </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center pt-24 gap-10">
            <div class="w-full md:w-4/5 lg:w-3/5 flex flex-col gap-10">
                <h1 class="font-bold text-2xl">Logo</h1>
                <div class="">
                    <p class="text-4xl font-bold">Hey,</p>
                    <p class="text-gray-400">Enter your informations to signup.</p>
                </div>
                <form class="w-full flex flex-col gap-5">
                    <input type="text" class="py-3 px-2 border border-1 border-gray-300 focus:outline-primary" name="name" placeholder="Your Name" required>
                    <input type="email" class="py-3 px-2 border border-1 border-gray-300 focus:outline-primary" name="email" placeholder="Your Email" required>
                    <input type="password" class="py-3 px-2 border border-1 border-gray-300 focus:outline-primary" name="password" placeholder="password" required>
                    <button type="submit" class="bg-primary text-white py-3 px-8 hover:opacity-80 transition-opacity duration-150">S'inscrire</button>
                    <RouterLink to="/connexion" class="text-center hover:text-primary">Vous avez déjà un compte ? Connectez-vous.</RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style>

</style>