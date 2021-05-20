import React from 'react';
import './App.scss';
import Scroll, { ScrollProps } from "./scroll/Scroll";

export interface AppState extends ScrollProps{
  translate: number
  isMoved: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props?: any) {
    super(props);
    this.state = { translate: 0, page: 'first' , isMoved: false};
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="App"
        onPointerUp={this.endMove.bind(this)}
        onPointerDown={this.startMove.bind(this)}

        onPointerMove={this.state.isMoved ? this.move.bind(this) : undefined}
      >
        <Scroll page={this.state.page} />
      </div>
    );
  }
  // values
  // methods
  protected move(ev: React.PointerEvent<HTMLDivElement>) {
    const MIN_MOVE = 1
    if (ev.movementX > MIN_MOVE) {
      this.setState({ page: 'first' })
    } else if (ev.movementX < -MIN_MOVE) {
      this.setState({ page: 'second' })
    }
  }
  protected startMove(ev: React.PointerEvent<HTMLDivElement>) {
    this.setState({ isMoved: true })
  }
  protected endMove(ev: React.PointerEvent<HTMLDivElement>) {
    this.setState({ isMoved: false })
  }
}


export default App;
