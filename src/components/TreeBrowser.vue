<script setup>
import TreeBrowser from './TreeBrowser.vue'
import { ref, computed } from 'vue'
import { store } from '../main.js'

const props = defineProps({
  node: Object,
  depth: {
    type: Number,
    default: 0
  }
})

const expanded = ref(false)
const hasChildren = computed(() => {
  return props.node.children != 0 ? true : false
})


function addDeveloper(a) {
  store.count += 1000
  a.children.push({ name: 'developer', children: [] })
}
function addQAtester(a) {
  store.count += 500
  a.children.push({ name: 'QA tester', children: [] })
}
function addManager(a) {
  store.count += 300
  a.children.push({ name: 'manager', children: [] })
}
function deleteWorker(a) {

  a.children = []
}

</script>

<template>
  <div class="container">
    <div @click="expanded = !expanded" class="node" :style="{'margin-left': `${depth * 40}px`} ">
      <span class="type" v-if="hasChildren">
        {{ expanded ? '&#9660;' : '&#9658;' }}
      </span>
      <span v-else>
        &#9671
      </span>
      {{ node.name }}
    </div>
    <div class="control">
      <button @click="addDeveloper(node)" class="add-worker"> + developer </button>
      <button @click="addQAtester(node)" class="add-worker"> + QA tester </button>
      <button @click="addManager(node)" class="add-worker"> + manager</button>
      <button @click="deleteWorker(node)" class="add-worker"> - </button>
    </div>
    <!-- Concurrent Component -->
  </div>
  <TreeBrowser v-if="expanded" v-for="child in node.children" :key="child.name" :node="child" :depth="depth + 1" />
</template>

<style scoped>
.container {
  display: flex;
}

.node {
  text-align: left;
}

.add-worker {
  max-width: 90px;
  font-size: 10px;
}

.class {
  display: flex;
}
</style>
