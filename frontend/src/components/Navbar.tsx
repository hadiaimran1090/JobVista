import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const SIDEBAR_WIDTH = 220; 
const Navbar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';
  const userImage = user.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg';
  const userRole = user.role || 'Guest';

  return (
    <Box sx={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      bgcolor: '#fff',
      boxShadow: 1,
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      minHeight: 48,
      px: 4,
      py: 1,
      justifyContent: 'space-between',
      marginLeft: `${SIDEBAR_WIDTH}px`, // Navbar ka left margin sidebar ki width ke barabar
    }}>
      {/* Welcome back! text */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>
        Welcome back!
      </Typography>
      {/* User Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar alt={userName} src={userImage} sx={{ width: 28, height: 28 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600, fontSize: '0.95rem' }}>{userName}</Typography>
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: 11 }}>
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;