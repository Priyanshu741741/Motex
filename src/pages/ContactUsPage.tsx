import { useState, useRef, useEffect } from 'react';
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
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Paper,
  TextField,
  FormControl,
  Select,
  FormHelperText
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
  Send as SendIcon
} from '@mui/icons-material';
import emailjs from '@emailjs/browser';

// Define colors
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992';
const INPUT_BG = 'rgba(255, 255, 255, 0.05)';
const ACCENT_COLOR = '#38BDF8';

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
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/MotexFeb6.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(12, 0),
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
    height: '30vh',
  },
}));

const StyledTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: INPUT_BG,
  borderRadius: 0,
  padding: '12px 16px',
  width: '100%',
  color: WHITE_TEXT,
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:focus-within': {
    borderBottom: `2px solid ${ACCENT_COLOR}`,
  },
  '& .MuiInputBase-input': {
    padding: 0,
  },
  borderBottom: '2px solid rgba(255,255,255,0.1)',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: RED_COLOR,
  color: 'white',
  padding: '12px 24px',
  borderRadius: '50px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 400,
  fontFamily: '"Circular Std Book", sans-serif',
  whiteSpace: 'nowrap',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#c41922',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(222, 31, 39, 0.5)',
    color: 'rgba(255, 255, 255, 0.7)',
  }
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontFamily: '"Circular Std Book", sans-serif',
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
}));

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Form validation
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false
      });
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Here you would typically send the form data to your backend or email service
    // For example, using emailjs:
    /*
    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formRef.current!,
      'YOUR_PUBLIC_KEY'
    )
    .then((result) => {
      setLoading(false);
      // Handle success - maybe redirect to a thank you page
      console.log(result.text);
    }, (error) => {
      setLoading(false);
      // Handle error
      console.log(error.text);
    });
    */
    
    // For now, let's simulate a successful submission
    setTimeout(() => {
      setLoading(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      alert('Thank you for your message! We will get back to you soon.');
    }, 1500);
  };

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
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1.5, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
              <Link href="/about-us" color="inherit" underline="none">
                About Us
              </Link>
              <Link href="/instant-quote" color="inherit" underline="none">
                Instant Quote
              </Link>
              <Link href="/gallery" color="inherit" underline="none">
                Gallery
              </Link>
              <Link href="/contact-us" color="inherit" underline="none" sx={{ color: RED_COLOR }}>
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
                  fontFamily: '"Circular Std Book", sans-serif',
                  color: RED_COLOR
                }}
              >
                Contact
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                color: 'white', 
                fontWeight: 700, 
                mb: 2,
                fontFamily: '"Circular Std Bold", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Contact Us
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                maxWidth: '800px', 
                mx: 'auto',
                fontFamily: '"Circular Std Book", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.2rem' }
              }}
            >
              We're here to help with all your transportation and logistics needs.
            </Typography>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Main Content */}
      <ContentSection>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6}>
            {/* Contact Form Section */}
            <Grid item xs={12} md={7}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: 4, 
                      fontFamily: '"Circular Std Bold", sans-serif',
                      fontWeight: 700 
                    }}
                  >
                    Send Us a Message
                  </Typography>
                </motion.div>
                
                <form ref={formRef} onSubmit={handleSubmit}>
                  <motion.div variants={itemVariants}>
                    <FormLabel>Your Name*</FormLabel>
                    <StyledTextField
                      placeholder="Enter your full name"
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={formErrors.name}
                    />
                    {formErrors.name && (
                      <FormHelperText error sx={{ mt: -2, mb: 2 }}>
                        Please enter your name
                      </FormHelperText>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormLabel>Email Address*</FormLabel>
                    <StyledTextField
                      placeholder="Enter your email address"
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={formErrors.email}
                    />
                    {formErrors.email && (
                      <FormHelperText error sx={{ mt: -2, mb: 2 }}>
                        Please enter a valid email address
                      </FormHelperText>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormLabel>Phone Number</FormLabel>
                    <StyledTextField
                      placeholder="Enter your phone number"
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormLabel>Subject</FormLabel>
                    <StyledTextField
                      placeholder="What is this regarding?"
                      fullWidth
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormLabel>Message*</FormLabel>
                    <StyledTextField
                      placeholder="Type your message here..."
                      fullWidth
                      multiline
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={formErrors.message}
                      sx={{ 
                        '& .MuiInputBase-inputMultiline': { 
                          py: 1.5 
                        } 
                      }}
                    />
                    {formErrors.message && (
                      <FormHelperText error sx={{ mt: -2, mb: 2 }}>
                        Please enter your message
                      </FormHelperText>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants} style={{ marginTop: '16px' }}>
                    <SubmitButton 
                      type="submit" 
                      disabled={loading}
                      startIcon={<SendIcon />}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </SubmitButton>
                  </motion.div>
                </form>
              </motion.div>
            </Grid>
            
            {/* Contact Info Section */}
            <Grid item xs={12} md={5}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: 4, 
                      fontFamily: '"Circular Std Bold", sans-serif',
                      fontWeight: 700 
                    }}
                  >
                    Contact Information
                  </Typography>
                </motion.div>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <ContactCard>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <LocationIcon sx={{ color: RED_COLOR, mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontFamily: '"Circular Std Bold", sans-serif' }}>
                              Our Location
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif' }}>
                              123 Transport Way, Sydney, NSW 2000, Australia
                            </Typography>
                          </Box>
                        </Box>
                      </ContactCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={12}>
                    <motion.div variants={itemVariants}>
                      <ContactCard>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <PhoneIcon sx={{ color: RED_COLOR, mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontFamily: '"Circular Std Bold", sans-serif' }}>
                              Phone Number
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif' }}>
                              +61 2 1234 5678
                            </Typography>
                          </Box>
                        </Box>
                      </ContactCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={12}>
                    <motion.div variants={itemVariants}>
                      <ContactCard>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <EmailIcon sx={{ color: RED_COLOR, mr: 2, fontSize: 28 }} />
                          <Box>
                            <Typography variant="h6" sx={{ mb: 1, fontFamily: '"Circular Std Bold", sans-serif' }}>
                              Email Address
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif' }}>
                              info@motextransport.com.au
                            </Typography>
                          </Box>
                        </Box>
                      </ContactCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mt: 2, 
                          mb: 3, 
                          fontFamily: '"Circular Std Bold", sans-serif',
                          fontWeight: 600 
                        }}
                      >
                        Follow Us
                      </Typography>
                      <Stack direction="row" spacing={2}>
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
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Map Section */}
          <Box sx={{ mt: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  fontFamily: '"Circular Std Bold", sans-serif',
                  fontWeight: 700 
                }}
              >
                Find Us
              </Typography>
              <MapContainer>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53659.50470927456!2d151.17486399640866!3d-33.86882975936304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632ccc0!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </MapContainer>
            </motion.div>
          </Box>
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
                <Link href="/contact-us" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Circular Std Book", sans-serif', fontWeight: 300 }}>
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

export default ContactUsPage;