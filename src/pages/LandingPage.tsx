// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  EventAvailable as EventAvailableIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Warehouse as WarehouseIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

import emailjs from '@emailjs/browser';

import { motion, AnimatePresence, useInView } from 'framer-motion';

// Import fonts
// Oswald font is loaded via Google Fonts in embedded code
// Poppins and Bebas Neue fonts are loaded via Google Fonts in embedded code

// Define color constants at the top of the file
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992'; 
const WHITE_TEXT = '#FFFFFF';
const CARD_BG_COLOR = "rgba(0, 0, 0, 0.8)";
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';

const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
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
  fontWeight: 600, // Oswald looks better with medium weight
  fontFamily: '"Oswald", sans-serif',
  letterSpacing: '1px', // Add some spacing for better readability
  textTransform: 'uppercase' // Oswald looks best in uppercase
}));

const GradientButton = styled(Button)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  background: 'linear-gradient(90deg, #FF6B6B 0%, #DE1F27 50%, #FF2992 100%)',
  color: 'white',
  padding: '10px 24px',
  borderRadius: '50px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '16px',
  fontFamily: '"Poppins", sans-serif',
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
  fontFamily: '"Poppins", sans-serif',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    '& .service-title': {
      color: RED_COLOR,
    }
  },
}));

const CircleBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  opacity: 0.3, // Increased opacity from 0.15 to 0.3
  background: 'radial-gradient(circle, rgba(222, 31, 39, 0.8) 0%, rgba(0,0,0,0) 70%)', // Increased color intensity
  zIndex: 0,
  filter: 'blur(20px)', // Added blur effect to make it more visible
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

// Add GradualSpacingText component
const GradualSpacingText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  
  return (
    <Box ref={ref} sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      gap: { xs: '2px', md: '4px' }
    }}>
      <AnimatePresence>
        {text.split('').map((char, index) => (
          <motion.div
            key={`${char}-${index}-${Math.random().toString(36).substr(2, 9)}`}
            initial={{ opacity: 0, x: -10, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.04,
              type: "spring",
              stiffness: 100
            }}
            style={{ 
              display: 'inline-block',
              background: 'linear-gradient(90deg,#DE1F27 0%,#DE1F27 50%,#DE1F27 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              // @ts-ignore
              textFillColor: 'transparent',
              fontWeight: 1000,
              fontFamily: '"Anton", sans-serif',
              fontSize: 'inherit',
              letterSpacing: '2px'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

// Add BlurIn component
const BlurIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    >
      {children}
    </motion.div>
  );
};

// Add TextFade component
const TextFade = ({
  direction = 'down',
  children,
  staggerChildren = 0.1,
}: {
  direction?: 'up' | 'down';
  children: React.ReactNode;
  staggerChildren?: number;
}) => {
  const FADE_ANIMATION = {
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3 } },
    hidden: { opacity: 0, y: direction === 'down' ? -18 : 18 },
  };
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      style={{ width: '100%', textAlign: 'center' }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_ANIMATION}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
};

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  touchAction: 'pan-y',
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  width: '100%',
}));

const CarouselArrow = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: RED_COLOR,
  }
}));

// Add mouse follower gradient effect from ServicesPage.tsx
const GradientLight = styled('div')({
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${RED_COLOR}30 0%, ${PINK_RED}15 40%, transparent 70%)`,
  filter: 'blur(60px)',
  opacity: 0.8,
  pointerEvents: 'none',
  transition: 'transform 0.15s ease-out, width 0.2s ease, height 0.2s ease',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
});

// Add this new type definition after the existing types
type ServiceItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
};

// Add this new component before the LandingPage component
const MobileServiceCarousel = () => {
  const [activeSet, setActiveSet] = useState(0);
  
  const services: ServiceItem[][] = [
    [
      { id: 'parcel', icon: <LocalShippingIcon sx={{ color: RED_COLOR, fontSize: 20 }} />, title: 'Parcel Delivery' },
      { id: 'transport', icon: <BusinessIcon sx={{ color: RED_COLOR, fontSize: 20 }} />, title: 'Transport' },
      { id: 'packers', icon: <InventoryIcon sx={{ color: RED_COLOR, fontSize: 20 }} />, title: 'Packers & Movers' },
    ],
    [
      { id: 'courier', icon: <PublicIcon sx={{ color: RED_COLOR, fontSize: 20 }} />, title: 'Courier' },
      { id: 'sameday', icon: <SpeedIcon sx={{ color: RED_COLOR, fontSize: 20 }} />, title: 'Same Day' },
      { id: 'chauffeur', icon: <ApartmentIcon sx={{ color: RED_COLOR, fontSize: 20 }} />, title: 'Chauffeur' },
    ],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSet((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSet}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Grid container spacing={0} justifyContent="center">
          {services[activeSet].map((service) => (
            <Grid 
              key={service.id} 
              item 
              xs={4}
              sx={{ 
                borderRight: { xs: 'none', sm: '1px solid rgba(255, 255, 255, 0.05)' },
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 1.6,
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    width: 37.5,
                    height: 37.5,
                    bgcolor: 'rgba(222, 31, 39, 0.08)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 0.6,
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  align="center"
                  sx={{
                    color: 'white',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.69rem',
                    width: '100%'
                  }}
                >
                  {service.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
};

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Add mouse position state for gradient light effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const movingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Group services into slides of 3
  const slidesCount = 2; // Only 2 slides
  const itemsPerSlide = 3; // 3 services per slide
  
  // Define the service card type
  type ServiceCard = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  // Define the slide type
  type Slide = {
    id: string;
    services: ServiceCard[];
  };
  
  // Service cards data
  const serviceCards: ServiceCard[] = [
    {
      id: 'parcel-delivery',
      title: "Parcel Delivery",
      description: "Fast and secure parcel delivery solutions for businesses and individuals. We ensure your packages arrive safely and on schedule.",
      image: "/services-15.jpg",
    },
    {
      id: 'fragile-freight',
      title: "Fragile Freight",
      description: "Specialized handling for delicate and valuable items. Our experts use proper techniques and materials to protect your fragile shipments.",
      image: "/gallery 6.jpeg",
    },
    {
      id: 'chauffeur-services',
      title: "Chauffeur Services",
      description: "Professional chauffeur services with experienced drivers. We provide reliable transportation for executives, special events, and VIP clients.",
      image: "/chauffeur-2.jpg",
    },
    {
      id: 'door-to-door',
      title: "Door to Door Service",
      description: "Convenient pickup and delivery directly from your location to the destination. Let us handle the logistics while you focus on your business.",
      image: "/gallery 2.jpg",
    },
    {
      id: 'same-day-delivery',
      title: "Same Day Delivery",
      description: "Urgent deliveries handled with speed and reliability. Our same-day service ensures your time-sensitive packages reach their destination promptly.",
      image: "/gallery 3.jpg",
    },
    {
      id: 'interstate-delivery',
      title: "Interstate Delivery",
      image: "/upscalemedia-transformed.jpeg",
      description: "Seamless interstate logistics solutions connecting businesses across Australia. Our fleet ensures safe and timely delivery across state lines.",
    }
  ];
  
  // Create slides array - split services into groups of 3
  const slides: Slide[] = [
    {
      id: 'first-slide',
      services: serviceCards.slice(0, 3)
    },
    {
      id: 'second-slide',
      services: serviceCards.slice(3, 6)
    }
  ];
  
  const maxActiveSlide = slidesCount - 1;
  
  const handleNextSlide = useCallback(() => {
    setActiveSlide(prev => (prev === maxActiveSlide ? 0 : prev + 1));
  }, [maxActiveSlide]);
  
  const handlePrevSlide = useCallback(() => {
    setActiveSlide(prev => (prev === 0 ? maxActiveSlide : prev - 1));
  }, [maxActiveSlide]);

  // Setup auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [handleNextSlide]); // Include handleNextSlide since it's used in the effect

  // Handle swipe/trackpad gestures
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
      e.preventDefault();
    }
    setCurrentTranslate(activeSlide * -100);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let currentX: number;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = (currentX - startX) / (carouselRef.current?.clientWidth || 1) * 100;
    const newTranslate = currentTranslate + diff;
    
    // Apply boundaries - don't allow dragging beyond first or last slide
    if (newTranslate > 0) {
      return;
    }
    
    if (newTranslate < -maxActiveSlide * 100) {
      return;
    }
    
    carouselRef.current?.style.setProperty('transform', `translateX(${newTranslate}%)`);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    let endX: number;
    if ('changedTouches' in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = e.clientX;
    }
    
    const diff = endX - startX;
    
    // Determine if we should change slide (if swipe was significant enough)
    if (Math.abs(diff) > 50) { // 50px threshold for slide change
      if (diff > 0) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
    } else {
      // Reset to current slide if swipe wasn't significant
      if (carouselRef.current) {
        carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
        carouselRef.current.style.transform = `translateX(-${activeSlide * 100}%)`;
      }
    }
  };

  // Reset transition on slide change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = isDragging ? 'none' : 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${activeSlide * 100}%)`;
    }
  }, [activeSlide, isDragging]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [showSplash, setShowSplash] = useState(() => {
    // Check if this is the first visit in the current session
    return !sessionStorage.getItem('hasVisited');
  });

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Mark that the user has visited in this session
    sessionStorage.setItem('hasVisited', 'true');
  };

  // Function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Add useEffect for mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Track mouse position relative to the viewport
      setMousePos({ 
        x: e.clientX, 
        y: e.clientY 
      });
      
      // Set moving state
      setIsMoving(true);
      
      // Clear previous timeout
      if (movingTimeout.current) {
        clearTimeout(movingTimeout.current);
      }
      
      // Set timeout to track when movement stops
      movingTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movingTimeout.current) {
        clearTimeout(movingTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <GradientBackground>
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
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ py: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1100 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
            <Box 
              component="button"
              onClick={() => handleNavigation('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer' 
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
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400,
                  justifyContent: 'center',
                  fontSize: '16px',
                  lineHeight: '29px',
                }}
              >
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/')} 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    color: RED_COLOR, 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Home
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/services')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Services
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/about-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  About Us
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/instant-quote')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Instant Quote
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/gallery')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Gallery
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/contact-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
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
          
          {/* Get a Quote button and Mobile menu icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '20%' }}>
            {/* Get a Quote button - visible on both desktop and mobile */}
            <Button 
              variant="contained"
              onClick={() => handleNavigation('/instant-quote')}
              sx={{ 
                bgcolor: RED_COLOR, 
                color: 'white',
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: { xs: '13px', md: '15px' },
                borderRadius: '50px',
                px: { xs: 2, md: 3 },
                py: 1,
                minWidth: { xs: '100px', md: '130px' },
                whiteSpace: 'nowrap',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                mr: { xs: 1, md: 0 },
                '&:hover': {
                  bgcolor: '#c41922',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                }
              }}
            >
              Get&nbsp;a&nbsp;Quote
            </Button>
            
            {/* Mobile menu icon */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
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
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/');
                }}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif',
                  color: RED_COLOR 
                }}
              >
                Home
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/services');
                }} 
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Services
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/about-us');
                }}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                About Us
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/instant-quote');
                }}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Instant Quote
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/gallery');
                }}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Gallery
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/contact-us');
                }}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Contact
              </MenuItem>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <MenuItem 
                onClick={() => {
                  handleMenuClose();
                  handleNavigation('/instant-quote');
                }}
                sx={{ 
                  py: 1.5, 
                  fontFamily: '"Poppins", sans-serif',
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
      
      {/* Toolbar spacer to prevent content from being hidden under fixed AppBar */}
      <Box sx={{ height: '64px' }} />
      
      {/* Update the Hero section to fix mobile text cropping */}
      <Box 
        sx={{ 
          backgroundImage: 'url("/MotexFeb3.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: '40.47vh', md: '55vh' },
          overflow: 'hidden',
          zIndex: 10,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 1,
                fontWeight: 800,
                color: RED_COLOR,
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: { xs: '45px', sm: '55px', md: '85px', lg: '95px' },
                letterSpacing: { xs: '1px', sm: '2px', md: '3px' }
              }}
            >
              <TextFade direction="down" staggerChildren={0.03}>
                <div style={{ whiteSpace: 'nowrap' }}>
                  Above and Beyond with 
                </div>
                <div style={{ whiteSpace: 'nowrap', marginTop: '-10px' }}>
                  Motex Transport
                </div>
              </TextFade>
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Service Categories Section */}
      <Box sx={{ position: 'relative', mt: { xs: -6.5, sm: -8 }, mb: 6, zIndex: 10 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box 
            sx={{ 
              width: { xs: '95%', sm: '90%' },
              maxWidth: '1100px',
              mx: 'auto',
              bgcolor: '#0A0A0A',
              borderRadius: 30,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              py: { xs: 0.8, sm: 1.5 },
              px: { xs: 1, md: 3 },
              border: '1px solid rgba(222, 31, 39, 0.15)'
            }}
          >
            {/* Mobile view with rotating services - more compact */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <MobileServiceCarousel />
            </Box>

            {/* Desktop view with all services */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Grid container spacing={0}>
                {/* Parcel Delivery */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <LocalShippingIcon sx={{ color: RED_COLOR, fontSize: 24 }} />
                    </Box>
                    <Typography
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                      }}
                    >
                      Parcel Delivery
                    </Typography>
                  </Box>
                </Grid>

                {/* Transport */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <BusinessIcon sx={{ color: RED_COLOR, fontSize: 24 }} />
                    </Box>
                    <Typography
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                      }}
                    >
                      Transport
                    </Typography>
                  </Box>
                </Grid>

                {/* Packers & Movers */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <InventoryIcon sx={{ color: RED_COLOR, fontSize: 24 }} />
                    </Box>
                    <Typography
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 400,
                        fontSize: '0.75rem',
                      }}
                    >
                      Packers & Movers
                    </Typography>
                  </Box>
                </Grid>

                {/* Courier */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <PublicIcon sx={{ color: RED_COLOR, fontSize: 24 }} />
                    </Box>
                    <Typography
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 400,
                        fontSize: '0.75rem',
                      }}
                    >
                      Courier
                    </Typography>
                  </Box>
                </Grid>

                {/* Same Day */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <SpeedIcon sx={{ color: RED_COLOR, fontSize: 24 }} />
                    </Box>
                    <Typography
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 400,
                        fontSize: '0.75rem',
                      }}
                    >
                      Same Day
                    </Typography>
                  </Box>
                </Grid>

                {/* Chauffeur */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <ApartmentIcon sx={{ color: RED_COLOR, fontSize: 24 }} />
                    </Box>
                    <Typography
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 400,
                        fontSize: '0.75rem',
                      }}
                    >
                      Chauffeur
                    </Typography>
                  </Box>
                </Grid>

                {/* Get a Quote button */}
                <Grid 
                  item 
                  sm="auto"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 3
                  }}
                >
                  <Button
                    onClick={() => handleNavigation('/instant-quote')}
                    sx={{ 
                      backgroundColor: RED_COLOR, 
                      color: 'white',
                      textTransform: 'none',
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      borderRadius: '50px',
                      px: 3.5,
                      py: 1.25,
                      minWidth: '140px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: '#c41922',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                      }
                    }}
                  >
                    Get&nbsp;a&nbsp;Quote
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        ml: 0.5,
                        fontSize: '1rem'
                      }}
                    >
                      →
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Wrap all content except hero section in a ContentSection with mouse gradient effect */}
      <Box ref={contentSectionRef} sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Mouse follower gradient light - positioned relative to viewport */}
        <GradientLight 
          sx={{ 
            left: mousePos.x,
            top: mousePos.y,
            width: isMoving ? '600px' : '400px',
            height: isMoving ? '600px' : '400px',
            opacity: isMoving ? 0.85 : 0.7,
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 1
          }} 
        />

        {/* Services Section */}
        <Box id="services-section" sx={{ pt: -1, pb:6 , position: 'relative', zIndex: 2 }}>
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
                fontFamily: '"Oswald", sans-serif',
              }}>
                OUR SERVICES
              </Typography>
            </motion.div>
            <Typography variant="body1" align="center" sx={{ 
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: '"Poppins", sans-serif',
              fontSize: '1.1rem',
            }}>
              From local deliveries to interstate transport, our comprehensive range of services is designed to meet all your logistics needs with efficiency and reliability.
            </Typography>
            
            <CarouselContainer>
              {/* Carousel Track */}
              <CarouselTrack 
                ref={carouselRef}
                sx={{ 
                  transform: `translateX(-${activeSlide * 100}%)`,
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {slides.map((slide) => (
                  <Box 
                    key={slide.id} 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap',
                      width: '100%',
                      flexShrink: 0,
                      gap: 0 // Remove gap between cards
                    }}
                  >
                    {slide.services.map((card) => (
                      <Box 
                        key={card.id} 
                        sx={{ 
                          p: { xs: 1, sm: 2 }, // Add padding between cards
                          width: { xs: '100%', sm: '50%', md: '33.333%' } 
                        }}
                      >
                        <ServiceCard>
                          <CardMedia
                            component="img"
                            height="200"
                            image={card.image}
                            alt={card.title}
                            sx={{ opacity: 0.8 }}
                          />
                          <CardContent sx={{ p: 3 }}>
                            <Typography 
                              variant="h5" 
                              className="service-title"
                              sx={{ 
                                mb: 2,
                                fontWeight: 600,
                                color: 'white',
                                fontFamily: '"Poppins", sans-serif',
                              }}
                            >
                              {card.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.7)',
                                fontFamily: '"Poppins", sans-serif',
                                lineHeight: '1.6',
                                fontSize: '16px',
                                fontWeight: 400
                              }}
                            >
                              {card.description}
                            </Typography>
                          </CardContent>
                        </ServiceCard>
                      </Box>
                    ))}
                  </Box>
                ))}
              </CarouselTrack>
            </CarouselContainer>
            
            {/* Dots indicator for current slide - now only 2 dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              {[
                { id: 'dot-first-slide', value: 0 }, 
                { id: 'dot-second-slide', value: 1 }
              ].map((dot) => (
                <Box
                  key={dot.id}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    mx: 0.5,
                    cursor: 'pointer',
                    backgroundColor: dot.value === activeSlide ? RED_COLOR : 'rgba(255,255,255,0.3)',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => setActiveSlide(dot.value)}
                />
              ))}
            </Box>
            
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
                  fontFamily: '"Poppins", sans-serif',
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
              fontFamily: '"Oswald", sans-serif'
            }}>
              TRUSTED BY
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
        <Box sx={{ 
          py: 10, 
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Circular/Elliptical background patterns - increased size and added animation */}
          <CircleBackground sx={{ 
            top: '10%', 
            left: '5%',
            width: '350px', // Increased size
            height: '350px', // Increased size
            animation: 'pulse 8s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            top: '30%', 
            right: '8%', 
            width: '280px', // Increased size
            height: '280px', // Increased size
            background: 'radial-gradient(circle, rgba(255, 41, 146, 0.8) 0%, rgba(0,0,0,0) 70%)',
            animation: 'pulse 12s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            bottom: '15%', 
            left: '15%', 
            width: '400px', // Increased size
            height: '400px', // Increased size
            background: 'radial-gradient(circle, rgba(117, 57, 255, 0.7) 0%, rgba(0,0,0,0) 70%)',
            animation: 'pulse 10s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            bottom: '25%', 
            right: '15%', 
            width: '320px', // Increased size
            height: '320px', // Increased size
            animation: 'pulse 14s infinite ease-in-out',
          }} />
          
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h2" align="center" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              color: 'white',
              fontFamily: '"Oswald", sans-serif',
            }}>
              WHAT WE OFFER
            </Typography>
            
            <Typography variant="body1" align="center" sx={{ 
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: '"Poppins", sans-serif',
              fontSize: '1.1rem',
            }}>
              MOTEX Transport provides comprehensive logistics solutions designed to meet your specific business needs with reliability and efficiency.
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              {/* Dedicated Drivers */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    background: CARD_BG_COLOR,
                    height: "100%",
                    borderRadius: "16px",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .section-heading": {
                        color: RED_COLOR
                      }
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h4"
                      className="section-heading" 
                      sx={{ 
                        mb: 2,
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        color: 'white',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      Dedicated Drivers
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3,
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontFamily: '"Poppins", sans-serif',
                        minHeight: '60px'
                      }}
                    >
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                <Card
                  sx={{
                    background: CARD_BG_COLOR,
                    height: "100%",
                    borderRadius: "16px",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .section-heading": {
                        color: RED_COLOR
                      }
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h4"
                      className="section-heading" 
                      sx={{ 
                        mb: 2,
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        color: 'white',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      Skilled Operators
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: 3,
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                <Card
                  sx={{
                    background: CARD_BG_COLOR,
                    height: "100%",
                    borderRadius: "16px",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .section-heading": {
                        color: RED_COLOR
                      }
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h4"
                      className="section-heading" 
                      sx={{ 
                        mb: 2,
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        color: 'white',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      Modern Fleet
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: 3,
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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
                          fontFamily: '"Poppins", sans-serif',
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

        {/* Decorative Line */}
        <DecorativeLine />

        <Box 
          sx={{ 
            py: { xs: 10, md: 14 },
            position: 'relative',
            background: 'linear-gradient(135deg, #000000 0%, #1a0005 100%)',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Simple accent background */}
          <Box 
            sx={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(222, 31, 39, 0.2) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(60px)',
              zIndex: 1,
            }}
          />

          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid 
              container 
              spacing={{ xs: 6, md: 8 }} 
              alignItems="center" 
              sx={{ position: 'relative' }}
            >
              {/* Left side with content */}
              <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ 
                    p: { xs: 3, md: 5 },
                    borderRadius: '16px',
                    background: 'rgba(15, 15, 15, 0.6)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}>
                    <Box>
                      
                      <Typography variant="h2" sx={{ 
                        fontSize: { xs: '2.25rem', md: '3rem' },
                        fontWeight: 800,
                        mb: 2,
                        color: '#FFFFFF',
                        fontFamily: '"Oswald", sans-serif',
                        lineHeight: 1.2
                      }}>
                        GET YOUR TRANSPORT QUOTE IN SECONDS
                      </Typography>
                      
                      <Typography variant="body1" sx={{ 
                        mb: 4,
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontSize: '1.1rem',
                        lineHeight: 1.5,
                        fontFamily: '"Poppins", sans-serif',
                      }}>
                        Skip the waiting and paperwork. Our instant quote system delivers 
                        quotes instantly so you can book your shipment and get moving.
                      </Typography>
                      
                      {/* Features */}
                      <Box sx={{ mb: 4 }}>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <InventoryIcon sx={{ fontSize: 25, color: RED_COLOR, mr: 2 }} />
                          <Typography variant="body2" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif' }}>
                            All package sizes and weights accommodated
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventAvailableIcon sx={{ fontSize: 25, color: RED_COLOR, mr: 2 }} />
                          <Typography variant="body2" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif' }}>
                            Same-day and scheduled deliveries available
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button
                        variant="contained" 
                        onClick={() => handleNavigation('/instant-quote')}
                        sx={{ 
                          bgcolor: RED_COLOR, 
                          color: 'white',
                          textTransform: 'none',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 400,
                          fontSize: '15px',
                          borderRadius: '50px',
                          padding: '8px 24px',
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
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Right side with image */}
              <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      height: { xs: '300px', md: '500px' },
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <Box 
                      component="img"
                      src="/PHOTO-2025-03-22-21-36-55.jpg"
                      alt="Get Instant Quote"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.25)'
                        }
                      }}
                    />
                    
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      height: '40%',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 3
                    }}>
                      
                    </Box>
                  </Box>
                </motion.div>
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
              fontFamily: '"Oswald", sans-serif',
            }}>
              WHAT OUR CLIENTS SAY ABOUT US
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
                    fontFamily: '"Poppins", sans-serif',
                    fontStyle: 'italic',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    "The service we received from Motex Transport was extremely professional, honest and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Sunday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETAs and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service."
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ 
                    fontFamily: '"Poppins", sans-serif',
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
                    fontFamily: '"Poppins", sans-serif',
                    fontStyle: 'italic',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed."
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ 
                    fontFamily: '"Poppins", sans-serif',
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
                    fontFamily: '"Poppins", sans-serif',
                    fontStyle: 'italic',
                    color: 'rgba(255, 255, 255, 0.9)',
                    maxWidth: '800px',
                    mx: 'auto'
                  }}>
                    "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services."
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ 
                    fontFamily: '"Poppins", sans-serif',
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
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, mb: 3, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
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
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                  Quick Links
                </Typography>
                <Stack spacing={1}>
                  <Link href="/" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Home
                  </Link>
                  <Link href="/about-us" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    About Us
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Services
                  </Link>
                  <Link href="/instant-quote" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Instant Quote
                  </Link>
                  <Link href="/gallery" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Gallery
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Contact
                  </Link>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ color: '#DE1F27', mr: 1.5 }} />
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    123 Transport Way, Sydney, NSW 2000, Australia
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: '#DE1F27', mr: 1.5 }} />
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    +61 2 1234 5678
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: '#DE1F27', mr: 1.5 }} />
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    info@motextransport.com.au
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />
            
            <Typography variant="body2" align="center" sx={{ color: 'white', opacity: 0.7, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
              © {new Date().getFullYear()} MOTEX Transport. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </GradientBackground>
    </>
  );
};

export default LandingPage;