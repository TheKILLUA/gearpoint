<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { useUserStore } from '../../stores/user.ts'
import {useAutoTitle} from "../../composables/useAutoTitle.ts";

useAutoTitle();

const userStore = useUserStore()
userStore.init()

if (userStore.user) {
  window.location.href = "https://gearpoint.wuaze.com/cont/"
}

const email = ref('')
const password = ref('')
const isLogin = ref(true)

const pageTitle = computed(() => isLogin.value ? 'Autentificare' : 'Înregistrare')
const submitButtonText = computed(() => isLogin.value ? 'Intră în cont' : 'Creează cont')
const switchModeText = computed(() => isLogin.value ? 'Nu ai cont? Înregistrează-te' : 'Ai deja cont? Autentifică-te')

const validateForm = () => {
  if (!email.value.trim()) {
    userStore.error = 'Email-ul este obligatoriu'
    return false
  }

  if (!password.value.trim()) {
    userStore.error = 'Parola este obligatorie'
    return false
  }

  if (password.value.length < 8) {
    userStore.error = 'Parola trebuie să conțină minim 8 caractere'
    return false
  }

  return true
}

const submit = async () => {
  if (!validateForm()) return

  try {
    if (isLogin.value) {
      await userStore.login(email.value, password.value)
    } else {
      await userStore.register(email.value, password.value)
    }
    window.location.href = '/cont'
  } catch (e) {

  }
}

const loginWithGoogle = async () => {
  try {
    await userStore.loginWithGoogle()
    window.location.href = '/cont'
  } catch (e) {

  }
}

const switchAuthMode = () => {
  isLogin.value = !isLogin.value
  userStore.error = null
}
</script>

<template>
  <Header />
  <div class="max-w-md min-h-[478px] mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ pageTitle }}</h1>


    <button
        @click="loginWithGoogle"
        class="w-full mb-6 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :disabled="userStore.isLoading"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z" fill="#4285F4"/>
        <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
        <path d="M5.50277 14.3003C5.00011 12.8099 5.00011 11.1961 5.50277 9.70575V6.61481H1.51674C-0.185266 10.0056 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3003Z" fill="#FBBC04"/>
        <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>

    <div class="relative mb-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Or</span>
      </div>
    </div>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
            :disabled="userStore.isLoading"
            required
        />
      </div>
      <div>
        <input
            v-model="password"
            type="password"
            placeholder="Parolă"
            class="w-full p-2 border rounded"
            :disabled="userStore.isLoading"
            required
            minlength="8"
        />
      </div>

      <p v-if="userStore.error" class="text-red-500 text-sm min-h-6">{{ userStore.error }}</p>

      <button
          type="submit"
          class="bg-black text-white px-4 py-2 rounded w-full flex justify-center items-center gap-2"
          :disabled="userStore.isLoading"
      >
        <span v-if="userStore.isLoading" class="animate-spin">↻</span>
        {{ submitButtonText }}
      </button>

      <button
          type="button"
          @click="switchAuthMode"
          class="underline text-sm text-gray-600"
          :disabled="userStore.isLoading"
      >
        {{ switchModeText }}
      </button>
    </form>
  </div>
  <Footer />
</template>