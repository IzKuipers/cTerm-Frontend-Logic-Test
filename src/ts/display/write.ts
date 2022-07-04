import { get, writable } from "svelte/store";
import { Cursor, Display } from "./main";

export const globalUpdate = writable<number>(0);
export function updateAll() {
  globalUpdate.set(Math.floor(Math.random() * 1e6));
}

export function write(b: number) {
  const disp = get(Display);
  const cur: Cursor = { ...disp.cursor, x: disp.cursor.x + 1 };

  disp.buff[disp.cursor.y][disp.cursor.x] = String.fromCharCode(b);

  if (b === 0x0a /* \n */ || cur.x >= disp.buffSize.width) {
    if (cur.y + 1 >= disp.buffSize.height) {
      scrollUp(1);
    } else {
      cur.y++;
    }

    cur.x = 0;
  }

  disp.cursor = cur;

  updateAll();
}

export function writeStr(str: string) {
  for (let i = 0; i < str.length; i++) {
    write(str.charCodeAt(i));
  }
}

export function scrollUp(lines = 1) {
  const disp = get(Display);

  for (let i = 0; i < lines; i++) {
    const cur: Cursor = { ...disp.cursor, y: disp.cursor.y };

    disp.buff = [
      ...disp.buff.slice(1),
      new Array(disp.buffSize.width).fill(null),
    ];

    disp.cursor = cur;
  }

  updateAll();
}
