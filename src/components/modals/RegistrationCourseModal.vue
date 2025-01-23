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
                        :src="carouselOne" 
                        alt="Course Preview" 
                        class="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div class="my-6">
                        <h2 class="text-2xl font-bold text-gray-900">{{ courseTitle }}</h2>
                        <p class="text-xl font-semibold text-primary">{{ formatPrice(coursePrice) }}</p>
                    </div>
                </div>

                <form class="space-y-6">
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
                                    <img v-else :src="method.icon" :alt="method.label" class="w-10 h-10 object-cover mr-2" />
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
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        </template>

                        
                        <template v-if="selectedPayment === 'paypal'">
                            <div class="p-4 bg-green-50 text-secondary rounded-lg">
                                En cliquant sur "Payer", vous serez redirigés vers les services PayPal sécurisés.
                            </div>
                        </template>

                    
                        <template v-if="['orange', 'mtn'].includes(selectedPayment)">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Numéro de téléphone
                                </label>
                                <input
                                    v-model="mobileNumber"
                                    type="tel"
                                    class="w-full p-2 border rounded-md outline-primary"
                                    placeholder="+237 6XX XX XX XX"
                                />
                            </div>
                        </template>

                        
                        <!-- <template v-if="selectedPayment === 'moneygram'">
                            <div class="p-4 bg-green-50 text-seondary rounded-lg">
                                Après validation, vous recevrez les instructions pour effectuer votre transfert MoneyGram.
                            </div>
                        </template> -->
                    </div>

                    
                    <button
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
import paypal from '../../assets/images/paypal.png'


defineProps({
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
  }
})


const selectedPayment = ref('card')
const mobileNumber = ref('')
const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})


const paymentMethods = [
  { label: 'Carte bancaire', value: 'card', icon: faCreditCard },
  { label: 'PayPal', value: 'paypal', icon: paypal },
  { label: 'Orange Money', value: 'orange', icon: om },
  { label: 'MTN Money', value: 'mtn', icon: momo },
//   { label: 'MoneyGram', value: 'moneygram', icon: '' }
]


const paymentButtonText = computed(() => {
  switch (selectedPayment.value) {
    case 'paypal':
      return 'Payer avec PayPal'
    case 'orange':
      return 'Payer avec Orange Money'
    case 'mtn':
      return 'Payer avec MTN Money'
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

</script>