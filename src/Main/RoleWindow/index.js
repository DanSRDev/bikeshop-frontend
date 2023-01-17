import React from "react";
import { AddButton } from '../Form/AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "./RoleWindow.css";

function RoleWindow() {
  const [roles, setRoles] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataRole, setDataRole] = React.useState({
    id: null,
    name: ''
  });

  async function getRoles() {
    const res = await axios.get("http://localhost:3001/api/v1/roles");
    setRoles(res.data);
  }

  async function createRole(data) {
    const res = await axios.post("http://localhost:3001/api/v1/roles", data);
    setRoles(roles.concat(res.data));
    toggleAddModal();
  }

  async function updateRol(id, data) {
    await axios.patch(`http://localhost:3001/api/v1/roles/${id}`, data);
    getRoles();
    toggleUpdateModal();
  }

  async function deleteRol(id) {
    await axios.delete(`http://localhost:3001/api/v1/roles/${id}`);
    setRoles(roles.filter(role => role.id !== dataRole.id));
    toggleDeleteModal();
  }
  
  const theme = {
    position: 'absolute',
    backgroundColor: 'white',
    width: 400,
    border: '2px solid black',
    boxShadow: 5,
    padding: '16px 32px 24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
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
      <br />
      <TextField name="name" label="Nombre del rol" sx={{width: '100%'}} onChange={handleChange}/>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>createRole({name: dataRole.name})}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateRole = (
    <Box sx={theme}>
      <h3>Editar rol</h3>
      <br />
      <TextField name="name" label="Nombre del rol" sx={{width: '100%'}} onChange={handleChange} value={`${dataRole.name}`}/>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>updateRol(dataRole.id, {name: dataRole.name})}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteRole = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar el rol?</h3>
      <br />
      <br />
      <div align="right">
        <Button color="secondary" onClick={()=>deleteRol(dataRole.id)}>Eliminar</Button>
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
    getRoles();
  }, [])

  return (
    <section className="RoleWindow">

      <h1 className="windowTitle">ROLES</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Acciones</TableCell>
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

      <div className="ButtonSection" onClick={() => {toggleAddModal()}}>
        <AddButton addText='Agregar Rol'/>
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