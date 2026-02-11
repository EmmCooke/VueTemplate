import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "./BaseButton.vue";

describe("BaseButton", () => {
  it("renders slot content", () => {
    const wrapper = mount(BaseButton, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toContain("Click me");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("applies variant class", () => {
    const wrapper = mount(BaseButton, {
      props: { variant: "danger" },
    });
    expect(wrapper.classes()).toContain("base-button--danger");
  });

  it("is disabled when disabled prop is true", () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("is disabled when loading", () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
    });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
