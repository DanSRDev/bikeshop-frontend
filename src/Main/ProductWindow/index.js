import React from "react";
import { AddButton } from '../Form/AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Window.css";

function ProductWindow() {

  const url = 'http://localhost:3001/api/v1/products';

  const [products, setProducts] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [dataProduct, setDataProduct] = React.useState({
    id: '',
    name: '',
    description: '',
    stock: '',
    price: '',
    categoryId: '',
    supplierId: ''
  });

  async function getProducts() {
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createProduct(data) {
    try {
      await axios.post(url, data);
      getProducts();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateProduct(id, data) {
    try {
      await axios.patch(`${url}/${id}`, data);
      getProducts();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteProduct(id) {
    await axios.delete(`${url}/${id}`);
    setProducts(products.filter(product => product.id !== dataProduct.id));
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
    setDataProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const bodyAddProduct = (
    <Box sx={theme}>
      <h3>Agregar nuevo producto</h3>
      <TextField name="name" label="Nombre del producto" sx={{width: '100%'}} onChange={handleChange}/>
      <TextField name="description" label="Descripcion del producto" sx={{width: '100%'}} onChange={handleChange}/>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="stock" label="Stock del producto" sx={{width: '100%'}} onChange={handleChange}/>
        <TextField name="price" label="Precio del producto" sx={{width: '100%'}} onChange={handleChange}/>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="categoryId" label="Id de la categoria" sx={{width: '100%'}} onChange={handleChange}/>
        <TextField name="supplierId" label="Id del proveedor" sx={{width: '100%'}} onChange={handleChange}/>
      </div>
      <div align="right">
        <Button color="primary" onClick={()=>createProduct({
          name: dataProduct.name, 
          description: dataProduct.description, 
          stock: dataProduct.stock, 
          price: dataProduct.price,
          categoryId: dataProduct.categoryId,
          supplierId: dataProduct.supplierId
        })}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateProduct = (
    <Box sx={theme}>
      <h3>Editar producto</h3>
      <TextField name="name" label="Nombre del producto" sx={{width: '100%'}} onChange={handleChange} value={`${dataProduct.name}`}/>
      <TextField name="description" label="Descripcion del producto" sx={{width: '100%'}} onChange={handleChange} value={`${dataProduct.description}`}/>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="stock" label="Stock del producto" sx={{width: '100%'}} onChange={handleChange} value={`${dataProduct.stock}`}/>
        <TextField name="price" label="Precio del producto" sx={{width: '100%'}} onChange={handleChange} value={`${dataProduct.price}`}/>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <TextField name="categoryId" label="Id de la categoria" sx={{width: '100%'}} onChange={handleChange} value={`${dataProduct.categoryId}`}/>
        <TextField name="supplierId" label="Id del proveedor" sx={{width: '100%'}} onChange={handleChange} value={`${dataProduct.supplierId}`}/>
      </div>
      <div align="right">
        <Button color="primary" onClick={()=>updateProduct(dataProduct.id, {
            name: dataProduct.name, 
            description: dataProduct.description, 
            stock: dataProduct.stock, 
            price: dataProduct.price,
            categoryId: dataProduct.categoryId,
            supplierId: dataProduct.supplierId
          })}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteProduct = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar el producto "<b>{dataProduct.name}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteProduct(dataProduct.id)}>Eliminar</Button>
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
    getProducts();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">PRODUCTOS</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center"><b>Id</b></TableCell>
              <TableCell align="center"><b>Nombre</b></TableCell>
              <TableCell align="center"><b>Descripcion</b></TableCell>
              <TableCell align="center"><b>Stock</b></TableCell>
              <TableCell align="center"><b>Precio</b></TableCell>
              <TableCell align="center"><b>Categoria</b></TableCell>
              <TableCell align="center"><b>Proveedor</b></TableCell>
              <TableCell align="center"><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.id}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.description}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.category.name}</TableCell>
                  <TableCell align="center">{product.supplier.name}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataProduct(product); toggleUpdateModal()}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataProduct(product); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Producto' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddProduct}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateProduct}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteProduct}
      </Modal>

    </section>
  );
}

export { ProductWindow };