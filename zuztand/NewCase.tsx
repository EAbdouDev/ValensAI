import { create } from "zustand";

interface NewCaseState {
  name: string;
  setName: (value: string) => void;
}

const useNewCase = create<NewCaseState>((set) => ({
  name: "",
  setName: (value) => set({ name: value }),
}));

export default useNewCase;
