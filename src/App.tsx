import TextEditor from "./components/TextEditor";
import TextFormatter from "./components/TextFormatter";
import "./styles/index.scss";

function App() {
  return (
    <section className="mainContainer">
      <h1 className="text-center">Nepali Unicode Text Editor</h1>
      <section className="textEditor">
        <TextFormatter />
        <TextEditor />
      </section>
    </section>
  );
}

export default App;
