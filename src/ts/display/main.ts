import { get } from "svelte/store";
import { Display, TempCharSize } from "./store";
import type { DisplayData } from "./interface";

export function initDisplay() {
  if (!get(TempCharSize).initialized)
    throw new Error(
      "Cannot initialize a display before the temp character size is set"
    );

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
}

export { Display, type DisplayData };
