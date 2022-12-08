/** @format */

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { reactive } from "vue";
import treemodel from "tree-model";

const treeb = new treemodel();
export const store = reactive({
  id_count: 5,
  count: 2100,
  new_tree: treeb,
  tree: treeb.parse({
    id: 1,
    name: "manager",
    cost: 300,
    children: [
      {
        id : 2,
        name: "manager",
        cost: 300,
        children: [
          {
            id : 3,
            name: "developer",
            cost: 1000,
            children: [],
          },
          {
            id : 4,
            name: "qa tester",
            cost: 500,
            children: [],
          },
        ],
      },
    ],
  }),
});

createApp(App).mount("#app");
