import { writable } from "svelte/store";
import type { ResErrorDataType } from "./interface";
import { SERVER } from "./main";

export const ResErrorData = writable<ResErrorDataType>([false, null, null]);

export function responseError(jsonData: any, req: Response, path: string) {
  ResErrorData.set([
    true,
    {
      title: jsonData.error.title,
      message: jsonData.error.message,
      code: req.status,
    },
    `${SERVER}/${path}`,
  ]);
}
