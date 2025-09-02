import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Button, Avatar, Stack, Chip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const ApplicationsOverview: React.FC = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [rejectedApplicants, setRejectedApplicants] = useState<string[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
    setJob(res.data);
    // Fetch applicant details
    if (res.data.applicants && res.data.applicants.length > 0) {
      const usersRes = await axios.post(
        'http://localhost:5000/api/users/bulk',
        { ids: res.data.applicants },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants(usersRes.data);
    }
    // Set selected/rejected from job model if present
    setSelectedApplicants(res.data.selectedApplicants || []);
    setRejectedApplicants(res.data.rejectedApplicants || []);
  };

  // Select applicant handler
  const handleSelect = async (applicantId: string) => {
    await axios.post(
      `http://localhost:5000/api/messages/send`,
      {
        to: applicantId,
        jobId,
        message: 'Congratulations! You have been selected for interview. Please be available tomorrow.'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Update selectedApplicants in backend (optional, if you want to persist)
    await axios.put(
      `http://localhost:5000/api/jobs/${jobId}`,
      { selectedApplicants: [...selectedApplicants, applicantId] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSelectedApplicants(prev => [...prev, applicantId]);
    alert('Applicant selected and message sent!');
  };

  // Reject applicant handler
  const handleReject = async (applicantId: string) => {
    // Update rejectedApplicants in backend (optional, if you want to persist)
    await axios.put(
      `http://localhost:5000/api/jobs/${jobId}`,
      { rejectedApplicants: [...rejectedApplicants, applicantId] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRejectedApplicants(prev => [...prev, applicantId]);
    alert('Applicant rejected.');
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', display: 'flex', width: '100vw' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minHeight: '100vh', ml: '220px', px: 4, py: 3 }}>
        <Button variant="text" sx={{ mb: 2 }} onClick={() => navigate(-1)}>Back</Button>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Applications Overview</Typography>
        {job && (
          <Card sx={{ bgcolor: '#2563eb', color: '#fff', p: 2, mb: 3 }}>
            <Typography variant="h6">{job.title}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip label={job.location} sx={{ bgcolor: '#fff', color: '#2563eb', fontWeight: 600 }} />
              <Chip label={job.job_type} sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 600 }} />
              <Chip label={job.company_name} sx={{ bgcolor: '#fff', color: '#2563eb', fontWeight: 600 }} />
            </Stack>
          </Card>
        )}
        <Typography variant="body2" sx={{ mb: 2 }}>{applicants.length} Applications</Typography>
        <Stack spacing={2}>
          {applicants.map(applicant => (
            <Card key={applicant._id} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={applicant.profileImage} alt={applicant.name} />
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{applicant.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#64748b' }}>{applicant.email}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#64748b' }}>
                    Applied on {job?.created_at?.slice(0, 10)}
                  </Typography>
                </Box>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small" onClick={() => navigate(`/profile-view/${applicant._id}`)}>
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: selectedApplicants.includes(applicant._id) ? '#22c55e' : '#2563eb',
                    color: '#fff'
                  }}
                  disabled={selectedApplicants.includes(applicant._id)}
                  onClick={() => handleSelect(applicant._id)}
                >
                  {selectedApplicants.includes(applicant._id) ? 'Selected' : 'Select'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: rejectedApplicants.includes(applicant._id) ? '#64748b' : '#e41b17',
                    borderColor: '#e41b17'
                  }}
                  disabled={rejectedApplicants.includes(applicant._id)}
                  onClick={() => handleReject(applicant._id)}
                >
                  {rejectedApplicants.includes(applicant._id) ? 'Rejected' : 'Reject'}
                </Button>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ApplicationsOverview;