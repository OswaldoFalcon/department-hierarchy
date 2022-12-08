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
const cost_workers = ref(0)
const expanded = ref(false)
const hasChildren = computed(() => {
  return props.node.children != 0 ? true : false
})


function addDeveloper(actNode) {
  // get actual node.
  // console.log(store.tree.all())
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  console.log(actualNode)
  // create a new node.
  store.id_count += 1
  var newNode = store.new_tree.parse({ id: store.id_count, name: 'developer', cost: 1000, children: [] })
  actualNode.addChild(newNode)
  // Add Cost.
  store.count += 1000
  // Update component with a child component.
  actNode.children.push({ id: store.id_count, name: 'developer', cost: 1000, children: [] })
}

function addQAtester(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  console.log(actualNode)
  // create a new node.
  store.id_count += 1
  var newNode = store.new_tree.parse({ id: store.id_count, name: 'qa tester', cost: 500, children: [] })
  actualNode.addChild(newNode)
  // Add Cost.
  store.count += 500

  actNode.children.push({ id: store.id_count, name: 'qa tester', cost: 500, children: [] })
}
function addManager(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  console.log(actualNode)
  // create a new node.
  store.id_count += 1
  var newNode = store.new_tree.parse({ id: store.id_count, name: 'manager', cost: 300, children: [] })
  actualNode.addChild(newNode)
  // Add Cost.
  store.count += 300
  actNode.children.push({ id: store.id_count, name: 'manager', cost: 300, children: [] })
}
function deleteWorker(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  actualNode.drop()

  console.log(store.tree.all())
  var totalCost = store.tree.all().reduce((acc, item) => {
    console.log(item.model.cost)
    return acc = acc + item.model.cost
  }, 0)
  store.count = totalCost
  actNode = ''
  console.log(props.node)
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
