import { preetiCharMap } from "../constants";

/**
 * Converts a English character to its corresponding Preeti character.
 * @param {string} key - The English char to convert
 * @returns {string} - The corresponding Preeti character.
 */
export const handlePreetiCharMap = (key: string) => {
  return preetiCharMap[key];
};

export const TEXT_TAGS: { [key: string]: () => { [key: string]: boolean } } = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const ELEMENT_TAGS: { [key: string]: () => { type: string } } = {
  LI: () => ({ type: "listItem" }),
  OL: () => ({ type: "orderedlist" }),
  UL: () => ({ type: "unorderedList" }),
  P: () => ({ type: "paragraph" }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  PRE: () => ({ type: "code" }),
};


