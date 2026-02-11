import { ref, onScopeDispose, type Ref } from "vue";

interface UseFetchReturn<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  execute: () => Promise<void>;
  abort: () => void;
}

export function useFetch<T>(url: string | Ref<string>): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<Error | null>(null);
  const isLoading = ref(false);
  let controller: AbortController | null = null;

  function abort() {
    controller?.abort();
    controller = null;
  }

  async function execute() {
    abort();
    controller = new AbortController();
    isLoading.value = true;
    error.value = null;

    try {
      const resolvedUrl = typeof url === "string" ? url : url.value;
      const response = await fetch(resolvedUrl, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data.value = await response.json();
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      error.value = e instanceof Error ? e : new Error(String(e));
    } finally {
      isLoading.value = false;
    }
  }

  onScopeDispose(abort);

  return { data, error, isLoading, execute, abort };
}
