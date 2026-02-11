import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUIStore } from "./ui";

describe("UI Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts with sidebar open", () => {
    const store = useUIStore();
    expect(store.sidebarOpen).toBe(true);
  });

  it("toggles sidebar", () => {
    const store = useUIStore();
    store.toggleSidebar();
    expect(store.sidebarOpen).toBe(false);
    store.toggleSidebar();
    expect(store.sidebarOpen).toBe(true);
  });

  it("starts with light theme", () => {
    const store = useUIStore();
    expect(store.theme).toBe("light");
    expect(store.isDarkMode).toBe(false);
  });

  it("toggles theme", () => {
    const store = useUIStore();
    store.toggleTheme();
    expect(store.theme).toBe("dark");
    expect(store.isDarkMode).toBe(true);
  });
});
