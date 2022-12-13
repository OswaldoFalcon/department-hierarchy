/**
 * @format
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { store } from "../src/main.js";
import TreeBrowser from "../src/components/TreeBrowser.vue";
import Allocation from "../src/components/AllocationItem.vue";

describe("title test", () => {
  it("Adding workers", async () => {
    const wrapper = mount(TreeBrowser, {
      propsData: {
        node: store.treeData,
        depth: 0,
      },
    });
    // add A manager
    await wrapper.find("button").trigger("click");
    await wrapper.find("div.expand").trigger("click");
    expect(wrapper.findAll("div.node-info")[1].text()).toEqual(
      "managerCost: $300"
    );
    // add  workers to the 1st manager
    // add qa tester
    await wrapper.find("div.control button:nth-child(2)").trigger("click");
    //add Developer
    await wrapper.findAll("div.control button")[1].trigger("click");
    //add Manager
    await wrapper.findAll("div.control button")[3].trigger("click");
    expect(wrapper.findAll("div.node-info")[1].text()).toEqual(
      "managerCost: $2100"
    );
    // expand workers of 1st manager
    await wrapper.findAll("div.node-info")[1].trigger("click");
    expect(wrapper.findAll("div.node-info")[2].text()).toEqual("qa tester");
    // delete developer and validate the 1st manager cost
    await wrapper.findAll("button.delete")[2].trigger("click");
    expect(wrapper.findAll("div.node-info")[1].text()).toEqual(
      "managerCost: $1100"
    );
    // validate the total allocation
    const totalAllocation = store.count;
    const wrapperAllocation = mount(Allocation, {
      global: {
        plugins: [totalAllocation],
      },
    });
    await expect(wrapperAllocation.find("div").text()).toEqual(
      "💸 Total Allocation: 1100 💸"
    );
  });
});
