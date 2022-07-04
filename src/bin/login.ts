import { input, Input } from "../ts/io/keyboard";
import { write, writeStr } from "../ts/display/write";

const usernameInput: Input = {
  masked: false,
  running: true,
  cosmetics: {
    useMax: false,
    maxLen: -1,
  },
};

const passwordInput: Input = {
  masked: true,
  running: true,
  cosmetics: {
    useMax: false,
    maxLen: -1,
  },
};

export function Login() {
  let username = "";
  let password = "";
  writeStr(
    "cTerm v0.1-alpha **FLT**\n\nUsers can be managed in the admin panel.\n\nUsername: "
  );

  const usernameCallback = (str) => {
    username = str;

    writeStr("Password: ");

    input(passwordInput, passwordCallback);
  };

  const passwordCallback = (str) => {
    password = str;

    checkLogin(username, password);
  };

  input(usernameInput, usernameCallback);
}

async function checkLogin(username: string, password: string) {
  writeStr("\nLogging in...\n");
  const req = await await fetch("http://twihub.tk:3333/login", {
    headers: {
      authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  if (req.status != 200) {
    const json = await req.json();
    writeStr(`\n${json.error.title}\n`);
    writeStr(`${json.error.message}\n`);

    writeStr("\n** HALT! **\n");
    //Login();

    return;
  }

  writeStr("Login successful!\n");
}
