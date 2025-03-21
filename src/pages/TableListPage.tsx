import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { 
  Add as AddIcon, 
  MoreVert as MoreVertIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';

// Mock data for tables
const tables = [
  { id: 1, name: 'Users', rows: 1248, lastUpdated: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Products', rows: 567, lastUpdated: '1 day ago', status: 'Active' },
  { id: 3, name: 'Orders', rows: 3429, lastUpdated: '3 hours ago', status: 'Active' },
  { id: 4, name: 'Inventory', rows: 892, lastUpdated: '5 days ago', status: 'Inactive' },
  { id: 5, name: 'Customers', rows: 1543, lastUpdated: '1 hour ago', status: 'Active' },
  { id: 6, name: 'Analytics', rows: 267, lastUpdated: '2 days ago', status: 'Active' },
];

const TableListPage = () => {
  return (
    <Layout title="Tables">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          All Tables
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New Table
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  cursor: 'pointer'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                <IconButton 
                  size="small" 
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: 'primary.light', 
                      color: 'primary.contrastText',
                      display: 'flex',
                      mr: 2
                    }}
                  >
                    <StorageIcon />
                  </Box>
                  <Typography variant="h6" fontWeight="medium">
                    {table.name}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Rows
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {table.rows.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" align="right">
                      Last Updated
                    </Typography>
                    <Typography variant="body1" fontWeight="medium" align="right">
                      {table.lastUpdated}
                    </Typography>
                  </Box>
                </Box>
                
                <Chip 
                  label={table.status} 
                  size="small"
                  color={table.status === 'Active' ? 'success' : 'default'}
                  sx={{ 
                    borderRadius: 1,
                    fontWeight: 'medium'
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default TableListPage;