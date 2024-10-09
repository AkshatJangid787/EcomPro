import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, deleteProduct } from '../redux/slices/productSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ProductDataTable = ({ handleUpdateClick }) => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  // State for Dialog open/close and selected product ID
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  // Open the confirmation dialog when delete is clicked
  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Confirm delete and dispatch deleteProduct action
  const handleConfirmDelete = () => {
    dispatch(deleteProduct(selectedProductId));
    setOpen(false); // Close the dialog
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'productUrl',
      headerName: 'Product Image',
      width: 180,
      renderCell: (params) => (
        <div>
          <img
            src={`http://localhost:5000/${params.row.productUrl}`}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      ),
    },
    { field: 'name', headerName: 'Product Name', width: 180 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'description', headerName: 'Description', width: 290 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdateClick(params.row)}
            className="flex items-center text-blue-500 hover:underline"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
          <button
            onClick={() => handleDeleteClick(params.row._id)} // Open confirmation dialog on delete click
            className="flex items-center text-red-500 hover:underline"
          >
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" variant="body1" align="center">
          {error.message || "Error fetching products."}
        </Typography>
      ) : (
        <DataGrid
          getRowHeight={() => 'auto'}
          rows={products}
          columns={columns}
          checkboxSelection
          pageSizeOptions={[5, 10, 100]}
          sx={{
            border: 0,
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
          }}
        />
      )}

      {/* Confirmation Dialog for Deleting Product */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductDataTable;
