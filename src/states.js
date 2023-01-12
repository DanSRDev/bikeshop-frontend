import React from "react";

function useWindow() {

    const [ userActive, setUserActive ] = React.useState(true);
    const [ roleActive, setRoleActive ] = React.useState(false);
    const [ productActive, setProductActive ] = React.useState(false);
    
    return { 
        userActive, 
        setUserActive,
        roleActive,
        setRoleActive,
        productActive, 
        setProductActive
    };
}

export { useWindow };