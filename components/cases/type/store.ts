import { create } from "zustand";

type TypeStore = {
  inViewType: string | null;
  setInViewType: (feature: string | null) => void;
  fullscreenType: string | null;
  setFullscreenType: (feature: string | null) => void;
  lastFullscreenType: string | null;
  setLastFullscreenType: (feature: string | null) => void;
};

export const useTypeStore = create<TypeStore>((set) => ({
  inViewType: null,
  setInViewType: (type: string | null) => set({ inViewType: type }),
  fullscreenType: null,
  setFullscreenType: (type: string | null) => {
    set({ fullscreenType: type });
    if (type !== null) {
      set({ lastFullscreenType: type });
    }
  },
  lastFullscreenType: null,
  setLastFullscreenType: (feature: string | null) =>
    set({ lastFullscreenType: feature }),
}));
