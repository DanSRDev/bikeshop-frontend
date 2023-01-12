import React, { useEffect } from "react";
import './SidebarButton.css';

function SidebarButton(props) {

    return (
        <div className={`SidebarButton ${props.window && 'active'}`} onClick={() => {
            props.setFalse()
            props.setWindow(true)
        }}>
            <h1 className="button-text">{props.text}</h1>
        </div>
    )
}

export { SidebarButton };