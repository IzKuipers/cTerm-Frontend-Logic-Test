export interface Executable {
  name: string;
  async?: boolean;
  bin: ExecutableBin;
}

export type ExecutableStore = { [key: string]: Executable };
export type ExecutableBin = (t: Executable, argv?: string[]) => any;
