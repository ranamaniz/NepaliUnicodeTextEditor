import { BaseElement } from "slate";
import { DefaultElement, RenderElementProps } from "slate-react";
import { BlockTypes } from "../../types/types";
import ListItem from "./ListItem";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";

interface CustomElement extends BaseElement {
  type: BlockTypes;
}

const Element = (props: RenderElementProps & { element: CustomElement }) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case "orderedList":
      return <OrderedList {...props} />;
    case "unorderedList":
      return <UnorderedList {...props} />;
    case "listItem":
      return <ListItem {...props} />;
    case "quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "code":
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      );
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;

    default:
      return <DefaultElement {...props} />;
  }
};
export default Element;
