import { get } from "svelte/store";
import { Cursor } from "../display/cursor";
import { writeStr } from "../display/write";
import { InputData, type Input, InputValue, InputCommit } from "./keyboard";

export async function input(
  prefix: string,
  maxLen?: number,
  masked: boolean = false,
  maskChar?: string,
  startChar?: string,
  endChar?: string,
  useMax?: boolean
) {
  const data: Input = {
    masked,
    cosmetics: {
      useMax,
      maxLen,
      endChar,
      startChar,
    },
    maskChar,
    prefix,
    running: true,
  };
  InputData.set(data);
  InputValue.set("");
  InputCommit.set(false);

  writeStr(data.prefix || "");

  if (data.cosmetics.useMax) {
    if (data.cosmetics.startChar) {
      writeStr(data.cosmetics.startChar);
    }

    const cursorPos = Cursor.getpos();

    for (let i = 0; i < data.cosmetics.maxLen + 1; i++) {
      writeStr(" ");
    }

    writeStr(data.cosmetics.endChar || "]");

    Cursor.setpos(cursorPos.x, cursorPos.y);
  }

  return new Promise<string>((resolve) => {
    InputCommit.subscribe((v) => {
      if (!v) return;

      const value = get(InputValue);

      if (!value) return;

      resolve(value);
    });
  });
}
