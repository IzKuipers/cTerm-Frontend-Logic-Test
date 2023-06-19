import { APICall } from "../main";
import { generateToken } from "./token";

export async function Authenticate(username: string, password: string) {
  const req = await APICall(
    "login",
    {},
    generateToken(username, password),
    true
  );

  return !!req.valid;
}
