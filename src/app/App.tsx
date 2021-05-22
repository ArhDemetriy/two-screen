import React from 'react';
import './App.scss';
import Scroll from "./scroll/Scroll";
import AnimationScrolling, {AnimationScrollingSettings} from "./animationScrolling/AnimationScrolling";

const ASSettings: AnimationScrollingSettings = {
  checkInterval: 500,
  animationInterval: 50,
  step: 10,
}

function App() {
  return (
    <div className="App"
    onScroll={(new AnimationScrolling(ASSettings)).getHandler()}
    >
      <Scroll/>
    </div>
  );
}

export default App;
