import { RenderElementProps } from "slate-react";

const UnorderedList = (props: RenderElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

export default UnorderedList;
