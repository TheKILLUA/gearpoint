<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import { useUserStore } from '../../stores/user.ts'

const userStore = useUserStore()
userStore.init()

onMounted(() => {
  if (!userStore.user) {
    window.location.href = '/auth'
  }
})

const handleLogout = async () => {
  await userStore.logout()
  window.location.href = '/auth'
}
</script>

<template>
  <Header />

  <div class="max-w-container mx-auto p-4 min-h-[60vh]">
    <div v-if="userStore.user" class="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto text-center">
      <h1 class="text-3xl font-semibold mb-4">Bun venit, {{ userStore.user.displayName || 'Utilizator' }}!</h1>
      <p class="text-gray-700 text-lg mb-2">
        Email: <strong>{{ userStore.user.email }}</strong>
      </p>
      <p class="text-gray-500 text-sm mb-4">ID: {{ userStore.user.uid }}</p>


      <button
          @click="handleLogout"
          class="mt-4 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
      >
        Deconectare
      </button>
    </div>

    <div v-else class="text-center py-10 text-gray-600">
      <p>Nu ești autentificat.</p>
      <RouterLink to="/login" class="text-blue-600 underline mt-2 inline-block">Autentifică-te</RouterLink>
    </div>
  </div>

  <Footer />
</template>
