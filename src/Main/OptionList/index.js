import React from "react";
import './OptionList.css';

function OptionList(props) {
    return (
        <div className='OptionList'>
            {props.children}
        </div>
    )
}

export { OptionList };