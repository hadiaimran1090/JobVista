import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MessageIcon from '@mui/icons-material/Message';
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate, Link } from 'react-router-dom';

const Usernavbar: React.FC = () => {
  // User info
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';
  const userImage = user.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg';
  const userRole = user.role || 'Guest';

  // Navbar menu handlers
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem('token');
    navigate('/');
  };

  const handleFeedback = () => {
    navigate('/feedback');
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 3,
      py: 1.5,
      bgcolor: '#fff',
      boxShadow: 1,
      width: '100%',
      minHeight: 56,
      mb: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GridViewIcon sx={{ color: '#2563eb', fontSize: 28, mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', fontSize: 20 }}>JobVista</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Saved icon with link to Saved Jobs */}
        <Link to="/saved-jobs">
          <IconButton>
            <BookmarkIcon sx={{ color: '#2563eb' }} />
          </IconButton>
        </Link>
        <IconButton onClick={() => navigate('/messages')}>
          <MessageIcon sx={{ color: '#2563eb' }} />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleAvatarClick}>
            <Avatar alt={userName} src={userImage} sx={{ width: 36, height: 36 }} />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600, fontSize: 15 }}>{userName}</Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: 12 }}>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</Typography>
          </Box>
        </Box>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>View Profile</MenuItem>
          <MenuItem onClick={handleFeedback}>Feedback</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Usernavbar;