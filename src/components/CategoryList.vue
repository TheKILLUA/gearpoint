
<script setup lang="ts">
defineProps<{
  items: {
    id: string
    name: string
    children?: any[]
  }[]
}>()
</script>

<template>
  <ul class="ml-4">
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
      <CategoryList v-if="item.children?.length" :items="item.children" />
    </li>
  </ul>
</template>
