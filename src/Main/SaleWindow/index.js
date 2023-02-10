import React from "react";
import { AddButton } from '../AddButton';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import axios from "axios";
import "../Main.css";

function SaleWindow(props) {

  const url = 'http://localhost:3001/api/v1/sales';
  const urlItem = 'http://localhost:3001/api/v1/sales/add-item';

  const [sales, setSales] = React.useState([]);

  const [addModal, setAddModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [products, setProducts] = React.useState([
    {
      id: 0,
      productId: '',
      amount: ''
    }
  ]);

  const [dataSale, setDataSale] = React.useState({
    id: '',
    date: '',
    total: '',
    customerDni: '',
  });

  let date;

  async function getSales() {
    try {
      const res = await axios.get(url);
      setSales(res.data);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function getItems(id) {
    try {
      const res = await axios.get(`${url}/${id}`);
      const items = res.data.items;
      const saleItems = items.map((item) => {
        return {
          id: item.SaleProduct.id,
          productId: item.SaleProduct.productId,
          amount: item.SaleProduct.amount
        };
      });
      setProducts(saleItems);
    } catch (error) {
      alert("Error de conexion");
    }
  }

  async function createSale(data) {
    try {
      const sale = await axios.post(url, data);
      const id = sale.data.id;
      products.map((product) => (
        addItem(id, product)
      ))
      getSales();
      toggleAddModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  
  async function addItem(id, data) {
    try {
      await axios.post(urlItem, {
        saleId: id,
        productId: data.productId,
        amount: data.amount
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function updateSale(id, data) {
    try {
      await axios.patch(`${url}/${id}`, data);
      getSales();
      toggleUpdateModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function deleteSale(id) {
    await axios.delete(`${url}/${id}`);
    setSales(sales.filter(sale => sale.id !== dataSale.id));
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
    setDataSale(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeProducts = (e, id) => {
    const {name, value} = e.target;
    setProducts(products.map((product) => {
      if(product.id === id ){
        return {
          ...product, 
          [name]: value
        }
      }
      return product;
    }));
  }

  const addProduct = () => {
    const newProductId = products[products.length - 1].id + 1;
    setProducts([...products, {
      id: newProductId,
      productId: '',
      amount: ''
    }])
  }

  const bodyAddSale = (
    <Box sx={theme}>
      <h3>Agregar nueva venta</h3>
      <TextField required name="customerDni" label="Dni del cliente" sx={{width: '100%'}} onChange={handleChange}/>
      <h3>Lista de productos</h3>
      {products.map((product) => (
        <div style={{display: 'flex', gap: '10px'}} key={product.id}>
          <TextField required name="productId" label="Id del producto" sx={{width: '100%'}} onChange={e => handleChangeProducts(e, product.id)}/>
          <TextField required name="amount" label="Cantidad" sx={{width: '100%'}} onChange={e => handleChangeProducts(e, product.id)}/>
        </div>
      ))}
      <Button onClick={()=>addProduct()}>Agregar otro producto</Button>
      <div align="right">
        <Button color="primary" onClick={()=>{
          date = new Date();
          if (checkEmptyProduct()) {
            alert('Fill in the fields');
          } else {
            createSale({
              date: date,
              total: 0,
              userDni: props.user,
              customerDni: dataSale.customerDni,
            })
          }
        }}>Insertar</Button>
        <Button onClick={()=>toggleAddModal()}>Cancelar</Button>
      </div>
    </Box>
  );
  
  const bodyUpdateSale = (
    <Box sx={theme}>
      <h3>Editar venta</h3>
      <TextField name="date" label="Fecha de la venta" sx={{width: '100%'}} onChange={handleChange} value={`${dataSale.date}`}/>
      <TextField name="customerDni" label="Dni del cliente" sx={{width: '100%'}} onChange={handleChange} value={`${dataSale.customerDni}`}/>
      <h3>Lista de productos</h3>
      {products.map((product) => (
        <div style={{display: 'flex', gap: '10px'}} key={product.id}>
          <TextField disabled name="productId" label="Id del producto" sx={{width: '100%'}} onChange={e => handleChangeProducts(e, product.id)} value={`${product.productId}`}/>
          <TextField disabled name="amount" label="Cantidad" sx={{width: '100%'}} onChange={e => handleChangeProducts(e, product.id)} value={`${product.amount}`}/>
        </div>
      ))}
      <div align="right">
        <Button color="primary" onClick={()=>updateSale(dataSale.id, {
          date: dataSale.date,
          total: dataSale.total,
          customerDni: dataSale.customerDni,
        })}>Editar</Button>
        <Button onClick={()=>toggleUpdateModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  const bodyDeleteSale = (
    <Box sx={theme}>
      <h3>¿Estas seguro que deseas eliminar la venta "<b>{dataSale.id}</b>"?</h3>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteSale(dataSale.id)}>Eliminar</Button>
        <Button onClick={()=>toggleDeleteModal()}>Cancelar</Button>
      </div>
    </Box>
  );

  function toggleAddModal() {
    setAddModal(!addModal);
    restartDataSale();
    restartProducts();
  }

  function toggleUpdateModal() {
    setUpdateModal(!updateModal);
    restartProducts();
  }

  function toggleDeleteModal() {
    setDeleteModal(!deleteModal);
  }

  function restartProducts() {
    setProducts([
      {
        id: 0,
        productId: '',
        amount: ''
      }
    ]);
  }

  function restartDataSale() {
    setDataSale({
      id: '',
      date: '',
      total: '',
      customerDni: '',
    });
  }

  function checkEmptyProduct() {
    return products.some(product => product.productId === '' || product.amount === '');
  }


  React.useEffect(() => {
    getSales();
  }, [])

  return (
    <section className="Window">

      <h1 className="windowTitle">VENTAS</h1>

      <TableContainer className="TableContainer">
        <Table>
          <TableHead>
            <TableRow className="TableRow">
              <TableCell align="center"><b>Id</b></TableCell>
              <TableCell align="center"><b>Fecha</b></TableCell>
              <TableCell align="center"><b>Usuario</b></TableCell>
              <TableCell align="center"><b>Cliente</b></TableCell>
              <TableCell align="center"><b>Total</b></TableCell>
              <TableCell align="center"><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => {
              return (
                <TableRow key={sale.id}>
                  <TableCell align="center">{sale.id}</TableCell>
                  <TableCell align="center">{sale.date}</TableCell>
                  <TableCell align="center">{sale.userDni}</TableCell>
                  <TableCell align="center">{sale.customerDni}</TableCell>
                  <TableCell align="center">{sale.total}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => {setDataSale(sale); toggleUpdateModal(); getItems(sale.id)}} sx={{cursor: 'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => {setDataSale(sale); toggleDeleteModal()}} sx={{cursor: 'pointer'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="ButtonSection">
        <AddButton addText='Agregar Venta' click={() => {toggleAddModal()}}/>
      </div>

      <Modal
        open={addModal}
        onClose={toggleAddModal}
      >
        {bodyAddSale}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdateSale}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDeleteSale}
      </Modal>

    </section>
  );
}

export { SaleWindow };