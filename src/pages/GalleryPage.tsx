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
  Modal,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

// Define colors
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992';

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  backgroundColor: DARKER_BG,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Circular Std Bold", sans-serif',
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  marginLeft: '8px',
  color: 'white'
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
  cursor: 'pointer',
  height: 0,
  paddingBottom: '70%', // Aspect ratio
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    '& .overlay': {
      opacity: 1,
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

const ImageOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(5px)',
  padding: '15px',
  transform: 'translateY(100%)',
  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease',
  opacity: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1000,
  backgroundColor: DARKER_BG,
  borderRadius: '8px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(2),
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
}));

const ModalImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: 'calc(100vh - 200px)',
  objectFit: 'contain',
  marginBottom: '16px',
});

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: WHITE_TEXT,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  '&:hover': {
    backgroundColor: RED_COLOR,
  },
}));

const galleryItems = [
  { 
    id: 1, 
    src: '/gallery 1.jpg', 
    title: 'Freight Fleet', 
    description: 'Our diverse fleet of vehicles ready to transport your goods across Australia.'
  },
  { 
    id: 2, 
    src: '/gallery 2.jpg', 
    title: 'Transport Services', 
    description: 'Multiple vehicles positioned for efficient logistics services.'
  },
  { 
    id: 3, 
    src: '/gallery 3.jpg', 
    title: 'Reliable Transportation', 
    description: 'Our freight vehicles ready for deployment in various conditions.'
  },
  { 
    id: 4, 
    src: '/gallery 4.jpg', 
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
    src: '/gallery 9.jpg', 
    title: 'Mercedes Sprinter Vans', 
    description: 'Mercedes Sprinter vans for smaller, time-sensitive deliveries.'
  },
  { 
    id: 10, 
    src: '/gallery 10.jpg', 
    title: 'Commercial Van Fleet', 
    description: 'Our fleet of commercial vans ready for urban delivery operations.'
  },
];

const GalleryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = (id: number) => {
    setSelectedImage(id);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const nextIndex = (selectedImage % galleryItems.length) + 1;
    setSelectedImage(nextIndex);
  };

  const handlePrev = () => {
    if (selectedImage === null) return;
    const prevIndex = selectedImage === 1 ? galleryItems.length : selectedImage - 1;
    setSelectedImage(prevIndex);
  };

  const selectedItem = selectedImage !== null ? galleryItems.find(item => item.id === selectedImage) : null;

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <PageWrapper>
      {/* Header - Updated to match landing page */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ py: 3, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                sx={{ height: 36 }} 
              />
            </Box>
          </Box>
          
          {/* Desktop menu */}
          {!isMobile && (
            <Stack 
              direction="row" 
              spacing={3} 
              sx={{ 
                mx: 'auto', 
                color: 'white', 
                fontFamily: '"Circular Std Book", sans-serif', 
                fontWeight: 300,
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <Link href="/" color="inherit" underline="none">
                Home
              </Link>
              <Link href="/services" color="inherit" underline="none">
                Services
              </Link>
              <Link href="/about-us" color="inherit" underline="none">
                About Us
              </Link>
              <Link href="/instant-quote" color="inherit" underline="none">
                Instant Quote
              </Link>
              <Link href="/gallery" color="inherit" underline="none" sx={{ color: RED_COLOR }}>
                Gallery
              </Link>
              <Link href="/contact-us" color="inherit" underline="none">
                Contact
              </Link>
            </Stack>
          )}
          
          <Box sx={{ display: 'flex', ml: 'auto' }}>
            {!isMobile && (
              <Button 
                component={RouterLink}
                to="/instant-quote"
                variant="contained" 
                sx={{ 
                  bgcolor: RED_COLOR, 
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: '"Circular Std Book", sans-serif',
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
                onClick={handleMenuOpen}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            
            {/* Mobile menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: 'white',
                  width: '200px',
                  mt: 2,
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              <MenuItem 
                component={RouterLink} 
                to="/" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif'
                }}
              >
                Home
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/services" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif'
                }}
              >
                Services
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/about-us" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif'
                }}
              >
                About Us
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/instant-quote" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif'
                }}
              >
                Instant Quote
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/gallery" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif',
                  color: RED_COLOR
                }}
              >
                Gallery
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="/contact-us" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif'
                }}
              >
                Contact
              </MenuItem>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <MenuItem 
                component={RouterLink} 
                to="/instant-quote" 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Circular Std Book", sans-serif',
                  color: RED_COLOR,
                  fontWeight: 'bold'
                }}
              >
                Get a Quote
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <ContentSection>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 700,
              mb: 2,
              letterSpacing: '2px',
              textAlign: 'center',
              color: RED_COLOR,
              fontFamily: '"Bebas Neue", sans-serif',
            }}
          >
            OUR FLEET GALLERY
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.7,
              mb: 6,
              textAlign: 'center',
              maxWidth: 700,
              mx: 'auto',
              fontFamily: '"Circular Std Book", sans-serif',
            }}
          >
            Explore our diverse fleet of vehicles available for all your transportation and logistics needs. From small vans to large trucks, we have the right vehicle for every job.
          </Typography>
          
          <Box 
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <Grid container spacing={3}>
              {galleryItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <GalleryItem 
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => handleOpen(item.id)}
                  >
                    <GalleryImage src={item.src} alt={item.title} />
                    <ImageOverlay className="overlay">
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: WHITE_TEXT,
                        fontFamily: '"Circular Std Bold", sans-serif',
                      }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: '"Circular Std Book", sans-serif',
                      }}>
                        {item.description}
                      </Typography>
                    </ImageOverlay>
                  </GalleryItem>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {/* Image Modal */}
          <Modal
            open={selectedImage !== null}
            onClose={handleClose}
            aria-labelledby="image-modal"
            aria-describedby="enlarged image view"
          >
            <ModalContent>
              <Box sx={{ position: 'relative' }}>
                <IconButton 
                  onClick={handleClose}
                  sx={{ 
                    position: 'absolute', 
                    right: -10, 
                    top: -10, 
                    backgroundColor: RED_COLOR,
                    color: 'white',
                    zIndex: 10,
                    '&:hover': {
                      backgroundColor: PINK_RED,
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
                
                {selectedItem && (
                  <>
                    <NavButton 
                      onClick={handlePrev}
                      sx={{ left: 10 }}
                    >
                      <ChevronLeftIcon />
                    </NavButton>
                    
                    <NavButton 
                      onClick={handleNext}
                      sx={{ right: 10 }}
                    >
                      <ChevronRightIcon />
                    </NavButton>
                    
                    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <ModalImage 
                        src={selectedItem.src} 
                        alt={selectedItem.title} 
                      />
                      <Typography variant="h5" sx={{ 
                        color: WHITE_TEXT,
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: '"Circular Std Bold", sans-serif',
                      }}>
                        {selectedItem.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontFamily: '"Circular Std Book", sans-serif',
                      }}>
                        {selectedItem.description}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </ModalContent>
          </Modal>
        </Container>
      </ContentSection>
       
      {/* Footer - Updated to match landing page */}
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
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, mb: 3, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
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
                  href="#instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'white', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: RED_COLOR }
                  }}
                  component="a"
                  href="#linkedin"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'white', 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: RED_COLOR }
                  }}
                  component="a"
                  href="#whatsapp"
                >
                  <WhatsAppIcon />
                </IconButton>
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: '"Circular Std Bold", sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link href="/" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  Home
                </Link>
                <Link href="/about-us" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  About Us
                </Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  Services
                </Link>
                <Link href="/instant-quote" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  Instant Quote
                </Link>
                <Link href="/gallery" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  Gallery
                </Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  Contact
                </Link>
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: '"Circular Std Bold", sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  123 Transport Way, Sydney, NSW 2000, Australia
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  +61 2 1234 5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  info@motextransport.com.au
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />
          
          <Typography variant="body2" align="center" sx={{ color: 'white', opacity: 0.7, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
            © {new Date().getFullYear()} MOTEX Transport. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </PageWrapper>
  );
};

export default GalleryPage;