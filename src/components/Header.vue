<script setup lang="ts">
import TopBar from './TopBar.vue'
import logo from '../assets/logo.png'
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { debounce } from 'lodash-es'
import { useI18n } from 'vue-i18n'
import { fetchProducts, type Product } from "../api/products.ts"

const cartStore = useCartStore()
const products = ref<Product[]>([]);

const { t } = useI18n();

const isScrolled = ref(false)

const cart = useCartStore()
const itemCount = computed(() => cart.itemCount)

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const searchQuery = ref('')
const searchResults = ref<Product[]>([])
const allProducts = ref<Product[]>([])
const isLoading = ref(false)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)


onMounted(async () => {
  try {
    isLoading.value = true
    allProducts.value = await fetchProducts()
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    isLoading.value = false
  }
})


const performSearch = debounce((query: string) => {
  if (!query.trim()) {
    searchResults.value = []
    return
  }

  isLoading.value = true

  try {

    const results = allProducts.value.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    )

    searchResults.value = results.slice(0, 10)
  } catch (error) {
    console.error('Search failed:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}, 300)


watch(searchQuery, (newQuery) => {
  isDropdownOpen.value = newQuery.length > 0
  performSearch(newQuery)
})


const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const selectProduct = (product: Product) => {

  console.log('Selected product:', product)
  searchQuery.value = product.name
  isDropdownOpen.value = false

  window.location.href = "https://gearpoint.wuaze.com/" + product.slug
}


const showMobileSearch = ref(false)
</script>

<template>
  <TopBar />
  <header class="w-full sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
    <div :class="['max-w-container mx-auto px-[15px] flex items-center justify-between transition-height duration-150', isScrolled ? 'h-16 md:h-14' : 'h-20 md:h-24']">

      <div class="w-16 flex justify-start md:hidden">
        <button
            class="text-2xl text-[#1C1C1C] cursor-pointer"
            @click="toggleMobileMenu"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>


      <a href="/" class="md:shrink-0">
        <img
            :src="logo"
            alt="GearPoint Logo"
            :class="['transition-all duration-300', isScrolled ? 'h-12' : 'h-18']"
        />
      </a>


      <div class="w-16 flex items-center justify-end gap-4 md:hidden">
        <button class="text-xl text-[#1C1C1C] cursor-pointer" @click="showMobileSearch = !showMobileSearch">
          <i class="fas fa-search"></i>
        </button>
        <a href="/cos/" class="relative text-xl text-[#1C1C1C]">
          <i class="fas fa-shopping-cart"></i>
          <span
              v-if="itemCount > 0"
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ itemCount }}
          </span>
        </a>
      </div>


      <div class="hidden md:flex flex-1 items-center justify-between ml-6">
        <div class="flex-1 relative" ref="dropdownRef">
          <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('message.search_placeholder')"
              class="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              @focus="isDropdownOpen = searchQuery.length > 0"
          />


          <div
              v-if="isDropdownOpen"
              class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
          >
            <div v-if="isLoading" class="p-4 text-center text-gray-500">
              {{ t('message.searching') }}...
            </div>

            <template v-else>
              <div v-if="searchResults.length > 0">
                <div
                    v-for="product in searchResults"
                    :key="product.id"
                    class="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    @click="selectProduct(product)"
                >
                  <div class="font-medium">{{ product.name }}</div>
                  <div v-if="product.price" class="text-sm text-gray-600">
                    ${{ product.price.toFixed(2) }}
                  </div>
                  <div v-if="product.shortDescription" class="text-xs text-gray-500 truncate">
                    {{ product.shortDescription }}
                  </div>
                </div>
              </div>

              <div v-else-if="searchQuery" class="p-4 text-center text-gray-500">
                {{ t('message.no_results_found') }}
              </div>
            </template>
          </div>
        </div>

        <nav class="flex items-center gap-4 text-sm text-[#1C1C1C] ml-6">
          <a href="/" class="hover:underline">{{ t('message.home') }}</a>
          <a href="/magazin/" class="hover:underline">{{ t('message.shop') }}</a>
          <a href="/despre/" class="hover:underline">{{ t('message.about') }}</a>
          <a href="/contacte/" class="hover:underline">{{ t('message.contact') }}</a>
          <a href="/cos/" class="hover:underline">{{ t('message.cart') }}</a>
        </nav>

        <a href="/cos/" class="relative text-xl text-[#1C1C1C] ml-4">
          <i class="fas fa-shopping-cart"></i>
          <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
      {{ cartStore.itemCount }}
    </span>
        </a>
      </div>
    </div>

    <div v-if="showMobileSearch" class="md:hidden p-4 bg-white shadow z-40 relative">
      <div class="relative" ref="dropdownRef">
        <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('message.search_placeholder')"
            class="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            @focus="isDropdownOpen = searchQuery.length > 0"
        />


        <div
            v-if="isDropdownOpen"
            class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          <div v-if="isLoading" class="p-4 text-center text-gray-500">
            {{ t('message.searching') }}...
          </div>

          <template v-else>
            <div v-if="searchResults.length > 0">
              <div
                  v-for="product in searchResults"
                  :key="product.id"
                  class="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  @click="selectProduct(product)"
              >
                <div class="font-medium">{{ product.name }}</div>
                <div v-if="product.price" class="text-sm text-gray-600">
                  ${{ product.price.toFixed(2) }}
                </div>
                <div v-if="product.shortDescription" class="text-xs text-gray-500 truncate">
                  {{ product.shortDescription }}
                </div>
              </div>
            </div>
            <div v-else-if="searchQuery" class="p-4 text-center text-gray-500">
              {{ t('message.no_results_found') }}
            </div>
          </template>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          @click.self="closeMenu"
      >
        <aside
            class="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white p-6 shadow-md transform transition-transform duration-300 ease-in-out"
            :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <div class="flex items-center justify-between mb-6">
            <a href="/">
              <img :src="logo" alt="GearPoint Logo" class="h-16" />
            </a>
            <button @click="closeMenu" class="text-xl text-[#1C1C1C] cursor-pointer">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <nav class="flex flex-col gap-4 text-[#1C1C1C]">
            <a href="/" @click="closeMenu">{{ t('message.home') }}</a>
            <a href="/magazin/" @click="closeMenu">{{ t('message.shop') }}</a>
            <a href="/despre/" @click="closeMenu">{{ t('message.about') }}</a>
            <a href="/contacte/" @click="closeMenu">{{ t('message.contact') }}</a>
            <a href="/cos/" @click="closeMenu">{{ t('message.cart') }}</a>
          </nav>
        </aside>
      </div>
    </transition>

  </header>
</template>