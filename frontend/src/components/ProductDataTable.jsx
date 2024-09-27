import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'description', headerName: 'Description', width: 250 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'productUrl', headerName: 'Product URL', width: 150 },
];

export default function ProductDataTable() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products.map(product => ({
          id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          productUrl: product.productUrl,
        }))}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Paper>
  );
}
