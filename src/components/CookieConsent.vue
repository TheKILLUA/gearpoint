<template>
  <div
      v-if="!cookiesAccepted && !cookiesAsked"
      class="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-50"
  >
    <p class="text-sm">
      Folosim cookies pentru a îmbunătăți experiența. Continuând, accepți politica noastră.
    </p>
    <div>
      <button
          @click="acceptCookies"
          class="ml-4 hover:bg-white hover:text-black px-4 py-2 transition-all rounded bg-green-400 text-white font-bold text-sm cursor-pointer"
      >
        Accept
      </button>
      <button
          @click="rejectCookies"
          class="ml-4 bg-red-600 text-white px-4 py-2 rounded transition-all hover:bg-red-400 font-bold text-sm cursor-pointer"
      >
        Respinge
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const cookiesAccepted = ref(false)
const cookiesAsked = ref(false)

onMounted(() => {
  cookiesAccepted.value = localStorage.getItem('cookiesAccepted') === 'true'
})

const acceptCookies = () => {
  cookiesAccepted.value = true
  cookiesAsked.value = true
  localStorage.setItem('cookiesAccepted', 'true')
}

const rejectCookies = () => {
  cookiesAccepted.value = false
  cookiesAsked.value = true
  localStorage.setItem('cookiesAccepted', 'false')
}
</script>
