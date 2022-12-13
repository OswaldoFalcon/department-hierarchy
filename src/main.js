/** @format */

import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import { reactive } from "vue";
import treemodel from "tree-model";

const treeb = new treemodel();
const treeOb = {
  id: 1,
  name: "Employees",
  cost: 0,
  children: [],
};
export const store = reactive({
  id_count: 1,
  count: 0,
  new_tree: treeb,
  tree: treeb.parse(treeOb),
  treeData: treeOb,
});

createApp(App).mount("#app");
