import React from "react";
import { AddButton } from '../Form/AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Window.css";

function CustomerWindow() {

  const url = 'http://localhost:3001/api/v1/customers';

  const [customers, setCustomers] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataCustomer, setDataCustomer] = React.useState({
    dni: '',
    lastName: '',
    firstName: '',
    ruc: '',
  });

  async function getCustomers() {
    try {
      const res = await axios.get(url);
      setCustomers(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createCustomer(data) {
    try {
      await axios.post(url, data);
      getCustomers();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateCustomer(dni, data) {
    try {
      await axios.patch(`${url}/${dni}`, data);
      getCustomers();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteCustomer(dni) {
    await axios.delete(`${url}/${dni}`);
    setCustomers(customers.filter(customer => customer.dni !== dataCustomer.dni));
    toggleDeleteModal();
  }
  
  const theme = {
    position: 'absolute',
    backgroundColor: 'white',
    width: 600,
    border: '2px solid black',
    boxShadow: 5,
    padding: '16px 32px 24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyAddCustomer = (
    <Box sx={theme}>
      <h3>Agregar nuevo cliente</h3>
      <TextField name="dni" label="DNI del cliente" sx={{width: '100%'}} onChange={handleChange}/>
      <TextField name="lastName" label="Apellido del cliente" sx={{width: '100%'}} onChange={handleChange}/>
      <TextField name="firstName" label="Nombre del cliente" sx={{width: '100%'}} onChange={handleChange}/>
      <TextField name="ruc" label="RUC del cliente" sx={{width: '100%'}} onChange={handleChange}/>
      <div align="right">
        <Button color="primary" onClick={()=>{
          if (dataCustomer.ruc !== ''){
            createCustomer({
              dni: dataCustomer.dni,
              lastName: dataCustomer.lastName,
              firstName: dataCustomer.firstName,
              ruc: dataCustomer.ruc,
            })
          } else {
            createCustomer({
              dni: dataCustomer.dni,
              lastName: dataCustomer.lastName,
              firstName: dataCustomer.firstName,
            })
          }
        }}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateCustomer = (
    <Box sx={theme}>
      <h3>Editar cliente</h3>
      <TextField name="lastName" label="Apellido del cliente" sx={{width: '100%'}} onChange={handleChange} value={`${dataCustomer.lastName}`}/>
      <TextField name="firstName" label="Nombre del cliente" sx={{width: '100%'}} onChange={handleChange} value={`${dataCustomer.firstName}`}/>
      <TextField name="ruc" label="RUC del cliente" sx={{width: '100%'}} onChange={handleChange} value={`${dataCustomer.ruc? dataCustomer.ruc: ''}`}/>
      <div align="right">
        <Button color="primary" onClick={()=>{
          if (dataCustomer.ruc !== null && dataCustomer.ruc !== ''){
            updateCustomer(dataCustomer.dni, {
              lastName: dataCustomer.lastName,
              firstName: dataCustomer.firstName,
              ruc: dataCustomer.ruc,
            })
          } else {
            updateCustomer(dataCustomer.dni, {
              lastName: dataCustomer.lastName,
              firstName: dataCustomer.firstName,
            })
          }
        }}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteCustomer = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar el cliente "<b>{dataCustomer.firstName + ' ' + dataCustomer.lastName}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteCustomer(dataCustomer.dni)}>Eliminar</Button>
        <Button onClick={()=>toggleDeleteModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  function toggleAddModal() {
    setAddModal(!addModal);
  }

  function toggleUpdateModal() {
    setUpdateModal(!updateModal);
  }

  function toggleDeleteModal() {
    setDeleteModal(!deleteModal);
  }

  React.useEffect(() => {
    getCustomers();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">CLIENTES</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center"><b>DNI</b></TableCell>
              <TableCell align="center"><b>Apellido</b></TableCell>
              <TableCell align="center"><b>Nombre</b></TableCell>
              <TableCell align="center"><b>RUC</b></TableCell>
              <TableCell align="center"><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              return (
                <TableRow key={customer.dni}>
                  <TableCell align="center">{customer.dni}</TableCell>
                  <TableCell align="center">{customer.lastName}</TableCell>
                  <TableCell align="center">{customer.firstName}</TableCell>
                  <TableCell align="center">{customer.ruc ? customer.ruc : '-'}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataCustomer(customer); toggleUpdateModal()}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataCustomer(customer); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Cliente' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddCustomer}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateCustomer}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteCustomer}
      </Modal>

    </section>
  );
}

export { CustomerWindow };