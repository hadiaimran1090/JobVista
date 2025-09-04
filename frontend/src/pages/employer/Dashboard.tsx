import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

interface UserInfo {
  _id?: string;
  name?: string;
  bio?: string;
  profileImage?: string;
}

interface Applicant {
  userId?: string | UserInfo;
  status?: string;
  jobTitle?: string;
  name?: string;
  bio?: string;
  profileImage?: string;
}

interface Job {
  _id: string;
  title: string;
  location?: string;
  status?: string;
  createdAt?: string;
  created_at?: string;
  applicants?: Applicant[];
  selectedApplicants?: Applicant[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    activeJobs: 0,
    applicants: 0,
    selected: 0,
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentApplicants, setRecentApplicants] = useState<Applicant[]>([]);
  const [selectedOpen, setSelectedOpen] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Applicant[]>([]);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const employerId = user?._id || '';

  useEffect(() => {
    if (!employerId) return; // stop if no employer logged in

    axios.get('http://localhost:5000/api/jobs/?employer=' + employerId)
      .then(res => {
        console.log('Jobs response:', res.data);
        const jobs: Job[] = Array.isArray(res.data) ? res.data : [];
        setRecentJobs(jobs.slice(-4).reverse());

        setStats(prev => ({
          ...prev,
          activeJobs: jobs.filter(j => j.status === 'active').length,
        }));

        let allApplicants: Applicant[] = [];
        let allSelected: Applicant[] = [];

       jobs.forEach(job => {
  if (Array.isArray(job.applicants)) {
    allApplicants = allApplicants.concat(
      job.applicants.map((user: any) => ({
        jobTitle: job.title,
        name: user?.name || 'Anonymous',
        bio: user?.bio || 'No bio available.',
        profileImage: user?.profileImage || '',
        status: 'pending',
      }))
    );
  }
  if (Array.isArray(job.selectedApplicants)) {
    allSelected = allSelected.concat(
      job.selectedApplicants.map((user: any) => ({
        jobTitle: job.title,
        name: user?.name || 'Anonymous',
        bio: user?.bio || 'No bio available.',
        profileImage: user?.profileImage || '',
        status: 'selected',
      }))
    );
  }
});
        setStats(prev => ({
          ...prev,
          applicants: allApplicants.length,
          selected: allSelected.length,
        }));

        setRecentApplicants(allApplicants.slice(-3).reverse());
        setSelectedCandidates(allSelected);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
      });
  }, [employerId]);

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', overflow: 'hidden', width: '100vw' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minHeight: '100vh', overflowY: 'auto', overflowX: 'hidden', ml: '220px', px: 0, width: '100%', maxWidth: '100vw' }}>
        <Typography variant="body2" sx={{ px: 4, mb: 3, color: '#64748b', fontSize: '0.95rem' }}>
          Here's what's happening with your jobs today.
        </Typography>

        {/* Stats cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3, px: 4 }}>
          <Card sx={{ flex: 1, bgcolor: '#25a9ebff', color: '#fff', boxShadow: 3, minWidth: 0, borderRadius: 2, height: 120 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '1rem' }}>Active Jobs</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '2rem' }}>{stats.activeJobs}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{stats.activeJobs > 0 ? '100%' : '0%'}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, bgcolor: '#c516ffff', color: '#fff', boxShadow: 3, minWidth: 0, borderRadius: 2, height: 120 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '1rem' }}>Total Applicants</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '2rem' }}>{stats.applicants}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{stats.applicants > 0 ? '100%' : '0%'}</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              flex: 1,
              bgcolor: '#f67288ff',
              color: '#fff',
              boxShadow: 3,
              minWidth: 0,
              borderRadius: 2,
              height: 120,
              cursor: 'pointer'
            }}
            onClick={() => setSelectedOpen(true)}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '1rem' }}>Selected</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '2rem' }}>{stats.selected}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{stats.selected > 0 ? '100%' : '0%'}</Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Recent Jobs & Applicants */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ px: 4 }}>
          <Card sx={{ flex: 1, boxShadow: 2, borderRadius: 2, minWidth: 0 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#2563eb', fontWeight: 600, fontSize: '1rem' }}>
                Recent Job Posts
              </Typography>
              {recentJobs.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#888' }}>No jobs posted yet.</Typography>
              ) : (
                recentJobs.map((job) => (
                  <Box key={job._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.98rem' }}>{job.title}</Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {job.location || 'N/A'} - {new Date(job.createdAt || job.created_at || '').toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={job.status || 'inactive'}
                      sx={{
                        bgcolor: job.status === 'active' ? '#22c55e' : '#f67288',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        height: 24
                      }}
                    />
                  </Box>
                ))
             ) }
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, boxShadow: 2, borderRadius: 2, minWidth: 0 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#8b5cf6', fontWeight: 600, fontSize: '1rem' }}>
                Recent Applications
              </Typography>
              {recentApplicants.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#888' }}>No applications yet.</Typography>
              ) : (
                recentApplicants.map((app, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={app.profileImage} sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 700, width: 28, height: 28, fontSize: '0.95rem' }}>
                        {app.name ? app.name.split(' ').map((n: string) => n[0]).join('') : 'U'}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.98rem' }}>{app.name || 'Anonymous'}</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.9rem' }}>{app.jobTitle}</Typography>
                        <Typography variant="body2" sx={{ color: '#888', fontSize: '0.85rem' }}>{app.bio || ''}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Stack>

        {/* Selected Candidates Dialog */}
        <Dialog open={selectedOpen} onClose={() => setSelectedOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
            Selected Candidates
            <IconButton aria-label="close" onClick={() => setSelectedOpen(false)} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedCandidates.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#888' }}>No candidates selected yet.</Typography>
            ) : (
              selectedCandidates.map((user, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar src={user.profileImage} sx={{ width: 40, height: 40, bgcolor: '#2563eb', color: '#fff' }}>
                    {user.name ? user.name[0] : 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.name || 'Anonymous'}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>{user.bio || 'No bio available.'}</Typography>
                    <Typography variant="body2" sx={{ color: '#8b5cf6', fontWeight: 600 }}>{user.jobTitle}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
