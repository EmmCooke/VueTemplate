<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleGetStarted() {
  router.push("/dashboard");
}
</script>

<template>
  <div class="home-page">
    <h1>Welcome to Vue Template</h1>
    <p>A modern Vue 3 application with TypeScript, Pinia, and Vue Router.</p>
    <BaseButton @click="handleGetStarted"> Get Started </BaseButton>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 4rem;
  text-align: center;
}
</style>
