<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";

interface Stat {
  label: string;
  value: string;
}

const stats = ref<Stat[]>([
  { label: "Total Users", value: "1,234" },
  { label: "Active Sessions", value: "56" },
  { label: "Revenue", value: "$12,345" },
]);
</script>

<template>
  <div class="dashboard-stats">
    <BaseCard v-for="stat in stats" :key="stat.label" :title="stat.label">
      <p class="dashboard-stats__value">
        {{ stat.value }}
      </p>
    </BaseCard>
  </div>
</template>

<style scoped>
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}

.dashboard-stats__value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}
</style>
