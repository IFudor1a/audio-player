
import './App.css';
import {Data} from "./Data";
import Player from "./Components/Player";
import List from "./Components/List";
import {useEffect, useState} from "react";

function App() {
    const [current, setCurrent] = useState(Data[0])

  return (
    <div className="app">
        <List setCurrent={setCurrent}/>
        <Player current={current} setCurrent={setCurrent}/>
    </div>
  );
}

export default App;
