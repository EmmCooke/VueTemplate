<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { useAuthStore } from "@/stores/auth";
import { useUIStore } from "@/stores/ui";
import { useDebounce } from "@/composables/useDebounce";
import { isEmpty } from "@/lib/utils";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const uiStore = useUIStore();
const { userName } = storeToRefs(authStore);
const { isDarkMode } = storeToRefs(uiStore);

const displayName = ref(authStore.user?.name ?? "");
const debouncedName = useDebounce(displayName, 500);
const showConfirmModal = ref(false);

const nameError = computed(() => {
  if (!displayName.value) return undefined;
  return isEmpty(displayName.value) ? "Name cannot be empty" : undefined;
});

function handleSave() {
  if (isEmpty(debouncedName.value)) return;
  showConfirmModal.value = true;
}

function confirmSave() {
  showConfirmModal.value = false;
}
</script>

<template>
  <div class="settings-page">
    <h1>Settings</h1>
    <BaseCard title="Profile">
      <div class="settings-page__field">
        <p>
          Signed in as <strong>{{ userName }}</strong>
        </p>
        <BaseInput
          v-model="displayName"
          label="Display Name"
          placeholder="Your name"
          :error="nameError"
        />
        <BaseButton @click="handleSave"> Save Changes </BaseButton>
      </div>
    </BaseCard>
    <BaseCard title="Appearance">
      <div class="settings-page__field">
        <p>Current theme: {{ isDarkMode ? "Dark" : "Light" }}</p>
        <BaseButton variant="secondary" @click="uiStore.toggleTheme()"> Toggle Theme </BaseButton>
      </div>
    </BaseCard>
    <BaseModal v-if="showConfirmModal" title="Confirm Changes" @close="showConfirmModal = false">
      <p>Save display name as "{{ debouncedName }}"?</p>
      <template #footer>
        <BaseButton variant="secondary" @click="showConfirmModal = false"> Cancel </BaseButton>
        <BaseButton @click="confirmSave"> Confirm </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-page__field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
