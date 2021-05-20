import React, { CSSProperties } from 'react';
import './Scroll.scss'
import Notepad from './notepad/Notepad';
import Clock from './clock/Clock';

export interface ScrollProps {
  // children?: any
  translate: number
}

function Scroll() {
  let translate = 0
  return (
    <div className="Scroll" style={{'--translate': translate} as CSSProperties}>
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
