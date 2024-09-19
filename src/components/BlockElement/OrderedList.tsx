import { RenderElementProps } from "slate-react";

const OrderedList = (props: RenderElementProps) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

export default OrderedList;
