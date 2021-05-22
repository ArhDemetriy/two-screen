import React from 'react';
import './TextItem.scss'

export interface TextItemProps{
  text: string
}

class TextItem extends React.Component<TextItemProps, { charList: { id: number, char: JSX.Element }[] }> {
  constructor(props: TextItemProps) {
    super(props);
    this.requiredChars = Array.from(props.text)
  }
  render() {
    return (
      <div className="TextItem">{this.props.text}</div>
    );
  }
  // values
  private readonly requiredChars: string[]

  // methods
  protected pushText(text: string) {
  }
  protected animation(el: { id: number, text: any }) {
    const requireText = Array.from(el.text)
    console.log(requireText);
    return el
  }
}

export default TextItem;
