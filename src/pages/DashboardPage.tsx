import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress
} from '@mui/material';
import { 
  PeopleAlt as PeopleIcon, 
  Storage as StorageIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';

const DashboardPage = () => {
  return (
    <Layout title="Dashboard">
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                p: 1, 
                borderRadius: 1, 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText',
                mr: 1
              }}>
                <StorageIcon />
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                Tables
              </Typography>
            </Box>
            <Typography variant="h3" component="div" fontWeight="bold">
              12
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              <TrendingUpIcon fontSize="small" sx={{ verticalAlign: 'middle', color: 'success.main' }} />
              <span> 3 new this week</span>
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                p: 1, 
                borderRadius: 1, 
                bgcolor: 'secondary.light', 
                color: 'secondary.contrastText',
                mr: 1
              }}>
                <PeopleIcon />
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                Users
              </Typography>
            </Box>
            <Typography variant="h3" component="div" fontWeight="bold">
              853
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              <TrendingUpIcon fontSize="small" sx={{ verticalAlign: 'middle', color: 'success.main' }} />
              <span> 12% increase</span>
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                p: 1, 
                borderRadius: 1, 
                bgcolor: 'error.light', 
                color: 'error.contrastText',
                mr: 1
              }}>
                <CodeIcon />
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                Functions
              </Typography>
            </Box>
            <Typography variant="h3" component="div" fontWeight="bold">
              24
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              <span>Last updated 2 days ago</span>
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                p: 1, 
                borderRadius: 1, 
                bgcolor: 'warning.light', 
                color: 'warning.contrastText',
                mr: 1
              }}>
                <TrendingUpIcon />
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                API Calls
              </Typography>
            </Box>
            <Typography variant="h3" component="div" fontWeight="bold">
              15.2k
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
              <span>This month</span>
            </Typography>
          </Paper>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Recent Activity
              </Typography>
              <Divider sx={{ my: 1 }} />
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="User table updated" 
                    secondary="Jane Smith modified the schema" 
                  />
                  <Typography variant="caption" color="text.secondary">
                    2 hours ago
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>P</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Products table created" 
                    secondary="John Doe created a new table" 
                  />
                  <Typography variant="caption" color="text.secondary">
                    Yesterday
                  </Typography>
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'error.main' }}>F</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Function deployed" 
                    secondary="New API endpoint created" 
                  />
                  <Typography variant="caption" color="text.secondary">
                    3 days ago
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Storage Usage */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Storage Usage
              </Typography>
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Users Table</Typography>
                  <Typography variant="body2" fontWeight="medium">2.4 GB</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={70} 
                  color="primary" 
                  sx={{ height: 8, borderRadius: 1, mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Products Table</Typography>
                  <Typography variant="body2" fontWeight="medium">1.2 GB</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={35} 
                  color="secondary" 
                  sx={{ height: 8, borderRadius: 1, mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Orders Table</Typography>
                  <Typography variant="body2" fontWeight="medium">3.8 GB</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={90} 
                  color="error" 
                  sx={{ height: 8, borderRadius: 1, mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Analytics Data</Typography>
                  <Typography variant="body2" fontWeight="medium">0.8 GB</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={20} 
                  color="warning" 
                  sx={{ height: 8, borderRadius: 1 }}
                />
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight="medium">Total Storage</Typography>
                  <Typography variant="subtitle1" fontWeight="medium">8.2 GB / 15 GB</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={55} 
                  sx={{ height: 10, borderRadius: 1, mt: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Tables */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Recent Tables
              </Typography>
              <Divider sx={{ my: 1 }} />
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 2,
                          cursor: 'pointer'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <StorageIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="medium">
                          {['Users', 'Products', 'Orders', 'Analytics'][item - 1]} Table
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {[1248, 567, 3429, 267][item - 1]} rows
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last updated: {['2 hours ago', '1 day ago', '3 hours ago', '2 days ago'][item - 1]}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DashboardPage;