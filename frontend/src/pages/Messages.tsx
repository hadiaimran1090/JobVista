import React from 'react';
import { Box, Typography, Card } from '@mui/material';

const Messages: React.FC = () => {
  // You can fetch messages from backend here
  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', px: 4, py: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Messages</Typography>
      <Card sx={{ p: 2, mb: 2 }}>
        <Typography>
          Congratulations! You have been selected for interview. Please be available tomorrow.
        </Typography>
      </Card>
      {/* List other messages here */}
    </Box>
  );
};

export default Messages;