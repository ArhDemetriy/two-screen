import React from 'react';
import './App.scss';
import Scroll, { ScrollProps } from "./scroll/Scroll";

export interface AppState extends ScrollProps{
  translate: number
}

class App extends React.Component<{}, AppState> {
  constructor(props?: any) {
    super(props);
    this.state = { translate: 0, page: 'first' };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="App"
        // onPointerLeave={this.endSwipe.bind(this)}
        // onPointerCancel={this.endSwipe.bind(this)}
        onPointerUp={this.endSwipe.bind(this)}

        onPointerDown={this.startSwipe.bind(this)
        }
      >
        <Scroll page={this.state.page} />
      </div>
    );
  }
  // values
  protected startMove?: number | null
  // methods
  protected startSwipe(ev: React.PointerEvent<HTMLDivElement>) {
    this.startMove = ev.screenX
  }
  protected endSwipe(ev: React.PointerEvent<HTMLDivElement>) {
    if (!this.startMove && this.startMove !== 0) { return }
    const move = ev.screenX - this.startMove
    this.startMove = null

    // console.log(move);
    const newState: AppState = (Math.abs(move) > 10 && move > 0)
      ? Object.assign<AppState, Partial<AppState>>(this.state, { page: 'first' })
      : Object.assign<AppState, Partial<AppState>>(this.state, { page: 'second' })
    this.setState(newState)
  }
}


export default App;
