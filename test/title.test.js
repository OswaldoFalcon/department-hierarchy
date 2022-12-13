/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
// import { store } from '../src/main.js'
import Title from "../src/components/TitleItem.vue";

describe("title test", () => {
  it("should render", () => {
    const wrapper = mount(Title);
    //has h1
    expect(wrapper.find("h1").exists()).toBeTruthy;
  });
});
