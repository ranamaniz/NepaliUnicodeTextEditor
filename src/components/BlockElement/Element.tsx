import { DefaultElement, RenderElementProps } from "slate-react";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";
import ListItem from "./ListItem";
import { BaseElement } from "slate";
import { BlockTypes } from "../../types";

interface CustomElement extends BaseElement {
  type: BlockTypes;
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
