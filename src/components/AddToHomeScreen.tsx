import React, { useState, useEffect } from 'react';
import { Button, Snackbar, IconButton } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const AddToHomeScreen: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowSnackbar(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setShowSnackbar(false);
    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome} the installation`);

    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  if (!deferredPrompt) return null;

  return (
    <Snackbar
      open={showSnackbar}
      message="Install Motex Transport app"
      action={
        <>
          <Button
            color="primary"
            size="small"
            onClick={handleInstallClick}
            startIcon={<AddIcon />}
          >
            Install
          </Button>
          <IconButton
            size="small"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      sx={{
        '& .MuiSnackbarContent-root': {
          bgcolor: '#DE1F27',
          color: 'white',
        }
      }}
    />
  );
};

export default AddToHomeScreen;