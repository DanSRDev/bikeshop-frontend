import React from "react";
import './Sidebar.css';

function Sidebar(props) {
    return (
        <aside className="Sidebar">
            {props.children}
        </aside>
    );
}

export { Sidebar };