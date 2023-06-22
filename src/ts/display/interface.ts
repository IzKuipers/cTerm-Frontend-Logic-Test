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
