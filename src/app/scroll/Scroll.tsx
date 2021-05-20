import React from 'react';
import Notepad from './notepad/Notepad';
import Clock from './clock/Clock';

function Scroll() {
  return (
    <div className="Scroll">
      <div className="Scroll__page">
        <Notepad></Notepad>
      </div>
      <div className="Scroll__page">
        <Clock></Clock>
      </div>
    </div>
  );
}

export default Scroll;
