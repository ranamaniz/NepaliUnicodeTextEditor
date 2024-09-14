import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { Button } from "react-bootstrap";

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
  const [editor] = useState(() => withReact(createEditor()));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    if (key === "&") {
      e.preventDefault();
      editor.insertText("and");
    }
  };
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        placeholder="Type something..."
        className="textEditor__textarea"
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </Slate>
  );
};

export default TextEditor;
