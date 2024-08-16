import { customAlphabet, nanoid } from "nanoid";

export const usableAlph =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateNanoId(length: number): string {
  const nanoid = customAlphabet(usableAlph, length);
  return nanoid();
}
