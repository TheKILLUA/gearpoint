<script setup lang="ts">
import { defineProps } from 'vue'
import ProductQuickView from "./ProductQuickView.vue";
import { type Product } from "../api/products.ts"
import { useCartStore } from '../stores/cart.ts'
import { ref } from "vue";

const cartStore = useCartStore()


















defineProps<{
  product: Product
}>()

const showQuickView = ref(false)

function openQuickView() {
  showQuickView.value = true
}

function closeQuickView() {
  showQuickView.value = false
}

const addToCart = (product: Product) => {
  cartStore.addItem(product)


  console.log('🛒 Added to cart:', product.name)

}






function addToWishlist(productId: string) {
  console.log('💖 wishlist:', productId)

}
</script>


<template>
  <div class="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-xs relative group bg-white">
    <a :href="`/produs/${product.slug}`" class="block">
      <img
          :src="product.image"
          :alt="product.name"
          class="h-48 w-full object-contain object-center p-4"
      />
    </a>
    <div class="flex flex-col flex-1 justify-between p-4">
      <div>
        <h3 class="text-lg font-semibold mb-2">
          <a :href="`/produs/${product.slug}`" class="hover:underline">
            {{ product.name }}
          </a>
        </h3>
        <p class="text-gray-600 text-sm mb-4">{{ product.shortDescription }}</p>
        <div class="font-bold text-black text-lg mb-2">${{ product.price.toFixed(2) }}</div>
      </div>
      <button
          class="w-full cursor-pointer bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition"
          @click="addToCart(product)"
      >
        <i class="fa-solid fa-cart-shopping mr-3"></i>
        <span>Adaugă în coș</span>
      </button>
    </div>


    <div class="absolute w-[40px] top-2 right-2 flex flex-col space-y-2">
      <button
          class="cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100
               opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100
               transition-all duration-300 ease-out"
          title="Quick view"
          @click.stop="openQuickView"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <button
          class="cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100
               opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100
               transition-all duration-300 ease-out delay-150"
          title="Add to wishlist"
          @click.stop="addToWishlist(product.id)"
      >
        <i class="fa-solid fa-heart"></i>
      </button>
    </div>

    <ProductQuickView
        :visible="showQuickView"
        :product="product"
        @close="closeQuickView"
    />
  </div>
</template>
