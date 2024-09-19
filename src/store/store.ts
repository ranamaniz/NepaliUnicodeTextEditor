import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BlockTypes, MarkTypes } from "../types";
import OrderedList from "../components/BlockElement/OrderedList";

export type Language = "eng" | "nep";

type Store = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  orderedList: boolean;
  unorderedList: boolean;
  listItem: boolean;
  paragraph: boolean;
  language: Language;
  texts: string;
  toggleFormat: (format: MarkTypes) => void;
  toggleBlock: (type: BlockTypes) => void;
  setLanguage: (lang: Language) => void;
  setTexts: (newTexts: string) => void;
};

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      bold: false,
      italic: false,
      underline: false,
      orderedList: false,
      unorderedList: false,
      listItem: false,
      paragraph: false,
      texts: "",
      language: "nep",
      toggleFormat: (format: MarkTypes) => set({ [format]: !get()[format] }),
      toggleBlock: (type: BlockTypes) => {
        const isOrderedList = type === "orderedList";
        const isUnorderedList = type === "unorderedList";

        set({
          [type]: !get()[type],
          ...(isOrderedList && { unorderedList: false }),
          ...(isUnorderedList && { orderedList: false }),
        });
      },
      setLanguage: (lang: Language) => set({ language: lang }),
      setTexts: (newtexts: string) => set({ texts: newtexts }),
    }),
    { name: "textEditor" }
  )
);

export default useStore;
