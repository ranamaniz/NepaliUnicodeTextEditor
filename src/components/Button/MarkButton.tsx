import React from "react";
import { Button } from "react-bootstrap";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import useStore from "../../store/store";
import { MarkTypes } from "../../types";

type MarkButtonProps = { children: React.ReactNode; format: MarkTypes };

const MarkButton = ({ children, format }: MarkButtonProps) => {
  const store = useStore();
  const editor = useSlate();

  const isMarkActive = (format: MarkTypes) => {
    const marks = Editor.marks(editor) as Record<string, boolean> | null;

    return marks ? marks[format] === true : false;
  };

  const handleToggleFormats = (format: MarkTypes) => {
    const isActive = isMarkActive(format);
    store.toggleFormat(format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <Button
      variant="light"
      active={!!store[format]}
      onClick={() => handleToggleFormats(format)}
    >
      {children}
    </Button>
  );
};

export default MarkButton;
