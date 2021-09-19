import React from "react";
import "./App.css";
import MyClassComponent from "./ClassComponents/MyClassComponent";
import MyFunctionComponent from "./FunctionComponents/MyFunctionComponent";

function App(): JSX.Element {
  const [showClassComponent, toggle] = React.useState(false);
  return (
    <div className="App">
      <button onClick={() => toggle(!showClassComponent)}>
        Switch class/function component
      </button>
      {showClassComponent ? (
        <MyClassComponent
          name="João"
          submit={(newName) => alert("submitted! " + newName)}
        />
      ) : (
        <MyFunctionComponent name="João" submit={(newName) => alert("submitted! " + newName)}/>
      )}
    </div>
  );
}

export default App;
