<script setup>
import TreeBrowser from './TreeBrowser.vue'
import { ref, computed } from 'vue'
import { store } from '../main.js'

const emit = defineEmits(['response'])
const costWorkerp = ref(300)
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


function bus(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return acc = acc + item.model.cost
  }, 0)
  costWorkerp.value = actualNodeCost
}


function addDeveloper(actNode) {
  // get actual node.
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  // create a new node.
  store.id_count += 1
  var newNode = store.new_tree.parse({ id: store.id_count, name: 'developer', cost: 1000, children: [] })
  actualNode.addChild(newNode)
  //update tree with cost
  //Add Cost.
  store.count += 1000
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return acc = acc + item.model.cost
  }, 0)
  costWorkerp.value = actualNodeCost
  console.log(costWorkerp.value)
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
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return acc = acc + item.model.cost
  }, 0)
  costWorkerp.value = actualNodeCost
  console.log(costWorkerp.value)

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
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return acc = acc + item.model.cost
  }, 0)
  costWorkerp.value = actualNodeCost
  console.log(costWorkerp.value)

}
function deleteWorker(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  })
  actualNode.drop()

  var totalCost = store.tree.all().reduce((acc, item) => {
    console.log(item.model.cost)
    return acc = acc + item.model.cost
  }, 0)

  // Add Cost.
  store.count = totalCost
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return acc = acc + item.model.cost
  }, 0)
  console.log('resta para padre:')
  console.log(costWorkerp.value)
  emit('response', costWorkerp.value)
  costWorkerp.value = actualNodeCost
  // console.log(costWorkerp.value)

}

</script>

<template>

  <div class="container" :style="{ 'margin-left': `${depth * 50}px` }">
    <div @click="expanded = !expanded" class="node">
      <div class="expand">
        <span class="type" v-if="hasChildren">
          {{ expanded ? '&#9660;' : '&#9658;' }}
        </span>
        <span v-else>
          &#9671
        </span>
      </div>
      <div class="node-info">
        <b>{{ node.name }}</b>
        <p v-if="node.name === 'manager'"> <b>Cost: ${{ costWorkerp }} </b></p>
      </div>
    </div>
    <div class="control" v-if="node.name === 'Employees'">
      <button @click="addManager(node)" class="add-worker"> + manager</button>
    </div>
    <div class="control" v-if="node.name === 'manager'">
      <button @click="addDeveloper(node)" class="add-worker"> + developer </button>
      <button @click="addQAtester(node)" class="add-worker"> + QA tester </button>
      <button @click="addManager(node)" class="add-worker"> + manager</button>
    </div>
    <div v-if="node.name != 'Employees'"><button @click="deleteWorker(node)" class="delete"> ⁃ </button></div>
    <!-- Concurrent Component -->
  </div>
  <TreeBrowser v-if="expanded" v-for="child in node.children" :key="child.name" :node="child" :depth="depth + 1"
    @response="(msg) => costWorkerp = msg" :bus="bus(node)" />
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  background-color: #758173;
  min-width: 20px;
  max-width: 300px;
  color: azure;
  margin-bottom: 20px;

}

.node {
  display: flex;
  flex-direction: row;
  text-align: left;
}

.node-info {
  padding-right: 40px;
}

.control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.add-worker {
  max-width: 90px;
  max-height: 30px;
  font-size: 10px;
  margin: 5px;
  background-color: #FFD99F;
}

.class {
  display: flex;
}

span {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;

}

.expand {
  display: flex;
  justify-content: center;
}
</style>
