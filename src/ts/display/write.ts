import { get, writable } from "svelte/store";
import { Display } from "../display";

let maxTimeout = 1;

export const globalUpdate = writable<number>(0);

function writeChar(char: string, x: number, y: number, delay = 0) {
  const disp = get(Display);

  setTimeout(() => {
    if (y >= disp.buffSize.height || x >= disp.buffSize.width) {
      console.warn("Can't write character: out of bounds!");
    }

    disp.buff[y][x] = char;

    const CursorPos = {
      x: x + 1,
      y,
    };

    get(Display).cursor = CursorPos;

    globalUpdate.set(Math.floor(Math.random() * 1e6));
  }, maxTimeout);

  maxTimeout += delay;
}

export function write(str: string, x: number, y: number, delay: number) {
  const disp = get(Display);
  let currentX = x - 1;

  for (let i = 0; i < str.length; i++) {
    currentX++;

    if (str[i] == "\n" || currentX >= disp.buffSize.width) {
      currentX = 0;

      y++;
    }

    writeChar(str[i], currentX, y, delay)
  }
}