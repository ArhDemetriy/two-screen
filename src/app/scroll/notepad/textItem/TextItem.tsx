import React, { CSSProperties } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './TextItem.scss'
interface TextItemState{
  charList: {
    id: number,
    char: string,
  }[]
}

export interface TextItemProps{
  text: string
}

class TextItem extends React.Component<TextItemProps, TextItemState> {
  private readonly STEP_DELAY = 100
  constructor(props: TextItemProps) {
    super(props);
    this.chars = Array.from(props.text)
    .map(s => ({
      id: Math.random(),
      char: s,
    }))
    this.maxLengthAnimation = this.chars.length * this.STEP_DELAY * 1.5

    this.state = { charList: this.chars}
  }
  render() {
    let delay = 0
    return (
      <div className="TextItem">{
        this.state.charList.map(el => {
          return (
            <ReactCSSTransitionGroup
              key={el.id}
              transitionName="TextItem__char"
              transitionAppear={true}
              transitionAppearTimeout={delay += this.STEP_DELAY}
              transitionEnter={false}
              transitionLeave={false}
            >
              <span
                style={{
                  '--animationLength': Math.round(Math
                    .random() * this.maxLengthAnimation)
                } as CSSProperties}
                className={'TextItem__char'}
                >
                {el.char}
              </span >
            </ReactCSSTransitionGroup>
          )
        })
      }</div>
    );
  }
  // values
  private readonly chars: TextItemState['charList']
  private readonly maxLengthAnimation : number

}

export default TextItem;
