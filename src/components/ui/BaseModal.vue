<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const modalRef = ref<HTMLElement | null>(null);

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    emit("close");
    return;
  }

  if (e.key === "Tab" && modalRef.value) {
    const focusable = modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  const firstFocusable = modalRef.value?.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  firstFocusable?.focus();
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

function handleOverlayClick() {
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="handleOverlayClick">
      <div ref="modalRef" class="modal" role="dialog" aria-modal="true" :aria-label="title">
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
