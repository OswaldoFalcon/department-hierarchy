<script setup>
import Allocation from './Allocation.vue'
import TreeBrowser from './TreeBrowser.vue'
import { store } from '../main.js'
</script>

<template>
  <Allocation />
  <TreeBrowser :node="store.treeData" />
</template>

