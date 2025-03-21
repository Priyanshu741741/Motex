import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon, 
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Layout from '../components/layout/Layout';

// Mock data for table
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'role', headerName: 'Role', width: 150,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        size="small" 
        color={params.value === 'Admin' ? 'primary' : 'default'}
      />
    )
  },
  { field: 'status', headerName: 'Status', width: 150,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        size="small" 
        color={params.value === 'Active' ? 'success' : 'error'}
      />
    )
  },
  { field: 'lastLogin', headerName: 'Last Login', width: 200 },
];

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-04-15 10:30 AM' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2023-04-14 2:45 PM' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', lastLogin: '2023-03-25 9:15 AM' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-04-15 8:20 AM' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', lastLogin: '2023-04-12 11:30 AM' },
  { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'User', status: 'Active', lastLogin: '2023-04-10 4:15 PM' },
  { id: 7, name: 'Edward Davis', email: 'edward@example.com', role: 'User', status: 'Inactive', lastLogin: '2023-03-18 10:00 AM' },
  { id: 8, name: 'Fiona Clark', email: 'fiona@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-04-14 3:30 PM' },
  { id: 9, name: 'George Martin', email: 'george@example.com', role: 'User', status: 'Active', lastLogin: '2023-04-13 1:45 PM' },
  { id: 10, name: 'Hannah White', email: 'hannah@example.com', role: 'User', status: 'Active', lastLogin: '2023-04-11 9:50 AM' },
];

const TableDetailPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Layout title="Users">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Users Table
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
          >
            Filters
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            Add Row
          </Button>
        </Box>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            px: 2
          }}
        >
          <Tab label="Table" />
          <Tab label="Schema" />
          <Tab label="Webhooks" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>
      
      <Paper sx={{ height: 'calc(100vh - 240px)', width: '100%' }}>
        <Box sx={{ display: 'flex', p: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small">
              <RefreshIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ViewColumnIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton 
            size="small"
            onClick={handleMenuClick}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Import data</MenuItem>
            <MenuItem onClick={handleMenuClose}>Export as CSV</MenuItem>
            <MenuItem onClick={handleMenuClose}>Export as JSON</MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>Duplicate table</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Delete table</MenuItem>
          </Menu>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },
          }}
        />
      </Paper>
    </Layout>
  );
};

export default TableDetailPage;