import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Card, Chip, Avatar, Divider, IconButton, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MessageIcon from '@mui/icons-material/Message';
import GridViewIcon from '@mui/icons-material/GridView';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

const FindJobs: React.FC = () => {
  // Sample jobs data
  type Job = {
    title: string;
    company: string;
    location: string;
    type: string;
    category: string;
    date: string;
    salary: string;
    applied?: boolean;
  };

  const jobs: Job[] = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      location: 'Remote',
      type: 'Full-Time',
      category: 'IT',
      date: '2025-08-30',
      salary: '$80,000',
      applied: true,
    },
    {
      title: 'Backend Developer',
      company: 'InnovateX',
      location: 'New York',
      type: 'Contract',
      category: 'IT',
      date: '2025-08-28',
      salary: '$90,000',
    },
  ];

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
    // Clear any auth tokens if used
    // localStorage.removeItem('token');
    navigate('/');
  };

  const handleFeedback = () => {
    // Redirect to feedback page or open modal
    navigate('/feedback');
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', fontFamily: 'sans-serif', width: '100vw', maxWidth: '100vw' }}>
      {/* Navbar */}
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
          <IconButton><BookmarkIcon sx={{ color: '#2563eb' }} /></IconButton>
          <IconButton><MessageIcon sx={{ color: '#2563eb' }} /></IconButton>
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
            <MenuItem onClick={handleClose}>View Profile</MenuItem>
            <MenuItem onClick={handleFeedback}>Feedback</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Search Section */}
      <Card sx={{
        mb: 2,
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
        maxWidth: 900,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Find Your Dream Job</Typography>
        <Typography variant="body2" sx={{ mb: 1, color: '#64748b' }}>Discover opportunities that match your passion</Typography>
        <Stack direction="row" spacing={1}>
          <TextField fullWidth placeholder="Job title, company, or keywords" variant="outlined" size="small" />
          <TextField fullWidth placeholder="Location" variant="outlined" size="small" />
          <Button variant="contained" sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 600, px: 3, height: 40 }}>Search</Button>
        </Stack>
      </Card>

      {/* Filter + Jobs Section */}
      <Box sx={{ display: 'flex', gap: 0.7, maxWidth: 1200, mx: 'auto', mt: 1 }}>
        {/* Filter Section */}
        <Card sx={{
          minWidth: 170,
          maxWidth: 210,
          p: 2,
          borderRadius: 3,
          boxShadow: 1,
          bgcolor: '#fff',
          alignSelf: 'flex-start',
          height: 'fit-content'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: 16 }}>Filter Jobs</Typography>
          <Button variant="text" sx={{ color: '#2563eb', mb: 1, fontWeight: 600, fontSize: 13, px: 0 }}>Clear All</Button>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: 13 }}>Job Type</Typography>
          <Stack spacing={0.5}>
            {['Remote', 'Full-Time', 'Part-Time', 'Contract', 'Internship'].map(type => (
              <FormControlLabel
                key={type}
                control={<Checkbox size="small" />}
                label={<Typography sx={{ fontSize: 13 }}>{type}</Typography>}
                sx={{ ml: 0 }}
              />
            ))}
          </Stack>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, fontSize: 13 }}>Location</Typography>
          <TextField
            size="small"
            placeholder="Type location..."
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, fontSize: 13 }}>Salary Range</Typography>
          <Stack direction="row" spacing={1}>
            <TextField size="small" placeholder="Min" variant="outlined" sx={{ width: 60 }} />
            <TextField size="small" placeholder="Max" variant="outlined" sx={{ width: 60 }} />
          </Stack>
        </Card>
        {/* Jobs List */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Showing {jobs.length} jobs</Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, // 3 cards per row on medium+ screens
            gap: 0.3, // very little space between job cards
          }}>
            {jobs.map((job: Job, idx: number) => (
              <Card key={idx} sx={{
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: '#fff',
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                maxWidth: 340,
                width: '100%',
                minHeight: 180,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 44, height: 44 }}>
                    {job.title.split(' ').map(word => word[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', mb: 0, fontSize: 18 }}>{job.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', fontSize: 13 }}>
                      <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      {job.company}
                    </Typography>
                  </Box>
                  <IconButton sx={{ ml: 'auto' }}>
                    <BookmarkIcon sx={{ color: '#2563eb' }} />
                  </IconButton>
                </Box>
                <Stack direction="row" spacing={0.7} sx={{ mb: 1 }}>
                  <Chip label={job.location} variant="outlined" sx={{ fontWeight: 500, fontSize: 12 }} />
                  <Chip label={job.type} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 500, fontSize: 12 }} />
                  <Chip label={job.category} variant="outlined" sx={{ fontWeight: 500, fontSize: 12 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: 13 }}>{job.date}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>{job.salary}</Typography>
                  {job.applied && (
                    <Chip label="Applied" sx={{ bgcolor: '#e41b17', color: '#fff', fontWeight: 600, fontSize: 12 }} />
                  )}
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FindJobs;