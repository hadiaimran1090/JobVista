import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Stack } from '@mui/material';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/jobs/post-job',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Job posted!');
    } catch (error: any) {
      alert('Error posting job: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f6fbff', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          width: 'calc(100vw - 220px)', // Sidebar ki width minus karen
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: '#fff',
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            width: 350,
            minWidth: 280,
            maxWidth: 400,
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
      </Box>
    </Box>
  );
};

export default PostJob;