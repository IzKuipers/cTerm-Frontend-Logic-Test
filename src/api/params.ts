import type { Params } from "./interface";

export function compileParams(params: Params) {
  let paramStr = "?";

  for (const key in params) {
    paramStr += `${key}=${params[key]}&`;
  }

  return paramStr;
}
