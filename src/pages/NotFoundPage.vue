<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleGoHome() {
  router.push("/");
}
</script>

<template>
  <div class="not-found-page">
    <h1>404</h1>
    <p>The page you are looking for does not exist.</p>
    <BaseButton @click="handleGoHome"> Go Home </BaseButton>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 4rem;
  text-align: center;
}

.not-found-page h1 {
  font-size: 4rem;
  color: var(--color-primary);
}
</style>
