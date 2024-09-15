import { Button } from "react-bootstrap";
import TextEditor from "./components/TextEditor";
import TextFormatter from "./components/TextFormatter";
import "./styles/index.scss";
import useStore from "./store/store";

function App() {
  const store = useStore();
  const handleExportData = () => {
    alert(store.texts);
  };

  return (
    <section className="mainContainer">
      <h1 className="text-center">Nepali Unicode Text Editor</h1>
      <section className="textEditor">
        <TextFormatter />
        <TextEditor />
        <Button
          variant="primary"
          className="mt-2 align-right"
          onClick={handleExportData}
        >
          Export Data
        </Button>
      </section>
    </section>
  );
}

export default App;
