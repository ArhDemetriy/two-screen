import React from 'react';
import './Input.scss'
interface InputProps{
  pusher: (text: string) => void
}
function Input({ pusher }: InputProps) {
  return (
    <form className="Input" onSubmit={ev => {
      ev.preventDefault();
      const textField = (ev.currentTarget as HTMLFormElement).firstChild as HTMLInputElement
      if (textField && textField.value) {
        pusher(textField.value);
      }
    }}>
      <input className='Input__textField' type="text" name="textField" />
      <button type="submit">Добавить текст</button>

    </form>
  );
}

export default Input;
