import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import type { User } from "@/types/user";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("access_token"));
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value);
  const userName = computed(() => user.value?.name ?? "Guest");

  async function login(email: string, password: string) {
    isLoading.value = true;
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      user.value = data.user;
      token.value = data.token;
      localStorage.setItem("access_token", data.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("access_token");
    router.push("/login");
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    userName,
    login,
    logout,
  };
});
