"use client"

import { Typography, Box, Button, Grid, Stack, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, CircularProgress, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useState, useEffect } from 'react';

import MyDrawer from '@/components/drawer';
import MyAppbar from '@/components/appbar';
import Spacer from '@/components/spacer';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_PRODUCT, EDIT_PRODUCT, GET_ALL_PRODUCTS, INSERT_PRODUCT } from './queries';

export default function page() {
  const [openDrawer, setOpenDrawer] = useState(false);
  
  // useQuery executed immediately
  // lazyQuery is the opposite
  const {data: dataInventory, loading: loadingInventory, error: errorInventory, refetch:fetchProducts} = useQuery(GET_ALL_PRODUCTS); 
  // const [fetchProducts, { data: dataInventory, loading: loadingInventory, error: errorInventory }] = useLazyQuery(GET_ALL_PRODUCTS, { fetchPolicy: 'network-only' }); // network only = able to be refetched on fetchProducts. IMPROTANT!
  const [insertProduct, { data: dataInsertInventory, loading: loadingInsertInventory, error: errorInsertInventory }] = useMutation(INSERT_PRODUCT, {
    onCompleted: () => {
      setDialogOpen(false);
      fetchProducts();

      // reset value
      setFormValue({
        name: '',
        stock: "0",
        description: '',
        imageUrl: '',
      })
    }
  });

  const [editProduct, { data: dataEditProduct, loading: loadingEditProduct, error: errorEditProduct }] = useMutation(
    EDIT_PRODUCT, {
      onCompleted: () => {
        setDialogOpen(false);
        setSelectedRow(null);
        fetchProducts();

        // reset value
        setFormValue({
          name: '',
          stock: 0,
          description: '',
          imageUrl: '',
        })
      }
    }
  )

  const [deleteProduct, { data: dataDeleteProduct, loading: loadingDeleteProduct, error: errorDeleteProduct }] = useMutation(
    DELETE_PRODUCT, {
      onCompleted: () => {
        setDialogDeleteOpen(false);
        fetchProducts();
        setSelectedRow(null);

        // reset value
        setFormValue({
          name: '',
          stock: 0,
          description: '',
          imageUrl: '',
        })
      }
    }
  )

  // useEffect(() => {
  //   fetchProducts();
  // }, [])

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [formValue, setFormValue] = useState({
    name: '',
    stock: 0,
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  }

  async function editProductHandle(){
    if(selectedRow == null) {
      console.log("No selected row")
      return;
    }
    editProduct({variables: {id: selectedRow._id, body: formValue}});
  }

  async function deleteProductHandle(){
    if(selectedRow == null) {
      console.log("No selected row")
      return;
    }
    deleteProduct({variables: {id: selectedRow._id}});
  }

  function itemDetail(row) {
    return (
      <Box>
        <Typography variant='subtitle2'>
          Name
        </Typography>
        <Typography variant='body1'>
          {row.name}
        </Typography>

        <Typography variant='subtitle2' mt={2}>
          Stock
        </Typography>
        <Typography variant='body1'>
          {row.stock}
        </Typography>

        <Typography variant='subtitle2' mt={2}>
          Image URL
        </Typography>
        <Typography variant='body1'>
          {row.image == "" ? "-" : row.image}
        </Typography>

        <Typography variant='subtitle2' mt={2}>
          Description
        </Typography>
        <Typography variant='body1'>
          {row.description}
        </Typography>
      </Box>
    )
  }

  function closeDialog(){
    setDialogOpen(false);
    setFormValue({
      name: '',
      stock: 0,
      description: '',
      imageUrl: '',
    })
  }

  function handleEdit() {
    setDialogOpen(true);
    setFormValue({
      name: selectedRow.name,
      stock: String(selectedRow.stock),
      description: selectedRow.description,
      imageUrl: selectedRow.image,
    })
  }

  return (
    <Stack height="100vh">
      <Dialog open={dialogDeleteOpen} onClose={() => setDialogDeleteOpen(false)}>
        <DialogTitle>
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to delete this item? <br/>
          </DialogContentText>
          <Typography variant="subtitle2" fontWeight="bold">Product: {selectedRow?.name}</Typography>
          <DialogActions>
            <Button variant="contained" color="error" onClick={deleteProductHandle}>Yes</Button>
            <Button variant="contained" color="warning" onClick={() => setDialogDeleteOpen(false)}>No</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {formValue.name == "" ? `Add Item` : `Edit Item`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an item to inventory
          </DialogContentText>
          <Divider />
          <Spacer sy={2} />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Product Name</Typography>
              <TextField name="name" variant="standard" placeholder="Product A" type="text" onChange={handleChange} margin="none" size="small" fullWidth={true} value={formValue.name || ''}/>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Initial Stock</Typography>
              <TextField name="stock" variant="standard" placeholder="0" type="number" onChange={handleChange} margin="none" size="small" fullWidth={true} value={formValue.stock || 0}/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Image URL</Typography>
              <TextField name="imageUrl" variant="standard" placeholder="https://image.com" type="text" onChange={handleChange} margin="none" size="small" fullWidth={true} value={formValue.imageUrl || ''}/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Description</Typography>
              <TextField name="description" variant="standard" placeholder="Description of the product..." type="text"  onChange={handleChange} margin="none" size="small" fullWidth={true} multiline rows={4} value={formValue.description || ''}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color={selectedRow == null ? "success" : "warning"} onClick={selectedRow == null ? () => insertProduct({variables: {body: formValue}}) : () => editProductHandle()}>
            {selectedRow == null ?"Insert" : "Edit"}
          </Button>
          <Button onClick={closeDialog} color="info" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <MyAppbar title={"Inventory"} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <MyDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <Grid container spacing={5} sx={{ p: 3 }}>
          <Grid item xs={8}>
            <Typography variant='h5'>
              Inventory CRUD using <b>GraphQL</b>
            </Typography>
            <Box >
              <Stack direction="row" mt={2}>
              <Button variant='contained' color='success' endIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
                Add
              </Button>
              <Spacer sx={2} />
              <Button variant='contained' color='primary' endIcon={<RefreshIcon />} onClick={() => fetchProducts()}>
                Refresh
              </Button>
              </Stack>
              <Spacer sy={2} />
              <Typography variant='subtitle2'>
                Inventory Table
              </Typography>
              <Divider />
              <TableContainer component={Paper}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">No</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="right">Stock</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {dataInventory != null && !loadingInventory ? dataInventory.products.map((row, index) => (
                      <TableRow
                        onClick={() => setSelectedRow(row)}
                        key={row._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', backgroundColor: selectedRow == row ? 'lightgray !important' : '', ':hover': {
                            backgroundColor: '#f5f5f5' // Hover background color
                          }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.stock}</TableCell>
                      </TableRow>
                    )) : dataInventory == null && !loadingInventory ? <TableRow>
                      <TableCell colSpan={3} align="center">
                        No data
                      </TableCell>
                    </TableRow> : <TableRow><TableCell colSpan={4} align='center'><CircularProgress /></TableCell></TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={2}>
              <Stack direction="column">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant='h5'>
                  Item Detail
                </Typography>
                  {selectedRow != null ?<IconButton onClick={() => setSelectedRow(null)}>
                    <CloseIcon />
                  </IconButton> : <></>}
                </Stack>
                
                {selectedRow != null ?
                 <>
                  <Stack direction="row" mb={3} spacing={2}>
                    <Button variant='contained' color="warning" endIcon={<ModeEditIcon/>} size='small' onClick={handleEdit}>Edit</Button>
                    <Button variant='contained' color="error" endIcon={<DeleteIcon/>} size='small' onClick={() => setDialogDeleteOpen(true)}>Delete</Button>
                  </Stack>
                  {itemDetail(selectedRow)}
                 </>
                : <Typography variant='body1'>Select an item to view detail product</Typography>}
              </Stack>

            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
