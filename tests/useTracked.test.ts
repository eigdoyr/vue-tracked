import { ref, nextTick } from "vue";
import { describe, it, expect, beforeEach } from "vitest";
import { useTracked, useTrackedHistory } from "../src/index";

describe("useTracked", () => {
  // _history is a singleton — clear it so tests don't bleed into each other
  beforeEach(() => {
    const { clear } = useTrackedHistory();
    clear();
  });

  it("returns a ref that behaves transparently", () => {
    const count = useTracked(ref(0), "count");
    expect(count.value).toBe(0);
  });

  it("records an entry when the value changes", async () => {
    const count = useTracked(ref(0), "count");
    count.value = 1;
    await nextTick();

    const { history } = useTrackedHistory();
    expect(history.value.length).toBe(1);
    expect(history.value[0].name).toBe("count");
    expect(history.value[0].from).toBe(0);
    expect(history.value[0].to).toBe(1);
  });

  it("returns source as-is when in production", () => {
    const source = ref(0);
    const count = useTracked(source, "count", { dev: false });
    expect(count).toBe(source);
  });
});
