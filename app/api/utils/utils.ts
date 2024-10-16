import { customAlphabet, nanoid } from "nanoid";

export const usableAlph =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateNanoId(length: number): string {
  const nanoid = customAlphabet(usableAlph, length);
  return nanoid();
}

export const removeNullOrUndefined = <T = Object>(entity: Partial<T>): T => {
  const allKeys: (keyof T)[] = Object.keys(entity) as Array<keyof T>;
  const baseEntity: Partial<T> = {};
  for (const key of allKeys) {
    if (entity[key] !== undefined && entity[key] !== null) {
      baseEntity[key] = entity[key];
    }
  }
  return baseEntity as T;
}
