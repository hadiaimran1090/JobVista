import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField, Avatar, Chip, Divider, Container, Link, Stack, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import Rating from '@mui/material/Rating';

const companies = [
  { name: 'Tech Solutions', color: '#4A154B' },
  { name: 'Amazon', color: '#FF9900' },
  { name: 'Marketify', color: '#E41B17' },
  { name: 'CodeWorks', color: '#0072C6' },
  { name: 'Creative Minds', color: '#00BFAE' },
];

const LandingPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      const params: any = {};
      if (searchTitle) params.search = searchTitle;
      if (searchCity) params.location = searchCity;
      const res = await axios.get('http://localhost:5000/api/jobs', { params });
      setJobs(res.data);
      setCarouselIndex(0); // Reset carousel on search
    };
    fetchJobs();
    // eslint-disable-next-line
  }, [searchTitle, searchCity]);

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(res.data.slice(-6)); // last 6 feedbacks
    };
    fetchFeedbacks();
  }, []);

  // Carousel logic (4 cards at a time)
  const visibleJobs = jobs.slice(carouselIndex, carouselIndex + 4);

  const handlePrev = () => {
    setCarouselIndex(prev => Math.max(prev - 4, 0));
  };

  const handleNext = () => {
    setCarouselIndex(prev => Math.min(prev + 4, jobs.length - 4));
  };

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
        <TextField
          label="Job Title"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          label="City"
          value={searchCity}
          onChange={e => setSearchCity(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          sx={{ px: 4 }}
          onClick={() => setCarouselIndex(0)}
        >
          Search
        </Button>
      </Box>

      {/* Featured Jobs Carousel */}
      <Box sx={{ px: 4, py: 6, textAlign: 'center', position: 'relative' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Find The Job That Qualify Your Life</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton
            onClick={handlePrev}
            disabled={carouselIndex === 0}
            sx={{ bgcolor: '#fff', boxShadow: 1, mr: 2 }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Stack direction="row" spacing={3} justifyContent="center" alignItems="stretch">
            {visibleJobs.map((job: any, idx) => (
              <Card
                key={job._id || idx}
                sx={{
                  width: 250,
                  minHeight: 180,
                  borderRadius: 3,
                  boxShadow: '10px 22px 12px 0 rgba(107, 15, 138, 0.1)',
                  bgcolor: '#fff',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  pointerEvents: 'none',
                  transition: 'box-shadow 0.7s',
                  '&:hover': { boxShadow: '0 4px 24px 0 rgba(37,99,235,0.18)' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar src={job.company_id?.logo} sx={{ width: 36, height: 36, mr: 1, bgcolor: '#e0e7ff' }}>
                    {job.company_name?.[0]}
                  </Avatar>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{job.company_name}</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: 17 }}>{job.title}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={job.location} size="small" variant="outlined" />
                  <Chip label={job.job_type} size="small" sx={{ bgcolor: '#22c55e', color: '#fff' }} />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                  {job.created_at ? job.created_at.slice(0, 10) : ''}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#2563eb', fontSize: 15 }}>
                  {job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : ''}
                </Typography>
              </Card>
            ))}
          </Stack>
          <IconButton
            onClick={handleNext}
            disabled={carouselIndex >= jobs.length - 4}
            sx={{ bgcolor: '#fff', boxShadow: 1, ml: 2 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ mt: 4, color: '#38bdf8', fontWeight: 700 }}>1000+ Jobs</Typography>
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

      {/* Client Testimonials with Arrows */}
      <Box sx={{ px: 4, py: 6, background: 'linear-gradient(90deg, #8ed6eeff 10%, #ca93caff 70%)', textAlign: 'center', position: 'relative' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>What Our Client Say About Us</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton
            onClick={() => setCarouselIndex(prev => Math.max(prev - 3, 0))}
            disabled={carouselIndex === 0}
            sx={{ bgcolor: '#fff', boxShadow: 1, mr: 2 }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Stack direction="row" spacing={4} justifyContent="center" alignItems="stretch" flexWrap="nowrap">
            {feedbacks.slice(carouselIndex, carouselIndex + 3).map(fb => (
              <Card
                key={fb._id}
                sx={{
                  width: 260,
                  minHeight: 150,
                  borderRadius: 3,
                  boxShadow: '13px 41px 24px 0 rgba(230, 76, 181, 0.1)',
                  bgcolor: '#fff',
                  p: 2,
                  mb: 2,
                  animation: 'fadeIn 0.7s',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'scale(0.95)' },
                    to: { opacity: 1, transform: 'scale(1)' }
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar src={fb.user?.profileImage} sx={{ width: 48, height: 48, mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{fb.user?.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#c042ceff', mb: 1 }}>{fb.user?.bio}</Typography>
                  <Rating value={fb.rating} readOnly sx={{ mb: 1 }} />
                  <Typography variant="body2">{fb.comment}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <IconButton
            onClick={() => setCarouselIndex(prev => Math.min(prev + 3, feedbacks.length - 3))}
            disabled={carouselIndex >= feedbacks.length - 3}
            sx={{ bgcolor: '#fff', boxShadow: 1, ml: 2 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
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
