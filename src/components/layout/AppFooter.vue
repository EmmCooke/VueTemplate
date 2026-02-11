<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <p>&copy; {{ year }} Vue Template. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.875rem;
  color: #718096;
}
</style>
