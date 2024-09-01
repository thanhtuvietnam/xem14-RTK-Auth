import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const BackupLinkPlayer = ({ mainLink, backupLink, onLinkChange }) => {
  const [showBackup, setShowBackup] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setShowBackup(false);
    setError(null);
  }, [mainLink, backupLink]);

  const handleMainError = () => {
    setError("Main link failed to load. Try the backup link.");
    setShowBackup(true);
  };

  const handleBackupClick = () => {
    onLinkChange(backupLink);
  };

  return (
    <Box>
      {error && (
        <Box display="flex" alignItems="center" mb={2} color="error.main">
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
      {showBackup && backupLink && (
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleBackupClick}
          startIcon={<ErrorOutlineIcon />}
        >
          Try Backup Link
        </Button>
      )}
      <video
        src={mainLink}
        onError={handleMainError}
        style={{ width: '100%', display: showBackup ? 'none' : 'block' }}
        controls
      />
    </Box>
  );
};

export default BackupLinkPlayer;