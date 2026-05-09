import { ref } from "vue";
import { describe, it, expect } from "vitest";
import { useTracked } from "../src/index";

describe("useTracked", () => {
  it("returns a ref that behaves transparently", () => {
    const count = useTracked(ref(0), "count");
    expect(count.value).toBe(0);
  });
});
