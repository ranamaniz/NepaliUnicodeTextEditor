import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Node } from "slate";
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

const TEXT_LIMIT = 50;

const TextEditor = () => {
  const store = useStore();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [isOverTextLimit, setIsOverTextLimit] = useState(false);

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

  const getTextsFromEditor = (nodes: Descendant[]) => {
    return nodes.map((node) => Node.string(node)).join("");
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const editorTexts = getTextsFromEditor(editor.children);
    const pastedTexts = e.clipboardData.getData("Text");
    const totalTextLength = editorTexts.length + pastedTexts.length;

    if (totalTextLength >= TEXT_LIMIT || isOverTextLimit) {
      e.preventDefault();
      console.warn("TEXT LIMIT CROSSED");
      alert("Can't paste, text limit will exceed");
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isOverTextLimit && e.key !== "Backspace" && e.key !== "Delete") {
      console.warn("TEXT LIMIT CROSSED");
      alert("Limit crossed");
      e.preventDefault();
      return;
    } else if (e.key === "Backspace" || e.key === "Delete") {
      return;
    }
    console.log("store.language", store.language);
    if (store.language !== "nep") return;

    const key = e.key;
    const preetiText = handlePreetiCharMap(key);
    if (!!preetiText) {
      e.preventDefault();
      editor.insertText(preetiText);
    }
  };

  const handleEditorChange = (value: Descendant[]) => {
    const textsOnly = getTextsFromEditor(value);
    if (textsOnly.length >= TEXT_LIMIT) {
      console.warn("TEXT LIMIT CROSSED");
      setIsOverTextLimit(true);
      return;
    } else if (isOverTextLimit && textsOnly.length < TEXT_LIMIT) {
      setIsOverTextLimit(false);
      return;
    }

    const content = JSON.stringify(value);
    store.setTexts(content);
  };
  console.log("isOverTextLimit", isOverTextLimit);
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
        onPaste={handlePaste}
      />
    </Slate>
  );
};

export default TextEditor;
