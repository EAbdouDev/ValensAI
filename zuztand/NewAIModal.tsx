import { create } from "zustand";

interface NewAIModalState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useNewAIModal = create<NewAIModalState>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));

export default useNewAIModal;
