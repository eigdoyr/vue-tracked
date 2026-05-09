import { ref, watch } from "vue";
import type { Ref } from "vue";

export interface TrackedEntry<T = unknown> {
  name: string;
  from: T;
  to: T;
  timestamp: number;
}

// Module-level singleton so all useTracked calls share the same timeline.
// This is intentional — the history is global to the app, not per-component.

const _history = ref<TrackedEntry[]>([]);

// TODO: add production no-op — useTracked should be a passthrough in prod builds
export function useTracked<T>(source: Ref<T>, name: string): Ref<T> {
  const tracked = ref<T>(source.value) as Ref<T>;

  watch(tracked, (to, from) => {
    _history.value.push({ name, from, to, timestamp: Date.now() });
  });

  return tracked;
}

export function useTrackedHistory() {
  function clear() {
    _history.value = [];
  }

  return { history: _history, clear };
}
