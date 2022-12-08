<script setup>
import { ref } from 'vue'
import Allocation from './Allocation.vue'
import TreeBrowser from './TreeBrowser.vue'

const root = ref(
  {
    id: 1,
    name: '/',
    children: [
      {
        id: 2,
        name: "manager",
        children: [
          {
            id: 3,
            name: "developer",
            children: []

          },
          {
            id: 4,
            name: "QA Dev",
            children: []
          }
        ]
      }
    ]
  }

)
</script>

<template>
  <Allocation />
  <TreeBrowser :node="root" />
</template>

<style scoped>

</style>
