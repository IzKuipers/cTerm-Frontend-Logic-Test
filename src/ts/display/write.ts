import { get, writable } from "svelte/store";
import { Cursor, Display } from "../display";

export const globalUpdate = writable<number>(0);

export function write(b: number) {
  const disp = get(Display);
  const cur: Cursor = { ...disp.cursor, x: disp.cursor.x + 1 };

  if (b === 0x0a /* \n */ || cur.x >= disp.buffSize.width) {
    cur.x = 0;
    cur.y++;
  }

  disp.buff[disp.cursor.y][disp.cursor.x] = String.fromCharCode(b);
  disp.cursor = cur;

  globalUpdate.set(Math.floor(Math.random() * 1e6));
}

export function writeStr(str: string) {
  for (let i = 0; i < str.length; i++) {
    write(str.charCodeAt(i));
  }
}
