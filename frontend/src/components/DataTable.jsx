import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/userSlice';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
];

export default function DataTable() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users.map((user, index) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }))}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Paper>
  );
}
