import React from "react";

function useWindow() {

    const [ userActive, setUserActive ] = React.useState(true);
    const [ roleActive, setRoleActive ] = React.useState(false);
    const [ productActive, setProductActive ] = React.useState(false);
    const [ categoryActive, setCategoryActive ] = React.useState(false);
    const [ supplierActive, setSupplierActive ] = React.useState(false);
    const [ customerActive, setCustomerActive ] = React.useState(false);
    
    return { 
        userActive, 
        setUserActive,
        roleActive,
        setRoleActive,
        productActive,
        setProductActive,
        categoryActive,
        setCategoryActive,
        supplierActive,
        setSupplierActive,
        customerActive,
        setCustomerActive
    };
}

export { useWindow };