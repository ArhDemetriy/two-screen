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
        // onTouchEnd={this.pointerUp.bind(this)}
      >
        <Scroll page={this.state.page} />
      </div>
    );
  }

  // methods
  private showScroll(el: EventTarget) {
    console.clear()
    console.group(`scrolls:`, (el as any).className)
    // console.log(`scroll = ${(el as any).scroll}`);
    // console.log(`scrollBy = ${(el as any).scrollBy}`);
    console.log(`scrollHeight = ${(el as any).scrollHeight}`);
    console.log(`scrollLeftMax = ${(el as any).scrollLeftMax}`);
    // console.log(`scrollIntoView = ${(ev[el] as any).scrollIntoView}`);
    console.log(`scrollLeft = ${(el as any).scrollLeft}`);
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
  }

  // scrolling
  private readonly scrollState = {
    direction: function () {
      console.group('direction')
      const start = this.lastPositions[0]
      if (!isFinite(start)) { return 0 }

      const criticalPoints = this.lastPositions
        .reduce((direction, position) => {
          if (direction.min > position) {
            direction.min = position
          } else if (direction.max < position) {
            direction.max = position
          }
          return direction
        }, { min: start, max: start })
      const result = criticalPoints.min + criticalPoints.max - 2 * start
      console.log({
        result,
        criticalPoints,
        positions: this.lastPositions,
      });
      console.groupEnd()
      return result
    },
    lastPositions: [] as number[]
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

    const lastDetectPosition = this.scrollState.lastPositions[this.scrollState.lastPositions.length - 1]
    if (newPosition != lastDetectPosition) {
      this.scrollState.lastPositions.push(ev.currentTarget.scrollLeft)
    }

    clearInterval(this.checkerScrolling as any)
    this.checkerScrolling = setInterval(this.checkScrolling
      .bind(this, ev.currentTarget), this.CHECK_INTERVAL);
  }

  // detect stay scrolling
  private lastCheckedPosition = -1
  private checkScrolling(el: HTMLDivElement) {
    console.group('checkScrolling')

    const lastPosition = this.scrollState.lastPositions[this.scrollState.lastPositions.length - 1]

    console.log({
      name: 'checkScrolling',
      direction: this.scrollState.direction(),
      lastPosition,
    });

    if (this.lastCheckedPosition != lastPosition) {
      this.lastCheckedPosition = lastPosition
      console.groupEnd()
      return
    }

    // поломано вычисление типов
    clearInterval(this.checkerScrolling as any)
    this.checkerScrolling = undefined
    this.lastCheckedPosition = -1
    clearInterval(this.finisherScrolling as any)
    this.lastAnimationPosition = -1
    // this.finisherScrolling не сбрасывается для блокировки

    const direction = this.scrollState.direction() >= 0 ? 1 : -1
    this.scrollState.lastPositions = []
    this.finisherScrolling = setInterval(this.finishScrolling
      .bind(this, el, direction), this.ANIMATION_INTERVAL)
    console.groupEnd()
  }

  // finalization scrolling
  private readonly STEP = 10
  private lastAnimationPosition = -1
  private finishScrolling(el: HTMLDivElement, direction: -1 | 1) {
    // console.group('finishScrolling')
    el.scrollLeft += this.STEP * direction
    const position = el.scrollLeft
    // console.log({
    //   position,
    //   lastAnim: this.lastAnimationPosition,
    // });

    if (position == this.lastAnimationPosition) {
      clearInterval(this.finisherScrolling as any)
      this.finisherScrolling = undefined
      this.lastAnimationPosition = -1
      console.log('move finished to: ', position);
      // console.groupEnd()
      return
    }
    // важно. т.к. их равенство маркер отсутсвия сторонних движений
    // используется в эвенте скролла
    this.lastAnimationPosition = position
    // console.groupEnd()
  }
}


export default App;
