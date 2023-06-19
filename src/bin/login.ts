import { Authenticate } from "../api/auth/main";
import { APICall } from "../api/main";
import { writeStr } from "../ts/display/write";
import { input } from "../ts/io/stdin";

export async function Login() {
  writeStr(
    "cTerm v0.1-alpha **FLT**\n\nUsers can be managed in the admin panel.\n\n"
  );

  const username = await input("Username: ");
  const password = await input("Password: ", -1, true, "*", "", "", false);

  console.log(username, password);

  const valid = await Authenticate(username, password);

  writeStr(valid ? `VALID!` : "fuck you");
}
