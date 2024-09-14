import "./styles/index.scss";
import TextEditor from "./components/TextEditor/TextEditor";

function App() {
  return (
    <section className="mainContainer">
      <h1 className="text-center">Nepali Unicode Text Editor</h1>
      <TextEditor />
    </section>
  );
}

export default App;
