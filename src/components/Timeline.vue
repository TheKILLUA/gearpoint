<template>
  <div class="py-12">
    <h2 class="text-3xl font-bold text-center mb-10">Povestea noastră</h2>
    <div class="relative border-l-4 border-black ml-4 pl-6 space-y-8">
      <div v-for="(event, index) in events" :key="index" class="relative">
        <div class="absolute w-4 h-4 bg-black rounded-full -left-6 top-1"></div>
        <h3 class="text-xl font-semibold">{{ event.year }}</h3>
        <p class="text-gray-700">{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const events = [
  { year: '2015', description: 'Am început călătoria noastră cu o mică echipă pasionată de unelte.' },
  { year: '2018', description: 'Am deschis primul nostru showroom.' },
  { year: '2021', description: 'Am lansat magazinul online GearPoint.' },
  { year: '2024', description: 'Am depășit 10.000 de clienți fericiți.' },
]
</script>
