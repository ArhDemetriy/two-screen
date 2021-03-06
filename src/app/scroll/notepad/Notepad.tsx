import React from 'react';
import './Notepad.scss'
import Input from "./input/Input";
import TextItem from "./textItem/TextItem";

class Notepad extends React.Component<{}, { textList: { id: number, text: string }[] }> {
  constructor(props?: any) {
    super(props);
    const textList: Notepad['state']['textList'] = []
    for (let i = 1; i <= 10; i++) {
      textList.push({ id: Math.random(), text: `Сгенерированная строка ${i}` })
    }
    this.state = { textList };
  }
  render() {
    return (
      <div className="Notepad">
        <Input pusher={this.pushText.bind(this) as Notepad['pushText']} />
        <div className='Notepad__text_list'>
          {this.state.textList
            .map(({ text, id }) => <TextItem key={id} text={text}/>)}
        </div>
      </div>
    );
  }
  // methods
  protected pushText(text: string) {
    const textListItem = {
      text,
      id: Math.random()
    }
    this.state.textList.push(textListItem)
    this.setState(this.state)
  }
}

export default Notepad;
