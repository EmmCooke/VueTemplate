<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import DashboardStats from "@/components/features/dashboard/DashboardStats.vue";

const title = ref("Dashboard");
</script>

<template>
  <div class="dashboard-page">
    <h1>{{ title }}</h1>
    <DashboardStats />
    <BaseCard title="Recent Activity">
      <p>No recent activity to display.</p>
    </BaseCard>
  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
