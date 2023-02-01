import React from 'react';
import { useWindow } from './states'

import { Sidebar } from './Sidebar';
import { SidebarButton } from './Sidebar/SidebarButton';

import { Main } from './Main';
import { RoleWindow } from './Main/RoleWindow';
import { UserWindow } from './Main/UserWindow';
import { ProductWindow } from './Main/ProductWindow';
import { CategoryWindow } from './Main/CategoryWindow';
import { SupplierWindow } from './Main/SupplierWindow';
import { CustomerWindow } from './Main/CustomerWindow';

import './App.css';

function App() {

  const {
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
  } = useWindow();

  function setFalseWindows() {
    setUserActive(false);
    setRoleActive(false);
    setProductActive(false);
    setCategoryActive(false);
    setSupplierActive(false);
    setCustomerActive(false);
  }

  return (
    <div className="App">
      <Sidebar>
        <SidebarButton text='Usuarios' window={userActive} setWindow={setUserActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Roles' window={roleActive} setWindow={setRoleActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Productos' window={productActive} setWindow={setProductActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Categorias' window={categoryActive} setWindow={setCategoryActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Proveedores' window={supplierActive} setWindow={setSupplierActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Clientes' window={customerActive} setWindow={setCustomerActive} setFalse={setFalseWindows}/>
        {/*
        <SidebarButton text='Ventas' /> 
        */}
      </Sidebar>
      <Main>
        {userActive && <UserWindow />}
        {roleActive && <RoleWindow />}
        {productActive && <ProductWindow />}
        {categoryActive && <CategoryWindow />}
        {supplierActive && <SupplierWindow />}
        {customerActive && <CustomerWindow />}
      </Main>
      
    </div>
  )
}

export default App;
