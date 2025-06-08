<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCategories, type Category } from '../api/categories'
import CategoryList from "./CategoryList.vue";

interface CategoryTree extends Category {
  children?: CategoryTree[]
}

const categoryTree = ref<CategoryTree[]>([])

function buildCategoryTree(categories: Category[]): CategoryTree[] {
  const categoryMap: Record<string, CategoryTree> = {}
  const roots: CategoryTree[] = []

  categories.forEach(cat => {
    categoryMap[cat.id] = { ...cat, children: [] }
  })

  categories.forEach(cat => {
    if (cat.parentId) {
      const parent = categoryMap[cat.parentId]
      if (parent) {
        parent.children!.push(categoryMap[cat.id])
      }
    } else {
      roots.push(categoryMap[cat.id])
    }
  })

  return roots
}

onMounted(async () => {
  const categories = await fetchCategories()
  categoryTree.value = buildCategoryTree(categories)
})
</script>

<template>
  <ul>
    <CategoryList :items="categoryTree" />
  </ul>
</template>
