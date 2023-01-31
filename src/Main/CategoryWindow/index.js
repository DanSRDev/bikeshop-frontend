import React from "react";
import { AddButton } from '../Form/AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Window.css";

function CategoryWindow() {

  const url = 'http://localhost:3001/api/v1/categories';

  const [categories, setCategories] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataCategory, setDataCategory] = React.useState({
    id: '',
    name: '',
  });

  async function getCategories() {
    try {
      const res = await axios.get(url);
      setCategories(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createCategory(data) {
    try {
      await axios.post(url, data);
      getCategories();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateCategory(id, data) {
    try {
      await axios.patch(`${url}/${id}`, data);
      getCategories();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteCategory(id) {
    await axios.delete(`${url}/${id}`);
    setCategories(categories.filter(product => product.id !== dataCategory.id));
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
    setDataCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyAddCategory = (
    <Box sx={theme}>
      <h3>Agregar nueva categoria</h3>
      <TextField name="name" label="Nombre de la categoria" sx={{width: '100%'}} onChange={handleChange}/>
      <div align="right">
        <Button color="primary" onClick={()=>createCategory({
          name: dataCategory.name, 
        })}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateCategory = (
    <Box sx={theme}>
      <h3>Editar categoria</h3>
      <TextField name="name" label="Nombre de la categoria" sx={{width: '100%'}} onChange={handleChange} value={`${dataCategory.name}`}/>
      <div align="right">
        <Button color="primary" onClick={()=>updateCategory(dataCategory.id, {
            name: dataCategory.name,
          })}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteCategory = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar la categoria "<b>{dataCategory.name}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteCategory(dataCategory.id)}>Eliminar</Button>
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
    getCategories();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">CATEGORIAS</h1>

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
            {categories.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.id}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataCategory(product); toggleUpdateModal()}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataCategory(product); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Categoria' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddCategory}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateCategory}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteCategory}
      </Modal>

    </section>
  );
}

export { CategoryWindow };