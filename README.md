# vue-tracked

Debug reactive state faster. vue-tracked keeps a single chronological
timeline across all your refs — so you can see what changed, in what
order, and how different pieces of state interact.

No dependencies. Zero cost in production.

## How is this different from useRefHistory?

`useRefHistory` from VueUse tracks one ref at a time. Each ref gets its own
isolated history. That's great for undo/redo functionality.

`vue-tracked` is for debugging. It keeps one shared timeline across all your
tracked refs so you can see the sequence of events — which ref changed, in what
order, and how they interact with each other.

Also no VueUse dependency required.

## Install

```bash
# npm
npm install vue-tracked

# pnpm
pnpm add vue-tracked

# yarn
yarn add vue-tracked
```

## Usage

In a Vue component:

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useTracked, useTrackedHistory } from "vue-tracked";

const isOpen = useTracked(ref(false), "isOpen");
const count = useTracked(ref(0), "count");

const { history, clear } = useTrackedHistory();
</script>
```

Access the timeline:

```ts
console.log(history.value);
// [
//   { name: 'isOpen', from: false, to: true, timestamp: 1715123456789 },
//   { name: 'count',  from: 0,     to: 1,    timestamp: 1715123460000 },
// ]
```

Or watch it in real time:

```ts
watch(
  history,
  (h) => {
    console.log("[vue-tracked]", h[h.length - 1]);
  },
  { deep: true },
);
```

## API

`useTracked(source, name, options?)`

- `source` — any ref
- `name` — label for the timeline entry
- `options` — `{ dev?: boolean }` pass `{ dev: false }` to disable tracking

`useTrackedHistory()`

- `history` — reactive array of TrackedEntry
- `clear()` — empties the timeline

```ts
interface TrackedEntry<T = unknown> {
  name: string;
  from: T;
  to: T;
  timestamp: number;
}
```

## Requirements

- Vue 3.5+
- TypeScript 5.0+

## License

MIT © [Ryodgie Barnatia](https://ryodgie.com)
