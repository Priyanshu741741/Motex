import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  FormControlLabel, 
  Switch,
  useTheme,
  useMediaQuery,
  Radio,
  RadioGroup,
  Stack,
  Link,
  InputBase,
  Divider,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import emailjs from '@emailjs/browser';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';

// Define colors
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';
const WHITE_TEXT = '#FFFFFF';
const ACCENT_COLOR = '#38BDF8';
const INPUT_BG = 'rgba(255, 255, 255, 0.05)';
const BUTTON_BG = 'rgba(255, 255, 255, 0.1)';
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

const StyledDateTimePicker = styled(Box)(({ theme }) => ({
  backgroundColor: INPUT_BG,
  borderRadius: 0,
  marginBottom: theme.spacing(3),
  width: '100%',
  borderBottom: '2px solid rgba(255,255,255,0.1)',
  '& .MuiInputBase-root': {
    color: WHITE_TEXT,
    backgroundColor: 'transparent',
    width: '100%',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
  },
  '& .MuiIconButton-root': {
    color: WHITE_TEXT,
  },
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

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  '& .MuiFormControlLabel-root': {
    marginRight: 0,
    fontFamily: '"Circular Std Book", sans-serif',
  },
  '& .MuiRadio-root': {
    color: 'rgba(255, 255, 255, 0.6)',
    '&.Mui-checked': {
      color: RED_COLOR,
    },
  },
}));

const InstantQuotePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Form state matching Supabase table
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    goods_description: '',
    size: 'Small',
    pickup_suburb: '',
    pickup_access: 'Ground Floor',
    delivery_suburb: '',
    delivery_access: 'Ground Floor',
    date: null as string | null,
    time: null as string | null,
    is_fragile: false,
    other_info: '',
    // For "Other Inquiries" section
    inquiry_name: '',
    inquiry_email: '',
    inquiry_message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setFormData({
      ...formData,
      date: date ? date.format('YYYY-MM-DD') : null
    });
  };

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setFormData({
      ...formData,
      time: time ? time.format('HH:mm') : null
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get current year for the footer
      const currentYear = new Date().getFullYear();
      
      // Send confirmation email to user
      await emailjs.send(
        'service_hbi58cx',
        'template_p1h9d13',
        {
          to_email: formData.email,
          to_name: `${formData.first_name} ${formData.last_name}`,
          pickup_suburb: formData.pickup_suburb,
          delivery_suburb: formData.delivery_suburb,
          date: formData.date,
          time: formData.time,
          goods_description: formData.goods_description,
          size: formData.size,
          message: 'Thank you for your quote request. Our team will review it and get back to you within 24 hours.'
        },
        'L45k8LVh0pmGbMV6d'
      );
  
      // For admin notification, send all fields directly
      await emailjs.send(
        'service_hbi58cx',
        'template_eghqznh',
        {
          // Individual form fields
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          goods_description: formData.goods_description,
          size: formData.size,
          pickup_suburb: formData.pickup_suburb,
          pickup_access: formData.pickup_access,
          delivery_suburb: formData.delivery_suburb,
          delivery_access: formData.delivery_access,
          date: formData.date || "Not specified",
          time: formData.time || "Not specified",
          is_fragile: formData.is_fragile ? "Yes" : "No",
          other_info: formData.other_info || "None provided",
          
          // Full JSON data for reference
          form_data: JSON.stringify(formData, null, 2),
          submission_time: new Date().toLocaleString(),
          current_year: currentYear.toString()
        },
        'L45k8LVh0pmGbMV6d'
      );
  
      console.log('Form submitted:', formData);
      alert('Thank you for your quote request! We will get back to you shortly.');
      
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        goods_description: '',
        size: 'Small',
        pickup_suburb: '',
        pickup_access: 'Ground Floor',
        delivery_suburb: '',
        delivery_access: 'Ground Floor',
        date: null,
        time: null,
        is_fragile: false,
        other_info: '',
        inquiry_name: '',
        inquiry_email: '',
        inquiry_message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await emailjs.send(
        'service_hbi58cx',
        'template_eghqznh',
        {
          first_name: formData.inquiry_name,
          email: formData.inquiry_email,
          message: formData.inquiry_message,
          form_data: JSON.stringify({
            name: formData.inquiry_name,
            email: formData.inquiry_email,
            message: formData.inquiry_message
          }, null, 2),
          submission_time: new Date().toLocaleString(),
        },
        'L45k8LVh0pmGbMV6d'
      );
      
      alert('Your inquiry has been submitted successfully!');
      setFormData({
        ...formData,
        inquiry_name: '',
        inquiry_email: '',
        inquiry_message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageWrapper>
        {/* Header - Updated with responsive menu */}
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
                <Link href="#" color="inherit" underline="none">
                  Services
                </Link>
                <Link href="/about-us" color="inherit" underline="none">
                  About Us
                </Link>
                <Link href="/instant-quote" color="inherit" underline="none" sx={{ color: RED_COLOR }}>
                  Instant Quote
                </Link>
                <Link href="/gallery" color="inherit" underline="none">
                  Gallery
                </Link>
                <Link href="#" color="inherit" underline="none">
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
                  to="#" 
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
                    fontFamily: '"Circular Std Book", sans-serif',
                    color: RED_COLOR
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
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        
        <ContentSection>
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h2" component="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              letterSpacing: '-0.5px',
              fontFamily: '"Circular Std Bold", sans-serif',
            }}>
              GET A QUOTE
            </Typography>
            
            <Typography variant="body1" sx={{ 
              opacity: 0.7,
              mb: 6,
              maxWidth: 500,
              fontFamily: '"Circular Std Book", sans-serif',
            }}>
              Fill out the form below to receive a custom quote for your transport needs. We'll get back to you within 24 hours.
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Name Fields */}
                <Grid item xs={12} sm={6}>
                  <FormLabel>First Name</FormLabel>
                  <StyledTextField
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormLabel>Last Name</FormLabel>
                  <StyledTextField
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    fullWidth
                    required
                  />
                </Grid>
                
                {/* Email */}
                <Grid item xs={12}>
                  <FormLabel>Email</FormLabel>
                  <StyledTextField
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    fullWidth
                    required
                  />
                </Grid>
                
                {/* Description of Goods */}
                <Grid item xs={12}>
                  <FormLabel>Description of Goods</FormLabel>
                  <StyledTextField
                    name="goods_description"
                    value={formData.goods_description}
                    onChange={handleChange}
                    placeholder="Describe the items you need to transport"
                    multiline
                    minRows={3}
                    fullWidth
                    required
                  />
                </Grid>
                
                {/* Size & Weight */}
                <Grid item xs={12}>
                  <FormLabel>Size & Weight</FormLabel>
                  <StyledTextField
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="e.g., 2m x 1m x 1m, 200kg"
                    fullWidth
                    required
                  />
                </Grid>
                
                {/* Pickup Suburb */}
                <Grid item xs={12}>
                  <FormLabel>Pickup Suburb</FormLabel>
                  <StyledTextField
                    name="pickup_suburb"
                    value={formData.pickup_suburb}
                    onChange={handleChange}
                    placeholder="e.g., Melbourne CBD"
                    fullWidth
                    required
                  />
                </Grid>
                
                {/* Pickup Access */}
                <Grid item xs={12}>
                  <FormLabel>Pickup Access</FormLabel>
                  <StyledRadioGroup
                    name="pickup_access"
                    value={formData.pickup_access}
                    onChange={handleChange}
                  >
                    <FormControlLabel 
                      value="Ground Floor" 
                      control={<Radio />} 
                      label="Ground floor" 
                    />
                    <FormControlLabel 
                      value="Stairs" 
                      control={<Radio />} 
                      label="Stairs" 
                    />
                  </StyledRadioGroup>
                </Grid>
                
                {/* Delivery Suburb */}
                <Grid item xs={12}>
                  <FormLabel>Delivery Suburb</FormLabel>
                  <StyledTextField
                    name="delivery_suburb"
                    value={formData.delivery_suburb}
                    onChange={handleChange}
                    placeholder="e.g., Sydney CBD"
                    fullWidth
                    required
                  />
                </Grid>
                
                {/* Delivery Access */}
                <Grid item xs={12}>
                  <FormLabel>Delivery Access</FormLabel>
                  <StyledRadioGroup
                    name="delivery_access"
                    value={formData.delivery_access}
                    onChange={handleChange}
                  >
                    <FormControlLabel 
                      value="Ground Floor" 
                      control={<Radio />} 
                      label="Ground floor" 
                    />
                    <FormControlLabel 
                      value="Stairs" 
                      control={<Radio />} 
                      label="Stairs" 
                    />
                  </StyledRadioGroup>
                </Grid>
                
                {/* Date */}
                <Grid item xs={12} sm={6}>
                  <FormLabel>Date</FormLabel>
                  <StyledDateTimePicker>
                    <DatePicker
                      value={formData.date ? dayjs(formData.date) : null}
                      onChange={(date) => handleDateChange(date)}
                      slotProps={{
                        textField: {
                          placeholder: "Select date",
                          fullWidth: true,
                          required: true,
                        }
                      }}
                    />
                  </StyledDateTimePicker>
                </Grid>
                
                {/* Time */}
                <Grid item xs={12} sm={6}>
                  <FormLabel>Time</FormLabel>
                  <StyledDateTimePicker>
                    <TimePicker
                      value={formData.time ? dayjs(`2023-01-01T${formData.time}`) : null}
                      onChange={(time) => handleTimeChange(time)}
                      slotProps={{
                        textField: {
                          placeholder: "Select time",
                          fullWidth: true,
                          required: true,
                        }
                      }}
                    />
                  </StyledDateTimePicker>
                </Grid>
                
                {/* Fragile */}
                <Grid item xs={12}>
                  <FormLabel>Fragile</FormLabel>
                  <StyledRadioGroup
                    name="is_fragile"
                    value={formData.is_fragile.toString()}
                    onChange={(e) => setFormData({...formData, is_fragile: e.target.value === 'true'})}
                  >
                    <FormControlLabel 
                      value="true" 
                      control={<Radio />} 
                      label="Yes" 
                    />
                    <FormControlLabel 
                      value="false" 
                      control={<Radio />} 
                      label="No" 
                    />
                  </StyledRadioGroup>
                </Grid>
                
                {/* Other Info */}
                <Grid item xs={12}>
                  <FormLabel>Other Info</FormLabel>
                  <StyledTextField
                    name="other_info"
                    value={formData.other_info}
                    onChange={handleChange}
                    placeholder="Any other details we should know..."
                    multiline
                    minRows={3}
                    fullWidth
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                <SubmitButton 
                  type="submit"
                  disabled={loading}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    ...(loading && {
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '30%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        animation: 'loading 1.5s infinite',
                      },
                      '@keyframes loading': {
                        '0%': {
                          transform: 'skewX(-30deg) translateX(-100%)',
                        },
                        '100%': {
                          transform: 'skewX(-30deg) translateX(300%)',
                        },
                      },
                    })
                  }}
                >
                  {loading ? 'Submitting...' : 'Get Quote'}
                </SubmitButton>
              </Box>
            </form>
            
            {/* Other Inquiries Section */}
            <Box sx={{ mt: 8, mb: 4 }}>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 4 }} />
              
              <Typography variant="h4" sx={{ 
                fontSize: '2rem',
                fontWeight: 700,
                mb: 4,
                letterSpacing: '-0.5px'
              }}>
                OTHER INQUIRIES
              </Typography>
              
              <form onSubmit={handleInquirySubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Name</FormLabel>
                    <StyledTextField
                      name="inquiry_name"
                      value={formData.inquiry_name}
                      onChange={handleChange}
                      placeholder="Your name"
                      fullWidth
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Email</FormLabel>
                    <StyledTextField
                      name="inquiry_email"
                      type="email"
                      value={formData.inquiry_email}
                      onChange={handleChange}
                      placeholder="Your email"
                      fullWidth
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormLabel>Message</FormLabel>
                    <StyledTextField
                      name="inquiry_message"
                      value={formData.inquiry_message}
                      onChange={handleChange}
                      placeholder="Your message"
                      multiline
                      minRows={3}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                  <SubmitButton 
                    type="submit"
                    disabled={loading}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      ...(loading && {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '30%',
                          height: '100%',
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          animation: 'loading 1.5s infinite',
                        }
                      })
                    }}
                  >
                    {loading ? 'Submitting...' : 'Send Inquiry'}
                  </SubmitButton>
                </Box>
              </form>
            </Box>
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
    </LocalizationProvider>
  );
};

export default InstantQuotePage;