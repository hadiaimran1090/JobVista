import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Card, CardContent, Chip, Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MessageIcon from '@mui/icons-material/Message';


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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', fontFamily: 'sans-serif', px: { xs: 1, md: 0 }, py: 0, width: '100vw', maxWidth: '100vw' }}>
      {/* Navbar */}
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 4, py: 2, bgcolor: '#fff', boxShadow: 1, mb: 4, width: '100%', mt: 0 }}>
        <IconButton sx={{ mr: 2 }}><BookmarkIcon sx={{ color: '#2563eb' }} /></IconButton>
        <IconButton sx={{ mr: 2 }}><MessageIcon sx={{ color: '#2563eb' }} /></IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" sx={{ color: '#1e293b', fontWeight: 600 }}>Mary Johnson</Typography>
          <IconButton onClick={handleAvatarClick}>
            <Avatar alt="Mary Johnson" src="https://randomuser.me/api/portraits/women/44.jpg" sx={{ width: 36, height: 36 }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MenuItem onClick={handleClose}>View Profile</MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* Search Section */}
      <Card sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: 2, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Find Your Dream Job</Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#64748b' }}>Discover opportunities that match your passion</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField fullWidth placeholder="Job title, company, or keywords" variant="outlined" size="small" />
          <TextField fullWidth placeholder="Location" variant="outlined" size="small" />
          <Button variant="contained" sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 600, px: 4, height: 40 }}>Search Jobs</Button>
        </Stack>
      </Card>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Filter Section */}
        <Card sx={{ minWidth: 260, p: 2, borderRadius: 3, boxShadow: 1, bgcolor: '#fff' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Filter Jobs</Typography>
          <Button variant="text" sx={{ color: '#2563eb', mb: 2, fontWeight: 600 }}>Clear All</Button>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Job Type</Typography>
          <Stack spacing={1}>
            <Chip label="Remote" variant="outlined" sx={{ fontWeight: 500 }} />
            <Chip label="Full-Time" variant="outlined" sx={{ fontWeight: 500 }} />
            <Chip label="Part-Time" variant="outlined" sx={{ fontWeight: 500 }} />
            <Chip label="Contract" variant="outlined" sx={{ fontWeight: 500 }} />
            <Chip label="Internship" variant="outlined" sx={{ fontWeight: 500 }} />
          </Stack>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>Location</Typography>
          <TextField size="small" placeholder="Location" variant="outlined" sx={{ mb: 2 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Salary Range</Typography>
          <Stack direction="row" spacing={1}>
            <TextField size="small" placeholder="Min Salary" variant="outlined" />
            <TextField size="small" placeholder="Max Salary" variant="outlined" />
          </Stack>
        </Card>
        {/* Jobs List */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Showing {jobs.length} jobs</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {jobs.map((job: Job, idx: number) => (
              <Card key={idx} sx={{ borderRadius: 3, boxShadow: 2, bgcolor: '#fff', p: 2, display: 'flex', flexDirection: 'column', position: 'relative', maxWidth: 350, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 48, height: 48 }}>
                    {job.title.split(' ').map(word => word[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', mb: 0 }}>{job.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>{job.company}</Typography>
                  </Box>
                  <IconButton sx={{ ml: 'auto' }}>
                    <BookmarkIcon sx={{ color: '#2563eb' }} />
                  </IconButton>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={job.location} variant="outlined" sx={{ fontWeight: 500 }} />
                  <Chip label={job.type} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 500 }} />
                  <Chip label={job.category} variant="outlined" sx={{ fontWeight: 500 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>{job.date}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{job.salary}</Typography>
                  {job.applied && (
                    <Chip label="Applied" sx={{ bgcolor: '#e41b17', color: '#fff', fontWeight: 600 }} />
                  )}
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default FindJobs;