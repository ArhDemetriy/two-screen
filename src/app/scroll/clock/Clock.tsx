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
      <span>
        {this.state.date.toLocaleTimeString()}
      </span>
    );
  }
  // values
  protected timerID?: NodeJS.Timeout
}

export default Clock;
