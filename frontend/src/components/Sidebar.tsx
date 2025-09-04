import React from 'react';
import { Box, Typography, Stack, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem('token'); // if you use token
    navigate('/');
  };

  return (
    <Box sx={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: 220,
      bgcolor: '#1e293b',
      boxShadow: 3,
      py: 4,
      px: 2,
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      zIndex: 100,
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1, mb: 5 }}>JobVista</Typography>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Button
          variant="contained"
          startIcon={<DashboardIcon />}
          sx={{ bgcolor: '#2563eb', color: '#fff', boxShadow: 2, fontWeight: 600 }}
          onClick={() => navigate('/employer/dashboard')}
        >
          DASHBOARD
        </Button>
        <Button
          variant="text"
          startIcon={<PostAddIcon />}
          sx={{ color: '#fff', fontWeight: 500 }}
          onClick={() => navigate('/post-job')}
        >
          POST JOB
        </Button>
        <Button
          variant="text"
          startIcon={<WorkIcon />}
          sx={{ color: '#fff', fontWeight: 500 }}
          onClick={() => navigate('/manage-jobs')}
        >
          MANAGE JOBS
        </Button>
        <Button
          variant="text"
          startIcon={<BusinessIcon />}
          sx={{ color: '#fff', fontWeight: 500 }}
          onClick={() => navigate('/company-profile')}
        >
          COMPANY PROFILE
        </Button>
        <Button
          variant="text"
          startIcon={<MessageIcon />}
          sx={{ color: '#fff', fontWeight: 500 }}
          onClick={() => navigate('/employer/messages')}
        >
          MESSAGES
        </Button>
      </Stack>
      <Divider sx={{ my: 4, bgcolor: '#fff', width: '80%' }} />
      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        sx={{ mt: 'auto', width: '100%', fontWeight: 600, bgcolor: '#fff', color: '#e41b17', borderColor: '#e41b17', '&:hover': { bgcolor: '#e41b17', color: '#fff' } }}
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
    </Box>
  );
};

export default Sidebar;
