<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="base-card">
    <div v-if="title" class="base-card__header">
      <h3>{{ title }}</h3>
    </div>
    <div class="base-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: white;
}

.base-card__header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.base-card__body {
  padding: 1.5rem;
}
</style>
