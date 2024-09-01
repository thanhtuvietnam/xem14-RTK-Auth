import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Box from '@mui/joy/Box';

const TooltipCom = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
      <Tooltip title='Delete'>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TooltipCom;
