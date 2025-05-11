import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  IconButton, 
  Box,
  Button,
  Badge
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Notifications as NotificationsIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'background.paper',
        height: '60px',
        '& .MuiToolbar-root': {
          height: '100%',
          padding: '0 24px',
          minHeight: '60px'
        }
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            flexGrow: 0, 
            display: { xs: 'none', sm: 'block' }, 
            fontWeight: 400, 
            mr: 4,
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '1.25rem'
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ 
          position: 'relative',
          borderRadius: 1,
          backgroundColor: (theme) => alpha(theme.palette.common.black, 0.04),
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.06),
          },
          mr: 2,
          width: '300px',
        }}>
          <Box sx={{ 
            padding: '0 16px', 
            height: '100%', 
            position: 'absolute', 
            pointerEvents: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search…"
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: '8px 8px 8px 48px',
              },
            }}
          />
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button 
          variant="text" 
          sx={{ 
            mr: 2,
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Chauffeur Services
        </Button>

        <Button 
          variant="text" 
          sx={{ 
            mr: 2,
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Logistics Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;