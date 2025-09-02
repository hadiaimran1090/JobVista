import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Button, Chip, TextField, Select, MenuItem, IconButton, Modal, Stack } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const statusOptions = ['active', 'closed'];

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [statusEditValue, setStatusEditValue] = useState<string>('active');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editJobData, setEditJobData] = useState<any>(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get('http://localhost:5000/api/jobs');
    setJobs(res.data);
  };

  const filteredJobs = jobs.filter(job =>
    (search === '' || job.title.toLowerCase().includes(search.toLowerCase())) &&
    (status === 'All' || job.status === status.toLowerCase())
  );

  // Inline status update
  const handleStatusEdit = (job: any) => {
    setEditingStatusId(job._id);
    setStatusEditValue(job.status);
  };

  const handleStatusSave = async (jobId: string) => {
    await axios.put(
      `http://localhost:5000/api/jobs/${jobId}`,
      { status: statusEditValue },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditingStatusId(null);
    fetchJobs();
  };

  // Edit job handler: open modal with job data
  const handleEditJob = (jobId: string) => {
    const job = jobs.find((j: any) => j._id === jobId);
    setEditJobData({ ...job });
    setEditModalOpen(true);
  };

  // Save edited job
  const handleEditJobSave = async () => {
    await axios.put(
      `http://localhost:5000/api/jobs/${editJobData._id}`,
      editJobData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditModalOpen(false);
    setEditJobData(null);
    fetchJobs();
  };

  // Delete job handler
  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await axios.delete(
        `http://localhost:5000/api/jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchJobs();
    }
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', display: 'flex', width: '100vw' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minHeight: '100vh', ml: '220px', px: 0, width: '100%', maxWidth: '100vw' }}>
        <Box sx={{ px: 4, pt: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2, bgcolor: '#fff', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Job Management</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              Manage your job postings and track applications
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                placeholder="Search jobs..."
                size="small"
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ width: 220 }}
              />
              <Select
                size="small"
                value={status}
                onChange={e => setStatus(e.target.value)}
                sx={{ width: 110, fontSize: 13 }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
    
              </Select>
              <Button
                variant="contained"
                sx={{ ml: 'auto', bgcolor: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 13 }}
                onClick={() => navigate('/post-job')}
              >
                Add New Job
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Showing {filteredJobs.length} of {jobs.length} jobs
            </Typography>
            <Box sx={{ bgcolor: '#f6fbff', borderRadius: 2, p: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', fontWeight: 600, color: '#64748b', mb: 1 }}>
                <Box>JOB TITLE</Box>
                <Box>STATUS</Box>
                <Box>APPLICANTS</Box>
                <Box>ACTIONS</Box>
              </Box>
              {filteredJobs.map((job: any) => (
                <Box key={job._id} sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center', bgcolor: '#fff', borderRadius: 2, mb: 1, py: 1, px: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{job.title}</Typography>
                    <Typography sx={{ fontSize: 13, color: '#64748b' }}>{job.company_name}</Typography>
                  </Box>
                  <Box>
                    {editingStatusId === job._id ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Select
                          size="small"
                          value={statusEditValue}
                          onChange={e => setStatusEditValue(e.target.value)}
                          sx={{ fontSize: 13, width: 90 }}
                        >
                          {statusOptions.map(opt => (
                            <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>
                          ))}
                        </Select>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ bgcolor: '#22c55e', color: '#fff', fontSize: 11, minWidth: 0, px: 1 }}
                          onClick={() => handleStatusSave(job._id)}
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          sx={{ color: '#e41b17', fontSize: 11, minWidth: 0, px: 1 }}
                          onClick={() => setEditingStatusId(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      <Chip
                        label={job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
                        sx={{
                          bgcolor: job.status === 'active' ? '#22c55e' : job.status === 'closed' ? '#e41b17' : '#64748b',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          height: 24,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleStatusEdit(job)}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
  onClick={() => navigate(`/job/${job._id}/applicants`)}>
  <PeopleAltIcon sx={{ fontSize: 18, color: '#2563eb' }} />
  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{job.applicants?.length || 0}</Typography>
</Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleEditJob(job._id)}>
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteJob(job._id)}>
                      <DeleteIcon sx={{ fontSize: 18, color: '#e41b17' }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Box>
        {/* Edit Job Modal */}
        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#fff',
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            minWidth: 350,
            maxWidth: 400,
            width: '100%',
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Edit Job</Typography>
            {editJobData && (
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  size="small"
                  value={editJobData.title}
                  onChange={e => setEditJobData({ ...editJobData, title: e.target.value })}
                />
                <TextField
                  label="Company Name"
                  size="small"
                  value={editJobData.company_name}
                  onChange={e => setEditJobData({ ...editJobData, company_name: e.target.value })}
                />
                <TextField
                  label="Location"
                  size="small"
                  value={editJobData.location}
                  onChange={e => setEditJobData({ ...editJobData, location: e.target.value })}
                />
                <TextField
                  label="Salary Min"
                  size="small"
                  type="number"
                  value={editJobData.salary_min || ''}
                  onChange={e => setEditJobData({ ...editJobData, salary_min: e.target.value })}
                />
                <TextField
                  label="Salary Max"
                  size="small"
                  type="number"
                  value={editJobData.salary_max || ''}
                  onChange={e => setEditJobData({ ...editJobData, salary_max: e.target.value })}
                />
                <Select
                  label="Job Type"
                  size="small"
                  value={editJobData.job_type}
                  onChange={e => setEditJobData({ ...editJobData, job_type: e.target.value })}
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                </Select>
                <Select
                  label="Status"
                  size="small"
                  value={editJobData.status}
                  onChange={e => setEditJobData({ ...editJobData, status: e.target.value })}
                >
                  {statusOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>
                  ))}
                </Select>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 600 }}
                    onClick={handleEditJobSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: '#e41b17', borderColor: '#e41b17' }}
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default JobManagement;