import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", () => {
  const sidebarOpen = ref(true);
  const theme = ref<"light" | "dark">("light");

  const isDarkMode = computed(() => theme.value === "dark");

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }

  return {
    sidebarOpen,
    theme,
    isDarkMode,
    toggleSidebar,
    toggleTheme,
  };
});
