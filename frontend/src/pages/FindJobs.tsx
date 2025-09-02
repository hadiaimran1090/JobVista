import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Card, Chip, Avatar, Divider, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Usernavbar from '../components/Usernavbar';

const FindJobs: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const navigate = useNavigate();
  const locationHook = useLocation();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Fetch jobs from API
  const fetchJobs = async () => {
    const params: any = {};
    if (search) params.search = search;
    if (jobType) params.job_type = jobType;
    if (location) params.location = location;
    if (salaryMin) params.salary_min = salaryMin;
    if (salaryMax) params.salary_max = salaryMax;
    const res = await axios.get('http://localhost:5000/api/jobs', { params });
    setJobs(res.data);
    setSavedJobs(res.data.filter((j: any) => j.savedBy?.includes(userId)).map((j: any) => j._id));
    setAppliedJobs(res.data.filter((j: any) => j.applicants?.includes(userId)).map((j: any) => j._id));
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [search, jobType, location, salaryMin, salaryMax]);

  // Sync applied jobs if redirected from detail page
  useEffect(() => {
    const appliedJobId = localStorage.getItem('justAppliedJobId');
    if (appliedJobId && !appliedJobs.includes(appliedJobId)) {
      setAppliedJobs([...appliedJobs, appliedJobId]);
      localStorage.removeItem('justAppliedJobId');
    }
  }, [locationHook, appliedJobs]);

  // Save/Unsave job handler
  const handleToggleSaveJob = async (jobId: string) => {
    try {
      if (savedJobs.includes(jobId)) {
        // Unsave
        await axios.post(`http://localhost:5000/api/jobs/${jobId}/unsave`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedJobs(savedJobs.filter(id => id !== jobId));
      } else {
        // Save
        await axios.post(`http://localhost:5000/api/jobs/${jobId}/save`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedJobs([...savedJobs, jobId]);
      }
    } catch (err) {
      alert('Error updating saved job');
    }
  };

  // Apply job handler
  const handleApplyJob = async (jobId: string) => {
    await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAppliedJobs([...appliedJobs, jobId]);
  };

  // Handle filter change
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobType(event.target.checked ? event.target.name : '');
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', width: '100vw', maxWidth: '100vw' }}>
      <Usernavbar />
      {/* Search Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 3,
        mb: 2,
        width: '100%',
      }}>
        <Card sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: 2,
          width: '90vw',
          maxWidth: 1100,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          bgcolor: '#fff',
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'left', width: '100%' }}>
            Find Your Dream Job
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: '#64748b', textAlign: 'left', width: '100%' }}>
            Discover opportunities that match your passion
          </Typography>
          <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              placeholder="Job title, company, or keywords"
              variant="outlined"
              size="medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ bgcolor: '#f6fbff', borderRadius: 2 }}
            />
            <TextField
              fullWidth
              placeholder="Location"
              variant="outlined"
              size="medium"
              value={location}
              onChange={e => setLocation(e.target.value)}
              sx={{ bgcolor: '#f6fbff', borderRadius: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                px: 4,
                height: 48,
                borderRadius: 2,
                boxShadow: 0,
              }}
              onClick={fetchJobs}
            >
              Search Jobs
            </Button>
          </Stack>
        </Card>
      </Box>

      {/* Filter + Jobs Section */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        maxWidth: 1200,
        mx: 'auto',
        mt: 2,
        alignItems: 'flex-start',
        width: '90vw',
      }}>
        {/* Filter Section */}
        <Card sx={{
          minWidth: 200,
          maxWidth: 240,
          p: 2,
          borderRadius: 3,
          boxShadow: 1,
          bgcolor: '#fff',
          alignSelf: 'flex-start',
          height: 'fit-content',
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: 16 }}>Filter Jobs</Typography>
          <Button variant="text" sx={{ color: '#2563eb', mb: 1, fontWeight: 600, fontSize: 13, px: 0 }} onClick={() => { setJobType(''); setLocation(''); setSalaryMin(''); setSalaryMax(''); }}>Clear All</Button>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: 13 }}>Job Type</Typography>
          <Stack spacing={0.5}>
            {['full-time', 'part-time', 'remote', 'contract', 'internship'].map(type => (
              <FormControlLabel
                key={type}
                control={<Checkbox size="small" name={type} checked={jobType === type} onChange={handleTypeChange} />}
                label={<Typography sx={{ fontSize: 13 }}>{type.charAt(0).toUpperCase() + type.slice(1)}</Typography>}
                sx={{ ml: 0 }}
              />
            ))}
          </Stack>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, fontSize: 13 }}>Location</Typography>
          <TextField size="small" placeholder="Type location..." variant="outlined" sx={{ mb: 1 }} value={location} onChange={e => setLocation(e.target.value)} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1, fontSize: 13 }}>Salary Range</Typography>
          <Stack direction="row" spacing={1}>
            <TextField size="small" placeholder="Min" variant="outlined" sx={{ width: 60 }} value={salaryMin} onChange={e => setSalaryMin(e.target.value)} />
            <TextField size="small" placeholder="Max" variant="outlined" sx={{ width: 60 }} value={salaryMax} onChange={e => setSalaryMax(e.target.value)} />
          </Stack>
        </Card>
        {/* Jobs List */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Showing {jobs.length} jobs</Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 2 columns for desktop
            gap: 2,
          }}>
            {jobs.map((job: any) => (
              <Card key={job._id || job.id} sx={{
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: '#fff',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                maxWidth: 500,
                width: '100%',
                minHeight: 180,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 4 }
              }}
                onClick={() => navigate(`/job/${job._id}`)}
              >
                {/* Applied chip right bottom corner */}
                {appliedJobs.includes(job._id) && (
                  <Chip
                    label="Applied"
                    sx={{
                      bgcolor: '#e41b17',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 12,
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      zIndex: 2
                    }}
                  />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative' }}>
                  <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 44, height: 44 }}>
                    {(job.title || '').split(' ').map((word: string) => word[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', mb: 0, fontSize: 18 }}>{job.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', fontSize: 13 }}>
                      <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      {job.company_name}
                    </Typography>
                  </Box>
                  {/* Saved Icon */}
                  <IconButton
                    sx={{ ml: 'auto' }}
                    onClick={e => { e.stopPropagation(); handleToggleSaveJob(job._id); }}
                  >
                    <BookmarkIcon sx={{
                      color: savedJobs.includes(job._id) ? '#2563eb' : '#fff',
                      border: '1px solid #2563eb',
                      borderRadius: '4px',
                      bgcolor: savedJobs.includes(job._id) ? '#e3f0ff' : '#2563eb'
                    }} />
                  </IconButton>
                </Box>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={job.location} variant="outlined" sx={{ fontWeight: 500, fontSize: 12 }} />
                  <Chip label={job.job_type} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 500, fontSize: 12 }} />
                </Stack>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: 13 }}>{job.created_at?.slice(0,10)}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>
                    {job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : 'N/A'}
                  </Typography>
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