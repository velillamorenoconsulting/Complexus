import { CurrentPage } from "../store/zustand";
import { ThemeType, validPagesList } from "../types/types";

export const removePathNameSlash = (path: string): validPagesList => {
  return path.replace("/", "") as validPagesList;
};

export const isDarkTheme = (style: ThemeType): boolean => {
  return style === "dark";
};
