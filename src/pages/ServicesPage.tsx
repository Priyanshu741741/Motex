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
  Divider,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  LocalShipping as LocalShippingIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
  Inventory as InventoryIcon,
  Apartment as ApartmentIcon,
  EventAvailable as EventAvailableIcon
} from '@mui/icons-material';

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
  minHeight: '20vh',
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

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/MotexFeb6.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(12, 0),
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60vh',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
    height: '50vh',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(to bottom, #DE1F27, #FF2992)',
  },
}));

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

const ServicesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Service data
  const services = [
    {
      id: 1,
      title: 'Distribution Services',
      description: 'Comprehensive distribution solutions for businesses of all sizes. We handle everything from warehousing to last-mile delivery with precision and care.',
      icon: <LocalShippingIcon sx={{ fontSize: 32, color: RED_COLOR }} />,
      image: '/gallery 1.jpg'
    },
    {
      id: 2,
      title: 'Same-Day Delivery',
      description: 'Urgent deliveries handled with speed and reliability. Our same-day service ensures your time-sensitive packages reach their destination promptly.',
      icon: <SpeedIcon sx={{ fontSize: 32, color: RED_COLOR }} />,
      image: '/gallery 2.jpg'
    },
    {
      id: 3,
      title: 'Interstate Transport',
      description: 'Seamless interstate logistics solutions connecting businesses across Australia. Our fleet ensures safe and timely delivery across state lines.',
      icon: <PublicIcon sx={{ fontSize: 32, color: RED_COLOR }} />,
      image: '/gallery 3.jpg'
    },
    {
      id: 4,
      title: 'Warehousing',
      description: 'Secure storage solutions with efficient inventory management. Our warehousing services provide the space and systems you need to optimize your supply chain.',
      icon: <InventoryIcon sx={{ fontSize: 32, color: RED_COLOR }} />,
      image: '/gallery 4.jpg'
    },
    {
      id: 5,
      title: 'Commercial Moving',
      description: 'Professional office and commercial relocation services. We handle every aspect of your business move with minimal disruption to your operations.',
      icon: <ApartmentIcon sx={{ fontSize: 32, color: RED_COLOR }} />,
      image: '/gallery 5.jpeg'
    },
    {
      id: 6,
      title: 'Event Logistics',
      description: 'Comprehensive logistics support for events of all sizes. From equipment transport to venue setup, we ensure your event runs smoothly from start to finish.',
      icon: <EventAvailableIcon sx={{ fontSize: 32, color: RED_COLOR }} />,
      image: '/gallery 6.jpeg'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "MOTEX Transport has been instrumental in streamlining our distribution process. Their reliability and professionalism are unmatched in the industry.",
      author: "Sarah Johnson",
      company: "Retail Solutions Inc."
    },
    {
      id: 2,
      quote: "We've been using MOTEX's same-day delivery service for our urgent medical supplies, and they've never let us down. Truly a partner we can count on.",
      author: "Dr. Michael Chen",
      company: "MedSupply Australia"
    },
    {
      id: 3,
      quote: "The team at MOTEX handled our office relocation with incredible efficiency. Not a single item was damaged, and they kept to the schedule perfectly.",
      author: "Tom Williams",
      company: "Williams & Partners Law Firm"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
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
              <Link href="/services" color="inherit" underline="none" sx={{ color: RED_COLOR }}>
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
                  fontFamily: '"Circular Std Book", sans-serif',
                  color: RED_COLOR
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
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <Typography 
                variant="h1" 
                align="center" 
                sx={{ 
                  fontSize: { xs: '3.5rem', md: '5.5rem' },
                  fontWeight: 700,
                  color: RED_COLOR,
                  fontFamily: '"Bebas Neue", sans-serif',
                }}
              >
                OUR SERVICES
              </Typography>
              <Typography 
                variant="h5" 
                align="center" 
                sx={{ 
                  mt: 2,
                  color: 'white',
                  maxWidth: '800px',
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontWeight: 300,
                  opacity: 0.9
                }}
              >
                Comprehensive logistics solutions tailored to your business needs
              </Typography>
            </motion.div>
          </Container>
        </HeroSection>

        {/* Services Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 1,
                fontWeight: 700,
                color: 'white',
                fontFamily: '"Bebas Neue", sans-serif',
              }}
            >
              What We Offer
            </Typography>
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                mb: 6,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '700px',
                mx: 'auto',
                fontFamily: '"Circular Std Book", sans-serif',
              }}
            >
              From local deliveries to interstate transport, our comprehensive range of services is designed to meet all your logistics needs with efficiency and reliability.
            </Typography>

            <Grid container spacing={4}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <motion.div variants={itemVariants}>
                    <ServiceCard>
                      <CardMedia
                        component="img"
                        height="200"
                        image={service.image}
                        alt={service.title}
                        sx={{ opacity: 0.8 }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <IconBox>
                            {service.icon}
                          </IconBox>
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              ml: 2,
                              fontWeight: 600,
                              color: 'white',
                              fontFamily: '"Circular Std Book", sans-serif',
                            }}
                          >
                            {service.title}
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
                          {service.description}
                        </Typography>
                      </CardContent>
                    </ServiceCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* Testimonials Section */}
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.3)', py: 8 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typography 
                variant="h2" 
                align="center" 
                sx={{ 
                  mb: 1,
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: '"Bebas Neue", sans-serif',
                }}
              >
                Client Testimonials
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  mb: 6,
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontFamily: '"Circular Std Book", sans-serif',
                }}
              >
                Don't just take our word for it. Here's what our clients have to say about our services.
              </Typography>

              <Grid container spacing={4}>
                {testimonials.map((testimonial) => (
                  <Grid item xs={12} md={4} key={testimonial.id}>
                    <TestimonialCard>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 3, 
                          fontStyle: 'italic',
                          color: 'white',
                          fontFamily: '"Circular Std Book", sans-serif',
                          lineHeight: 1.7
                        }}
                      >
                        "{testimonial.quote}"
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'white',
                          fontFamily: '"Circular Std Book", sans-serif',
                        }}
                      >
                        {testimonial.author}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          fontFamily: '"Circular Std Book", sans-serif',
                        }}
                      >
                        {testimonial.company}
                      </Typography>
                    </TestimonialCard>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Box 
              sx={{ 
                bgcolor: 'rgba(222, 31, 39, 0.1)', 
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                textAlign: 'center',
                border: '1px solid rgba(222, 31, 39, 0.2)'
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 2,
                  fontWeight: 700,
                  color: 'white',
                  fontFamily: '"Bebas Neue", sans-serif',
                }}
              >
                Ready to Get Started?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontFamily: '"Circular Std Book", sans-serif',
                }}
              >
                Contact us today to discuss your logistics needs and get a customized solution for your business.
              </Typography>
              <Button 
                component={RouterLink}
                to="/instant-quote"
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: RED_COLOR, 
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: '"Circular Std Book", sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#c41922',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                Get a Free Quote
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: DARKER_BG, py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    component="img" 
                    src="/MOTEX+Logo.png" 
                    alt="MOTEX Logo" 
                    sx={{ height: 40 }} 
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    mb: 2,
                    fontFamily: '"Circular Std Book", sans-serif',
                    maxWidth: '300px'
                  }}
                >
                  Providing premium logistics and transport solutions across Australia since 2015.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <InstagramIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <WhatsAppIcon />
                  </IconButton>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: '"Circular Std Book", sans-serif',
                  }}
                >
                  Quick Links
                </Typography>
                <Stack spacing={1}>
                  <Link 
                    component={RouterLink} 
                    to="/" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: '"Circular Std Book", sans-serif',
                      '&:hover': { color: RED_COLOR }
                    }}
                  >
                    Home
                  </Link>
                  <Link 
                    component={RouterLink} 
                    to="/services" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: '"Circular Std Book", sans-serif',
                      '&:hover': { color: RED_COLOR }
                    }}
                  >
                    Services
                  </Link>
                  <Link 
                    component={RouterLink} 
                    to="/about-us" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: '"Circular Std Book", sans-serif',
                      '&:hover': { color: RED_COLOR }
                    }}
                  >
                    About Us
                  </Link>
                  <Link 
                    component={RouterLink} 
                    to="/gallery" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: '"Circular Std Book", sans-serif',
                      '&:hover': { color: RED_COLOR }
                    }}
                  >
                    Gallery
                  </Link>
                  <Link 
                    component={RouterLink} 
                    to="/contact-us" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: '"Circular Std Book", sans-serif',
                      '&:hover': { color: RED_COLOR }
                    }}
                  >
                    Contact
                  </Link>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: '"Circular Std Book", sans-serif',
                  }}
                >
                  Contact Us
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: '"Circular Std Book", sans-serif',
                      }}
                    >
                      Sydney, NSW, Australia
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: '"Circular Std Book", sans-serif',
                      }}
                    >
                      +61 2 8005 7474
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ color: RED_COLOR, mr: 1.5 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: '"Circular Std Book", sans-serif',
                      }}
                    >
                      info@motextransport.com.au
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: '"Circular Std Book", sans-serif',
                }}
              >
                © {new Date().getFullYear()} MOTEX Transport. All rights reserved.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, sm: 0 } }}>
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontFamily: '"Circular Std Book", sans-serif',
                    fontSize: '0.875rem',
                    '&:hover': { color: RED_COLOR }
                  }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="#" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontFamily: '"Circular Std Book", sans-serif',
                    fontSize: '0.875rem',
                    '&:hover': { color: RED_COLOR }
                  }}
                >
                  Terms of Service
                </Link>
              </Stack>
            </Box>
          </Container>
        </Box>
      </ContentSection>
    </PageWrapper>
  );
};

export default ServicesPage;