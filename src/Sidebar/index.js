import React from "react";
import './Sidebar.css';

function Sidebar(props) {
    return (
        <aside className={`Sidebar ${props.expanded ? 'Sidebar-expanded' : ''}`}>
            <div className="Logo">
                <div onClick={props.toggle} className='MenuButton'>
                    {props.menuIcon}
                </div>
                {props.expanded && <h1 className="Logo-name unselectable">Bikeshop</h1>}
                {props.expanded && props.logoIcon}
            </div>
            {props.children}
        </aside>
    );
}

export { Sidebar };