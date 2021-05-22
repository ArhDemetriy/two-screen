import ScrollState from "./scrollState/ScrollState";

export interface AnimationScrollingSettings{
  checkInterval: number
  animationInterval: number
  step: number
  orientation?: 'horizontal' | 'vertical'
}

export default class AnimationScrolling {
  constructor(settings: AnimationScrollingSettings) {
    this.CHECK_TIMEOUT = settings.checkInterval || 500
    this.ANIMATION_INTERVAL = settings.animationInterval || 50
    this.STEP = settings.step || 10
    if (settings.orientation == 'vertical') {
      this.BASIS_VECTOR = 'scrollTop'
    } else {
      this.BASIS_VECTOR = 'scrollLeft'
    }
  }
  getHandler() {
    return this.scroll.bind(this)
  }
  // init values
  private readonly CHECK_TIMEOUT
  private readonly ANIMATION_INTERVAL
  private readonly STEP
  private readonly BASIS_VECTOR: 'scrollLeft' | 'scrollTop'

  // monitor scrolling
  private scrollState?: ScrollState

  private scroll(ev: React.UIEvent<HTMLDivElement, UIEvent>) {
    const newPosition = ev.currentTarget[this.BASIS_VECTOR]
    if (newPosition == this.lastAnimationPosition) { return }

    this.stopAnimation()
    clearTimeout(this.checkerScrolling as any)

    if (!this.scrollState) {
      this.scrollState = new ScrollState(newPosition)
    } else if (newPosition != this.scrollState.lastPosition) {
      this.scrollState.push(newPosition)
    }

    this.checkerScrolling = setTimeout(this.checkScrolling
      .bind(this, ev.currentTarget, newPosition), this.CHECK_TIMEOUT);
  }
  private checkerScrolling?: NodeJS.Timeout
  private finisherScrolling?: NodeJS.Timeout

  private checkScrolling(el: HTMLDivElement, lastPosition: number) {
    if (!this.scrollState) { return }
    if (lastPosition != el[this.BASIS_VECTOR]) { return }

    this.stopAnimation()

    const direction = this.scrollState.direction >= 0 ? 1 : -1
    this.scrollState = undefined
    this.finisherScrolling = setInterval(this.finishScrolling
      .bind(this, el, direction), this.ANIMATION_INTERVAL)
  }

  // finalization scrolling
  private lastAnimationPosition = -1
  private finishScrolling(el: HTMLDivElement, direction: -1 | 1) {
    el[this.BASIS_VECTOR] += this.STEP * direction
    const position = el[this.BASIS_VECTOR]

    if (position == this.lastAnimationPosition) {
      this.stopAnimation()
      return
    }
    // важно. т.к. их равенство маркер отсутсвия сторонних движений
    // используется в эвенте скролла
    this.lastAnimationPosition = position
  }
  private stopAnimation() {
    clearInterval(this.finisherScrolling as any)
    this.finisherScrolling = undefined
    this.lastAnimationPosition = -1
  }
}
