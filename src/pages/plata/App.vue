<script setup lang="ts">

declare const grecaptcha: any;
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import { useCartStore } from '../../stores/cart'
import { reactive, computed, onMounted } from 'vue'
import { logEvent, analytics } from '../../firebase.ts'

const cart = useCartStore()

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("plata")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let response = grecaptcha.getResponse();
    if (response.length == 0) {
      alert("Please complete the reCAPTCHA");
    } else {
      console.log("Form submitted");
    }
  });
})

onMounted(() => {
  cart.loadFromLocalStorage()
  logEvent(analytics, 'page_view', {
    page_location: window.location.href,
    page_path: '/plata/',
    page_title: 'GearPoint - Checkout'
  })
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  deliveryMethod: 'courier',
  paymentMethod: 'card'
})

const total = computed(() =>
    cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)






//




</script>

<template>
  <Header />

  <section class="bg-gray-100 py-16">
    <div class="max-w-container mx-auto px-4 grid md:grid-cols-3 gap-8">

        <form class="md:col-span-2 bg-white p-6 rounded-lg shadow space-y-4" id="plata" action="https://test.paynet.md/acquiring/satecom" method="POST">
          <h1 class="text-2xl font-bold mb-4">Detalii comandă</h1>

          <input v-model="form.name" type="text" placeholder="Nume complet"
                 class="input" />
          <input v-model="form.email" type="email" placeholder="Email"
                 class="input" />
          <input v-model="form.phone" type="tel" placeholder="Telefon"
                 class="input" />
          <textarea v-model="form.address" placeholder="Adresă de livrare"
                    rows="3" class="input"></textarea>

          <div class="g-recaptcha" data-sitekey="6LepIE8rAAAAACIStFDOxpASRpSrbM5ggROZ4Y2g"></div>

          <div>
            <h2 class="font-semibold mt-6 mb-2">Metodă de livrare</h2>
            <label class="block">
              <input type="radio" value="courier" v-model="form.deliveryMethod" /> Curier (livrare rapidă)
            </label>
            <label class="block">
              <input type="radio" value="pickup" v-model="form.deliveryMethod" /> Ridicare din magazin
            </label>
          </div>

          <div>
            <h2 class="font-semibold mt-6 mb-2">Metodă de plată</h2>
            <label class="block">
              <input type="radio" value="card" v-model="form.paymentMethod" /> Card bancar
            </label>
            <label class="block">
              <input type="radio" value="cash" v-model="form.paymentMethod" /> Numerar la livrare
            </label>
          </div>

          <button
              type="submit"
              class="mt-6 w-full cursor-pointer inline-block text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continuă spre plată
          </button>
        </form>


      <div class="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 class="text-xl font-bold">Sumar comandă</h2>

        <div v-for="item in cart.items" :key="item.product.id" class="flex justify-between text-sm">
          <span>{{ item.product.name }} × {{ item.quantity }}</span>
          <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
        </div>

        <hr />

        <div class="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
.input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border-color 0.3s;
}
.input:focus {
  outline: none;
  border-color: #333;
}
</style>
