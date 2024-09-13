import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const BackupLinkPlayer = React.memo(({ backupLink }) => {
  const [error, setError] = useState(null);

  return (
    <Box>
      {error && (
        <Box
          display='flex'
          alignItems='center'
          mb={2}
          color='error.main'>
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          <Typography variant='body2'>{error}</Typography>
        </Box>
      )}

      <Box>
        <iframe
          autoPlay={false}
          loading='lazy'
          allowFullScreen
          src={`${backupLink}?autoplay=0`}
          style={{ width: '100%' }}
          referrerPolicy='strict-origin-when-cross-origin'
          title='Link dự phòng'
          allow='accelerometer; clipboard-write; 
                 encrypted-media; gyroscope; 
                 picture-in-picture; web-share'
        />
      </Box>
    </Box>
  );
});
BackupLinkPlayer.displayName = 'BackupLinkPlayer';

export default BackupLinkPlayer;
