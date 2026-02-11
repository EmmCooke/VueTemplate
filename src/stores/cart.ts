import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  function addItem(item: Omit<CartItem, "quantity">) {
    const existing = items.value.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.value.push({ ...item, quantity: 1 });
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  function clearCart() {
    items.value = [];
  }

  return { items, totalItems, totalPrice, addItem, removeItem, clearCart };
});
