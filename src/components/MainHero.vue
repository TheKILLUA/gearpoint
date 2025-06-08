<template>

  <section class="hero-section relative p-4 bg-black md:max-h-[700px] text-white w-full flex items-center justify-center overflow-hidden hero-custom-height">
    <img
        src="/images/hero-bg.jpg"
        alt="Hero Background"
        class="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
    />
    <div class="relative z-10 text-center max-w-4xl px-4">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        {{ t('message.discover_tools') }}
      </h1>
      <p class="text-lg md:text-xl mb-8">
        {{ t('message.site_title') }}
      </p>
      <a
          href="https://gearpoint.wuaze.com/magazin"
          class="inline-block bg-white text-black font-semibold py-3 px-6 rounded-lg text-lg hover:bg-gray-100 transition"
      >
        {{ t('message.see_products') }}
      </a>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9));
  z-index: 1;
}

.hero-custom-height {
  min-height: calc(100vh - 136px);
}

@media (max-width: 48rem) {
  .hero-custom-height {
    min-height: calc(100dvh - 120px);
  }
}
</style>