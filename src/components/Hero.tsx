import { styled } from '@mui/material/styles';

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '70vh',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 1,
  mixBlendMode: 'normal',
  filter: 'none',
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    height: '40vh',
    position: 'relative',
    top: 'auto',
    left: 'auto'
  }
}));

export default HeroImage;
<HeroImage
  src="/MotexFeb3.jpg"
  alt="Hero Background"
/>