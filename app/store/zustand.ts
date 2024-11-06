import { create } from "zustand";
import { User } from "../api/entities/user.entity";
import { Event } from "../api/entities/event.entity";

export interface AuthOptions {
  isVisible: boolean;
  type: "login" | "register";
}

export interface GlobalState {
  isLogged: boolean;
  switchLogged: (val: boolean) => void;
  eventList: Event[];
  setEventList: (val: Event[]) => void;
  currentPage: CurrentPage;
  setCurrentPage: (val: CurrentPage) => void;
  authOptions: AuthOptions;
  setAuthOptions: (val: Partial<AuthOptions>) => void;
  user: Partial<User> | null;
  setUser: (val: Partial<User>) => void;
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
  user: null,
  eventList: [],
  // Handlers
  switchLogged: (val: boolean) => set(() => ({ isLogged: val })),
  setEventList: (val: Event[]) => set(() => ({ eventList: val })),
  setCurrentPage: (val: CurrentPage) => set(() => ({ currentPage: val })),
  setAuthOptions: (val: Partial<AuthOptions>) =>
    set((state) => ({ authOptions: { ...state.authOptions, ...val } })),
  setUser: (val: Partial<User>) => set(() => ({ user: val })),
}));
