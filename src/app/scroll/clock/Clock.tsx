import React from 'react';
import './Clock.scss'

class Clock extends React.Component<{}, {date: Date}> {
  constructor(props?: any) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.setState({ date: new Date() }), 1000);
  }
  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }
  render() {
    return (
      <div className='Clock '>
        <div className='Clock__huge_container'>
          <span>{this.state.date.toLocaleTimeString()}</span>
        </div>
      </div>
    );
  }
  // values
  protected timerID?: NodeJS.Timeout
}

export default Clock;
