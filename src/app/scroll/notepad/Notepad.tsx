import React from 'react';
import './Notepad.scss'
import Input from "./input/Input";

class Notepad extends React.Component<{}, { textList: { id: number, text: string }[] }> {
  constructor(props?: any) {
    super(props);
    this.state = { textList: [] };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="Notepad">
        <Input pusher={this.pushText.bind(this) as Notepad['pushText']}/>
        {this.state.textList.map(({ text, id }) => <span key={id}>{text}</span>)}
      </div>
    );
  }
  // values
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
