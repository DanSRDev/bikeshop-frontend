import React from 'react';
import { useWindow } from './states'

import { Sidebar } from './Sidebar';
import { SidebarButton } from './Sidebar/SidebarButton';

import { Main } from './Main';
import { RoleWindow } from './Main/RoleWindow';
import { UserWindow } from './Main/UserWindow';
import { ProductWindow } from './Main/ProductWindow';
import { CategoryWindow } from './Main/CategoryWindow';

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
    setCategoryActive
  } = useWindow();

  function setFalseWindows() {
    setUserActive(false);
    setRoleActive(false);
    setProductActive(false);
    setCategoryActive(false);
  }

  return (
    <div className="App">
      <Sidebar>
        <SidebarButton text='Usuarios' window={userActive} setWindow={setUserActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Roles' window={roleActive} setWindow={setRoleActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Productos' window={productActive} setWindow={setProductActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Categorias' window={categoryActive} setWindow={setCategoryActive} setFalse={setFalseWindows}/>
        {/*
        <SidebarButton text='Proveedores' />
        <SidebarButton text='Clientes' />
        <SidebarButton text='Ventas' /> 
        */}
      </Sidebar>
      <Main>
        {userActive && <UserWindow />}
        {roleActive && <RoleWindow />}
        {productActive && <ProductWindow />}
        {categoryActive && <CategoryWindow />}
      </Main>
      
    </div>
  )
}

export default App;
