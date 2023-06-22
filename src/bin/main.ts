import { writeStr } from "../ts/display/write";
import { ExecStore } from "./store";

export async function runProg(bin: string, argv?: string[]) {
  if (!ExecStore[bin]) return false;

  const executable = ExecStore[bin];

  if (executable.async)
    (async () => {
      executable.bin(executable, argv);
    })();
  else await executable.bin(executable, argv);
}
