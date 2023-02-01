import React from "react";
import { AddButton } from '../AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Main.css";

function SupplierWindow() {

  const url = 'http://localhost:3001/api/v1/suppliers';

  const [suppliers, setSuppliers] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataSupplier, setDataSupplier] = React.useState({
    id: '',
    name: '',
    phone: ''
  });

  async function getSuppliers() {
    try {
      const res = await axios.get(url);
      setSuppliers(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createSupplier(data) {
    try {
      await axios.post(url, data);
      getSuppliers();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateSupplier(id, data) {
    try {
      await axios.patch(`${url}/${id}`, data);
      getSuppliers();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteSupplier(id) {
    await axios.delete(`${url}/${id}`);
    setSuppliers(suppliers.filter(supplier => supplier.id !== dataSupplier.id));
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
    setDataSupplier(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyAddSupplier = (
    <Box sx={theme}>
      <h3>Agregar nuevo proveedor</h3>
      <TextField name="name" label="Nombre del proveedor" sx={{width: '100%'}} onChange={handleChange}/>
      <TextField name="phone" label="Celular del proveedor" sx={{width: '100%'}} onChange={handleChange}/>
      <div align="right">
        <Button color="primary" onClick={()=>createSupplier({
          name: dataSupplier.name,
          phone: dataSupplier.phone,
        })}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateSupplier = (
    <Box sx={theme}>
      <h3>Editar proveedor</h3>
      <TextField name="name" label="Nombre del proveedor" sx={{width: '100%'}} onChange={handleChange} value={`${dataSupplier.name}`}/>
      <TextField name="phone" label="Celular del proveedor" sx={{width: '100%'}} onChange={handleChange} value={`${dataSupplier.phone}`}/>
      <div align="right">
        <Button color="primary" onClick={()=>updateSupplier(dataSupplier.id, {
            name: dataSupplier.name,
            phone: dataSupplier.phone,
          })}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteSupplier = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar el proveedor "<b>{dataSupplier.name}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteSupplier(dataSupplier.id)}>Eliminar</Button>
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
    getSuppliers();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">PROVEEDORES</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center"><b>Id</b></TableCell>
              <TableCell align="center"><b>Nombre</b></TableCell>
              <TableCell align="center"><b>Celular</b></TableCell>
              <TableCell align="center"><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => {
              return (
                <TableRow key={supplier.id}>
                  <TableCell align="center">{supplier.id}</TableCell>
                  <TableCell align="center">{supplier.name}</TableCell>
                  <TableCell align="center">{supplier.phone}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataSupplier(supplier); toggleUpdateModal()}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataSupplier(supplier); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Proveedor' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddSupplier}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateSupplier}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteSupplier}
      </Modal>

    </section>
  );
}

export { SupplierWindow };