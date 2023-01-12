import React from "react";
import './Form.css'

function Form(props) {
    return (
        <div className="Form">
            {props.children}
        </div>
    )
}

export { Form };