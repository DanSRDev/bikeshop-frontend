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
import { SaleWindow } from './Main/SaleWindow';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import GroupsIcon from '@mui/icons-material/Groups';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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
    setCustomerActive,
    saleActive,
    setSaleActive
  } = useWindow();

  function setFalseWindows() {
    setUserActive(false);
    setRoleActive(false);
    setProductActive(false);
    setCategoryActive(false);
    setSupplierActive(false);
    setCustomerActive(false);
    setSaleActive(false);
  }
  const [expanded, setExpanded] = React.useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const user = process.env.REACT_APP_USER;

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="App">
      <Sidebar expanded={expanded} menuIcon={<MenuIcon/>} logoIcon={<DirectionsBikeIcon/>} toggle={toggleSidebar}>
        <SidebarButton text='Usuarios' window={userActive} setWindow={setUserActive} setFalse={setFalseWindows} icon={<AdminPanelSettingsIcon/>} expanded={expanded}/>
        <SidebarButton text='Roles' window={roleActive} setWindow={setRoleActive} setFalse={setFalseWindows} icon={<AccountBoxIcon/>} expanded={expanded}/>
        <SidebarButton text='Productos' window={productActive} setWindow={setProductActive} setFalse={setFalseWindows} icon={<InventoryIcon/>} expanded={expanded}/>
        <SidebarButton text='Categorias' window={categoryActive} setWindow={setCategoryActive} setFalse={setFalseWindows} icon={<CategoryIcon/>} expanded={expanded}/>
        <SidebarButton text='Proveedores' window={supplierActive} setWindow={setSupplierActive} setFalse={setFalseWindows} icon={<StoreIcon/>} expanded={expanded}/>
        <SidebarButton text='Clientes' window={customerActive} setWindow={setCustomerActive} setFalse={setFalseWindows} icon={<GroupsIcon/>} expanded={expanded}/>
        <SidebarButton text='Ventas' window={saleActive} setWindow={setSaleActive} setFalse={setFalseWindows} icon={<MonetizationOnIcon/>} expanded={expanded}/>
      </Sidebar>
      <Main>
        {userActive && <UserWindow apiUrl={apiUrl}/>}
        {roleActive && <RoleWindow apiUrl={apiUrl}/>}
        {productActive && <ProductWindow apiUrl={apiUrl}/>}
        {categoryActive && <CategoryWindow apiUrl={apiUrl}/>}
        {supplierActive && <SupplierWindow apiUrl={apiUrl}/>}
        {customerActive && <CustomerWindow apiUrl={apiUrl}/>}
        {saleActive && <SaleWindow apiUrl={apiUrl} user={user}/>}
      </Main>
    </div>
  )
}

export default App;
