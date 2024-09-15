import React, { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { preetiCharMap } from "../constants";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const TextEditor = () => {
  const [isShiftActive, setIsShiftActive] = useState(false);

  const [editor] = useState(() => withReact(createEditor()));

  const handlePreetiCharMap = (key: string) => {
    if (isShiftActive) {
      const uKey = key.toUpperCase();

      console.log(uKey);

      return key === "Shift" ? "" : preetiCharMap[uKey] || uKey;
    }

    return key === "Shift" ? "" : preetiCharMap[key] || key;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("e.key", e.key);

    if (e.shiftKey) {
      setIsShiftActive(true);
    }

    const isActionKey =
      e.ctrlKey ||
      e.altKey ||
      e.metaKey ||
      e.key === " " ||
      e.key === "Backspace" ||
      e.key === "Tab";

    if (isActionKey) {
      return;
    }

    e.preventDefault();

    const key = e.key;

    const preetiText = handlePreetiCharMap(key);

    editor.insertText(preetiText);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.shiftKey) {
      setIsShiftActive(false);
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        placeholder="Type something..."
        className="textEditor__textarea"
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
      />
    </Slate>
  );
};

export default TextEditor;
