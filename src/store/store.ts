import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  bold: boolean;
  italics: boolean;
  underline: boolean;
  texts: string;
  toggleBold: () => void;
  toggleItalics: () => void;
  toggleUnderline: () => void;
  setTexts: (newTexts: string) => void;
};

type SetType = (
  partial: Partial<Store> | ((state: Store) => Partial<Store>)
) => void;
type GetType = () => Store;

const useStore = create(
  persist(
    (set: SetType, get: GetType) => ({
      bold: false,
      italics: false,
      underline: false,
      texts: "",
      toggleBold: () => set({ bold: !get().bold }),
      toggleItalics: () => set({ italics: !get().italics }),
      toggleUnderline: () => set({ underline: !get().underline }),
      setTexts: (newtexts: string) => set({ texts: newtexts }),
    }),
    { name: "textEditor" }
  )
);

export default useStore;
