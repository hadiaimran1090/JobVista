import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Stack, Snackbar, Alert } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const jobTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'remote', label: 'Remote' },
  { value: 'internship', label: 'Internship' },
  { value: 'contract', label: 'Contract' }
];

const PostJob: React.FC = () => {
  const [form, setForm] = useState({
    company_name: '',
    title: '',
    requirements: '',
    details: '',
    location: '',
    job_type: '',
    salary_min: '',
    salary_max: '',
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupError, setPopupError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/jobs/post-job',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPopupError('');
      setPopupOpen(true);
      // Clear form after success
      setForm({
        company_name: '',
        title: '',
        requirements: '',
        details: '',
        location: '',
        job_type: '',
        salary_min: '',
        salary_max: '',
      });
    } catch (error: any) {
      setPopupError(error.response ? error.response.data.message : error.message);
      setPopupOpen(true);
    }
  };

  const SIDEBAR_WIDTH = 220; 
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#e9f0f5ff' }}>
      <Sidebar />
      <Box
        sx={{
          width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minHeight: '100vh',
          bgcolor: '#e9f0f5ff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: '#fff',
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Post a New Job
          </Typography>
          <Stack spacing={1.5}>
            <TextField
              label="Company Name"
              name="company_name"
              required
              value={form.company_name}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ style: { fontSize: 13 } }}
              inputProps={{ style: { fontSize: 13, padding: '8px' } }}
            />
            <TextField
              label="Job Title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ style: { fontSize: 13 } }}
              inputProps={{ style: { fontSize: 13, padding: '8px' } }}
            />
            <TextField
              label="Location"
              name="location"
              required
              value={form.location}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ style: { fontSize: 13 } }}
              inputProps={{ style: { fontSize: 13, padding: '8px' } }}
            />
            <TextField
              select
              label="Job Type"
              name="job_type"
              required
              value={form.job_type}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ style: { fontSize: 13 } }}
              inputProps={{ style: { fontSize: 13, padding: '8px' } }}
            >
              {jobTypes.map((jt) => (
                <MenuItem key={jt.value} value={jt.value} style={{ fontSize: 13 }}>
                  {jt.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Requirements"
              name="requirements"
              multiline
              rows={2}
              value={form.requirements}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ style: { fontSize: 13 } }}
              inputProps={{ style: { fontSize: 13, padding: '8px' } }}
            />
            <TextField
              label="Details"
              name="details"
              multiline
              rows={2}
              value={form.details}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ style: { fontSize: 13 } }}
              inputProps={{ style: { fontSize: 13, padding: '8px' } }}
            />
            <Stack direction="row" spacing={1}>
              <TextField
                label="Salary Min"
                name="salary_min"
                type="number"
                value={form.salary_min}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ style: { fontSize: 13 } }}
                inputProps={{ style: { fontSize: 13, padding: '8px' } }}
              />
              <TextField
                label="Salary Max"
                name="salary_max"
                type="number"
                value={form.salary_max}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ style: { fontSize: 13 } }}
                inputProps={{ style: { fontSize: 13, padding: '8px' } }}
              />
            </Stack>
            <Button type="submit" variant="contained" sx={{ mt: 1, fontSize: 13, py: 1 }}>
              Publish Job
            </Button>
          </Stack>
        </Box>
        {/* Popup Snackbar */}
        <Snackbar
          open={popupOpen}
          autoHideDuration={3000}
          onClose={() => setPopupOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setPopupOpen(false)}
            severity={popupError ? 'error' : 'success'}
            sx={{ width: '100%', fontSize: 16 }}
          >
            {popupError ? `Error: ${popupError}` : '🎉 Job posted successfully!'}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default PostJob;
