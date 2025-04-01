<template>
    <div class="space-y-6">
        <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
            <div
                v-for="stat in statistics"
                :key="stat.title"
                class="flex flex-col justify-between rounded-lg bg-white p-4 xl:p-6 shadow space-y-3"
            >
                <div class="w-full flex gap-3">
                    <FontAwesomeIcon :icon="stat.icon" class="text-primary h-5"/>
                    <h3 class="text-sm font-medium text-gray-600">{{ stat.title }}</h3>
                </div>
                <div class="w-full flex gap-3 items-end justify-between">
                    <p class="text-xl xl:text-2xl font-semibold">{{ stat.value }}</p>
                    <span :class="[
                        'text-sm',
                        stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                        ]"
                    >
                        {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                    </span>
                </div>
            </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow">
            <div class="w-full flex justify-between items-center">
                <h3 class="mb-4 text-lg font-semibold">Revenus mensuels</h3>
                <button class="text-white bg-red-600 w-max text-sm md:text-[15px] rounded-md py-2 px-2 md:py-3 md:px-8 hover:bg-red-700 transition-all duration-150">
                    Retrait
                </button>
            </div>
            <div class="h-64">
                <!-- Intégrer ici un composant de graphique (ex: Chart.js, ApexCharts) -->
            </div>
        </div>

        <!-- <div class="rounded-lg bg-white p-6 shadow">
            <h3 class="mb-4 text-lg font-semibold">Activités récentes</h3>
            <div class="space-y-4">
                <div
                    v-for="activity in recentActivities"
                    :key="activity.id"
                    class="flex items-center justify-between border-b pb-4"
                >
                    <div class="flex items-center space-x-3">
                        <component :is="activity.icon" class="h-6 w-6 text-gray-500" />
                        <div>
                        <p class="font-medium">{{ activity.title }}</p>
                        <p class="text-sm text-gray-600">{{ activity.timestamp }}</p>
                        </div>
                    </div>
                    <span :class="{
                        'text-green-600': activity.type === 'success',
                        'text-blue-600': activity.type === 'info',
                        'text-red-600': activity.type === 'error'
                        }"
                    >
                        {{ activity.status }}
                    </span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faChartPie, faBookOpen, faUsers, faMessage, faGear, faStar, faCoins,  } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';


const statistics = [
    { title: 'Étudiants actifs', value: '1', trend: 12, icon: faUsers },
    { title: 'Cours publiés', value: '15', trend: 5, icon: faBookOpen },
    { title: 'Portefeuille', value: '2,450 FCFA', trend: 8, icon: faCoins },
    { title: 'Note moyenne', value: '4.8/5', trend: -1, icon: faStar },
];

// const recentActivities = [
//     {
//       id: 1,
//       title: 'Nouvelle inscription au cours "Vue.js Avancé"',
//       timestamp: 'Il y a 2 heures',
//       type: 'success',
//       status: 'Nouveau',
//       icon: ''
//     },
// ];
</script>

<style>

</style>
