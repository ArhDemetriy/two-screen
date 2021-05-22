import React, { CSSProperties } from 'react';
import './TextItem.scss'
interface TextItemState{
  charList: {
    id: number,
    char: string,
    additionalClass: string,
  }[]
}

export interface TextItemProps{
  text: string
}

class TextItem extends React.Component<TextItemProps, TextItemState> {
  constructor(props: TextItemProps) {
    super(props);
    this.chars = Array.from(props.text)
      .map(s => ({
        id: Math.random(),
        char: s,
        additionalClass: this.INIT_CLASS
      }))

    this.state = { charList: this.chars}
  }
  render() {
    this.animator = setTimeout(this.animation.bind(this), 500) as any
    return (
      <div className="TextItem">{
        this.state.charList.map(el => {
          return <span
            style = {{'--animationLength': Math.round(Math.random()*1000)/100 } as CSSProperties}
            className={`TextItem__char ${el.additionalClass}`}
            key={el.id}>
            {el.char}
          </span >
        })
      }</div>
    );
  }
  // values
  private readonly chars: TextItemState['charList']
  private readonly INIT_CLASS = 'TextItem__char-init'

  protected animator?: number
  protected indexAnimation = 0
  protected animation() {
    if (this.indexAnimation >= this.state.charList.length) {
      clearInterval(this.animator)
      this.animator = undefined
      return
    }
    this.state.charList[this.indexAnimation].additionalClass = ''
    this.setState({ charList: this.state.charList })
    this.indexAnimation++
  }
}

export default TextItem;
