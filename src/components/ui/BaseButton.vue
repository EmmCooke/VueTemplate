<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit";
  }>(),
  {
    variant: "primary",
    disabled: false,
    loading: false,
    type: "button",
  },
);

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  emit("click");
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['base-button', `base-button--${variant}`]"
    @click="handleClick"
  >
    <span v-if="loading" class="base-button__spinner" />
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button--primary {
  background: var(--color-primary);
  color: white;
}

.base-button--secondary {
  background: var(--color-border);
  color: var(--color-text);
}

.base-button--danger {
  background: var(--color-danger);
  color: white;
}

.base-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
