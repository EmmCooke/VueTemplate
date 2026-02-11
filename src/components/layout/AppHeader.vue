<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const { isAuthenticated, userName } = storeToRefs(authStore);
const { logout } = authStore;
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__logo"> Vue Template </RouterLink>
    <nav class="app-header__nav">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink v-if="isAuthenticated" to="/dashboard"> Dashboard </RouterLink>
    </nav>
    <div class="app-header__actions">
      <template v-if="isAuthenticated">
        <span>{{ userName }}</span>
        <button @click="logout">Log Out</button>
      </template>
      <RouterLink v-else to="/login"> Log In </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.app-header__logo {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-primary);
  text-decoration: none;
}

.app-header__nav {
  display: flex;
  gap: 1rem;
}

.app-header__nav a {
  text-decoration: none;
  color: var(--color-text);
}

.app-header__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-header__actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-danger);
}
</style>
