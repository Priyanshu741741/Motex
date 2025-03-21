import { styled } from '@mui/material/styles';

const HeroImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 1,  // Changed from 0 to 1 to make image fully visible
  mixBlendMode: 'normal',
  filter: 'none',
  zIndex: 0    // Ensure image stays behind the text
});

<HeroImage
  src="/MotexFeb3.jpg"
  alt="Hero Background"
/>