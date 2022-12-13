<script setup>
import AllocationItem from "./AllocationItem.vue";
import TreeBrowser from "./TreeBrowser.vue";
import { store } from "../main.js";
</script>

<template>
  <AllocationItem />
  <TreeBrowser :node="store.treeData" />
</template>
