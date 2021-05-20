import React from 'react';
import './App.scss';
import Scroll from "./scroll/Scroll";

function App() {
  return (
    <div className="App App__container">
      <Scroll translate={10}/>
    </div>
  );
}

export default App;
