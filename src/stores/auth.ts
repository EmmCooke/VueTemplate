import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";

interface LoginResponse {
  token: string;
  user: User;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("access_token"));
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value);
  const userName = computed(() => user.value?.name ?? "Guest");

  function loadStoredUser(): void {
    const stored = localStorage.getItem("access_token");
    if (stored) {
      try {
        const parts = stored.split(".");
        const payload = parts[1];
        if (payload) {
          const decoded = JSON.parse(atob(payload));
          user.value = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            createdAt: decoded.createdAt,
          };
        }
      } catch {
        logout();
      }
    }
  }

  loadStoredUser();

  async function login(email: string, password: string): Promise<void> {
    isLoading.value = true;
    try {
      const response: ApiResponse<LoginResponse> = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem("access_token", response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function logout(): void {
    user.value = null;
    token.value = null;
    localStorage.removeItem("access_token");
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
