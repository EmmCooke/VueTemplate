<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

const name = ref("");
const email = ref("");

function handleSave() {
  console.log("Settings saved:", { name: name.value, email: email.value });
}
</script>

<template>
  <form class="settings-form" @submit.prevent="handleSave">
    <BaseInput v-model="name" label="Name" placeholder="Your name" />
    <BaseInput v-model="email" label="Email" type="email" placeholder="you@example.com" />
    <BaseButton type="submit"> Save Changes </BaseButton>
  </form>
</template>

<style scoped>
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 24rem;
}
</style>
