import { writable, type Writable } from "svelte/store";
import type { CharSize, DisplayData } from "./interface";

export const TempCharSize: Writable<CharSize> = writable<CharSize>({
  width: 0,
  height: 0,
  initialized: false,
});

export const Display: Writable<DisplayData> = writable<DisplayData>(null);
