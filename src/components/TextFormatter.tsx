import { Button, Form } from "react-bootstrap";
import useStore, { Language } from "../store/store";

type Props = {};

const TextFormatter = (props: Props) => {
  const store = useStore();

  const handleToggleFormats = (format: string) => {
    switch (format) {
      case "bold":
        store.toggleBold();
        break;
      case "italics":
        store.toggleItalics();
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
        variant={`${store.italics ? "secondary" : "light"}`}
        onClick={() => handleToggleFormats("italics")}
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
