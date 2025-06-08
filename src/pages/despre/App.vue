<script setup lang="ts">
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import ImageTextBlock from "../../components/ImageTextBlock.vue";
import CallToAction from "../../components/CallToAction.vue";
import { useAutoTitle } from '../../composables/useAutoTitle';
import { onMounted } from 'vue'
import { useCartStore } from '../../stores/cart'
import { logEvent, analytics } from "../../firebase.ts";
import Timeline from "../../components/Timeline.vue";
import TeamMembers from "../../components/TeamMembers.vue";
import CompanyStats from "../../components/CompanyStats.vue";
import { useUserStore } from '../../stores/user.ts'

const cart = useCartStore()

const userStore = useUserStore()
userStore.init()
useAutoTitle();

onMounted(() => {
  cart.loadFromLocalStorage()
  logEvent(analytics, 'page_view', {
    page_location: window.location.href,
    page_path: '/despre/',
    page_title: 'GearPoint - Despre noi'
  });
});
</script>

<template>
  <Header />

  <section class="relative p-4 bg-black md:max-h-[600px] text-white w-full flex items-center justify-center overflow-hidden hero-custom-height">
    <img
        src="/images/hero-bg.jpg"
        alt="Despre noi"
        class="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
    />
    <div class="relative z-10 text-center max-w-3xl px-4">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-6">Despre GearPoint</h1>
      <p class="text-lg md:text-xl">Pasiune pentru scule și soluții tehnice profesionale</p>
    </div>
  </section>

  <div class="max-w-container mx-auto p-[15px] flex flex-col gap-10">
    <ImageTextBlock
        image="/images/hero-bg.jpg"
        title="Experiență și încredere"
        subtitle="Peste 10 ani în industrie"
        description="GearPoint oferă unelte și echipamente profesionale din cele mai fiabile surse, sprijinind atât meseriașii cât și companiile industriale."
        buttonText="Vezi produsele"
        buttonLink="/magazin"
    />

    <ImageTextBlock
        image="/images/hero-bg.jpg"
        :reverse="true"
        title="Echipă pasionată"
        subtitle="Oameni dedicați"
        description="Suntem o echipă unită, dedicată calității și satisfacției clienților. Cunoaștem fiecare produs pe care îl oferim și suntem aici să te ajutăm."
        buttonText="Vezi produsele"
        buttonLink="https://gearpoint.wuaze.com/magazin"
    />
    <CompanyStats />
    <TeamMembers />
    <Timeline />
    <CallToAction />
  </div>

  <Footer />
</template>

<style scoped>
.hero-custom-height {
  min-height: calc(100vh - 136px);
}

@media (max-width: 768px) {
  .hero-custom-height {
    min-height: calc(100dvh - 120px);
  }
}
</style>
