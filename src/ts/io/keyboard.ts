import { get, Writable, writable } from "svelte/store";
import { cursor } from "../display/cursor";
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
}

export const InputData: Writable<Input> = writable<Input>({
  masked: false,
  running: false,
  cosmetics: {
    useMax: false,
    maxLen: -1,
  },
});
export const InputCallback: Writable<(string) => void> =
  writable<(string) => void>();

let inputStr = "";

// TODO: Find a better solution.
export function input(data: Input, callback: (value: string) => void) {
  inputStr = "";

  InputData.set(data);
  InputCallback.set(callback);

  if (data.cosmetics.useMax) {
    if (data.cosmetics.startChar) {
      writeStr(data.cosmetics.startChar);
    }

    const cursorPos = cursor.getpos();

    for (let i = 0; i < data.cosmetics.maxLen + 1; i++) {
      writeStr(" ");
    }

    writeStr(data.cosmetics.endChar || "]");

    cursor.setpos(cursorPos.x, cursorPos.y);
  }
}

export function processKey(e: KeyboardEvent) {
  const inputData = get(InputData);

  if (inputData.running) {
    if (
      e.key.length === 1 &&
      (!inputData.cosmetics.useMax ||
        inputStr.length < inputData.cosmetics.maxLen)
    ) {
      inputStr += e.key.split("")[0];

      writeStr(!inputData.masked ? e.key : "*");
    }

    if (e.key === "Enter") {
      const { y } = cursor.getpos();

      cursor.setpos(0, y + 1);
      inputData.running = false;

      get(InputCallback)(inputStr);
    }

    if (e.key == "Backspace") {
      if (inputStr.length > 0) {
        inputStr = inputStr.slice(0, -1);

        writeStr("\b");
      }
    }
  }
}
