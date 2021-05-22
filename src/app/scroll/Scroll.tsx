import React, { CSSProperties } from 'react';
import './Scroll.scss'
import Page from './page/Page';
import Notepad from './notepad/Notepad';
import Clock from './clock/Clock';

export interface ScrollProps{
  page: 'first' | 'second'
}

function Scroll({ page }: ScrollProps) {
  return (
    <div className="Scroll"
      /* style={{ '--translate': page === 'second' ? -100 : 0 } as CSSProperties} */    >
      <Page><Notepad/></Page>
      <Page><Clock/></Page>
    </div>
  );
}

export default Scroll;
