import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Stack,
  Link,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';

// Define colors
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';

// Define fonts
const HEADING_FONT = '"Oswald", sans-serif';
const BODY_FONT = '"Poppins", sans-serif';

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  backgroundColor: DARKER_BG,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: DARK_BG,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  color: WHITE_TEXT,
  overflowY: 'auto',
}));

const GalleryItem = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  height: 0,
  paddingBottom: '70%', // Aspect ratio
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    '& img': {
      transform: 'scale(1.05)',
    }
  },
}));

const GalleryImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
});

const galleryItems = [
  { 
    id: 1, 
    src: '/gallery 10.jpg', 
    title: 'Freight Fleet', 
    description: 'Our diverse fleet of vehicles ready to transport your goods across Australia.'
  },
  { 
    id: 2, 
    src: '/chauffeur-2.jpg', 
    title: 'Transport Services', 
    description: 'Multiple vehicles positioned for efficient logistics services.'
  },
  { 
    id: 3, 
    src: '/PHOTO-2025-03-22-21-36-54_1.jpg', 
    title: 'Reliable Transportation', 
    description: 'Our freight vehicles ready for deployment in various conditions.'
  },
  { 
    id: 4, 
    src: '/PHOTO-2025-03-22-21-36-58.jpg', 
    title: 'Vehicle Fleet', 
    description: 'Our range of transport solutions parked at our logistics center.'
  },
  { 
    id: 5, 
    src: '/gallery 5.jpeg', 
    title: 'Prime Movers', 
    description: 'Heavy-duty prime movers ready for long-haul transport operations.'
  },
  { 
    id: 6, 
    src: '/gallery 6.jpeg', 
    title: 'Curtain-Sider Truck', 
    description: 'Curtain-sided truck with loaded cargo ready for delivery.'
  },
  { 
    id: 7, 
    src: '/gallery 7.jpeg', 
    title: 'Freight Loading', 
    description: 'Loading process at our warehouse with tarp-covered freight.'
  },
  { 
    id: 8, 
    src: '/gallery 8.jpeg', 
    title: 'High-Capacity Transport', 
    description: 'Long-haul transport solution with high capacity for bulky goods.'
  },
  { 
    id: 9, 
    src: '/gallery 3.jpg', 
    title: 'Mercedes Sprinter Vans', 
    description: 'Mercedes Sprinter vans for smaller, time-sensitive deliveries.'
  },
  { 
    id: 10, 
    src: '/gallery 2.jpg', 
    title: 'Commercial Van Fleet', 
    description: 'Our fleet of commercial vans ready for urban delivery operations.'
  },
  { 
    id: 11, 
    src: '/gallery 1.jpg', 
    title: 'Commercial Van Fleet', 
    description: 'Our fleet of commercial vans ready for urban delivery operations.'
  },
  { 
    id: 12, 
    src: '/gallery 9.jpg', 
    title: 'Reliable Transportation', 
    description: 'Our freight vehicles ready for deployment in various conditions.'
  }
 
];

const GalleryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logisticsMenuAnchor, setLogisticsMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLogisticsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLogisticsMenuAnchor(event.currentTarget);
  };

  const handleLogisticsMenuClose = () => {
    setLogisticsMenuAnchor(null);
  };

  const handleServiceClick = (serviceMode: string) => {
    handleLogisticsMenuClose();
    window.location.href = `/instant-quote?service=${serviceMode}`;
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageWrapper>
      {/* Header - Updated to match landing page */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ py: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1100 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '50%' : '20%' }}>
            <Box 
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none'
              }}
            >
              <Box 
                component="img" 
                src="/MOTEX+Logo.png" 
                alt="MOTEX Logo" 
                sx={{ height: 28 }} 
              />
            </Box>
          </Box>
          
          {/* Desktop menu in the center */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '60%' }}>
              <Stack 
                direction="row" 
                spacing={3} 
                sx={{ 
                  color: 'white', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400,
                  justifyContent: 'center',
                  fontSize: '16px',
                  lineHeight: '29px',
                }}
              >
                <Link 
                  component={RouterLink}
                  to="/" 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Home
                </Link>
                <Link
                  component="button"
                  onClick={() => handleServiceClick('Chauffeur')}
                  color="inherit"
                  underline="none"
                  sx={{
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Chauffeur
                </Link>
                <Box
                  onMouseEnter={(e) => handleLogisticsMenuOpen(e)}
                  sx={{ display: 'inline-block' }}
                >
                  <Link
                    component="button"
                    color="inherit"
                    underline="none"
                    sx={{
                      '&:hover': { color: RED_COLOR },
                      fontFamily: BODY_FONT,
                      fontSize: '16px',
                      lineHeight: '29px',
                      fontWeight: 400,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Logistics Services
                  </Link>
                  <Menu
                    anchorEl={logisticsMenuAnchor}
                    open={Boolean(logisticsMenuAnchor)}
                    onClose={handleLogisticsMenuClose}
                    PaperProps={{
                      onMouseLeave: handleLogisticsMenuClose,
                      sx: {
                        bgcolor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          fontSize: '14px',
                          fontFamily: BODY_FONT,
                          transition: 'color 0.2s ease',
                          '&:hover': {
                            color: RED_COLOR,
                            backgroundColor: 'rgba(222, 31, 39, 0.08)'
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem onClick={() => handleServiceClick('Parcel Delivery')}>Parcel Delivery</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Fragile Freight')}>Fragile Freight</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Door to Door Service')}>Door to Door Service</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Same Day Delivery')}>Same Day Delivery</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Interstate Delivery')}>Interstate Delivery</MenuItem>
                  </Menu>
                </Box>
                <Link 
                  component={RouterLink}
                  to="/services"
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Services
                </Link>
                <Link 
                  component={RouterLink}
                  to="/about-us"
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  About Us
                </Link>
                <Link 
                  component={RouterLink}
                  to="/instant-quote"
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Instant Quote
                </Link>
                <Link 
                  component={RouterLink}
                  to="/gallery"
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    color: RED_COLOR,
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Gallery
                </Link>
                <Link 
                  component={RouterLink}
                  to="/contact-us"
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Contact
                </Link>
              </Stack>
            </Box>
          )}
          
          {/* Get A Quote button on the right */}
          <Box sx={{ display: 'flex', width: isMobile ? '50%' : '20%', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* Mobile Chauffeur and Logistics buttons */}
            {isMobile && (
              <>
                <Button
                  component="button"
                  onClick={() => handleServiceClick('Chauffeur')}
                  sx={{
                    color: 'white',
                    fontSize: '0.8rem',
                    mr: 1,
                    px: 1,
                    py: 0.5,
                    minWidth: 'auto',
                    textTransform: 'none',
                    fontFamily: BODY_FONT,
                    '&:hover': { color: RED_COLOR },
                    whiteSpace: 'nowrap'
                  }}
                >
                  Chauffeur
                </Button>
                <Box sx={{ position: 'relative' }}>
                  <Button
                    component="button"
                    onClick={(e) => handleLogisticsMenuOpen(e)}
                    sx={{
                      color: 'white',
                      fontSize: '0.8rem',
                      mr: 1.5,
                      px: 1,
                      py: 0.5,
                      minWidth: 'auto',
                      textTransform: 'none',
                      fontFamily: BODY_FONT,
                      '&:hover': { color: RED_COLOR },
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Logistics
                  </Button>
                  <Menu
                    anchorEl={logisticsMenuAnchor}
                    open={Boolean(logisticsMenuAnchor)}
                    onClose={handleLogisticsMenuClose}
                    PaperProps={{
                      sx: {
                        bgcolor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        mt: 1
                      }
                    }}
                  >
                    <MenuItem onClick={() => handleServiceClick('Parcel Delivery')} sx={{ color: 'white', '&:hover': { color: RED_COLOR } }}>Parcel Delivery</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Fragile Freight')} sx={{ color: 'white', '&:hover': { color: RED_COLOR } }}>Fragile Freight</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Interstate Delivery')} sx={{ color: 'white', '&:hover': { color: RED_COLOR } }}>Interstate Delivery</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Door to Door Service')} sx={{ color: 'white', '&:hover': { color: RED_COLOR } }}>Door to Door Service</MenuItem>
                    <MenuItem onClick={() => handleServiceClick('Same Day Delivery')} sx={{ color: 'white', '&:hover': { color: RED_COLOR } }}>Same Day Delivery</MenuItem>
                  </Menu>
                </Box>
              </>
            )}
            
            {!isMobile && (
              <Button 
                variant="contained"
                component={RouterLink}
                to="/instant-quote" 
                sx={{ 
                  bgcolor: RED_COLOR, 
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: BODY_FONT,
                  fontWeight: 400,
                  fontSize: '15px',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  minWidth: '130px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: '#c41922',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                Get&nbsp;a&nbsp;Quote
              </Button>
            )}
            
            {/* Mobile menu icon */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Add toolbar spacer to prevent content from being hidden under fixed AppBar */}
      <Box sx={{ height: '64px' }} />
      
      <ContentSection>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                fontFamily: HEADING_FONT,
              }}
            >
              OUR FLEET GALLERY
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.8,
                maxWidth: 650,
                mx: 'auto',
                fontFamily: BODY_FONT,
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                px: { xs: 2, md: 0 }
              }}
            >
              Explore our fleet of vehicles and get a glimpse of our transport operations. Our modern equipment ensures your goods are in safe hands from pickup to delivery.
            </Typography>
          </Box>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
              {galleryItems.map((item) => (
                <Grid item xs={6} sm={6} md={4} key={item.id}>
                  <motion.div variants={itemVariants}>
                    <GalleryItem sx={{ 
                      paddingBottom: { xs: '85%', sm: '75%', md: '70%' },
                      mb: { xs: 1, md: 2 }
                    }}>
                      <GalleryImage src={item.src} alt={item.title} />
                    </GalleryItem>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </ContentSection>
      
      {/* Footer */}
      <Box sx={{ bgcolor: '#000000', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box 
                  component="img" 
                  src="/MOTEX+Logo.png" 
                  alt="MOTEX Logo" 
                  sx={{ 
                    height: 40, 
                  }} 
                />
              </Box>
              <Typography variant="body2" sx={{ 
                color: 'white', 
                opacity: 0.8, 
                mb: 3, 
                fontFamily: BODY_FONT, 
                fontWeight: 300,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
              }}>
                MOTEX Transport is a leading provider of logistics and transportation services across Australia, offering reliable and efficient solutions for businesses of all sizes.
              </Typography>
              
              {/* Social Media Icons */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <IconButton 
                  sx={{ 
                    color: 'white', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: RED_COLOR }
                  }}
                  component="a"
                  href="https://www.instagram.com/motextransport/"
                >
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                mb: 2, 
                fontFamily: HEADING_FONT, 
                fontWeight: 'bold', 
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.25rem' } 
              }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  Home
                </Link>
                <Link component={RouterLink} to="/about-us" color="inherit" underline="hover" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  About Us
                </Link>
                <Link component={RouterLink} to="/services" color="inherit" underline="hover" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  Services
                </Link>
                <Link component={RouterLink} to="/instant-quote" color="inherit" underline="hover" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  Instant Quote
                </Link>
                <Link component={RouterLink} to="/gallery" color="inherit" underline="hover" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  Gallery
                </Link>
                <Link component={RouterLink} to="/contact-us" color="inherit" underline="hover" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  Contact
                </Link>
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                mb: 2, 
                fontFamily: HEADING_FONT, 
                fontWeight: 'bold', 
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.25rem' } 
              }}>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                <Typography variant="body2" sx={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  Rozelle NSW 2039, Australia
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                <Typography variant="body2" sx={{ 
                  color: 'white', 
                  opacity: 0.8, 
                  fontFamily: BODY_FONT, 
                  fontWeight: 300,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' } 
                }}>
                  +61 423 440 056
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                roy@motextransport.com.au
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />
          
          <Typography variant="body2" align="center" sx={{ 
            color: 'white', 
            opacity: 0.7, 
            fontFamily: BODY_FONT, 
            fontWeight: 300,
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } 
          }}>
            © {new Date().getFullYear()} MOTEX Transport. All rights reserved.
          </Typography>
        </Container>
      </Box>
      
      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: DARKER_BG,
            padding: { xs: 2, sm: 3 }
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box component="img" src="/MOTEX+Logo.png" alt="MOTEX Logo" sx={{ width: 120, my: 2 }} />
        
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Home" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleServiceClick('Chauffeur');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Chauffeur" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>

          {/* Logistics Services with nested menu */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={(e) => {
                handleLogisticsMenuOpen(e);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Logistics Services" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>

          {/* Logistics Services Menu */}
          <Menu
            anchorEl={logisticsMenuAnchor}
            open={Boolean(logisticsMenuAnchor)}
            onClose={handleLogisticsMenuClose}
            PaperProps={{
              sx: {
                bgcolor: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                mt: 1,
                '& .MuiMenuItem-root': {
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: BODY_FONT,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: RED_COLOR,
                    backgroundColor: 'rgba(222, 31, 39, 0.08)'
                  }
                }
              }
            }}
          >
            <MenuItem onClick={() => {
              handleServiceClick('Parcel Delivery');
              setIsMobileMenuOpen(false);
            }}>Parcel Delivery</MenuItem>
            <MenuItem onClick={() => {
              handleServiceClick('Fragile Freight');
              setIsMobileMenuOpen(false);
            }}>Fragile Freight</MenuItem>
            <MenuItem onClick={() => {
              handleServiceClick('Door to Door Service');
              setIsMobileMenuOpen(false);
            }}>Door to Door Service</MenuItem>
            <MenuItem onClick={() => {
              handleServiceClick('Same Day Delivery');
              setIsMobileMenuOpen(false);
            }}>Same Day Delivery</MenuItem>
            <MenuItem onClick={() => {
              handleServiceClick('Interstate Delivery');
              setIsMobileMenuOpen(false);
            }}>Interstate Delivery</MenuItem>
          </Menu>

          {/* Rest of the menu items */}
          <ListItem disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to="/services"
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Services" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to="/about-us"
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="About Us" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to="/instant-quote"
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Instant Quote" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to="/gallery"
              sx={{ 
                py: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
              }}
            >
              <ListItemText 
                primary="Gallery" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 600, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to="/contact-us"
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Contact Us" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Box sx={{ p: 2, mt: 2 }}>
          <Button 
            component={RouterLink} 
            to="/instant-quote"
            variant="contained" 
            fullWidth
            sx={{
              backgroundColor: RED_COLOR,
              color: 'white',
              fontFamily: HEADING_FONT,
              fontWeight: 500,
              py: 1,
              borderRadius: 1,
              transition: '0.3s',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: '#c50000',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Get a Quote
          </Button>
        </Box>
      </Drawer>
    </PageWrapper>
  );
};

export default GalleryPage;