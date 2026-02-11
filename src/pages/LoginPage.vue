<script setup lang="ts">
import LoginForm from "@/components/features/auth/LoginForm.vue";
</script>

<template>
  <div class="login-page">
    <div class="login-page__card">
      <h1>Sign In</h1>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-page__card {
  width: 100%;
  max-width: 24rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.login-page__card h1 {
  margin-bottom: 1.5rem;
  text-align: center;
}
</style>
