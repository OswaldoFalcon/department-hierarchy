<script setup>
import TreeBrowser from './TreeBrowser.vue'
import { ref, computed } from 'vue'
const props = defineProps({
  node: Object,
  depth: {
    type: Number,
    default: 0
  }
})
const expanded = ref(false)
const hasChildren = computed(() => {
  console.log(props.node.children)
  return props.node.children != 0 ? true : false
})

</script>

<template>
  <div>
    <div @click="expanded = !expanded" class="node" :style="{'margin-left': '${depth * 20}px'}">
      <span class="type" v-if="hasChildren">
        {{ expanded ? '&#9660;' : '&#9658;' }}
      </span>
      <span v-else>
        &#9671
      </span>
      {{ node.name }}
    </div>
  </div>
  <TreeBrowser v-if="expanded" v-for="child in node.children" :key="child.name" :node="child" :depth="depth + 1" />



</template>

<style scoped>
.node {
  text-align: left;
}
</style>
