<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import ProductCard from "../../components/ProductCard.vue";
import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

import { useUserStore } from '../../stores/user.ts'

const userStore = useUserStore()
userStore.init()

const categorii = ref<any[]>([])
const produse = ref<any[]>([])
const selectedCategory = ref<string | null>(null)

const loading = ref(true)


onMounted(async () => {
  cart.loadFromLocalStorage()
  const categoriiSnap = await getDocs(collection(db, 'categorii'))
  categorii.value = categoriiSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))




  loading.value = true
  const snapshot = await getDocs(collection(db, 'produse'))
  produse.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  loading.value = false
})


const produseFiltrate = computed(() => {
  if (!selectedCategory.value) return produse.value
  return produse.value.filter(p => p.category === selectedCategory.value)
})

const sortOption = ref("price_asc")

const produseSortate = computed(() => {
  const sorted = [...produseFiltrate.value]
  switch (sortOption.value) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price)
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price)
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case "name_desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return sorted
  }
})

const itemsPerPage = ref(20)
const currentPage = ref(1)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return produseSortate.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() =>
    Math.ceil(produseSortate.value.length / itemsPerPage.value)
)

const pretMin = ref(0)
const pretMax = ref(99999)

function resetFilters() {
  sortOption.value = "price_asc"
  pretMin.value = 0
  pretMax.value = 99999
  currentPage.value = 1
}

</script>

<template>
  <Header />

  <section class="max-w-container mx-auto p-4">
    <div class="text-sm text-gray-500 mb-4">
      <a href="/">Acasă</a> / Magazin
    </div>

    <div class="flex flex-col md:flex-row gap-6">

      <aside class="w-full md:w-1/4 border border-gray-200 p-4 rounded">
        <h2 class="text-lg font-semibold mb-4">Categorii</h2>
        <ul>
          <li
              v-for="cat in categorii"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              :class="['cursor-pointer mb-2', selectedCategory === cat.id ? 'text-black font-bold' : 'text-gray-600 hover:text-black']"
          >
            {{ cat.name }}
          </li>
          <li @click="selectedCategory = null" class="text-blue-500 mt-4 cursor-pointer">Resetare</li>
        </ul>
        <div class="mb-4 flex items-center gap-4">
          <label for="sort" class="text-sm font-medium">Sortează:</label>
          <select
              v-model="sortOption"
              id="sort"
              class="border border-gray-300 rounded p-2 text-sm"
          >
            <option value="price_asc">Preț crescător</option>
            <option value="price_desc">Preț descrescător</option>
            <option value="name_asc">Alfabetic A-Z</option>
            <option value="name_desc">Alfabetic Z-A</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Preț (lei)</label>
          <div class="flex items-center gap-2">
            <input
                v-model.number="pretMin"
                type="number"
                placeholder="Min"
                class="w-full border p-2 rounded text-sm"
            />
            <span>-</span>
            <input
                v-model.number="pretMax"
                type="number"
                placeholder="Max"
                class="w-full border p-2 rounded text-sm"
            />
          </div>
        </div>
        <button
            @click="resetFilters"
            class="text-blue-500 mt-4 cursor-pointer"
        >
          Resetează filtrele
        </button>
      </aside>

      <div class="w-full flex flex-col justify-between">

        <div class="grid grid-cols-1 justify-items-center h-fit sm:grid-cols-2 md:grid-cols-3 w-[100%] gap-3.75">
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <div v-if="loading" class="custom-loader flex justify-center items-center w-[100%] py-20">
            <span class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></span>
          </div>
          <ProductCard
              v-else
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
          />
        </div>

        <div class="mt-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <label class="mr-2 text-sm font-medium text-gray-600">Pe pagină:</label>
            <select v-model="itemsPerPage" class="border rounded p-2 text-sm">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <button
                @click="currentPage--"
                :disabled="currentPage <= 1"
                class="px-3 py-1 border rounded disabled:opacity-50"
            >‹</button>
            <span class="text-sm">Pagina {{ currentPage }} din {{ totalPages }}</span>
            <button
                @click="currentPage++"
                :disabled="currentPage >= totalPages"
                class="px-3 py-1 border rounded disabled:opacity-50"
            >›</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>
