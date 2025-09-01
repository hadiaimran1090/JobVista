import React from 'react';
import { Box, Button, Card, CardContent, Typography, TextField, MenuItem, Avatar, Chip, Divider, Container, Link, Stack } from '@mui/material';

const companies = [
  { name: 'Tech Solutions', color: '#4A154B' },
  { name: 'Amazon', color: '#FF9900' },
  { name: 'Marketify', color: '#E41B17' },
  { name: 'CodeWorks', color: '#0072C6' },
  { name: 'Creative Minds', color: '#00BFAE' },
];

const jobs = [
  { title: 'Product Sales Specialist', company: 'Tech Solutions', location: 'Remote', type: 'Full Time' },
  { title: 'Finance Manager', company: 'Amazon', location: 'NYC', type: 'Part Time' },
  { title: 'General Accountant', company: 'Marketify', location: 'LA', type: 'Full Time' },
  { title: 'HR Specialist', company: 'CodeWorks', location: 'Remote', type: 'Contract' },
];

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <Box sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fff', boxShadow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>JobVista</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="text">Find Jobs</Button>
          <Button variant="text">Post Jobs</Button>
          <Link href="/auth">
            <Button variant="outlined">Login</Button>
          </Link>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{ px: 4, py: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
            Find a Job With Your Interests and Abilities
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#64748b' }}>
            Find the best jobs to match your skills. Join top companies & grow your career.
          </Typography>
          <Link href="/auth">
            <Button variant="contained" size="large" sx={{ mb: 3 }}>Get Started</Button>
          </Link>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {companies.map((c) => (
              <Chip key={c.name} label={c.name} sx={{ bgcolor: c.color, color: '#fff', fontWeight: 500 }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {/* Illustration Placeholder */}
          <Box sx={{ width: 220, height: 220, bgcolor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar sx={{ width: 120, height: 120, bgcolor: '#38bdf8' }}>👩‍💻</Avatar>
          </Box>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 4, py: 2, bgcolor: '#fff', boxShadow: 1, borderRadius: 2, maxWidth: 600, mx: 'auto', mt: -4, mb: 4, display: 'flex', gap: 2 }}>
        <TextField select label="Job Title" defaultValue="Product Sales Specialist" sx={{ flex: 1 }}>
          {jobs.map((job) => (
            <MenuItem key={job.title} value={job.title}>{job.title}</MenuItem>
          ))}
        </TextField>
        <TextField label="City" defaultValue="lahore" sx={{ flex: 1 }} />
        <Button variant="contained" sx={{ px: 4 }}>Search</Button>
      </Box>

      {/* Featured Jobs (Moved here, just below search bar) */}
      <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Find The Job That Qualify Your Life</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          {jobs.map((job, idx) => (
            <Card key={idx} sx={{ py: 2, flex: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{job.title}</Typography>
                <Typography variant="body2" color="text.secondary">{job.company} - {job.location}</Typography>
                <Chip label={job.type} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Typography variant="h6" sx={{ mt: 4, color: '#38bdf8', fontWeight: 700 }}>100K+ Jobs</Typography>
      </Box>

      {/* How it Works */}
      <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>How it Work</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Card sx={{ py: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Step 1</Typography>
              <Typography>Register Account</Typography>
              <Typography variant="body2" color="text.secondary">Create your free account to get started.</Typography>
            </CardContent>
          </Card>
          <Card sx={{ py: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Step 2</Typography>
              <Typography>Find Job</Typography>
              <Typography variant="body2" color="text.secondary">Browse jobs and find your match.</Typography>
            </CardContent>
          </Card>
          <Card sx={{ py: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Step 3</Typography>
              <Typography>Apply Job</Typography>
              <Typography variant="body2" color="text.secondary">Send your CV and apply easily.</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Why You Contact Us */}
      <Box sx={{ px: 4, py: 6, bgcolor: '#fff', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Why You Contact Us</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Over 120+</Typography>
            <Typography variant="body2">Companies hiring</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Over 13k+</Typography>
            <Typography variant="body2">Active jobs</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Over 10k+</Typography>
            <Typography variant="body2">Successful placements</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Client Testimonials */}
      <Box sx={{ px: 4, py: 6, bgcolor: '#fff', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>What Our Client Say About Us</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Card sx={{ py: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                "Great platform! Helped me find my dream job quickly."
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#38bdf8' }}>A</Avatar>
                <Box>
                  <Typography variant="subtitle2">Ayesha</Typography>
                  <Typography variant="caption" color="text.secondary">Software Engineer</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Footer */}
      <Box sx={{ px: 0, py: 0, bgcolor: '#e0f2fe', mt: 8 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between" alignItems="flex-start" sx={{ py: 6 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>JobVista</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                The platform for finding and posting jobs. Grow your career or hire top talent easily.
              </Typography>
    
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Contact</Typography>
              <Typography variant="body2" color="text.secondary">Email: info@jobvista.com</Typography>
              <Typography variant="body2" color="text.secondary">Phone: +92 300 0000000</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Follow Us</Typography>
              <Stack direction="row" spacing={2}>
                <Link href="#" color="inherit">Facebook</Link>
                <Link href="#" color="inherit">LinkedIn</Link>
                <Link href="#" color="inherit">Twitter</Link>
              </Stack>
            </Box>
          </Stack>
          <Divider />
          <Box sx={{ py: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} JobVista. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
