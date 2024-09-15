import { Button, Form } from "react-bootstrap";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import useStore, { Language } from "../store/store";

type Props = {};

const TextFormatter = (props: Props) => {
  const store = useStore();
  const editor = useSlate();

  const isMarkActive = (format: string) => {
    const marks = Editor.marks(editor) as Record<string, boolean> | null;

    return marks ? marks[format] === true : false;
  };

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const handleToggleFormats = (format: string) => {
    toggleMark(format);
    switch (format) {
      case "bold":
        store.toggleBold();
        break;
      case "italic":
        store.toggleItalic();
        break;
      case "underline":
        store.toggleUnderline();
        break;
      default:
        break;
    }
  };

  const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.currentTarget.value;
    store.setLanguage(selectedLang as Language);
  };

  return (
    <section className="textEditor__formatter">
      <Form.Select
        value={store.language}
        onChange={handleLanguageSelect}
        className="textEditor__langSelector"
      >
        <option value="nep">Nepali</option>
        <option value="eng">English</option>
      </Form.Select>
      <Button
        variant={`${store.bold ? "secondary" : "light"}`}
        onClick={() => handleToggleFormats("bold")}
      >
        <strong>B</strong>
      </Button>
      <Button
        variant={`${store.italic ? "secondary" : "light"}`}
        onClick={() => handleToggleFormats("italic")}
      >
        <i>I</i>
      </Button>
      <Button
        variant={`${store.underline ? "secondary" : "light"}`}
        onClick={() => handleToggleFormats("underline")}
      >
        <u>U</u>
      </Button>
    </section>
  );
};

export default TextFormatter;
