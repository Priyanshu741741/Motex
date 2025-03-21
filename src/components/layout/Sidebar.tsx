import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography,
  Avatar,
  ListItemButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Storage as StorageIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Tables', icon: <StorageIcon />, path: '/tables' },
  { text: 'Functions', icon: <CodeIcon />, path: '/functions' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>R</Avatar>
        <Typography variant="h6" fontWeight="bold">
          Rowy Frontend
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                bgcolor: location.pathname === item.path ? 'rgba(66, 133, 244, 0.08)' : 'transparent',
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                '&:hover': {
                  bgcolor: location.pathname === item.path ? 'rgba(66, 133, 244, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  minWidth: 40
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
        <Box>
          <Typography variant="body2" fontWeight="medium">
            User Name
          </Typography>
          <Typography variant="caption" color="text.secondary">
            user@example.com
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;