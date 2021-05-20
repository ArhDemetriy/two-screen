import React, { CSSProperties } from 'react';
import './Scroll.scss'
import Notepad from './notepad/Notepad';
import Clock from './clock/Clock';

class Scroll extends React.Component<{}, { translate: number }> {
  constructor(props?: any) {
    super(props);
    this.state = { translate: 0 };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="Scroll" style={{ '--translate': this.state.translate } as CSSProperties}>
        <div className="Scroll__page">
          <Notepad/>
        </div>
        <div className="Scroll__page">
          <Clock/>
        </div>
      </div>
    );
  }
  // values
  // methods

}

export default Scroll;
