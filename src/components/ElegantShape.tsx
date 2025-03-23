import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface ElegantShapeProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

const ElegantShape: React.FC<ElegantShapeProps> = ({
  className = '',
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]'
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            background: `linear-gradient(to right, ${gradient}, transparent)`,
            backdropFilter: 'blur(2px)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)'
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ElegantShape;