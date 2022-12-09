<script setup>
import { store } from '../main.js'
</script>

<template>
  <div class="allocation">
    💸 Total Allocation: {{ store.count }} 💸
  </div>
</template>

<style scoped>
.allocation {
  padding-bottom: 100px;
  font-size: 30px;
}
</style>
