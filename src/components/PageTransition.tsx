import React, { useState, useEffect, memo } from 'react';
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
  const [previousPath, setPreviousPath] = useState(location.pathname);
  const direction = getDirection(location.pathname, previousPath);

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ 
          opacity: 0,
          y: direction * 30, // Reduced movement for smoother transitions
          scale: 0.98
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{ 
          opacity: 0,
          y: direction * -30, // Reduced movement for smoother transitions
          scale: 0.98
        }}
        transition={{
          duration: 0.3, // Reduced duration for faster transitions
          ease: "easeInOut"
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden auto',
          willChange: 'transform, opacity' // Optimize browser rendering
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(PageTransition);