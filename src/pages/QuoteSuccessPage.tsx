import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  AppBar, 
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle as CheckCircleIcon, Home as HomeIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #13111C 0%, #1A1245 100%)',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #FF4E16 0%, #FF2400 50%, #FF6B6B 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  fontFamily: '"Boldonse", "Poppins", sans-serif'
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '22px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  marginLeft: '8px',
  color: 'white'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #FF9D6C 0%, #FF2992 50%, #7539FF 100%)',
  color: 'white',
  padding: '10px 24px',
  borderRadius: '50px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    opacity: 0.9,
  }
}));

const SuccessCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '20px',
  padding: theme.spacing(5),
  position: 'relative',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 600,
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #FF9D6C, #FF2992, #7539FF, #2ECFF6, #17E6C1)',
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
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '19px',
    zIndex: -1,
  }
}));

const QuoteSuccessPage = () => {
  return (
    <GradientBackground className="gradient-bg">
      {/* Navigation */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img" 
              src="/MOTEX+Logo.png" 
              alt="MOTEX Logo" 
              sx={{ height: 32 }} 
            />
            <LogoText>
              motex
            </LogoText>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Button 
            component={RouterLink} 
            to="/"
            sx={{ 
              color: 'white', 
              textTransform: 'none' 
            }}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* Main Content */}
      <Container sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}>
        <SuccessCard
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glow-animation"
        >
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: 'rgba(23, 230, 193, 0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 50, color: '#17E6C1' }} />
          </Box>
          
          <GradientText variant="h3" sx={{ mb: 2 }}>
            Quote Request Received!
          </GradientText>
          
          <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
            Thank you for your quote request.
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'white', opacity: 0.8, mb: 4 }}>
            We've received your information and our team will review it shortly. You'll receive an email with your personalized quote within the next 24 hours.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                background: 'linear-gradient(90deg, #FF9D6C 0%, #FF2992 50%, #7539FF 100%)',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '50px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '16px',
                '&:hover': {
                  opacity: 0.9,
                }
              }}
            >
              Return to Homepage
            </Button>
          </Box>
        </SuccessCard>
      </Container>
    </GradientBackground>
  );
};

export default QuoteSuccessPage;