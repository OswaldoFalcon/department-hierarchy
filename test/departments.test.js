/**
 * @format
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { store } from "../src/main.js";
import Department from "../src/components/DepartmentsItem.vue";

describe("Department test", () => {
  it("should render", () => {
    const wrapper = mount(Department);
    //has div
    expect(wrapper.find("div").exists()).toBeTruthy;
    //has div
    expect(wrapper.find("h1").exists()).toBeTruthy;
  });

  it("should render this title", async () => {
    store.count = 10;
    const data = store.count;
    expect(store.count).toBe(10);
    const wrapper = mount(Department, {
      global: {
        plugins: [data],
      },
    });
    await expect(wrapper.find("div").text()).toEqual(
      "💸 Total Allocation: 10 💸"
    );
  });
});
