import React from 'react';
import TextList from "./textList/TextList";
import Input from "./input/Input";

function Notepad() {
  return (
    <form className="Notepad">
      <Input></Input>
      <TextList></TextList>
    </form>
  );
}

export default Notepad;