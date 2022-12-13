<script setup>
import TreeBrowser from "./TreeBrowser.vue";
import { ref, computed } from "vue";
import { store } from "../main.js";

const emit = defineEmits(["response"]);
const costWorkerp = ref(300);
const props = defineProps({
  node: {
    type: Object,
    default() {
      return {
        id: 1,
        name: "Employees",
        cost: 0,
        children: [],
      };
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
});

const expanded = ref(false);
const hasChildren = computed(() => {
  return props.node.children != 0 ? true : false;
});

function bus(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  });
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return (acc = acc + item.model.cost);
  }, 0);
  costWorkerp.value = actualNodeCost;
}

function addDeveloper(actNode) {
  // get actual node.
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  });
  // create a new node.
  store.id_count += 1;
  var newNode = store.new_tree.parse({
    id: store.id_count,
    name: "developer",
    cost: 1000,
    children: [],
  });
  actualNode.addChild(newNode);
  //update tree with cost
  //Add Cost.
  store.count += 1000;
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return (acc = acc + item.model.cost);
  }, 0);
  costWorkerp.value = actualNodeCost;
}

function addQAtester(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  });
  // create a new node.
  store.id_count += 1;
  var newNode = store.new_tree.parse({
    id: store.id_count,
    name: "qa tester",
    cost: 500,
    children: [],
  });
  actualNode.addChild(newNode);

  // Add Cost.
  store.count += 500;
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return (acc = acc + item.model.cost);
  }, 0);
  costWorkerp.value = actualNodeCost;
}
function addManager(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  });
  // create a new node.
  store.id_count += 1;
  var newNode = store.new_tree.parse({
    id: store.id_count,
    name: "manager",
    cost: 300,
    children: [],
  });
  actualNode.addChild(newNode);

  // Add Cost.
  store.count += 300;
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return (acc = acc + item.model.cost);
  }, 0);
  costWorkerp.value = actualNodeCost;
}
function deleteWorker(actNode) {
  var actualNode = store.tree.first(function (node) {
    return node.model.id === actNode.id;
  });
  actualNode.drop();

  var totalCost = store.tree.all().reduce((acc, item) => {
    console.log(item.model.cost);
    return (acc = acc + item.model.cost);
  }, 0);

  // Add Cost.
  store.count = totalCost;
  var actualNodeCost = actualNode.all().reduce((acc, item) => {
    return (acc = acc + item.model.cost);
  }, 0);
  emit("response", costWorkerp.value);
  costWorkerp.value = actualNodeCost;
}
</script>

<template>
  <div class="container" :style="{ 'margin-left': `${depth * 50}px` }">
    <div class="node" @click="expanded = !expanded">
      <div class="expand">
        <span v-if="hasChildren" class="type">
          {{ expanded ? "&#9660;" : "&#9658;" }}
        </span>
        <span v-else> ∅ </span>
      </div>
      <div class="node-info">
        <b>{{ node.name }}</b>
        <p v-if="node.name === 'manager'">
          <b>Cost: ${{ costWorkerp }} </b>
        </p>
      </div>
    </div>
    <div v-if="node.name === 'Employees'" class="control">
      <button class="add-worker" @click="addManager(node)">+ manager</button>
    </div>
    <div v-if="node.name === 'manager'" class="control">
      <button class="add-worker" @click="addDeveloper(node)">
        + developer
      </button>
      <button class="add-worker" @click="addQAtester(node)">+ QA tester</button>
      <button class="add-worker" @click="addManager(node)">+ manager</button>
    </div>
    <div v-if="node.name != 'Employees'">
      <button class="delete" @click="deleteWorker(node)">⁃</button>
    </div>
    <!-- Concurrent Component -->
  </div>
  <TreeBrowser
    v-for="child in node.children"
    v-if="expanded"
    :key="child.name"
    :node="child"
    :depth="depth + 1"
    :bus="bus(node)"
    @response="(msg) => (costWorkerp = msg)"
  />
</template>
