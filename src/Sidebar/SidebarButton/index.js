import React from "react";
import './SidebarButton.css';

function SidebarButton(props) {

    return (
        <div className={`SidebarButton ${props.window && 'active'}`} onClick={() => {
            props.setFalse()
            props.setWindow(true)
        }}>
            {props.icon}
            {props.expanded && <h1 className="button-text unselectable">{props.text}</h1>}
        </div>
    )
}

export { SidebarButton };