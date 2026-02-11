<script setup lang="ts">
import { onMounted } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import DashboardStats from "@/components/features/dashboard/DashboardStats.vue";
import { useFetch } from "@/composables/useFetch";
import { formatDate } from "@/lib/utils";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

interface Activity {
  id: string;
  description: string;
  createdAt: string;
}

const {
  data: activities,
  isLoading,
  execute,
} = useFetch<Activity[]>(`/api/activities?limit=${DEFAULT_PAGE_SIZE}`);

onMounted(() => {
  void execute();
});
</script>

<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <DashboardStats />
    <BaseCard title="Recent Activity">
      <p v-if="isLoading">Loading...</p>
      <ul v-else-if="activities?.length">
        <li v-for="activity in activities" :key="activity.id">
          {{ activity.description }} — {{ formatDate(activity.createdAt) }}
        </li>
      </ul>
      <p v-else>No recent activity to display.</p>
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
