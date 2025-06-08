<template>
  <footer class="bg-black text-white pt-12 pb-6">
    <div class="max-w-container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

      <div>
        <img src="/logo-192x192.png" alt="GearPoint Logo" class="w-36 mb-4" />
        <p class="text-gray-400 text-sm">
          GearPoint – magazinul tău de încredere pentru unelte și echipamente profesionale.
        </p>
      </div>

      <div class="flex">

        <div class="flex flex-1 flex-col">
          <h3 class="text-lg font-semibold mb-4">Navigare</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/" class="hover:text-white">Acasă</a></li>
            <li><a href="/magazin" class="hover:text-white">Magazin</a></li>
            <li><a href="/despre" class="hover:text-white">Despre</a></li>
            <li><a href="/contacte" class="hover:text-white">Contacte</a></li>
          </ul>
        </div>


        <div class="flex flex-1 flex-col">
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="text-gray-400 space-y-2 text-sm">
            <li>Str. Uneltei 123, Chișinău</li>
            <li>Tel: <a href="tel:+37360000000" class="hover:text-white">+373 60 00 00 00</a></li>
            <li>Email: <a href="mailto:info@gearpoint.md" class="hover:text-white">info@gearpoint.md</a></li>
          </ul>
        </div>
      </div>


      <div>
        <h3 class="text-lg font-semibold mb-4">Urmărește-ne</h3>
        <div class="flex space-x-4 mb-6">
          <a href="#" class="hover:text-white"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="hover:text-white"><i class="fab fa-instagram"></i></a>
          <a href="#" class="hover:text-white"><i class="fab fa-youtube"></i></a>
        </div>
        <form @submit.prevent class="space-y-2">
          <label for="newsletter" class="text-sm text-gray-400">Abonează-te la newsletter</label>
          <div class="flex">
            <input
                id="newsletter"
                type="email"
                placeholder="Emailul tău"
                class="w-full px-3 py-2 rounded-l-md bg-gray-800 text-white placeholder-gray-500 outline-none"
            />
            <button
                type="submit"
                class="bg-accent hover:bg-accent/90 text-black font-semibold px-4 rounded-r-md"
            >
              Trimite
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="text-center text-sm text-gray-500 mt-12">
      © {{ new Date().getFullYear() }} GearPoint. Toate drepturile rezervate.
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>

.bg-accent {
  background-color: #FFD600;
}
</style>
