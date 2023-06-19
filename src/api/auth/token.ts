export const generateToken = (u: string, p: string) => btoa(`${u}:${p}`);
