import { RenderLeafProps } from "slate-react";

const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props;
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
};

export default Leaf;
