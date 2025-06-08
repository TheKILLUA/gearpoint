<script setup lang="ts">
declare const grecaptcha: any;
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import { onMounted } from 'vue'
import { logEvent, analytics } from '../../firebase.ts'
import { useCartStore } from '../../stores/cart'
import Map from '../../components/Map.vue'

import { useUserStore } from '../../stores/user.ts'

const userStore = useUserStore()
userStore.init()
onMounted(() => {
  const cart = useCartStore()
  cart.loadFromLocalStorage()
  logEvent(analytics, 'page_view', {
    page_location: window.location.href,
    page_path: '/contacte/',
    page_title: 'GearPoint - Contacte'
  })
})

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("contact")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let response = grecaptcha.getResponse();
    if (response.length == 0) {
      alert("Please complete the reCAPTCHA");
    } else {

      console.log("Form submitted");
    }
  });
})

</script>

<template>
  <Header />

  <section class="relative p-4 bg-black md:max-h-[600px] text-white w-full flex items-center justify-center overflow-hidden hero-custom-height">
    <img
        src="/images/hero-bg.jpg"
        alt="Despre noi"
        class="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
    />
    <div class="relative z-10 text-center max-w-3xl px-4">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-6">Contacteaza GearPoint</h1>
      <p class="text-lg md:text-xl">Suport tehnic si soluții profesionale</p>
    </div>
  </section>

  <section class="bg-gray-100 py-16">
    <div class="max-w-container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-4">Contactează-ne</h1>
      <p class="text-center text-gray-600 mb-12">Suntem aici pentru tine. Completează formularul sau folosește datele de mai jos.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div class="space-y-6 text-gray-700">
          <div>
            <h2 class="text-xl font-semibold mb-1">Adresă</h2>
            <p>Str. Exemplu 123, Chișinău, Moldova</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-1">Telefon</h2>
            <p>+373 600 000 00</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-1">Email</h2>
            <p>contact@gearpoint.md</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-1">Program</h2>
            <p>Luni - Vineri: 09:00 - 18:00</p>
          </div>
        </div>


        <form action="" class="bg-white shadow-md rounded-xl p-6 space-y-4" method="POST" id="contact">
          <div>
            <label class="block font-semibold mb-1">Nume</label>
            <input type="text" class="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label class="block font-semibold mb-1">Email</label>
            <input type="email" class="w-full border rounded-lg px-4 py-2" required />
          </div>
          <div>
            <label class="block font-semibold mb-1">Mesaj</label>
            <textarea class="w-full border rounded-lg px-4 py-2 h-32" required></textarea>
          </div>

          <div class="g-recaptcha" data-sitekey="6LepIE8rAAAAACIStFDOxpASRpSrbM5ggROZ4Y2g"></div>

          <button type="submit" class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Trimite
          </button>
        </form>
      </div>

      <Map />
    </div>
  </section>

  <Footer />
</template>

<style scoped>
.hero-custom-height {
  min-height: calc(100vh - 136px);
}

@media (max-width: 768px) {
  .hero-custom-height {
    min-height: calc(100dvh - 120px);
  }
}
</style>