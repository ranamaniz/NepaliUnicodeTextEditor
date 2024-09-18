import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MarkTypes } from "../types";

export type Language = "eng" | "nep";

type Store = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  language: Language;
  texts: string;
  toggleFormat: (format: MarkTypes) => void;
  setLanguage: (lang: Language) => void;
  setTexts: (newTexts: string) => void;
};

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      bold: false,
      italic: false,
      underline: false,
      texts: "",
      language: "nep",
      toggleFormat: (format: MarkTypes) => set({ [format]: !get()[format] }),
      setLanguage: (lang: Language) => set({ language: lang }),
      setTexts: (newtexts: string) => set({ texts: newtexts }),
    }),
    { name: "textEditor" }
  )
);

export default useStore;
