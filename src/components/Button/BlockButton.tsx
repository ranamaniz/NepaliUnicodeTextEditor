import React from "react";
import { Button } from "react-bootstrap";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import useStore from "../../store/store";
import { BlockTypes } from "../../types";

type BlockButtonProps = { children: React.ReactNode; type: BlockTypes };

const LIST_TYPES = ["orderedList", "unorderedList"];

const BlockButton = ({ children, type }: BlockButtonProps) => {
  const store = useStore();
  const editor = useSlate();

  const isBlockActive = (type: BlockTypes) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n["type"] === type,
      })
    );

    return !!match;
  };

  const handleToggleBlock = (type: BlockTypes) => {
    store.toggleBlock(type);

    const isActive = isBlockActive(type);
    const isList = LIST_TYPES.includes(type);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });
    let newProperties: Partial<SlateElement>;

    newProperties = {
      type: isActive ? "paragraph" : isList ? "listItem" : type,
    };

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: type, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  return (
    <Button
      variant="light"
      active={!!store[type]}
      onClick={() => handleToggleBlock(type)}
    >
      {children}
    </Button>
  );
};

export default BlockButton;
