<template>
  <section class="bg-gray-50 py-16">
    <div class="max-w-container mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-10">Produse populare</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
            v-for="product in products.slice(0, 4)"
            :key="product.id"
            :product="product"
        />
      </div>
      <a
          href="/magazin"
          class="inline-block mt-10 px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition"
      >
        Vezi toate produsele
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { fetchProducts, type Product } from "../api/products.ts";
import {onMounted, ref} from "vue";
import ProductCard from "./ProductCard.vue";

const products = ref<Product[]>([]);
const isLoading = ref(true);
onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
})
</script>