<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-layout__main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-layout__main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 72rem;
  width: 100%;
  margin: 0 auto;
}
</style>
