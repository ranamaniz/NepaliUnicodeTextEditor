import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Node } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { isHotkey } from "is-hotkey";
import toast from "react-hot-toast";
import { HOT_KEYS } from "../constants";
import useStore from "../store/store";
import { handlePreetiCharMap } from "../utils/charMapUtils";
import Element from "./Element/Element";
import Leaf from "./Leaf/Leaf";
import Toolbar from "./Toolbar";
import withHtml from "./HOC/withHTML";
import Export from "./Export";

const CHAR_LIMIT = 5000;

const TextEditor = () => {
  const store = useStore();
  const editor = useMemo(() => withHtml(withReact(createEditor())), []);
  const [isCharLimitCrossed, setIsCharLimitCrossed] = useState(false);

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

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const getTextsFromEditor = (nodes: Descendant[]) => {
    return nodes.map((node) => Node.string(node)).join("");
  };

  const getIsCharLimitCrossed = ({
    chars = "",
    updateState = true,
  }: {
    chars?: string;
    updateState?: boolean;
  } = {}) => {
    const editorTexts = getTextsFromEditor(editor.children);
    const totalTextLength = editorTexts.length + (!!chars ? chars.length : 0);
    const isLimitCrossed = totalTextLength > CHAR_LIMIT;

    if (isLimitCrossed && !isCharLimitCrossed && updateState) {
      setIsCharLimitCrossed(true);
    } else if (!isLimitCrossed && isCharLimitCrossed && updateState) {
      setIsCharLimitCrossed(false);
    }

    return isLimitCrossed;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const chars = e.clipboardData.getData("Text");

    if (
      isCharLimitCrossed ||
      getIsCharLimitCrossed({
        chars,
        updateState: false,
      })
    ) {
      e.preventDefault();
      console.warn("TEXT LIMIT CROSSED");
      toast.error("Can't paste, text limit will exceed", { id: "pasteToast" });
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isHotkeyPress = isHotkey(HOT_KEYS, e);

    const isLimitCrossed = getIsCharLimitCrossed({
      chars: isHotkeyPress ? "" : e.key,
    });

    if (isHotkeyPress) {
      return;
    }

    if (isLimitCrossed) {
      console.warn("TEXT LIMIT CROSSED");
      e.preventDefault();
      toast.error("Character limit exceeded", { id: "keyDownToast" });
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
    if (!isCharLimitCrossed) {
      const content = JSON.stringify(value);
      store.setTexts(content);
    }
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
        onPaste={handlePaste}
      />
      <Export />
    </Slate>
  );
};

export default TextEditor;
