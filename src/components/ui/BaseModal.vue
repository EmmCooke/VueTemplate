<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

function handleOverlayClick() {
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="handleOverlayClick">
      <div class="modal" role="dialog" :aria-label="title">
        <div class="modal__header">
          <h2>{{ title }}</h2>
          <button class="modal__close" aria-label="Close" @click="emit('close')">&times;</button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div v-if="$slots['footer']" class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 50%);
  z-index: 50;
}

.modal {
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}

.modal__body {
  padding: 1.5rem;
}

.modal__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
