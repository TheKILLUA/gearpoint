<template>
  <section class="w-full bg-white py-12">
    <div class="max-w-container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">

      <div class="w-full md:w-1/2 text-center md:text-left">
        <h2 class="text-3xl md:text-4xl font-extrabold text-black mb-4">
          {{ title }}
        </h2>
        <h3 class="text-xl text-gray-700 mb-4">
          {{ subtitle }}
        </h3>
        <p class="text-gray-600 mb-6 leading-relaxed">
          {{ description }}
        </p>
        <a
            :href="buttonLink"
            class="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {{ buttonText }}
        </a>
      </div>


      <div class="w-full md:w-1/2">
        <img
            :src="image"
            :alt="title"
            class="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
}>()
</script>
