export const validPages = [
  "",
  "corporation",
  "events",
  "services",
  "contact",
  "pubs",
  "testimony",
];

type PageInfo = {
  name: string;
  redirect: string;
  isVisible: boolean;
  key: string;
};

export const pageList: PageInfo[] = [
  { name: "Inicio", redirect: "/", isVisible: true, key: "" },
  {
    name: "Corporación",
    redirect: "/corporation",
    isVisible: true,
    key: "corporation",
  },
  {
    name: "Servicios",
    redirect: "/services",
    isVisible: true,
    key: "services",
  },
  { name: "Eventos", redirect: "/events", isVisible: true, key: "events" },
  { name: "Publicaciones", redirect: "/pubs", isVisible: true, key: "pubs" },
  {
    name: "Testimonios",
    redirect: "/testimony",
    isVisible: true,
    key: "testimony",
  },
  { name: "Contacto", redirect: "/contact", isVisible: true, key: "contact" },
];

export type ValidPagesList =
  | ""
  | "corporation"
  | "events"
  | "services"
  | "contact";

export type ThemeType = "dark" | "light";
