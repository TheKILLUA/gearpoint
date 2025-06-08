<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import { type Product } from "../api/products.ts"

const props = defineProps<{
  visible: Boolean,
  product: Product
}>()

const emit = defineEmits(['close'])

const quantity = ref(1)

function addToCart() {
  console.log(`Added to cart: ${props.product.name}, quantity: ${quantity.value}`)
  emit('close')
}

function addToWishlist(id: string) {
  console.log('Added to favorites:', id)

}
</script>

<template>
  <transition name="fade">
    <div
        v-if="visible"
        class="fixed inset-0 bg-[#00000050] backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="$emit('close')"
    >
      <div
          class="bg-white h-[400px] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-lg p-6 relative flex flex-col md:flex-row gap-6"
      >

        <button
            class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            @click="$emit('close')"
            aria-label="Close popup"
        >
          &times;
        </button>


        <img
            :src="product.image"
            :alt="product.name"
            class="w-full md:w-1/3 object-contain rounded-lg"
        />


        <div class="flex-1 flex flex-col">
          <h2 class="text-2xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4 flex-grow">
            {{ product.description || 'Description is missing.' }}
          </p>

          <p class="text-xl font-bold mb-4">${{ product.price.toFixed(2) }}</p>


          <div class="flex items-center mb-4 space-x-4">
            <label for="qty" class="font-medium">Cantitate:</label>
            <input
                id="qty"
                type="number"
                min="1"
                v-model.number="quantity"
                class="w-20 p-2 border rounded text-center"
            />
          </div>


          <div class="flex space-x-4">
            <button
                class="w-full cursor-pointer bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition"
                @click="addToCart"
            >
              Adaugă în coș
            </button>

            <button
                class="cursor-pointer w-[40px] flex justify-center bg-white p-2 rounded-full shadow hover:bg-gray-100
                flex items-center space-x-2"
                title="Add to wishlist"
                @click.stop="addToWishlist(product.id)"
            >
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
