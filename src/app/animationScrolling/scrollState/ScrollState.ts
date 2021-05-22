export default class scrollState{
  constructor(public lastPosition: number) { }
  direction = 0
  push(newPosition: number) {
    this.direction += newPosition - this.lastPosition
    this.lastPosition = newPosition
  }
}
