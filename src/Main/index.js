import React from "react";
import './Main.css';

function Main(props) {
    return (
        <main>
            {props.children}
        </main>
    )
}

export { Main };