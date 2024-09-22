import { RenderElementProps } from "slate-react";

const ListItem = (props: RenderElementProps) => {
  return <li {...props.attributes}>{props.children}</li>;
};

export default ListItem;
