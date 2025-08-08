import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [filterText, setFilterText] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch posts from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // Filter posts by title
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  // Logout function
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <TextField
        label="Filter by title"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
};

export default Dashboard;
