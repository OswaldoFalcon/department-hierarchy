<script setup>
import { ref } from 'vue'
import Allocation from './Allocation.vue'
import TreeBrowser from './TreeBrowser.vue'

const root = ref(
  {
    name: '/',
    children: [
      {
        name: "manager",
        children: [
          {
            name: "developer",
            children: []

          },
          {
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
