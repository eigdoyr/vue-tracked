import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["vue", "@vue/reactivity", "@vue/runtime-core", "@vue/runtime-dom"],
  treeshake: true,
});
