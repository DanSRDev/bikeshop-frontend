import React from "react";
import "./AddButton.css";

function AddButton(props) {
  return (
    <div className='AddButton' onClick={props.click}>
      <p>{props.addText}</p>
    </div>
  );
}

export { AddButton };
