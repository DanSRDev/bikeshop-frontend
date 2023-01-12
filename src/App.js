import React from 'react';
import { useWindow } from './states'

import { Sidebar } from './Sidebar';
import { SidebarButton } from './Sidebar/SidebarButton';

import { Main } from './Main';
import { RoleWindow } from './Main/RoleWindow';
import { UserWindow } from './Main/UserWindow';
import { ProductWindow } from './Main/ProductWindow';

import './App.css';

function App() {

  const {
    userActive,
    setUserActive,
    roleActive,
    setRoleActive,
    productActive,
    setProductActive
  } = useWindow();

  function setFalseWindows() {
    setUserActive(false);
    setRoleActive(false);
    setProductActive(false);
  }

  return (
    <div className="App">
      <Sidebar>
        <SidebarButton text='Usuarios' window={userActive} setWindow={setUserActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Roles' window={roleActive} setWindow={setRoleActive} setFalse={setFalseWindows}/>
        <SidebarButton text='Productos' window={productActive} setWindow={setProductActive} setFalse={setFalseWindows}/>
        {/* <SidebarButton text='Categorias' />
        <SidebarButton text='Proveedores' />
        <SidebarButton text='Clientes' />
        <SidebarButton text='Ventas' /> */}
      </Sidebar>
      <Main>
        {userActive && <UserWindow />}
        {roleActive && <RoleWindow />}
        {productActive && <ProductWindow />}
      </Main>
      
    </div>
  )
}

export default App;
