import React from 'react';
import './Input.scss'

function Input() {
  return (
    <label className="Input">
      <input className='Input__textField' type="text" name="textField" />
      <button type="button">Добавить текст</button>

    </label>
  );
}

export default Input;
