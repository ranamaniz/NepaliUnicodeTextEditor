import { Form } from "react-bootstrap";
import useStore, { Language } from "../store/store";
import MarkButton from "./Button/MarkButton";
import { BsListOl, BsListUl } from "react-icons/bs";
import BlockButton from "./Button/BlockButton";

type Props = {};

const TextFormatter = (props: Props) => {
  const store = useStore();

  const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.currentTarget.value;
    store.setLanguage(selectedLang as Language);
  };

  return (
    <section className="textEditor__formatter">
      <Form.Select
        value={store?.language}
        onChange={handleLanguageSelect}
        className="textEditor__langSelector"
      >
        <option value="nep">Nepali</option>
        <option value="eng">English</option>
      </Form.Select>
      <MarkButton format="bold">
        <strong>B</strong>
      </MarkButton>
      <MarkButton format="italic">
        <i>I</i>
      </MarkButton>
      <MarkButton format="underline">
        <u>U</u>
      </MarkButton>
      <BlockButton type="orderedList">
        <BsListOl />
      </BlockButton>
      <BlockButton type="unorderedList">
        <BsListUl />
      </BlockButton>
    </section>
  );
};

export default TextFormatter;
