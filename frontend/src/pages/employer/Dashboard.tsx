import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Box, Typography, Card, CardContent, Stack, Chip, Avatar } from '@mui/material';

const stats = [
  { label: 'Active Jobs', value: 3, color: '#25a9ebff' },
  { label: 'Total Applicants', value: 11, color: '#c516ffff' },
  { label: 'Hired', value: 3, color: '#f67288ff' },
];

const jobs = [
  { title: 'Financial Analyst', location: 'Mumbai, India', date: '5th 07 2025', status: 'Active' },
  { title: 'DevOps Engineer', location: 'Amsterdam, Netherlands', date: '5th 07 2025', status: 'Active' },
  { title: 'Sales Manager', location: 'Toronto, Canada', date: '5th 07 2025', status: 'Active' },
];

const applications = [
  { name: 'David Jackson', job: 'Financial Analyst', daysAgo: 3 },
  { name: 'David Jackson', job: 'DevOps Engineer', daysAgo: 3 },
  { name: 'David Jackson', job: 'Sales Manager', daysAgo: 3 },
];

const Dashboard: React.FC = () => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';
  const userImage = user.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg';
  const userRole = user.role || 'Guest';

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', overflow: 'hidden', width: '100vw' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minHeight: '100vh', overflowY: 'auto', overflowX: 'hidden', ml: '220px', px: 0, width: '100%', maxWidth: '100vw' }}>
        {/* Navbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, py: 2, bgcolor: '#fff', boxShadow: 1, width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.3rem' }}>Welcome back!</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar alt={userName} src={userImage} sx={{ width: 32, height: 32 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600, fontSize: '1rem' }}>{userName}</Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: 12 }}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ px: 4, mb: 3, color: '#64748b', fontSize: '0.95rem' }}>Here's what's happening with your jobs today.</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3, px: 4 }}>
          {stats.map((stat) => (
            <Card key={stat.label} sx={{ flex: 1, bgcolor: stat.color, color: '#fff', boxShadow: 3, minWidth: 0, borderRadius: 2, height: 120 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '1rem' }}>{stat.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '2rem' }}>{stat.value}</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>100%</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ px: 4 }}>
          <Card sx={{ flex: 1, boxShadow: 2, borderRadius: 2, minWidth: 0 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#2563eb', fontWeight: 600, fontSize: '1rem' }}>Recent Job Posts</Typography>
              {jobs.map((job) => (
                <Box key={job.title} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.98rem' }}>{job.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>{job.location} - {job.date}</Typography>
                  </Box>
                  <Chip label={job.status} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 600, fontSize: '0.85rem', height: 24 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, boxShadow: 2, borderRadius: 2, minWidth: 0 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#8b5cf6', fontWeight: 600, fontSize: '1rem' }}>Recent Applications</Typography>
              {applications.map((app, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 700, width: 28, height: 28, fontSize: '0.95rem' }}>{app.name.split(' ').map(n => n[0]).join('')}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.98rem' }}>{app.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>{app.job}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>{app.daysAgo} days ago</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
