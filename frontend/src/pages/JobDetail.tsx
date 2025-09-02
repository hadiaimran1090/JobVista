import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`).then(res => {
      setJob(res.data);
      const userId = localStorage.getItem('userId');
      setApplied(res.data.applicants?.includes(userId));
    });
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApplied(true);
    localStorage.setItem('justAppliedJobId', id as string); // Sync with FindJobs
  };

  if (!job) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: 'auto', bgcolor: '#fff', borderRadius: 2, boxShadow: 2, mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>{job.title}</Typography>
      <Typography variant="subtitle1">{job.company_name} - {job.location}</Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Chip label={job.job_type} sx={{ bgcolor: '#22c55e', color: '#fff' }} />
        <Chip label={job.status} />
      </Stack>
      <Typography sx={{ mt: 2 }}>{job.details}</Typography>
      <Typography sx={{ mt: 2, color: '#64748b' }}>Requirements: {job.requirements}</Typography>
      <Typography sx={{ mt: 2, fontWeight: 600 }}>
        Salary: {job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : 'N/A'}
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleApply} disabled={applied}>
          {applied ? 'Applied' : 'Apply Now'}
        </Button>
      </Box>
    </Box>
  );
};

export default JobDetail;