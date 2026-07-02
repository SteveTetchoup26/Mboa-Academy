<template>
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('closeModal')"></div>

        <div class="flex h-screen xs:min-h-screen justify-center p-0 xs:p-4">
            <div v-motion
                :initial="{ opacity: 0, scale: 0.5}"
                :enter="{ opacity: 1, scale: 1}"
                class="p-4 bg-white xs:rounded-lg w-full xs:max-w-lg mx-0 xs:mx-4 h-max"
            >
                <div class="flex items-center justify-end p-4">
                    <button @click="$emit('closeModal')" class="font-bold text-2xl hover:text-gray-700">
                        <FontAwesomeIcon :icon="faCircleXmark"/>
                    </button>
                </div>
                <div class="">
                    <img
                        :src="`${API_URL}/uploads/others/${courseImage}` || carouselOne"
                        alt="Course Preview"
                        class="w-full h-48 object-cover rounded-t-lg"
                        crossorigin="anonymous"
                    />
                    <div class="my-6">
                        <h2 class="text-2xl font-bold text-gray-900">{{ courseTitle }}</h2>
                        <p class="text-xl font-semibold text-primary">{{ formatPrice(coursePrice) }}</p>
                    </div>
                </div>

                <form @submit.prevent="handlePayment" class="space-y-6">
                    <div class="space-y-4">
                        <label class="block text-lg font-medium text-gray-700">
                            Mode de paiement
                        </label>

                        <div class="space-y-3">
                            <div
                                v-for="method in paymentMethods"
                                :key="method.value"
                                class="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors"
                                :class="{'bg-green-50 border-2 border-secondary': selectedPayment === method.value}"
                                @click="selectedPayment = method.value"
                            >
                                <input
                                    type="radio"
                                    :name="method.value"
                                    :value="method.value"
                                    v-model="selectedPayment"
                                    class="mr-3"
                                />
                                <span class="flex items-center">
                                    <FontAwesomeIcon v-if="method.label ==='Carte bancaire'" :icon="method.icon" class="mr-2 h-5" />
                                    <img v-else :src="method.icon as string" :alt="method.label" class="w-10 h-10 object-cover mr-2" />
                                    {{ method.label }}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div class="mt-6">
                        <template v-if="selectedPayment === 'card'">
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <label class="block text-sm font-medium text-gray-700">
                                        Numéro de carte
                                    </label>
                                    <input
                                        v-model="cardDetails.number"
                                        type="text"
                                        class="w-full p-2 border rounded-md outline-primary"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-700">
                                            Date d'expiration
                                        </label>
                                        <input
                                            v-model="cardDetails.expiry"
                                            type="text"
                                            class="w-full p-2 border rounded-md outline-primary"
                                            placeholder="MM/AA"
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-700">
                                            CVV
                                        </label>
                                        <input
                                            v-model="cardDetails.cvv"
                                            type="text"
                                            class="w-full p-2 border rounded-md outline-primary"
                                            placeholder="123"
                                        />
                                    </div>
                                </div>

                                <div  class="space-y-2">
                                    <label class="block text-sm font-medium text-gray-700">
                                        Nom sur la carte
                                    </label>
                                    <input
                                        v-model="cardDetails.name"
                                        type="text"
                                        class="w-full p-2 border rounded-md outline-primary"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>
                        </template>


                        <template v-if="selectedPayment === 'paypal'">
                            <div class="p-4 bg-green-50 text-secondary rounded-lg">
                                En cliquant sur "Payer", vous serez redirigés vers les services PayPal sécurisés.
                            </div>
                        </template>

                        <template v-if="selectedPayment === 'wave'">
                            <div class="p-4 bg-green-50 text-secondary rounded-lg">
                                En cliquant sur "Payer maintenant", vous serez redirigés vers les services Wave.
                            </div>
                        </template>

                        <template v-if="selectedPayment === 'ecoCash'">
                            <div class="p-4 bg-green-50 text-secondary rounded-lg">
                                En cliquant sur "Payer maintenant", vous serez redirigés vers les services EcoCash.
                            </div>
                        </template>

                        <template v-if="['orange', 'mtn', 'moov money', 'mpesa'].includes(selectedPayment)">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Numéro de téléphone
                                </label>
                                <!-- <input
                                    v-model="mobileNumber"
                                    type="tel"
                                    class="w-full p-2 border rounded-md outline-primary"
                                    placeholder="+237 6XX XX XX XX"
                                /> -->
                                <vue-tel-input
                                  v-model="mobileNumber"
                                  :default-country="'CM'"
                                  :mode="'international'"
                                  :placeholder="'Entrez votre numéro'"
                                  class=""
                                />
                            </div>
                        </template>
                    </div>


                    <button
                        @click.prevent="handlePayment"
                        type="submit"
                        class="w-full text-white bg-primary text-sm md:text-[15px] rounded-md py-2 px-2 md:py-3 md:px-8 hover:bg-secondary transition-all duration-150"
                    >
                        {{ paymentButtonText }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, computed } from 'vue'
import carouselOne from '../../assets/images/carousel-1.jpg'
import om from '../../assets/images/om.png'
import momo from '../../assets/images/momo.png'
import paypal from '../../assets/images/paypal.png';
import ecocash from '../../assets/images/ecocash.png';
import mpesa from '../../assets/images/m-pesa.png';
import moovMoney from '../../assets/images/moov-money.png';
import wave from '../../assets/images/wave-senegal-mobile-money.png';
import useAppStore from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { PaymentAPI } from '@/services/api/Payment';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import { API_URL } from '@/constants/API_URL';
import { VueTelInput } from "vue-tel-input";


const props = defineProps({
  courseTitle: {
    type: String,
    required: true
  },
  coursePrice: {
    type: Number,
    required: true
  },
  courseImage: {
    type: String,
    required: true
  },
  showModal: {
    type: Boolean,
    required: true
  },
  courseId: {
    type: Number,
    required: true
  }
});

const appStore = useAppStore();
const userStore = useUserStore();
const token = userStore.getToken();
const toast = useToast();
const router = useRouter();
const selectedPayment = ref('card');
const mobileNumber = ref('');
const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
});

const emit = defineEmits(['closeModal']);

const paymentMethods = [
  { label: 'Carte bancaire', value: 'card', icon: faCreditCard },
  { label: 'PayPal', value: 'paypal', icon: paypal },
  { label: 'Orange Money', value: 'orange', icon: om },
  { label: 'MTN Mobile Money', value: 'mtn', icon: momo },
  { label: 'M-Pesa', value: 'mpesa', icon: mpesa },
  { label: 'Moov Money', value: 'moov money', icon: moovMoney },
  { label: 'Wave', value: 'wave', icon: wave },
  { label: 'EcoCash', value: 'ecoCash', icon: ecocash },
]


const paymentButtonText = computed(() => {
  switch (selectedPayment.value) {
    case 'paypal':
      return 'Payer avec PayPal'
    case 'orange':
      return 'Payer avec Orange Money'
    case 'mtn':
      return 'Payer avec MTN Money'
    case 'mpesa':
      return 'Payer avec M-Pesa'
    case 'moov money':
      return 'Payer avec Moov Money'
    default:
      return 'Payer maintenant'
  }
})


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'CFA'
  }).format(price)
}

const handlePayment = async () => {
    let paymentMethodId;
    switch (selectedPayment.value) {
        case 'orange':
            paymentMethodId = 1;
            break;
        case 'mtn':
            paymentMethodId = 2;
            break;
        case 'card':
            paymentMethodId = 3;
            break;
        case 'paypal':
            paymentMethodId = 4;
            break;
        case 'moov money':
            paymentMethodId = 5;
            break;
        case 'mpesa':
            paymentMethodId = 6;
            break;
        case 'wave':
            paymentMethodId = 7;
            break;
        case 'ecoCash':
            paymentMethodId = 8;
            break;
    }

    appStore.loading = true;
    try {
       const res = await PaymentAPI.create({
            courseId: props.courseId,
            paymentMethodId,
            amount: props.coursePrice,
        }, token!);

        console.log(res?.data);

        if(res.data.success){
            toast.add({
                severity: "success",
                detail: res.data.message,
                life: 5000,
            });

            emit('closeModal', { success: true });
        }
    } catch (e: any) {
        console.log(e);
        if(e.response.data.message){
            toast.add({
                severity: "error",
                detail: e.response.data.message,
                life: 5000,
            });
        }
        emit('closeModal', { sucess: false });
    } finally {
        appStore.loading = false;
    }
}

</script>
