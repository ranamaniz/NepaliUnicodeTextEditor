import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { preetiCharMap } from "../constants";
import useStore from "../store/store";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const TextEditor = () => {
  const store = useStore();
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: Descendant[] = useMemo(
    () =>
      JSON.parse(store.texts) || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
    []
  );

  const handlePreetiCharMap = (key: string) => {
    return preetiCharMap[key];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (store.language !== "nep") return;

    const key = e.key;
    const preetiText = handlePreetiCharMap(key);

    if (!!preetiText) {
      e.preventDefault();
      editor.insertText(preetiText);
    }
  };

  const handleEditorChange = (value: Descendant[]) => {
    const content = JSON.stringify(value);
    console.log("editor.children", editor.children);
    store.setTexts(content);
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={handleEditorChange}
    >
      <Editable
        placeholder="Type something..."
        className="textEditor__textarea"
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Slate>
  );
};

export default TextEditor;
