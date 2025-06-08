<script setup lang="ts">
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import { useCartStore } from '../../stores/cart'
import { computed, onMounted, ref } from 'vue'
import { logEvent, analytics } from '../../firebase.ts'
import { useUserStore } from '../../stores/user.ts'

const userStore = useUserStore()
userStore.init()
const cart = useCartStore()

onMounted(() => {
  cart.loadFromLocalStorage()
  logEvent(analytics, 'page_view', {
    page_location: window.location.href,
    page_path: '/cos/',
    page_title: 'GearPoint - Cos'
  })
})

const total = computed(() =>
    cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)

function removeItem(id: string) {
  cart.removeItem(id)
}

const isRedirecting = ref(false)

const goToPayment = () => {
  isRedirecting.value = true
  window.location.href = 'https://gearpoint.wuaze.com/plata'
}
</script>

<template>
  <Header />

  <section class="bg-gray-100 py-16 min-h-[60vh]">
    <div class="max-w-container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Coșul tău de cumpărături</h1>

      <div v-if="cart.items.length === 0" class="text-gray-600 text-center">
        Coșul este gol. <a href="/magazin" class="text-blue-600 hover:underline">Vezi produsele</a>
      </div>

      <div v-else class="grid md:grid-cols-3 gap-8">

        <div class="md:col-span-2 space-y-6">
          <div
              v-for="item in cart.items"
              :key="item.product.id"
              class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center justify-between"
          >
            <div class="flex items-center gap-4">
              <img :src="item.product.image" :alt="item.product.name" class="h-20 w-20 object-contain" />
              <div>
                <h2 class="font-semibold text-lg">{{ item.product.name }}</h2>
                <p class="text-gray-600 text-sm">SKU: {{ item.product.sku }}</p>
                <p class="text-sm mt-1">Preț: ${{ item.product.price.toFixed(2) }}</p>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <div class="flex items-center gap-2">
                <button
                    class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    @click="cart.decreaseQuantity(item.product.id)"
                >−</button>
                <span>{{ item.quantity }}</span>
                <button
                    class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    @click="cart.increaseQuantity(item.product.id)"
                >+</button>
              </div>
              <button
                  class="text-red-600 hover:underline text-sm"
                  @click="removeItem(item.product.id)"
              >Șterge</button>
            </div>
          </div>
        </div>


        <div class="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold mb-4">Sumar</h2>
            <div class="flex justify-between mb-2">
              <span>Total produse:</span>
              <span>{{ cart.items.length }}</span>
            </div>
            <div class="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
          <button
              class="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              @click="goToPayment"
              :disabled="isRedirecting"
          >
            <span v-if="!isRedirecting">Finalizează comanda</span>
            <span v-else>Redirecting...</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>
