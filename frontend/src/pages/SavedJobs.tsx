import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Chip, Avatar, IconButton, Stack } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();
  const userId = String(localStorage.getItem('userId') || '');

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('http://localhost:5000/api/jobs');
      console.log('All jobs:', res.data); // Debug: All jobs from API
      const saved = res.data.filter((j: any) => {
        console.log('Checking job:', j.title, 'savedBy:', j.savedBy, 'userId:', userId);
        return Array.isArray(j.savedBy) && j.savedBy.includes(userId);
      });
      console.log('Filtered saved jobs:', saved); // Debug: Filtered jobs
      setJobs(saved);
    };
    fetchJobs();
  }, []);

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', width: '100vw', maxWidth: '100vw', p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Saved Jobs</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
        gap: 2,
      }}>
        {jobs.map((job: any) => (
          <Card key={job._id} sx={{
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
            cursor: 'pointer'
          }}
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 44, height: 44 }}>
                {(job?.title || '').split(' ').map((word: string) => word[0]).join('')}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', mb: 0, fontSize: 18 }}>
                  {job?.title || ''}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', fontSize: 13 }}>
                  {job?.company_name || ''}
                </Typography>
              </Box>
              <IconButton sx={{ ml: 'auto' }}>
                <BookmarkIcon sx={{ color: '#2563eb' }} />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={0.7} sx={{ mb: 1 }}>
              <Chip label={job?.location || ''} variant="outlined" sx={{ fontWeight: 500, fontSize: 12 }} />
              <Chip label={job?.job_type || ''} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 500, fontSize: 12 }} />
            </Stack>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: 13 }}>
              {job?.created_at ? job.created_at.slice(0, 10) : ''}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 15 }}>
                {job?.salary_min && job?.salary_max ? `$${job.salary_min} - $${job.salary_max}` : 'N/A'}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SavedJobs;