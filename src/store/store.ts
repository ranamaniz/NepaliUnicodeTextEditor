import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "eng" | "nep";

type Store = {
  bold: boolean;
  italics: boolean;
  underline: boolean;
  language: Language;
  texts: string;
  toggleBold: () => void;
  toggleItalics: () => void;
  toggleUnderline: () => void;
  setLanguage: (lang: Language) => void;
  setTexts: (newTexts: string) => void;
};

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      bold: false,
      italics: false,
      underline: false,
      texts: "",
      language: "nep",
      toggleBold: () => set({ bold: !get().bold }),
      toggleItalics: () => set({ italics: !get().italics }),
      toggleUnderline: () => set({ underline: !get().underline }),
      setLanguage: (lang: Language) => set({ language: lang }),
      setTexts: (newtexts: string) => set({ texts: newtexts }),
    }),
    { name: "textEditor" }
  )
);

export default useStore;
