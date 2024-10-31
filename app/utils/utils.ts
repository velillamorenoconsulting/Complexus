import { CurrentPage } from "../store/zustand";
import { ThemeType, ValidPagesList } from "../types/types";

export const removePathNameSlash = (path: string): ValidPagesList => {
  return path.replace("/", "") as ValidPagesList;
};

export const isDarkTheme = (style: ThemeType): boolean => {
  return style === "dark";
};

/**
 * @description Returns imageURL with host variable.
 * This ensures If the host URL changes for any reason, It will
 * just require an update of the env variable associated and should
 * work just fine.
 *
 * @param fileName Name of the file + extension, f.e. example.png
 * @param folder Folder name, this is scoped based on host file organization
 */
export function getImageUrl(
  fileName: string,
  folder?: "events" | "publish" | "users" | string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "";
  let folderPath = "";

  if (folder) {
    switch (folder) {
      case "events":
        folderPath = "Eventos";
        break;
      case "users":
        folderPath = "Usuarios";
        break;
      case "publish":
        folderPath = "Publicaciones";
        break;
      default:
        folderPath = folder;
    }
  } else folderPath = "Pagina%20Web";
  return `${baseUrl}/${folderPath}/${fileName}`;
}

export function getVideoUrl(
  fileName: string,
  folder?: "events" | "publish" | "users"
): string {
  const baseUrl = process.env.NEXT_PUBLIC_VIDEO_DOMAIN || "";
  let folderPath = "";

  if (folder) {
    switch (folder) {
      case "events":
        folderPath = "Eventos";
        break;
      case "users":
        folderPath = "Usuarios";
        break;
      case "publish":
        folderPath = "Publicaciones";
        break;
      default:
        folderPath = folder;
    }
  } else folderPath = "Pagina%20Web";
  return `${baseUrl}/${folderPath}/${fileName}`;
}

export function convertDate(date: Date): string {
  const dateBase = new Date(date);
  return dateBase.toLocaleDateString("es-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
