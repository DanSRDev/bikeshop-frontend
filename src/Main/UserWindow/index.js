import React from "react";
import { AddButton } from '../AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Main.css";

function UserWindow() {

  const url = 'http://localhost:3001/api/v1/users';

  const [users, setUsers] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataUser, setDataUser] = React.useState({
    dni: '',
    lastName: '',
    firstName: '',
    username: '',
    password: '',
    sales: '',
    roleId: ''
  });

  async function getUsers() {
    try {
      const res = await axios.get(url);
      setUsers(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createUser(data) {
    try {
      await axios.post(url, data);
      getUsers();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateUser(dni, data) {
    try {
      await axios.patch(`${url}/${dni}`, data);
      getUsers();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteUser(dni) {
    await axios.delete(`${url}/${dni}`);
    setUsers(users.filter(user => user.dni !== dataUser.dni));
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
    setDataUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyAddUser = (
    <Box sx={theme}>
      <h3>Agregar nuevo usuario</h3>
      <TextField name="dni" label="DNI del usuario" sx={{width: '100%'}} onChange={handleChange}/>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="lastName" label="Apellido del usuario" sx={{width: '100%'}} onChange={handleChange}/>
        <TextField name="firstName" label="Nombre del usuario" sx={{width: '100%'}} onChange={handleChange}/>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="username" label="Username" sx={{width: '100%'}} onChange={handleChange}/>
        <TextField name="password" label="Contraseña" sx={{width: '100%'}} onChange={handleChange}/>
      </div>
      <TextField name="roleId" label="Id de Rol del usuario" sx={{width: '100%'}} onChange={handleChange}/>
      <div align="right">
        <Button color="primary" onClick={()=>createUser({
          dni: dataUser.dni,
          lastName: dataUser.lastName,
          firstName: dataUser.firstName,
          username: dataUser.username,
          password: dataUser.password,
          roleId: dataUser.roleId,
        })}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateUser = (
    <Box sx={theme}>
      <h3>Editar usuario</h3>
      <TextField name="dni" label="DNI del usuario" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.dni}`}/>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="lastName" label="Apellido del usuario" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.lastName}`}/>
        <TextField name="firstName" label="Nombre del usuario" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.firstName}`}/>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="username" label="Username" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.username}`}/>
        <TextField name="password" label="Contraseña" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.password}`}/>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="sales" label="Cantidad de ventas" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.sales}`}/>
        <TextField name="roleId" label="Id de Rol del usuario" sx={{width: '100%'}} onChange={handleChange} value={`${dataUser.roleId}`}/>
      </div>
      <div align="right">
        <Button color="primary" onClick={()=>updateUser(dataUser.dni, {
          lastName: dataUser.lastName,
          firstName: dataUser.firstName,
          username: dataUser.username,
          password: dataUser.password,
          sales: dataUser.sales,
          roleId: dataUser.roleId,
        })}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteUser = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar el usuario "<b>{dataUser.firstName + ' ' + dataUser.lastName}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteUser(dataUser.dni)}>Eliminar</Button>
        <Button onClick={()=>toggleDeleteModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  function toggleAddModal() {
    setAddModal(!addModal);
    restartDataUser();
  }

  function toggleUpdateModal() {
    setUpdateModal(!updateModal);
  }

  function toggleDeleteModal() {
    setDeleteModal(!deleteModal);
  }

  function restartDataUser() {
    setDataUser({
      dni: '',
      lastName: '',
      firstName: '',
      username: '',
      password: '',
      sales: '',
      roleId: ''
    });
  }

  React.useEffect(() => {
    getUsers();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">USUARIOS</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center"><b>DNI</b></TableCell>
              <TableCell align="center"><b>Apellido</b></TableCell>
              <TableCell align="center"><b>Nombre</b></TableCell>
              <TableCell align="center"><b>Username</b></TableCell>
              <TableCell align="center"><b>Contraseña</b></TableCell>
              <TableCell align="center"><b>Ventas</b></TableCell>
              <TableCell align="center"><b>Rol</b></TableCell>
              <TableCell align="center"><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.dni}>
                  <TableCell align="center">{user.dni}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.password}</TableCell>
                  <TableCell align="center">{user.sales}</TableCell>
                  <TableCell align="center">{user.role.name}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataUser(user); toggleUpdateModal()}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataUser(user); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Usuario' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddUser}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateUser}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteUser}
      </Modal>

    </section>
  );
}

export { UserWindow };