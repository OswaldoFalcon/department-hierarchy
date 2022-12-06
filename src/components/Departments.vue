<script setup>
import { ref } from 'vue'
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
  <TreeBrowser :node="root" />
</template>

<style scoped>

</style>
