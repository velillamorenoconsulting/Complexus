import { create } from "zustand";

export interface GlobalState {
  isLogged: boolean;
  switchLogged: (val: boolean) => void;
}

export const useStore = create<GlobalState>((set) => ({
  isLogged: false,
  switchLogged: (val: boolean) => set(() => ({ isLogged: val })),
}));
