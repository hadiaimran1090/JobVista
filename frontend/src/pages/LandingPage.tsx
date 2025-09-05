import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField, Avatar, Chip, Divider, Container, Link, Stack, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Star from '@mui/icons-material/Star';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

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

  // Auto-slide effect for testimonials
  useEffect(() => {
    if (feedbacks.length <= 3) return;
    const interval = setInterval(() => {
      setTestimonialIndex(prev =>
        prev >= feedbacks.length - 3 ? 0 : prev + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  // Carousel logic (4 cards at a time)
  const visibleJobs = jobs.slice(carouselIndex, carouselIndex + 4);

  const handlePrev = () => {
    setCarouselIndex(prev => Math.max(prev - 4, 0));
  };

  const handleNext = () => {
    setCarouselIndex(prev => Math.min(prev + 4, jobs.length - 4));
  };

  const handleTestimonialPrev = () => {
    setTestimonialIndex(prev =>
      prev <= 0 ? feedbacks.length - 3 : prev - 1
    );
  };
  const handleTestimonialNext = () => {
    setTestimonialIndex(prev =>
      prev >= feedbacks.length - 3 ? 0 : prev + 1
    );
  };

  const fadeIn = {
    animation: 'fadeIn 1s',
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    }
  };

  // Animation for testimonials (continuous bounce, pause on hover)
  const testimonialAnim = {
    animation: 'testimonialBounce 2s infinite',
    '@keyframes testimonialBounce': {
      '0%': { transform: 'translateY(0)' },
      '20%': { transform: 'translateY(-12px)' },
      '40%': { transform: 'translateY(0)' },
      '100%': { transform: 'translateY(0)' },
    },
    transition: 'transform 0.3s',
    '&:hover': {
      animationPlayState: 'paused',
      boxShadow: '0 4px 24px 0 rgba(37,99,235,0.18)',
      transform: 'scale(1.05)',
    },
  };

  const howItWorksCardAnim = {
    transition: 'transform 0.4s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.07) rotate(-2deg)',
      boxShadow: '0 8px 32px 0 rgba(56,189,248,0.18)',
      zIndex: 1,
    },
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' ,width: '100vw'}}>
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
      <Box sx={{ px: 4, py: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6, ...fadeIn }}>
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
      <Box sx={{ px: 4, py: 6, textAlign: 'center', position: 'relative', ...fadeIn }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Find The Job That Qualify Your Life</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton
            onClick={handlePrev}
            disabled={carouselIndex === 0}
            sx={{ bgcolor: '#dce9ecff', boxShadow: 1, mr: 2 }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Stack direction="row" spacing={3} justifyContent="center" alignItems="stretch">
            {visibleJobs.map((job: any, idx) => (
              <Card
                key={job._id || idx}
                sx={{
                  width: 270,
                  minHeight: 260,
                  borderRadius: 4,
                  boxShadow: '0 8px 32px 0 rgba(56,189,248,0.10)',
                  bgcolor: '#fff',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.7s',
                  '&:hover': { boxShadow: '0 8px 32px 0 rgba(56,189,248,0.18)', transform: 'scale(1.05)' },
                  ...fadeIn
                }}
              >
                <Avatar src={job.company_id?.logo} sx={{ width: 48, height: 48, bgcolor: '#e0e7ff', mb: 1 }}>
                  {job.company_name?.[0]}
                </Avatar>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3378e7ff', mb: 0.5 }}>
                  {job.company_name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: 18, color: '#1e293b' }}>
                  {job.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={job.location} size="small" variant="outlined" />
                  <Chip label={job.job_type} size="small" sx={{ bgcolor: '#22c55e', color: '#fff' }} />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                  {job.created_at ? job.created_at.slice(0, 10) : ''}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#38bdf8', fontSize: 16 }}>
                  {job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : ''}
                </Typography>
                <Divider sx={{ my: 1, width: '80%' }} />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1, bgcolor: '#5353ccff', color: '#fff', borderRadius: 2 }}
                  onClick={() => setOpenDialog(true)}
                >
                  Apply Now
                </Button>
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

      {/* Apply Now Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
          Apply for Job
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{ ml: 2 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ py: 2 }}>
            Please login or create your account to apply for jobs.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link href="/auth">
            <Button variant="contained">Login / Register</Button>
          </Link>
        </DialogActions>
      </Dialog>

      {/* How it Works */}
      <Box sx={{ px: 4, py: 6, textAlign: 'center', ...fadeIn }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>How it Work</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Card sx={{ py: 3, flex: 1, ...howItWorksCardAnim }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Step 1</Typography>
              <Typography>Register Account</Typography>
              <Typography variant="body2" color="text.secondary">Create your free account to get started.</Typography>
            </CardContent>
          </Card>
          <Card sx={{ py: 3, flex: 1, ...howItWorksCardAnim }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Step 2</Typography>
              <Typography>Find Job</Typography>
              <Typography variant="body2" color="text.secondary">Browse jobs and find your match.</Typography>
            </CardContent>
          </Card>
          <Card sx={{ py: 3, flex: 1, ...howItWorksCardAnim }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Step 3</Typography>
              <Typography>Apply Job</Typography>
              <Typography variant="body2" color="text.secondary">Send your CV and apply easily.</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Why You Contact Us */}
      <Box sx={{ px: 4, py: 6, bgcolor: '#fff', textAlign: 'center', ...fadeIn }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Why You Contact Us</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Box sx={{ border: '2px solid #eee', borderRadius: 2, p: 2, flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Over 120+</Typography>
            <Typography variant="body2">Companies hiring</Typography>
          </Box>
          <Box sx={{ border: '2px solid #eee', borderRadius: 2, p: 2, flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Over 13k+</Typography>
            <Typography variant="body2">Active jobs</Typography>
          </Box>
          <Box sx={{ border: '2px solid #eee', borderRadius: 2, p: 2, flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#38bdf8', fontWeight: 700 }}>Over 10k+</Typography>
            <Typography variant="body2">Successful placements</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Client Testimonials Slider Section */}
      <Box sx={{
        px: 4,
        py: 6,
        bgcolor: 'linear-gradient(135deg, #86c4f6 0%, #38bdf8 100%)',
        textAlign: 'center',
        position: 'relative',
        ...fadeIn
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#0f0e0eff' }}>What Our Users Say</Typography>
        <Box sx={{ position: 'relative', maxWidth: 1100, mx: 'auto', overflow: 'hidden' }}>
          <IconButton
            onClick={handleTestimonialPrev}
            sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2, bgcolor: '#fff', boxShadow: 1 }}
            disabled={feedbacks.length <= 3}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)',
              transform: `translateX(-${testimonialIndex * 370}px)`,
              gap: 4,
              minHeight: 320,
            }}
          >
            {feedbacks.map((fb, i) => {
              const colors = ['#ca3ef4ff', '#5255f9ff', '#38bdf8'];
              const cardColor = colors[i % colors.length];
              return (
                <Card
                  key={fb._id || i}
                  sx={{
                    minWidth: 350,
                    maxWidth: 350,
                    mx: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px 0 rgba(56,189,248,0.12)',
                    bgcolor: '#fff',
                    position: 'relative',
                    p: 0,
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    animation: 'testimonialBounce 2s infinite',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      animationPlayState: 'paused',
                      boxShadow: '0 4px 24px 0 rgba(37,99,235,0.18)',
                      transform: 'scale(1.05)',
                    },
                    '@keyframes testimonialBounce': {
                      '0%': { transform: 'translateY(0)' },
                      '20%': { transform: 'translateY(-12px)' },
                      '40%': { transform: 'translateY(0)' },
                      '100%': { transform: 'translateY(0)' },
                    },
                  }}
                >
                  <Box sx={{ px: 3, pt: 4, pb: 2 }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <text x="2" y="20" fontSize="32" fill={cardColor} fontWeight="bold">“</text>
                    </svg>
                    <Typography variant="body2" sx={{ color: '#64748b', fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
                      "{fb.comment}"
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 0.5,  marginBottom: '7px'}}>
                      <Rating
                        name="read-only"
                        value={fb.rating || 5}
                      />
                    </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 80,
                      bgcolor: cardColor,
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40,
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      src={fb.user?.profileImage || '/default-user.png'}
                      sx={{
                        width: 64,
                        height: 64,
                        border: '3px solid #fff',
                        position: 'absolute',
                        top: -32,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        marginTop: '2px',
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, mt: 5 }}>
                      {fb.user?.name || "Anonymous"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#f0f9ff', fontSize: 12 }}>
                      {fb.user?.bio || "No Bio Info"}
                    </Typography>
            
                  </Box>
                </Card>
              );
            })}
          </Box>
          <IconButton
            onClick={handleTestimonialNext}
            sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2, bgcolor: '#fff', boxShadow: 1 }}
            disabled={feedbacks.length <= 3}
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
                <Link href="#" color="inherit"><FacebookIcon /></Link>
                <Link href="#" color="inherit"><LinkedInIcon /></Link>
                <Link href="#" color="inherit"><TwitterIcon /></Link>
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
