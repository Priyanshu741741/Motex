import React, { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const SplashContainer = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000000',
  zIndex: 9999,
}));

const LogoContainer = styled(motion.div)({
  width: '200px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Call onFinish after exit animation
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <SplashContainer
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoContainer
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <Box
              component="img"
              src="/MOTEX+Logo.png"
              alt="MOTEX Logo"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
              }}
            />
          </LogoContainer>
        </SplashContainer>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;