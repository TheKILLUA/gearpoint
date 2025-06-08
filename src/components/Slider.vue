<template>
  <div class="relative w-full overflow-hidden">
    <div
        class="flex transition-transform gap-4 duration-700 ease-in-out"
        :style="{ transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 16}px))` }"
    >
      <div
          v-for="(slide, index) in slides"
          :key="index"
          class="min-w-full h-[400px] md:h-[500px] relative"
      >
        <img
            :src="slide.image"
            class="absolute inset-0 w-full h-full object-cover rounded-4xl brightness-60"
        />
        <div
            class="relative z-10 h-full flex flex-col justify-center md:items-end items-center text-white p-6 md:p-12 text-center md:text-right"
        >
          <h2 class="text-2xl md:text-4xl font-bold mb-4">{{ slide.title }}</h2>
          <p class="mb-6 max-w-xl">{{ slide.subtitle }}</p>
          <a
              :href="slide.link"
              class="bg-white text-black font-semibold py-2 px-5 rounded hover:bg-gray-100 transition"
          >
            {{ t('message.explore') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const slides = [
    {
      image: '/images/slider1.jpg',
      title: t('message.professional_tools'),
      subtitle: t('message.quality_guarantee'),
      link: '/magazin',
    },
    {
      image: '/images/slider2.jpg',
      title: 'Vehicule tehnice de încredere',
      subtitle: 'Utilaje specializate pentru orice provocare.',
      link: '/tehnica-auto',
    },
    {
      image: '/images/slider3.jpg',
      title: 'Totul pentru confortul tău',
      subtitle: 'Accesorii și seturi de unelte la prețuri avantajoase.',
      link: '/magazin',
    },
  ]

  const currentSlide = ref(0)

  onMounted(() => {
    setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.length
    }, 5000)
  })
</script>