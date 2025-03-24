import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-5xl font-bold">Blogging Blogger</h1>
      <div className="card">
        <button
          className="text-lg text-fuchsia-800 font-bold underline  hover:text-amber-500 border-2 border-dashed ..."
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-4xl text-fuchsia-800 font-bold  hover:text-amber-500 underline">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
