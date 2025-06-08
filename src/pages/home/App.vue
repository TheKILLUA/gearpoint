<script setup lang="ts">
import Header from "../../components/Header.vue";
import { useAutoTitle } from '../../composables/useAutoTitle';
import { onMounted } from 'vue'

import { useCartStore } from '../../stores/cart.ts'
import { logEvent, analytics } from "../../firebase.ts";

import ImageTextBlock from "../../components/ImageTextBlock.vue";

import Footer from "../../components/Footer.vue";
import WhyChooseUs from "../../components/WhyChooseUs.vue";
import FeaturedProducts from "../../components/FeaturedProducts.vue";
import Partners from "../../components/Partners.vue";
import Reviews from "../../components/Reviews.vue";
import CallToAction from "../../components/CallToAction.vue";
import Slider from "../../components/Slider.vue";
import MainHero from "../../components/MainHero.vue";
import CookieConsent from "../../components/CookieConsent.vue";
import { useLanguage } from '../../composables/useLanguage'
import { useUserStore } from '../../stores/user.ts'

const { initLanguage } = useLanguage()
initLanguage()

const userStore = useUserStore()
userStore.init()

useAutoTitle();




onMounted(async () => {
  const cart = useCartStore()
  cart.loadFromLocalStorage()
  logEvent(analytics, 'page_view', {
    page_location: window.location.href,
    page_path: '/magazin/',
    page_title: 'GearPoint - Main'
  })







})
</script>

<template>
  <Header />
  <MainHero />
  <div class="max-w-container mx-auto p-[15px] flex flex-col items-center justify-between">
    <Slider />

    <ImageTextBlock
        image="/images/hero-bg.jpg"
        title="Scule de înaltă calitate"
        subtitle="Fiabile și durabile"
        description="Instrumentele noastre sunt proiectate să reziste în cele mai dificile condiții."
        buttonText="Află mai multe"
        buttonLink="/magazin"
        :reverse="false"
    />

    <ImageTextBlock
        image="/images/hero-bg.jpg"
        title="Scule de înaltă calitate"
        subtitle="Fiabile și durabile"
        description="Instrumentele noastre sunt proiectate să reziste în cele mai dificile condiții."
        buttonText="Află mai multe"
        buttonLink="/magazin"
        :reverse="true"
    />

    <WhyChooseUs />
    <FeaturedProducts />
    <Partners />
    <Reviews />
    <CallToAction />
    <CookieConsent />
  </div>
  <Footer />
</template>