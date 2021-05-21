import React from 'react';
import './App.scss';
import Scroll, { ScrollProps } from "./scroll/Scroll";

export interface AppState extends ScrollProps{
  isMoved: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props?: any) {
    super(props);
    this.state = { page: 'first' , isMoved: false};
  }
  render() {
    return (
      <div className="App"
        onScroll={this.scroll.bind(this)}
        onPointerDown={this.pointerDown.bind(this)}
        onPointerUp={this.pointerUp.bind(this)}
        onPointerCancel={this.pointerUp.bind(this)}
        onPointerLeave={this.pointerUp.bind(this)}
      >
        <Scroll page={this.state.page} />
      </div>
    );
  }
  // values
  private isScrolled = false



  // methods
  private showScroll(el: EventTarget) {
    console.group(`scrolls:`, (el as any).className)
    // console.log(`scroll = ${(el as any).scroll}`);
    // console.log(`scrollBy = ${(el as any).scrollBy}`);
    console.log(`scrollHeight = ${(el as any).scrollHeight}`);
    // console.log(`scrollIntoView = ${(ev[el] as any).scrollIntoView}`);
    console.log(`scrollLeft = ${(el as any).scrollLeft}`);
    console.log(`scrollLeftMax = ${(el as any).scrollLeftMax}`);
    // console.log(`scrollTo = ${(el as any).scrollTo}`);
    console.log(`scrollTop = ${(el as any).scrollTop}`);
    console.log(`scrollTopMax = ${(el as any).scrollTopMax}`);
    console.log(`scrollWidth = ${(el as any).scrollWidth}`);
    console.groupEnd()
  }

  private pointerIsDown = false
  protected pointerDown(ev: React.PointerEvent<HTMLDivElement>) {
    if (!ev.isPrimary || this.pointerIsDown) { return }
    this.pointerIsDown = true
  }
  protected pointerUp(ev: React.PointerEvent<HTMLDivElement>) {
    if (!this.pointerIsDown) { return }
    this.pointerIsDown = false
    console.log('pointer UP');
  }

  private readonly scrollState = {
    direction: 0 as -1 | 0 | 1,
    lastPositions: [0, 0, 0] as [number, number, number],
  }
  private checkerScrolling?: NodeJS.Timeout
  protected scroll(ev: React.UIEvent<HTMLDivElement, UIEvent>) {
    this.scrollState.lastPositions.shift()
    this.scrollState.lastPositions.push(ev.currentTarget.scrollLeft)

    if (this.checkerScrolling) {
      clearTimeout(this.checkerScrolling)
    }
    setTimeout(this.checkScrolling
      .bind(this, ev.currentTarget, this.scrollState.lastPositions), 0);
  }
  private checkScrolling(el: HTMLDivElement, lastPositions: App['scrollState']['lastPositions']) {
    if (el.scrollLeft != lastPositions[2]) { return }


  }

}


export default App;
