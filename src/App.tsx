import { Toaster } from "react-hot-toast";
import TextEditor from "./components/TextEditor";
import "./styles/index.scss";

function App() {
  return (
    <section className="mainContainer">
      <h1 className="text-center ">Nepali Unicode Text Editor</h1>
      <section className="textEditor">
        <TextEditor />
      </section>
      <Toaster />
    </section>
  );
}

export default App;
