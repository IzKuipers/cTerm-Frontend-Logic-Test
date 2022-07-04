import { get, writable, Writable } from "svelte/store";

export interface CharSize {
  width: number;
  height: number;
  initialized: boolean;
}

export type Cursor = { x: number; y: number };

export interface DisplayData {
  buffSize: {
    width: number;
    height: number;
  };
  charSize: {
    width: number;
    height: number;
  };

  cursor: Cursor;

  buff: string[][];
}

export const TempCharSize: Writable<CharSize> = writable<CharSize>({
  width: 0,
  height: 0,
  initialized: false,
});

export const Display: Writable<DisplayData> = writable<DisplayData>(null);

export function initDisplay() {
  if (!get(TempCharSize).initialized) {
    console.error(
      "Cannot initialize a display before the temp character size is set"
    );

    return;
  }
  const charSize = {
    width: get(TempCharSize).width,
    height: get(TempCharSize).height,
  };

  const bufferSize = {
    width: Math.floor(window.innerWidth / charSize.width),
    height: Math.floor(window.innerHeight / charSize.height),
  };

  let buff: string[][] = [];

  for (let i = 0; i < bufferSize.height; i++) {
    buff[i] = [];

    for (let j = 0; j < bufferSize.width; j++) {
      buff[i][j] = null;
    }
  }

  const disp: DisplayData = {
    buffSize: bufferSize,
    charSize: charSize,
    cursor: { x: 0, y: 0 },
    buff,
  };

  Display.set(disp);

  console.log(disp);
}
