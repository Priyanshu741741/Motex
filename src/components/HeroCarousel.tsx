import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
}));

interface HeroCarouselProps {
  images: string[];
  interval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mobileImages = [
    '/PHOTO-2025-03-24-11-27-54.jpg',
    '/services-13.jpg',
    '/chauffeur-6.jpg',
    '/PHOTO-2025-03-22-21-36-54_1.jpg',
    '/chauffeur-7.jpg'
  ];

  const activeImages = isMobile ? mobileImages : images;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activeImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [activeImages.length, interval]);

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}>
      {activeImages.map((image, index) => (
        <HeroImage
          key={image}
          src={image}
          alt={`Hero Background ${index + 1}`}
          sx={{ opacity: index === currentImageIndex ? 1 : 0 }}
        />
      ))}
    </Box>
  );
};

export default HeroCarousel;