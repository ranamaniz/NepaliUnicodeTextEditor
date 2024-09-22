import { RenderLeafProps } from "slate-react";

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  if (leaf.highlight) {
    children = <span style={{ backgroundColor: "yellow" }}>{children}</span>;
  }

  return (
    <span {...attributes} data-testid="text-editor-leaf">
      {children}
    </span>
  );
};

export default Leaf;
