<template>
  <div class="w-full bg-[#1C1C1C] text-white text-sm">
    <div class="max-w-container gap-x-[15px] mx-auto px-[15px] flex items-center justify-between h-10">


      <div class="flex items-center gap-3">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://x.com" target="_blank" aria-label="X">
          <i class="fab fa-x-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://youtube.com" target="_blank" aria-label="YouTube">
          <i class="fab fa-youtube"></i>
        </a>
      </div>


      <div class="text-center text-xs font-light max-w-[410px] flex gap-[410px] whitespace-nowrap overflow-hidden">
        <p class="animate-marquee">{{ t('message.promo_banner') }}</p>
      </div>


      <div class="flex items-center gap-4">
        <button aria-label="Schimbă limba" class="cursor-pointer" @click="toggleLanguage">
          <i class="fas fa-globe"></i>
        </button>
        <button aria-label="Contul meu" class="cursor-pointer" @click="redirectToCont">
          <i class="fas fa-user"></i>
        </button>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
  import { useLanguage } from '../composables/useLanguage.ts'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n();
  import { useUserStore } from '../stores/user.ts'

  const userStore = useUserStore()
  userStore.init();

  const { setLanguage } = useLanguage()
  const { locale } = useI18n()

  const toggleLanguage = () => {
    const newLang = locale.value === 'ro' ? 'en' : 'ro'
    setLanguage(newLang)
    console.log(newLang)
  }

  const redirectToCont = () => {
    if (userStore.user) {
      window.location.href = 'https://gearpoint.wuaze.com/cont/'
    } else {

      window.location.href = 'https://gearpoint.wuaze.com/auth/'
    }
  }
</script>