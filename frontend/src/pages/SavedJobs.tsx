import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Chip, Avatar, IconButton, Stack } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();
  const userId = String(localStorage.getItem('userId') || '');
  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    const saved = res.data.filter((j: any) => Array.isArray(j.savedBy) && j.savedBy.includes(userId));
    setJobs(saved);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Unsave job handler
  const handleUnsaveJob = async (jobId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/jobs/${jobId}/unsave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (err) {
      alert('Error unsaving job');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      p: { xs: 2, md: 4 },
      background: 'linear-gradient(135deg, #6a91e6ff 15%, #1a539aff 30%)', // gradient blue
    }}>
      <Typography variant="h4" sx={{
        fontWeight: 700,
        mb: 4,
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 1
      }}>
        Saved Jobs
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 3,
        justifyContent: 'center'
      }}>
        {jobs.map((job: any) => (
          <Card key={job._id} sx={{
            borderRadius: 4,
            boxShadow: '0 4px 24px 0 rgba(37,99,235,0.15)',
            bgcolor: '#fff',
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: 340,
            width: '100%',
            minHeight: 200,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-6px) scale(1.03)',
              boxShadow: '0 8px 32px 0 rgba(37,99,235,0.25)'
            }
          }}
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ bgcolor: '#2563eb', mr: 2, width: 48, height: 48 }}
                src={job.company_id?.logo || undefined}
              >
                {!job.company_id?.logo &&
                  (job?.title || '').split(' ').map((word: string) => word[0]).join('')}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', mb: 0, fontSize: 19 }}>
                  {job?.title || ''}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontSize: 14 }}>
                  {job?.company_name || ''}
                </Typography>
              </Box>
              <IconButton
                sx={{ ml: 'auto' }}
                onClick={e => { e.stopPropagation(); handleUnsaveJob(job._id); }}
              >
                <BookmarkIcon sx={{
                  color: '#2563eb',
                  border: '1px solid #2563eb',
                  borderRadius: '4px',
                  bgcolor: '#e3f0ff'
                }} />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip label={job?.location || ''} variant="outlined" sx={{ fontWeight: 500, fontSize: 13 }} />
              <Chip label={job?.job_type || ''} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 500, fontSize: 13 }} />
            </Stack>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontSize: 14 }}>
              {job?.created_at ? job.created_at.slice(0, 10) : ''}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" sx={{
                fontWeight: 700,
                fontSize: 16,
                color: '#2563eb'
              }}>
                {job?.salary_min && job?.salary_max ? `$${job.salary_min} - $${job.salary_max}` : 'N/A'}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
      {jobs.length === 0 && (
        <Typography sx={{ textAlign: 'center', mt: 6, color: '#fff', fontSize: 18 }}>
          No saved jobs found.
        </Typography>
      )}
    </Box>
  );
};

export default SavedJobs;