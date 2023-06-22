import type { ExecutableStore } from "./interface";
import { Login } from "./login";

export const ExecStore: ExecutableStore = {
  login: {
    name: "Login",
    bin: Login,
  },
};
