import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const navOrder = [
  '/',
  '/services',
  '/about-us',
  '/instant-quote',
  '/gallery',
  '/contact-us'
];

const getDirection = (currentPath: string, previousPath: string): number => {
  const currentIndex = navOrder.indexOf(currentPath);
  const previousIndex = navOrder.indexOf(previousPath);
  
  // If either path is not in navOrder, default to right-to-left animation
  if (currentIndex === -1 || previousIndex === -1) return -1;
  
  // Return 1 for right-to-left (forward), -1 for left-to-right (backward)
  return currentIndex > previousIndex ? 1 : -1;
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = React.useState(location.pathname);
  const direction = getDirection(location.pathname, previousPath);

  React.useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ 
          opacity: 0,
          y: direction * 50,
          scale: 0.97
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{ 
          opacity: 0,
          y: direction * -50,
          scale: 0.97
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden auto'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;