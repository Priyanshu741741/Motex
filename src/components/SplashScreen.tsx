import React, { useState, useEffect, memo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingPaths from './FloatingPaths';

const SplashContainer = styled(motion.div)({
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
  overflow: 'hidden',
  willChange: 'opacity'
});

const LogoContainer = styled(motion.div)({
  width: '200px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 2,
  willChange: 'transform, opacity'
});

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const title = '';
  const words = title.split(' ');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300); // Call onFinish after exit animation
    }, 2000); // Show splash screen for 2 seconds instead of 3

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <SplashContainer
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ position: 'absolute', inset: 0 }}>
            <FloatingPaths position={1} />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
          >
            <LogoContainer
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
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
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
                }}
              />
            </LogoContainer>

            <Box sx={{ mt: 4 }}>
              {words.map((word, wordIndex) => (
                <Box key={wordIndex} component="span" sx={{ display: 'inline-block', mr: 2 }}>
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.5 + wordIndex * 0.1 + letterIndex * 0.05,
                        type: 'spring',
                        stiffness: 150,
                        damping: 20,
                      }}
                      style={{
                        display: 'inline-block',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </Box>
              ))}
            </Box>
          </motion.div>
        </SplashContainer>
      )}
    </AnimatePresence>
  );
};

export default memo(SplashScreen);