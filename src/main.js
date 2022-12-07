/** @format */

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { reactive } from "vue";

export const store = reactive({
  count: 0,
});

createApp(App).mount("#app");
