import React from 'react';
import './App.scss';
import Scroll, { ScrollProps } from "./scroll/Scroll";
import AnimationScrolling from "./animationScrolling/AnimationScrolling";

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
      >
        <Scroll page={this.state.page} />
      </div>
    );
  }

  // scrolling
  private readonly scrollState = {
    isReseated: true,
    lastPosition: 0,
    direction: 0,
    reset: function () {
      this.isReseated = true
      this.direction = 0
    },
    push: function (newPosition: number) {
      if (this.isReseated) {
        this.isReseated = false
      } else {
        this.direction += newPosition - this.lastPosition
      }
      this.lastPosition = newPosition
    },
  }
  private checkerScrolling?: NodeJS.Timeout
  private finisherScrolling?: NodeJS.Timeout
  private readonly CHECK_INTERVAL = 500
  private readonly ANIMATION_INTERVAL = 50
  protected scroll(ev: React.UIEvent<HTMLDivElement, UIEvent>) {
    const newPosition = ev.currentTarget.scrollLeft
    if (newPosition == this.lastAnimationPosition) { return }
    if (this.finisherScrolling) {
      clearInterval(this.finisherScrolling)
      this.finisherScrolling = undefined
    }

    if (newPosition != this.scrollState.lastPosition) {
      this.scrollState.push(ev.currentTarget.scrollLeft)
    }

    clearInterval(this.checkerScrolling as any)
    this.checkerScrolling = setInterval(this.checkScrolling
      .bind(this, ev.currentTarget), this.CHECK_INTERVAL);
  }

  // detect stay scrolling
  private lastCheckedPosition = -1
  private checkScrolling(el: HTMLDivElement) {
    if (this.scrollState.isReseated) { return }

    const lastPosition = this.scrollState.lastPosition
    if (this.lastCheckedPosition != lastPosition) {
      this.lastCheckedPosition = lastPosition!
      return
    }

    // поломано вычисление типов
    clearInterval(this.checkerScrolling as any)
    this.checkerScrolling = undefined
    this.lastCheckedPosition = -1
    clearInterval(this.finisherScrolling as any)
    this.lastAnimationPosition = -1
    // this.finisherScrolling не сбрасывается для блокировки

    const direction = this.scrollState.direction >= 0 ? 1 : -1
    this.scrollState.reset()
    this.finisherScrolling = setInterval(this.finishScrolling
      .bind(this, el, direction), this.ANIMATION_INTERVAL)
  }

  // finalization scrolling
  private readonly STEP = 10
  private lastAnimationPosition = -1
  private finishScrolling(el: HTMLDivElement, direction: -1 | 1) {
    el.scrollLeft += this.STEP * direction
    const position = el.scrollLeft

    if (position == this.lastAnimationPosition) {
      clearInterval(this.finisherScrolling as any)
      this.finisherScrolling = undefined
      this.lastAnimationPosition = -1
      return
    }
    // важно. т.к. их равенство маркер отсутсвия сторонних движений
    // используется в эвенте скролла
    this.lastAnimationPosition = position
  }
}


export default App;
