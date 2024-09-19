import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { preetiCharMap } from "../constants";
import useStore from "../store/store";
import { BlockTypes } from "../types";
import Element from "./BlockElement/Element";
import Toolbar from "./Toolbar";

type CustomElement = { type: BlockTypes; children: CustomText[] };
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
      !!store?.texts
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
          data-testid="text-editor-leaf"
        >
          {children}
        </span>
      );
    },
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
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
      <Toolbar />
      <Editable
        placeholder="Type something..."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className="textEditor__textarea"
        onKeyDown={(e) => handleKeyDown(e)}
        data-testid="text-editor"
      />
    </Slate>
  );
};

export default TextEditor;
