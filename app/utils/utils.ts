import { CurrentPage } from "../store/zustand";
import { ThemeType, ValidPagesList } from "../types/types";

export const removePathNameSlash = (path: string): ValidPagesList => {
  return path.replace("/", "") as ValidPagesList;
};

export const isDarkTheme = (style: ThemeType): boolean => {
  return style === "dark";
};
