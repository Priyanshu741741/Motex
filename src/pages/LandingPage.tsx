import React, { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';
import { keyframes } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar,
  Stack,
  Link,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  LocalShipping as TruckIcon, 
  LocalShipping as LocalShippingIcon,
  Flight as PlaneIcon,
  DirectionsBoat as ShipIcon,
  Train as TrainIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
  Inventory as InventoryIcon,
  Apartment as ApartmentIcon,
  EventAvailable as EventAvailableIcon
} from '@mui/icons-material';

import emailjs from '@emailjs/browser';

import { motion } from 'framer-motion';

// Define color constants at the top of the file
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992'; 
const WHITE_TEXT = '#FFFFFF';

const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Circular Std Bold", sans-serif',
  fontSize: '22px',
  fontWeight: 300,
  letterSpacing: '-0.01em',
  marginLeft: '8px',
  color: 'white'
}));

const GradientSpan = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg,#DE1F27 0%,#DE1F27 50%,#DE1F27 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 1000,
  fontFamily: '"Bebas Neue", sans-serif',
}));

const GradientButton = styled(Button)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  background: 'linear-gradient(90deg, #FF6B6B 0%, #DE1F27 50%, #FF2992 100%)',
  color: 'white',
  padding: '10px 24px',
  borderRadius: '50px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '16px',
  fontFamily: '"Circular Std Book", sans-serif',
  '&:hover': {
    opacity: 0.9,
    transform: 'translateY(-2px)',
    transition: 'transform 0.3s ease'
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px'
  }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  borderRadius: '8px',
  padding: '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '16px',
  fontFamily: '"Circular Std Book", sans-serif',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.8)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #FF9D6C, #DE1F27, #7539FF, #2ECFF6, #17E6C1)',
    zIndex: -1,
    borderRadius: '18px',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    '&::before': {
      opacity: 0,
    },
    '& .service-title': {
      color: RED_COLOR,
    }
  }
}));

const GlowingContainer = styled(Box)(({ theme }) => ({
  background: '#0A0A0A',
  borderRadius: '20px',
  padding: theme.spacing(5),
  position: 'relative',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #DE1F27, #FF4500, #FF2992)',
    zIndex: -1,
    borderRadius: '22px',
    opacity: 0.8,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '1px',
    left: '1px',
    right: '1px',
    bottom: '1px',
    background: '#000000',
    borderRadius: '19px',
    zIndex: -1,
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  background: '#000000',
  padding: theme.spacing(4, 0),
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  }
}));

const LogoSlider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  animation: 'slideLogos 20s linear infinite',
  '& img': {
    height: '60px',
    margin: theme.spacing(0, 6),
    opacity: 0.8,
    transition: 'opacity 0.3s, transform 0.3s',
    filter: 'grayscale(1) brightness(1.5)',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.05)',
      filter: 'grayscale(0) brightness(1)',
    }
  }
}));


// Add this new styled component for the testimonials section
const TestimonialSection = styled(Box)(({ theme }) => ({
  background: '#000000',
  padding: theme.spacing(8, 0),
  color: 'white',
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

// Add styled component for the service icon box
const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: 'rgba(222, 31, 39, 0.1)',
  marginBottom: theme.spacing(2),
}));

// Add this new styled component for the decorative line
const DecorativeLine = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '2px',
  width: '100%',
  background: '#000000',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  }
}));

// Add keyframes definitions at the top level
const moveLeftAnimation = keyframes`
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-100px) translateY(50px); }
`;

const moveRightAnimation = keyframes`
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(100px) translateY(-50px); }
`;

const pulseAnimation = keyframes`
  0% { opacity: 0.05; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.2); }
  100% { opacity: 0.05; transform: translate(-50%, -50%) scale(1); }
`;

const buttonShineAnimation = keyframes`
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  20%, 100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
`;

// Add a new keyframe animation for the shine effect
const shineAnimation = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

// Add a new ripple keyframe animation
const rippleAnimation = keyframes`
  0% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(0.8); opacity: 0.3; }
`;

const LandingPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };
  const [trackingNumber, setTrackingNumber] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
    <GradientBackground className="gradient-bg">
      {/* Add GlobalStyles for animations */}
      <GlobalStyles
        styles={{
          '@keyframes slideLogos': {
            '0%': {
              transform: 'translateX(0)',
            },
            '100%': {
              transform: 'translateX(-50%)',
            },
          },
          '@keyframes moveLeft': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-150px)' },
          },
          '@keyframes moveRight': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(150px)' },
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
            '50%': { opacity: 0.25, transform: 'translate(-50%, -50%) scale(1.3)' },
            '100%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
          },
          '@keyframes buttonShine': {
            '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
            '20%, 100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
          },
          '@keyframes shine': {
            '0%': { left: '-100%' },
            '20%, 100%': { left: '100%' }
          },
          '@keyframes ripple': {
            '0%': { transform: 'scale(0.8)', opacity: 0.3 },
            '50%': { transform: 'scale(1)', opacity: 0.5 },
            '100%': { transform: 'scale(0.8)', opacity: 0.3 },
          },
        }}
      />
      <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1.5, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img" 
              src="/MOTEX+Logo.png" 
              alt="MOTEX Logo" 
              sx={{ height: 32 }} 
            />
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
              <Link href="/" color="inherit" underline="none" sx={{ color: RED_COLOR }}>
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
              <Link href="/gallery" color="inherit" underline="none">
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
                  px: 4,
                  py: 1.5,
                  minWidth: '130px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
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
                  fontFamily: '"Circular Std Book", sans-serif',
                  color: RED_COLOR 
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
                  fontFamily: '"Circular Std Book", sans-serif'
                }}
              >
                Gallery
              </MenuItem>
              <MenuItem 
                component={RouterLink} 
                to="#" 
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
      
      <Box 
        sx={{ 
          py: { xs: 20, md: 10 },
          position: 'relative',
          minHeight: { xs: '50vh', md: '60vh' },
          backgroundImage: 'url("/MotexFeb3.jpg")',
          backgroundSize: { xs: 'cover', md: '100% 100%' }, // Cover for mobile, stretch for desktop
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000000',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '20vh'
          }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '40px', md: '80px' }, 
              textAlign: 'center',
              color: 'white',
              fontWeight: 400,
              lineHeight: 1.2,
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '2px'
            }}>
              <GradientSpan>ABOVE AND BEYOND WITH MOTEX TRANSPORT</GradientSpan>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box id="services-section" sx={{ py: 8 }}>
        <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" align="center" sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
            color: 'white',
            fontFamily: '"Circular Std Bold", sans-serif',
          }}>
            Our Services
          </Typography>
        </motion.div>
          <Typography variant="body1" align="center" sx={{ 
            maxWidth: 700,
            mx: 'auto',
            mb: 6,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: '"Circular Std Book", sans-serif',
            fontSize: '1.1rem',
          }}>
            From local deliveries to interstate transport, our comprehensive range of services is designed to meet all your logistics needs with efficiency and reliability.
          </Typography>
          
          <Grid container spacing={4}>
            {/* Distribution Services */}
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard>
                <CardMedia
                  component="img"
                  height="200"
                  image="/gallery 1.jpg"
                  alt="Distribution Services"
                  sx={{ opacity: 0.8 }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconBox>
                      <LocalShippingIcon sx={{ fontSize: 32, color: RED_COLOR }} />
                    </IconBox>
                    <Typography 
                      variant="h5" 
                      className="service-title"
                      sx={{ 
                        ml: 2,
                        fontWeight: 600,
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: RED_COLOR,
                        }
                      }}
                    >
                      Distribution Services
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Circular Std Book", sans-serif',
                      lineHeight: 1.6
                    }}
                  >
                    Comprehensive distribution solutions for businesses of all sizes. We handle everything from warehousing to last-mile delivery with precision and care.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
            
            {/* Same-Day Delivery */}
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard>
                <CardMedia
                  component="img"
                  height="200"
                  image="/gallery 2.jpg"
                  alt="Same-Day Delivery"
                  sx={{ opacity: 0.8 }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconBox>
                      <SpeedIcon sx={{ fontSize: 32, color: RED_COLOR }} />
                    </IconBox>
                    <Typography 
                      variant="h5" 
                      className="service-title"
                      sx={{ 
                        ml: 2,
                        fontWeight: 600,
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: RED_COLOR,
                        }
                      }}
                    >
                      Same-Day Delivery
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Circular Std Book", sans-serif',
                      lineHeight: 1.6
                    }}
                  >
                    Urgent deliveries handled with speed and reliability. Our same-day service ensures your time-sensitive packages reach their destination promptly.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
            
            {/* Interstate Transport */}
            <Grid item xs={12} sm={6} md={4}>
              <ServiceCard>
                <CardMedia
                  component="img"
                  height="200"
                  image="/gallery 3.jpg"
                  alt="Interstate Transport"
                  sx={{ opacity: 0.8 }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconBox>
                      <PublicIcon sx={{ fontSize: 32, color: RED_COLOR }} />
                    </IconBox>
                    <Typography 
                      variant="h5" 
                      className="service-title"
                      sx={{ 
                        ml: 2,
                        fontWeight: 600,
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: RED_COLOR,
                        }
                      }}
                    >
                      Interstate Transport
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Circular Std Book", sans-serif',
                      lineHeight: 1.6
                    }}
                  >
                    Seamless interstate logistics solutions connecting businesses across Australia. Our fleet ensures safe and timely delivery across state lines.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              component={RouterLink}
              to="/services"
              variant="outlined" 
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                textTransform: 'none',
                fontFamily: '"Circular Std Book", sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                borderRadius: '50px',
                px: 3,
                py: 1,
                '&:hover': {
                  borderColor: RED_COLOR,
                  bgcolor: 'rgba(222, 31, 39, 0.1)'
                }
              }}
            >
              View All Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Decorative Line */}
      <DecorativeLine />

      <LogoContainer>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ 
            color: 'white',
            mb: 4, 
            letterSpacing: 1, 
            fontWeight: 800,
            fontFamily: '"Circular Std Bold", sans-serif'
          }}>
            Trusted By
          </Typography>
          
          
          <Box className="logo-slide-container">
            <Box className="logo-slide">
              {[
                { src: "/Sydney+Visitor+Centre_Small.png", alt: "Sydney Visitor Centre", id: "svc-1" },
                { src: "/motex-transport-hunter-valley-wedding-planner.png", alt: "Hunter Valley Wedding Planner", id: "hvwp-1" },
                { src: "/motex-transport-cwci-logo.png", alt: "CWCI", id: "cwci-1" },
                { src: "/Sydney+Visitor+Centre_Small.png", alt: "Sydney Visitor Centre", id: "svc-2" },
                { src: "/motex-transport-hunter-valley-wedding-planner.png", alt: "Hunter Valley Wedding Planner", id: "hvwp-2" },
                { src: "/motex-transport-cwci-logo.png", alt: "CWCI", id: "cwci-2" }
              ].map((logo) => (
                <Box 
                  key={logo.id}
                  component="img" 
                  src={logo.src} 
                  alt={logo.alt}
                  sx={{
                    height: '60px',
                    mx: 6,
                    opacity: 1,
                    transition: 'transform 0.3s',
                    filter: 'brightness(1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </LogoContainer>

      {/* Decorative Line */}
      <DecorativeLine />

      {/* Why Choose Us Section */}
      <Box sx={{ py: 10, backgroundColor: '#000000' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
            color: 'white',
            fontFamily: '"Circular Std Bold", sans-serif',
          }}>
            What We Offer
          </Typography>
          
          <Typography variant="body1" align="center" sx={{ 
            maxWidth: 700,
            mx: 'auto',
            mb: 6,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: '"Circular Std Book", sans-serif',
            fontSize: '1.1rem',
          }}>
            MOTEX Transport provides comprehensive logistics solutions designed to meet your specific business needs with reliability and efficiency.
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {/* Dedicated Drivers */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ 
                    mb: 2,
                    fontFamily: '"Circular Std Bold", sans-serif',
                    fontWeight: 700,
                    color: 'white',
                  }}>
                    Dedicated Drivers
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    mb: 3,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: '"Circular Std Book", sans-serif',
                    minHeight: '60px'
                  }}>
                    Professional drivers who meet your service standards.
                  </Typography>
                  
                  <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Customer service focused
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Strong communication skills
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Professional presentation
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Timely deliveries guaranteed
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Skilled Equipment Operators */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ 
                    mb: 2,
                    fontFamily: '"Circular Std Bold", sans-serif',
                    fontWeight: 700,
                    color: 'white',
                  }}>
                    Skilled Operators
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    mb: 3,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: '"Circular Std Book", sans-serif',
                    minHeight: '60px'
                  }}>
                    Equipped with forklift licenses and proper tools.
                  </Typography>
                  
                  <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Certified forklift operators
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Proper equipment for all jobs
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Versatile cargo handling
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Self-sufficient delivery process
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Modern Fleet */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ 
                    mb: 2,
                    fontFamily: '"Circular Std Bold", sans-serif',
                    fontWeight: 700,
                    color: 'white',
                  }}>
                    Modern Fleet
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    mb: 3,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: '"Circular Std Book", sans-serif',
                    minHeight: '60px'
                  }}>
                    Current model trucks and Mercedes Benz vehicles.
                  </Typography>
                  
                  <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Latest model trucks
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Mercedes Benz Sprinters
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Mercedes Benz Vito vans
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DE1F27', 
                          mr: 1.5,
                          flexShrink: 0
                        }} 
                      />
                      <Typography variant="body2" sx={{ 
                        color: 'white',
                        fontFamily: '"Circular Std Book", sans-serif',
                        fontSize: '1rem'
                      }}>
                        Regularly maintained for reliability
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Decorative Line */}
      <DecorativeLine />

      <Box 
        sx={{ 
          py: { xs: 10, md: 12 },
          position: 'relative',
          backgroundColor: '#000000',
          width: '100%',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
            zIndex: 1
          }
        }}
      >
        {/* Add ripple effect containers */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '25%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(222, 31, 39, 0.2)',
          animation: 'ripple 4s infinite linear',
          boxShadow: '0 0 30px rgba(222, 31, 39, 0.3)',
          zIndex: 1
        }} />
        
        <Box sx={{
          position: 'absolute',
          top: '70%',
          right: '20%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 41, 146, 0.2)', 
          animation: 'ripple 6s infinite linear',
          boxShadow: '0 0 25px rgba(255, 41, 146, 0.3)',
          zIndex: 1
        }} />
        
        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '30%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          border: '1px solid rgba(222, 31, 39, 0.2)',
          animation: 'ripple 5s infinite linear',
          boxShadow: '0 0 20px rgba(222, 31, 39, 0.3)',
          zIndex: 1
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                pr: { md: 6 },
                p: 5,
                borderRadius: '15px',
                background: 'rgba(0, 0, 0, 0.5)',
                boxShadow: '0 0 40px rgba(222, 31, 39, 0.2), 0 0 80px rgba(255, 41, 146, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'box-shadow 0.5s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 50px rgba(222, 31, 39, 0.3), 0 0 100px rgba(255, 41, 146, 0.15)',
                }
              }}>
                <Typography variant="h2" sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                  fontFamily: '"Circular Std Bold", sans-serif',
                  lineHeight: 1.2
                }}>
                  Get your transport quote in seconds
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  fontFamily: '"Circular Std Book", sans-serif',
                }}>
                  MOTEX Transport offers instant quotes for all your logistics needs. 
                  Get accurate pricing and book your shipment online without delay.
                </Typography>
                
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
                    px: 4,
                    py: 1.5,
                    minWidth: '130px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      bgcolor: '#c41922',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                >
                  Get&nbsp;a&nbsp;Quote
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: { xs: '300px', md: '500px' },
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(222, 31, 39, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.2)',
                    zIndex: 1
                  }
                }}
              >
                <Box 
                  component="img"
                  src="/MotexFeb6.jpg"
                  alt="Get Instant Quote"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  zIndex: 1
                }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Decorative Line */}
      <DecorativeLine />

      {/* Testimonials Section */}
      <TestimonialSection>
        <Container maxWidth="lg">
          
          <Typography variant="h2" align="center" sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 6,
            color: 'white',
            fontFamily: '"Circular Std Bold", sans-serif',
          }}>
            What Our Clients Say About Us
          </Typography>
          
          <Grid container spacing={8}>
            {/* Hunter Valley Wedding Planner Testimonial */}
            <Grid item xs={12} md={6}>
              <TestimonialCard>
                <Box
                  component="img"
                  src="/motex-transport-hunter-valley-wedding-planner.png"
                  alt="Hunter Valley Wedding Planner"
                  sx={{
                    height: '80px',
                    mb: 4,
                    display: 'block',
                    filter: 'brightness(1.2)',
                  }}
                />
                
                <Typography variant="body1" sx={{ 
                  mb: 3, 
                  lineHeight: 1.8,
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  "The service we received from Motex Transport was extremely professional, honest and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Sunday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETAs and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service."
                </Typography>
                
                <Typography variant="subtitle1" sx={{ 
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  - Natalie Tennant, <Box component="span" sx={{ color: '#c6b47a' }}>Hunter Valley Wedding Planner</Box>
                </Typography>
              </TestimonialCard>
            </Grid>
            
            {/* CWCI Australia Testimonial */}
            <Grid item xs={12} md={6}>
              <TestimonialCard>
                <Box
                  component="img"
                  src="/motex-transport-cwci-logo.png"
                  alt="CWCI Australia"
                  sx={{
                    height: '80px',
                    mb: 4,
                    display: 'block',
                    filter: 'brightness(1.2)',
                  }}
                />
                
                <Typography variant="body1" sx={{ 
                  mb: 3, 
                  lineHeight: 1.8,
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed."
                </Typography>
                
                <Typography variant="subtitle1" sx={{ 
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  - Christine Mill, <Box component="span" sx={{ color: '#9b3dba' }}>CWCI Australia</Box>
                </Typography>
              </TestimonialCard>
            </Grid>
            
            {/* Sydney Visitor Centre Testimonial */}
            <Grid item xs={12}>
              <TestimonialCard sx={{ textAlign: 'center' }}>
                <Box
                  component="img"
                  src="/Sydney+Visitor+Centre_Small.png"
                  alt="Sydney Visitor Centre"
                  sx={{
                    height: '60px',
                    mb: 4,
                    display: 'block',
                    mx: 'auto',
                    filter: 'brightness(1.2)',
                  }}
                />
                
                <Typography variant="body1" sx={{ 
                  mb: 3, 
                  lineHeight: 1.8,
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '800px',
                  mx: 'auto'
                }}>
                  "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services."
                </Typography>
                
                <Typography variant="subtitle1" sx={{ 
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  - Adam, <Box component="span" sx={{ color: '#0066b3' }}>Sydney Visitor Centre</Box>
                </Typography>
              </TestimonialCard>
            </Grid>
          </Grid>
        </Container>
      </TestimonialSection>

      {/* Decorative Line */}
      <DecorativeLine />

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
                    '&:hover': { backgroundColor: '#DE1F27' }
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
                    '&:hover': { backgroundColor: '#DE1F27' }
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
                    '&:hover': { backgroundColor: '#DE1F27' }
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
                <LocationIcon sx={{ color: '#DE1F27', mr: 1.5 }} />
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  123 Transport Way, Sydney, NSW 2000, Australia
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ color: '#DE1F27', mr: 1.5 }} />
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
                  +61 2 1234 5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ color: '#DE1F27', mr: 1.5 }} />
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
    </GradientBackground>
    </>
  );
};

export default LandingPage;