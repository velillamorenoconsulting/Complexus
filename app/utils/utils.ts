import { CurrentPage } from "../store/zustand";
import { validPagesList } from "../types/types";

export const removePathNameSlash = (path: string): validPagesList => {
  return path.replace("/", "") as validPagesList;
};
