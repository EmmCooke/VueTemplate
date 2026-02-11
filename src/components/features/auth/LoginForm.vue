<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { isValidEmail, isMinLength } from "@/lib/validators";
import { vFocus } from "@/directives/vFocus";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref<string | null>(null);

const emailError = computed(() => {
  if (!email.value) return undefined;
  return isValidEmail(email.value) ? undefined : "Invalid email address";
});

const passwordError = computed(() => {
  if (!password.value) return undefined;
  return isMinLength(password.value, 6) ? undefined : "Password must be at least 6 characters";
});

const isFormValid = computed(
  () => email.value && password.value && !emailError.value && !passwordError.value,
);

async function handleSubmit() {
  if (!isFormValid.value) return;

  error.value = null;

  try {
    await authStore.login(email.value, password.value);
    const redirect = route.query["redirect"] as string | undefined;
    const target = redirect?.startsWith("/") ? redirect : "/dashboard";
    router.push(target);
  } catch {
    error.value = "Invalid email or password.";
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <p v-if="error" class="login-form__error">
      {{ error }}
    </p>
    <BaseInput
      v-model="email"
      v-focus
      label="Email"
      type="email"
      placeholder="you@example.com"
      :error="emailError"
    />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      placeholder="Password"
      :error="passwordError"
    />
    <BaseButton type="submit" :loading="authStore.isLoading" :disabled="!isFormValid">
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
