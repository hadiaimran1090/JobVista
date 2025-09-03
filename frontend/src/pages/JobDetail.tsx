import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, Dialog, DialogTitle, DialogContent, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`).then(res => {
      setJob(res.data);
      const userId = localStorage.getItem('userId');
      setApplied(res.data.applicants?.includes(userId));
    }).catch(err => {
      console.error('Error fetching job detail:', err);
    });
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApplied(true);
    localStorage.setItem('justAppliedJobId', id as string);
  };

  if (!job) return <Typography>Loading...</Typography>;

  const company = job.company_id;

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6a91e6ff 15%, #0d4487ff  50%)', // gradient blue
      width: '100vw',
      position: 'relative'
    }}>
      {/* Cross icon for closing the card */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 32,
          right: 32,
          zIndex: 10,
          bgcolor: '#fff',
          boxShadow: 2
        }}
        onClick={() => navigate(-1)}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{
        p: 3,
        maxWidth: 700,
        width: '100%',
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: '0 4px 24px 0 rgba(14, 84, 236, 0.15)', // blue shadow
        position: 'relative'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{job.title}</Typography>
        <Typography variant="subtitle1">{job.company_name} - {job.location}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip label={job.job_type} sx={{ bgcolor: '#22c55e', color: '#fff' }} />
          <Chip label={job.status} />
        </Stack>
        <Typography sx={{ mt: 2 }}>{job.details}</Typography>
        <Typography sx={{ mt: 2, color: '#9a12b1ff' }}>Requirements: {job.requirements}</Typography>
        <Typography sx={{ mt: 2, fontWeight: 600 }}>
          Salary: {job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : 'N/A'}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleApply} disabled={applied}>
            {applied ? 'Applied' : 'Apply Now'}
          </Button>
          {company && (
            <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>
              View Company Profile
            </Button>
          )}
        </Box>
        {/* Company Profile Modal */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 0 }}>
            Company Profile
            <IconButton onClick={() => setOpen(false)} sx={{ ml: 1 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {company ? (
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Avatar src={company.logo} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                <Typography variant="h6">{company.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{company.email}</Typography>
                <Typography variant="body2">{company.about}</Typography>
              </Box>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default JobDetail;