import React from 'react';
import './Scroll.scss'
import Page from './page/Page';
import Notepad from './notepad/Notepad';
import Clock from './clock/Clock';

function Scroll() {
  return (
    <div className="Scroll">
      <Page><Notepad/></Page>
      <Page><Clock/></Page>
    </div>
  );
}

export default Scroll;
