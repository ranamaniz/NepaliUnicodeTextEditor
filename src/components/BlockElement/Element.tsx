import React from "react";
import { DefaultElement, RenderElementProps } from "slate-react";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";
import ListItem from "./ListItem";
import { BaseElement } from "slate";

interface CustomElement extends BaseElement {
  type: "orderedList" | "unorderedList" | "listItem" | "paragraph";
}

const Element = (props: RenderElementProps & { element: CustomElement }) => {
  switch (props.element.type) {
    case "orderedList":
      return <OrderedList {...props} />;
    case "unorderedList":
      return <UnorderedList {...props} />;
    case "listItem":
      return <ListItem {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
export default Element;
