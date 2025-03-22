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
  Menu as MenuIcon
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

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/MotexFeb6.jpg")',
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

const GradientText = styled(Typography)(({ theme }) => ({
  color: WHITE_TEXT,
  display: 'inline',
}));

const FounderQuoteCard = styled(Paper)(({ theme }) => ({
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

const ImageCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
  },
}));

const AboutUsPage = () => {
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

  const companyValues = [
    {
      id: 1,
      title: 'Customer-Centric',
      description: 'We place our customers at the center of everything we do, ensuring their needs are met with excellence and care.',
      image: '/aboutus-5.jpeg'
    },
    {
      id: 2,
      title: 'Professional Service',
      description: 'Our team maintains the highest standards of professionalism in every interaction and delivery.',
      image: '/aboutus-2.jpeg'
    },
    {
      id: 3,
      title: 'Reliability',
      description: 'We pride ourselves on being dependable, ensuring timely and secure deliveries, every time.',
      image: '/aboutus-3.jpg'
    },
    {
      id: 4,
      title: 'Adaptability',
      description: 'Our flexible approach allows us to meet diverse logistics challenges with customized solutions.',
      image: '/aboutus-4.jpeg'
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
              component="img" 
              src="/MOTEX+Logo.png" 
              alt="MOTEX Logo" 
              sx={{ height: 36 }} 
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
              <Link href="/" color="inherit" underline="none">
                Home
              </Link>
              <Link href="/services" color="inherit" underline="none">
                Services
              </Link>
              <Link href="/about-us" color="inherit" underline="none" sx={{ color: RED_COLOR }}>
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
                  fontFamily: '"Circular Std Book", sans-serif',
                  color: RED_COLOR
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
                OUR STORY
              </Typography>
            </motion.div>
          </Container>
        </HeroSection>
        
        {/* Founder Section */}
        <Box sx={{ py: 10, backgroundColor: DARK_BG }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row-reverse' }}>
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <Box 
                    component="img"
                    src="/roy-founder.jpeg"
                    alt="Roy Baheer - Founder"
                    sx={{
                      width: '100%',
                      borderRadius: '16px',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  
                  {/* Decorative elements */}
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, rgba(${Number.parseInt(RED_COLOR.slice(1,3), 16)},${Number.parseInt(RED_COLOR.slice(3,5), 16)},${Number.parseInt(RED_COLOR.slice(5,7), 16)},0.1) 0%, rgba(${Number.parseInt(RED_COLOR.slice(1,3), 16)},${Number.parseInt(RED_COLOR.slice(3,5), 16)},${Number.parseInt(RED_COLOR.slice(5,7), 16)},0) 70%)`,
                      zIndex: 0,
                    }}
                    component={motion.div}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    }}
                  />
                  
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: '-30px',
                      left: '-30px',
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, rgba(${Number.parseInt(PINK_RED.slice(1,3), 16)},${Number.parseInt(PINK_RED.slice(3,5), 16)},${Number.parseInt(PINK_RED.slice(5,7), 16)},0.1) 0%, rgba(${Number.parseInt(PINK_RED.slice(1,3), 16)},${Number.parseInt(PINK_RED.slice(3,5), 16)},${Number.parseInt(PINK_RED.slice(5,7), 16)},0) 70%)`,
                      zIndex: 0,
                    }}
                    component={motion.div}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                      delay: 1,
                    }}
                  />
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={7}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.7 
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 4,
                        fontFamily: '"Circular Std Bold", sans-serif',
                        fontWeight: 700,
                        color: WHITE_TEXT
                      }}
                    >
                      Meet Our Founder
                    </Typography>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.9,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      translateY: -5,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <FounderQuoteCard elevation={0}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontStyle: 'italic',
                          fontSize: '1.1rem',
                          lineHeight: 1.8,
                          fontFamily: '"Circular Std Book", sans-serif',
                          mb: 3
                        }}
                      >
                        "When I first came into the transport industry I worked for a few big companies and realized that the industry was lacking service and professionalism, so this is where I thought I can bring something new to industry."
                      </Typography>
                      
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: RED_COLOR,
                          fontFamily: '"Circular Std Bold", sans-serif',
                          fontWeight: 700
                        }}
                      >
                        - Roy Baheer
                      </Typography>
                    </FounderQuoteCard>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mt: 4,
                        lineHeight: 1.8,
                        fontSize: '1.05rem',
                        opacity: 0.9,
                        fontFamily: '"Circular Std Book", sans-serif',
                      }}
                    >
                      Motex Transport is a logistics business that Roy Baheer established. Roy has been very successful in the industry and is passionate about providing excellent customer service and experience. His top priority is the happiness of his customers, so Motex Transport offers services beyond expectations.
                    </Typography>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        {/* Our Mission & Values */}
        <Box sx={{ py: 10, backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: 2,
                  fontFamily: '"Circular Std Bold", sans-serif',
                  fontWeight: 700,
                  color: WHITE_TEXT
                }}
              >
                Our Mission
              </Typography>
              
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  maxWidth: 900,
                  mx: 'auto',
                  mb: 8,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  opacity: 0.9,
                  fontFamily: '"Circular Std Book", sans-serif',
                }}
              >
                At Motex Transport, we believe that no task is too difficult for us, and we are always eager to learn and gain exposure. Our enthusiastic team will do everything in our power to make your experience with us completely hassle-free. Our team is very experienced and professional, with over 15 years of combined experience in the logistics industry. We can handle all your transportation requirements, from regular deliveries and collections to one-off projects.
              </Typography>
            </motion.div>
            
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 6,
                fontFamily: '"Circular Std Bold", sans-serif',
                fontWeight: 700,
                color: WHITE_TEXT
              }}
            >
              Our Values
            </Typography>
            
            <Box 
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <Grid container spacing={4}>
                {companyValues.map((value) => (
                  <Grid item xs={12} sm={6} md={3} key={value.id}>
                    <motion.div variants={itemVariants}>
                      <ImageCard>
                        <CardMedia
                          component="img"
                          height="200"
                          image={value.image}
                          alt={value.title}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Typography 
                            variant="h5" 
                            gutterBottom 
                            sx={{ 
                              fontFamily: '"Circular Std Bold", sans-serif',
                              fontWeight: 700,
                              color: RED_COLOR
                            }}
                          >
                            {value.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              opacity: 0.9,
                              fontFamily: '"Circular Std Book", sans-serif',
                              fontSize: '0.95rem',
                              lineHeight: 1.6
                            }}
                          >
                            {value.description}
                          </Typography>
                        </CardContent>
                      </ImageCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
        
        {/* Our Services Highlight */}
        <Box 
          sx={{ 
            py: 10, 
            backgroundColor: DARK_BG,
            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("/bg-1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: 2,
                  fontFamily: '"Circular Std Bold", sans-serif',
                  fontWeight: 700,
                  color: WHITE_TEXT
                }}
              >
                What We Offer
              </Typography>
              
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  maxWidth: 900,
                  mx: 'auto',
                  mb: 8,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  opacity: 0.9,
                  fontFamily: '"Circular Std Book", sans-serif',
                }}
              >
                Motex Transport offers distribution work, set runs, door-to-door delivery, same-day delivery service, fragile freight, and interstate delivery. We're committed to providing reliable logistics solutions that exceed your expectations.
              </Typography>
            </motion.div>
          </Container>
        </Box>
        
        {/* CTA Section */}
        <Box sx={{ py: 10, backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: 4,
                  fontFamily: '"Circular Std Bold", sans-serif',
                  fontWeight: 700,
                  color: WHITE_TEXT
                }}
              >
                Ready to Get Started?
              </Typography>
              
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 5,
                  fontSize: '1.1rem',
                  opacity: 0.9,
                  fontFamily: '"Circular Std Book", sans-serif',
                }}
              >
                Contact us today for a free quote or to discuss how we can assist with your logistics requirements.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Button 
                  variant="contained" 
                  href="/instant-quote"
                  sx={{ 
                    bgcolor: RED_COLOR, 
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontFamily: '"Circular Std Book", sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    borderRadius: '50px',
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
                
                <Button 
                  variant="contained" 
                  href="#"
                  sx={{ 
                    bgcolor: RED_COLOR,
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontFamily: '"Circular Std Book", sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    borderRadius: '50px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      bgcolor: '#c41922',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                >
                  Contact&nbsp;Us
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
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

export default AboutUsPage;