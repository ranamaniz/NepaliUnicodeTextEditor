import { Button } from "react-bootstrap";
import TextEditor from "./components/TextEditor";
import useStore from "./store/store";
import "./styles/index.scss";

function App() {
  const store = useStore();
  const handleExportData = () => {
    alert(store.texts);
  };

  return (
    <section className="mainContainer">
      <h1 className="text-center ">Nepali Unicode Text Editor</h1>
      <section className="textEditor">
       
        <TextEditor />
        <Button variant="primary" className="mt-2 float-end" onClick={handleExportData}>
          Export Data
        </Button>
      </section>
    </section>
  );
}

export default App;
