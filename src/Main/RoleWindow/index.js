import React from "react";
import { AddButton } from '../AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Main.css";

function RoleWindow() {

  const url = 'http://localhost:3001/api/v1/roles';

  const [roles, setRoles] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataRole, setDataRole] = React.useState({
    id: '',
    name: ''
  });
  
  async function getRoles() {
    try {
      const res = await axios.get(url);
      setRoles(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createRole(data) {
    try {
      await axios.post(url, data);
      getRoles();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateRole(id, data) {
    try {
      await axios.patch(`${url}/${id}`, data);
      getRoles();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteRole(id) {
    await axios.delete(`${url}/${id}`);
    setRoles(roles.filter(role => role.id !== dataRole.id));
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
    setDataRole(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyAddRole = (
    <Box sx={theme}>
      <h3>Agregar nuevo rol</h3>
      <TextField name="name" label="Nombre del rol" sx={{width: '100%'}} onChange={handleChange}/>
      <div align="right">
        <Button color="primary" onClick={()=>createRole({
          name: dataRole.name, 
        })}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateRole = (
    <Box sx={theme}>
      <h3>Editar rol</h3>
      <TextField name="name" label="Nombre del rol" sx={{width: '100%'}} onChange={handleChange} value={`${dataRole.name}`}/>
      <div align="right">
        <Button color="primary" onClick={()=>updateRole(dataRole.id, {
            name: dataRole.name,
          })}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteRole = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar el rol "<b>{dataRole.name}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteRole(dataRole.id)}>Eliminar</Button>
        <Button onClick={()=>toggleDeleteModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  function toggleAddModal() {
    setAddModal(!addModal);
    restartDataRole();
  }

  function toggleUpdateModal() {
    setUpdateModal(!updateModal);
  }

  function toggleDeleteModal() {
    setDeleteModal(!deleteModal);
  }

  function restartDataRole() {
    setDataRole({
      id: '',
      name: ''
    });
  }

  React.useEffect(() => {
    getRoles();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">ROLES</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center"><b>Id</b></TableCell>
              <TableCell align="center"><b>Nombre</b></TableCell>
              <TableCell align="center"><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => {
              return (
                <TableRow key={role.id}>
                  <TableCell align="center">{role.id}</TableCell>
                  <TableCell align="center">{role.name}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataRole(role); toggleUpdateModal()}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataRole(role); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Rol' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddRole}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateRole}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteRole}
      </Modal>

    </section>
  );
}

export { RoleWindow };