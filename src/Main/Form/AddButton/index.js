import React from "react";
import "./AddButton.css";

function AddButton(props) {
  return (
    <div className='AddButton'>
      <p>{props.addText}</p>
    </div>
  );
}

export { AddButton };
