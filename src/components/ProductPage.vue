<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.ts'
import Header from './Header.vue'
import Footer from './Footer.vue'

const route = useRoute()
const product = ref<any>(null)

watch(
    () => route.params.slug,
    async (slugParam) => {

      if (typeof slugParam === 'string') {
        try {
          const docRef = doc(db, 'produse', slugParam)
          const snap = await getDoc(docRef)

          if (snap.exists()) {
            product.value = snap.data()
          } else {
            console.warn('Produsul nu a fost găsit în Firestore.')
          }
        } catch (err) {
          console.error('Eroare la obținerea documentului:', err)
        }
      } else {
        console.warn('Slug-ul nu este valid:', slugParam)
      }
    },
    { immediate: true }
)
</script>


<template>
  <Header />
  <div class="max-w-container mx-auto p-[15px] h-[1080px] flex flex-col items-center justify-between">
    <section v-if="product" class="max-w-container mx-auto p-4">
      <div class="flex flex-col md:flex-row gap-6">
        <img :src="product.image" :alt="product.name" class="w-full md:w-1/2 object-contain h-[400px]" />
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          <p class="text-lg mb-2 text-gray-600">{{ product.shortDescription }}</p>
          <p class="text-xl font-semibold mb-4 text-black">${{ product.price }}</p>
          <button class="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Adaugă în coș</button>
        </div>
      </div>
      <div class="mt-10">
        <h2 class="text-2xl font-semibold mb-2">Descriere detaliată</h2>
        <p class="text-gray-800">{{ product.description }}</p>
      </div>
    </section>
  </div>

  <Footer />
</template>
