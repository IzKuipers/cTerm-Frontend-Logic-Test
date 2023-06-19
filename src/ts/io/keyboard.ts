import { get, Writable, writable } from "svelte/store";
import { Cursor } from "../display/cursor";
import { write, writeStr } from "../display/write";

export interface Input {
  masked: boolean;
  maskChar?: string;
  cosmetics: {
    useMax: boolean;
    maxLen: number;
    endChar?: string;
    startChar?: string;
  };
  running: boolean;
  prefix?: string;
}

export const InputData = writable<Input>(null);
export const InputValue = writable<string>();
export const InputCommit = writable<boolean>(false);

// TODO: Find a better solution.
let inputStr = "";

export function processKey(e: KeyboardEvent) {
  const inputData = get(InputData);

  if (!inputData.running) return (inputStr = "");

  if (
    e.key.length === 1 &&
    (!inputData.cosmetics.useMax ||
      inputStr.length < inputData.cosmetics.maxLen)
  ) {
    inputStr += e.key.split("")[0];

    writeStr(!inputData.masked ? e.key : "*");
  }

  if (e.key === "Enter") {
    const { y } = Cursor.getpos();

    Cursor.setpos(0, y + 1);
    inputData.running = false;

    InputValue.set(inputStr);
    console.log(inputStr);

    setTimeout(() => {
      inputStr = "";
      InputCommit.set(true);
    });
  }

  if (e.key == "Backspace") {
    if (inputStr.length > 0) {
      inputStr = inputStr.slice(0, -1);

      writeStr("\b");
    }
  }
}
