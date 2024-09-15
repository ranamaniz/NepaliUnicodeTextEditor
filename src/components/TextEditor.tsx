import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { preetiCharMap } from "../constants";
import useStore from "../store/store";
import TextFormatter from "./TextFormatter";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

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
      !!store.texts
        ? JSON.parse(store.texts)
        : [
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

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      return (
        <span
          {...attributes}
          style={{
            fontWeight: leaf.bold ? "bold" : "normal",
            fontStyle: leaf.italic ? "italic" : "normal",
            textDecoration: leaf.underline ? "underline" : "none",
          }}
        >
          {children}
        </span>
      );
    },
    []
  );

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

    store.setTexts(content);
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={handleEditorChange}
    >
      <TextFormatter />
      <Editable
        placeholder="Type something..."
        renderLeaf={renderLeaf}
        className="textEditor__textarea"
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Slate>
  );
};

export default TextEditor;
