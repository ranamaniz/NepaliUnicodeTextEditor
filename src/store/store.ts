import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language, MarkTypes, Store, StoreBlockTypes } from "../types/types";

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
      toggleBlock: (type: StoreBlockTypes) => {
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
