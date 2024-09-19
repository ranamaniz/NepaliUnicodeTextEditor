import React from "react";
import { RenderElementProps } from "slate-react";

type Props = {};

const ListItem = (props: RenderElementProps) => {
  return <li {...props.attributes}>{props.children}</li>;
};

export default ListItem;
