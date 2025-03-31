import React, { useState, useEffect } from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const AddToHomeScreen: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome} the installation`);
    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <Button
      variant="contained"
      onClick={handleInstallClick}
      startIcon={<AddIcon />}
      sx={{
        bgcolor: '#DE1F27',
        color: 'white',
        textTransform: 'none',
        fontFamily: '"Circular Std Book", sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        borderRadius: '50px',
        px: 3,
        py: 1,
        minWidth: '130px',
        whiteSpace: 'nowrap',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          bgcolor: '#c41922',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
        },
        ml: 2
      }}
    >
      {isMobile ? 'Install App' : 'Add to Home Screen'}
    </Button>
  );
};

export default AddToHomeScreen;