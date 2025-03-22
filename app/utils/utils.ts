import Swal from "sweetalert2";
import { ThemeType, ValidPagesList } from "../types/types";
import { ApplicationError } from "../api/utils/errors";

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
  useDefaultFolder?: boolean,
): string {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "";
  if (useDefaultFolder) {
    return `${baseUrl}/v1730082135/Complexus/Pagina%20Web/${fileName}`;
  }

  return `${baseUrl}/${fileName}`;
}

export function getVideoUrl(
  fileName: string,
  useDefaultFolder?: boolean,
): string {
  const baseUrl = process.env.NEXT_PUBLIC_VIDEO_DOMAIN || "";
  if (useDefaultFolder) {
    return `${baseUrl}/v1730082135/Complexus/Pagina%20Web/${fileName}`;
  }

  return `${baseUrl}/${fileName}`;
}

export function convertDate(date: Date, short: boolean = false): string {
  const dateBase = new Date(date);
  return dateBase.toLocaleDateString("es-US", {
    year: "numeric",
    month: short ? "short" : "long",
    day: "numeric",
  });
}

export function eventTypePicker(eventType: string): string {
  switch (eventType) {
    case "virtual":
      return "Virtual";
    case "onsite":
      return "Presencial";
    case "both":
      return "Virtual / Presencial";
    default:
      return "";
  }
}

type AlertOptions = {
  title: string;
  type: "success" | "error";
  text?: string;
  timing?: number;
};

export function sendAlert({
  title,
  type,
  text,
  timing = 1000,
}: AlertOptions): void {
  Swal.fire({
    title: title,
    text: text,
    icon: type,
    timer: timing,
    color: "#ffffff",
    background: "#1E1E1E",
    showConfirmButton: false,
    customClass: {
      title: "font-raleway",
      container: "font-raleway",
    },
  });
}

export const weekDays = ["LUN", "MART", "MIE", "JUE", "VIE", "SAB", "DOM"];
export const monthList = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}

export function removeStringValueFromArray(
  array: string[],
  remove: string,
): string[] {
  if (!array.includes(remove)) {
    throw new ApplicationError("No value existent in array");
  }
  const newArray = array.slice().filter((value) => value != remove);
  return newArray;
}
