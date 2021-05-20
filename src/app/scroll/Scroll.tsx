import React, { CSSProperties } from 'react';
import './Scroll.scss'
import Notepad from './notepad/Notepad';
import Clock from './clock/Clock';

export interface ScrollProps{
  page: 'first' | 'second'
}

function Scroll({ page }: ScrollProps) {
  return (
    <div className="Scroll"
      style={{ '--translate': page === 'second' ? -100 : 0 } as CSSProperties}>
      <div className="Scroll__page">
        <Notepad/>
      </div>
      <div className="Scroll__page">
        <Clock/>
      </div>
    </div>
  );
}

export default Scroll;
