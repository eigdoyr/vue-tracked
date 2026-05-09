import type { Ref } from "vue";

export function useTracked<T>(source: Ref<T>, name: string): Ref<T> {
  return source;
}
