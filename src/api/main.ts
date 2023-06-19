import { writable } from "svelte/store";
import { responseError } from "./error";
import { compileParams } from "./params";

export const SERVER = "ctapi.twiserver.nl";

export const loggedIn = writable<boolean>(false);
export const gloToken = writable<string>(null);

export async function APICall(
  path: string,
  params: { [key: string]: string },
  authToken?: string,
  json: boolean = true
) {
  const init: RequestInit = {
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  };

  const paramStr = compileParams(params);

  const req = await fetch(
    `https://${SERVER}/${path}${paramStr}`,
    authToken ? init : {}
  );

  const jsonData = await req.json();

  if (req.status != 200) responseError(jsonData, req, path);

  if (json) return jsonData;
  return JSON.stringify(jsonData);
}
