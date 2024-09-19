import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Editor } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { BaseEditor } from "slate";
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

const WORD_LIMIT = 50;

function withTextLimit({ limit = WORD_LIMIT } = {}) {
  return function Plugin(editor: Editor) {
    const { insertText } = editor;

    editor.insertText = (text) => {
      if (Editor.string(editor, []).length < limit) {
        insertText(text);
      } else {
        console.warn("limit passed!");
        alert("limit passed!");
      }
    };
    return editor;
  };
}
const TextEditor = () => {
  const store = useStore();
  const editor = useMemo(() => withTextLimit()(withReact(createEditor())), []);
  const [wordCount, setWordCount] = useState(0);

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
    setWordCount((prevCount) => ++prevCount);
    if (wordCount >= WORD_LIMIT - 1 && e.key !== "Backspace") {
      e.preventDefault();
      return;
    }
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
        // onPaste={handlePaste}
      />
    </Slate>
  );
};

export default TextEditor;
