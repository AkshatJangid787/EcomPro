import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, deleteProduct } from '../redux/slices/productSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const ProductDataTable = ({ handleUpdateClick }) => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'productUrl',
      headerName: 'Product Image',
      width: 230,
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
    { field: 'name', headerName: 'Product Name', width: 230 },
    { field: 'category', headerName: 'Category', width: 230 },
    { field: 'description', headerName: 'Description', width: 290 },
    { field: 'price', headerName: 'Price', width: 150 },
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
            onClick={() => handleDeleteClick(params.row._id)}
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
    </Paper>
  );
};

export default ProductDataTable;
