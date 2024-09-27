import { create } from "zustand";

export interface AuthOptions {
  isVisible: boolean;
  type: "login" | "register";
}

export interface GlobalState {
  isLogged: boolean;
  switchLogged: (val: boolean) => void;
  currentPage: CurrentPage;
  setCurrentPage: (val: CurrentPage) => void;
  authOptions: AuthOptions;
  setAuthOptions: (val: Partial<AuthOptions>) => void;
}

export enum CurrentPage {
  HOME = "",
  CORP = "corporation",
  EVENTS = "events",
  SERVICES = "services",
  CONTACT = "contact",
}

export const useStore = create<GlobalState>((set) => ({
  // States
  isLogged: false,
  currentPage: CurrentPage.HOME,
  authOptions: {
    isVisible: false,
    type: "login",
  },
  // Handlers
  switchLogged: (val: boolean) => set(() => ({ isLogged: val })),
  setCurrentPage: (val: CurrentPage) => set(() => ({ currentPage: val })),
  setAuthOptions: (val: Partial<AuthOptions>) =>
    set((state) => ({ authOptions: { ...state.authOptions, ...val } })),
}));
