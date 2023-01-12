import React from "react";
import './OptionButton.css';

function OptionButton(props) {
    return (
        <div className={`OptionButton ${props.active && 'active'}`} onClick={() => {
            props.setInactive()
            props.setActive(true)
        }}>
            <p className="optionText">{props.textButton}</p>
        </div>
    )
}

export { OptionButton };