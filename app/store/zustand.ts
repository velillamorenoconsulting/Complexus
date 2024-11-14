import { create } from "zustand";
import { User } from "../api/entities/user.entity";
import { Event } from "../api/entities/event.entity";
import { Item } from "../api/entities/item.entity";
import { Member } from "../api/entities/member.entity";

export interface AuthOptions {
  isVisible: boolean;
  type: "login" | "register";
}

export interface GlobalState {
  isLogged: boolean;
  switchLogged: (val: boolean) => void;
  eventList: Event[];
  setEventList: (val: Event[]) => void;
  itemList: Item[];
  setItems: (val: Item[]) => void;
  currentPage: CurrentPage;
  setCurrentPage: (val: CurrentPage) => void;
  authOptions: AuthOptions;
  setAuthOptions: (val: Partial<AuthOptions>) => void;
  user: Partial<User> | null;
  setUser: (val: Partial<User> | null) => void;
  member: Partial<Member> | null;
  setMember: (val: Partial<Member> | null) => void;
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
  member: null,
  eventList: [],
  itemList: [],
  // Handlers
  switchLogged: (val: boolean) => set(() => ({ isLogged: val })),
  setEventList: (val: Event[]) => set(() => ({ eventList: val })),
  setCurrentPage: (val: CurrentPage) => set(() => ({ currentPage: val })),
  setAuthOptions: (val: Partial<AuthOptions>) =>
    set((state) => ({ authOptions: { ...state.authOptions, ...val } })),
  setUser: (val: Partial<User> | null) => set(() => ({ user: val })),
  setItems: (val: Item[]) => set(() => ({ itemList: val })),
  setMember: (val: Partial<Member> | null) => set(() => ({ member: val })),
}));
