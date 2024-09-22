import { Button } from "react-bootstrap";

import escapeHtml from "escape-html";
import { Text } from "slate";
import { useSlate } from "slate-react";

const serialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.strikethrough) {
      string = `<del>${string}</del>`;
    }
    return string;
  }

  const children = node.children.map((n: any) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "code":
      return `<pre><code>${children}</code></pre>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "heading-three":
      return `<h3>${children}</h3>`;
    case "heading-four":
      return `<h4>${children}</h4>`;
    case "heading-five":
      return `<h5>${children}</h5>`;
    case "heading-six":
      return `<h6>${children}</h6>`;
    case "unorderedList":
      return `<ul>${children}</ul>`;
    case "orderedList":
      return `<ol>${children}</ol>`;
    case "listItem":
      return `<li>${children}</li>`;
    default:
      return children;
  }
};

const Export = () => {
  const editor = useSlate();

  const handleExportData = () => {
    const htmlValue = serialize(editor);
    console.log(htmlValue);
    alert(htmlValue);
  };

  return (
    <Button
      variant="primary"
      className="mt-2 float-end"
      onClick={handleExportData}
    >
      Export Data
    </Button>
  );
};

export default Export;
