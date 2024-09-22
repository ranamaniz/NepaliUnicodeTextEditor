import { Descendant } from "slate";

export type MarkTypes = "underline" | "bold" | "italic";
export type Language = "eng" | "nep";

export type BlockTypes =
  | "paragraph"
  | "orderedList"
  | "unorderedList"
  | "listItem"
  | "quote"
  | "code"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "heading-four"
  | "heading-five"
  | "heading-six";

export type CustomElement = {
  type: BlockTypes;
  children: CustomText[];
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  highlight?: boolean;
};

export type StoreBlockTypes =
  | "paragraph"
  | "orderedList"
  | "unorderedList"
  | "listItem";

export type Store = {
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
  toggleBlock: (type: StoreBlockTypes) => void;
  setLanguage: (lang: Language) => void;
  setTexts: (newTexts: string) => void;
};
