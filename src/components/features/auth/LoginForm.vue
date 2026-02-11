<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const isLoading = ref(false);

async function handleSubmit() {
  error.value = null;
  isLoading.value = true;

  try {
    await authStore.login(email.value, password.value);
    const redirect = (route.query["redirect"] as string) ?? "/dashboard";
    router.push(redirect);
  } catch {
    error.value = "Invalid email or password.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <p v-if="error" class="login-form__error">
      {{ error }}
    </p>
    <BaseInput v-model="email" label="Email" type="email" placeholder="you@example.com" />
    <BaseInput v-model="password" label="Password" type="password" placeholder="Password" />
    <BaseButton type="submit" :loading="isLoading" :disabled="!email || !password">
      Sign In
    </BaseButton>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form__error {
  padding: 0.75rem;
  background: #fff5f5;
  color: var(--color-danger);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}
</style>
