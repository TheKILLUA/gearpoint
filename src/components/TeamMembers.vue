<template>
  <div class="py-12 bg-gray-100">
    <h2 class="text-3xl font-bold text-center mb-10">Echipa noastră</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div v-for="member in members" :key="member.name" class="bg-white p-6 rounded-xl shadow text-center">
        <img :src="member.photo" class="w-24 h-24 mx-auto rounded-full object-cover mb-4" :alt="member.name" />
        <h3 class="font-semibold text-xl">{{ member.name }}</h3>
        <p class="text-sm text-gray-500">{{ member.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const members = [
  { name: 'Andrei Popescu', role: 'CEO', photo: '/images/team/andrei.jpg' },
  { name: 'Maria Ionescu', role: 'Marketing', photo: '/images/team/maria.jpg' },
  { name: 'Ion Barbu', role: 'Logistică', photo: '/images/team/ion.jpg' },
]
</script>
