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
  private readonly TIMEOUT = 10
  protected scroll(ev: React.UIEvent<HTMLDivElement, UIEvent>) {
    this.scrollState.lastPositions.shift()
    this.scrollState.lastPositions.push(ev.currentTarget.scrollLeft)

    if (this.checkerScrolling) {
      clearTimeout(this.checkerScrolling)
    }
    this.checkerScrolling = setTimeout(this.checkScrolling
      .bind(this, ev.currentTarget, this.scrollState.lastPositions), this.TIMEOUT);
  }
  private checkScrolling(el: HTMLDivElement, lastPositions: App['scrollState']['lastPositions']) {
    if (el.scrollLeft != lastPositions[2]) { return }
    if (this.pointerIsDown) {
      const temp = this.checkerScrolling
      this.checkerScrolling = setTimeout(this.checkScrolling
        .bind(this, el, this.scrollState.lastPositions), this.TIMEOUT);
      // поломано вычисление типа. то number, то NodeJS.Timeout
      clearTimeout(temp as any)
      return
    }

    const p = lastPositions
    if (p[0] < p[1] && p[1] < p[2]) {
      this.scrollState.direction = 1
    } else if (p[0] > p[1] && p[1] > p[2]) {
      this.scrollState.direction = -1
    } else  {
      this.scrollState.direction = 0
    }

    this.finishScrolling(el)
  }

  private finishScrolling(el: HTMLDivElement) {
    const maxScroll = (el as any).scrollLeftMax
    let scroll = 0

    if (1 == this.scrollState.direction) {
      scroll = maxScroll
    } else if (-1 == this.scrollState.direction) {
      scroll = 0
    } else {
      if (el.scrollLeft <= maxScroll / 2) {
        scroll = 0
      } else {
        scroll = maxScroll
      }
    }

    el.scrollTo({ left: scroll })
  }
}


export default App;
