import { Editor, Transforms } from "slate";
import { jsx } from "slate-hyperscript";
import { ELEMENT_TAGS, TEXT_TAGS } from "../../utils/charMapUtils";
import { parse } from "path";

type CustomNode = HTMLElement | ChildNode;
// type CustomChildren =
//   | (Descendant | string | CustomElement)
//   | (Descendant | string | CustomElement)[]
//   | null;

export const deserialize = (el: any): any => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  let children = Array.from(parent.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName]();
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName]();
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

const withHtml = (editor: Editor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    console.log("data", data);
    const html = data.getData("text/html");
    const plainText = data.getData("text/plain");

    const containsHtmlTags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/i.test(plainText);

    if (html || containsHtmlTags) {
      const parsed = new DOMParser().parseFromString(
        containsHtmlTags && !html ? plainText : html,
        "text/html"
      );
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

export default withHtml;
