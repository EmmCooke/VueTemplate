<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label?: string;
  error?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  placeholder?: string;
}>();

const modelValue = defineModel<string>({ required: true });

const inputId = computed(
  () => `input-${props.label?.toLowerCase().replace(/\s+/g, "-") ?? "field"}`,
);
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      v-model="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :class="['base-input__field', { 'base-input__field--error': error }]"
    />
    <span v-if="error" class="base-input__error">
      {{ error }}
    </span>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.base-input__label {
  font-size: 0.875rem;
  font-weight: 500;
}

.base-input__field {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.base-input__field:focus {
  border-color: var(--color-primary);
}

.base-input__field--error {
  border-color: var(--color-danger);
}

.base-input__error {
  font-size: 0.75rem;
  color: var(--color-danger);
}
</style>
