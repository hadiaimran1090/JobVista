import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Select, MenuItem, Snackbar, Alert } from '@mui/material';

const SignupForm: React.FC = () => {
  const [role, setRole] = useState('jobseeker');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('role', role);
    if (profileImageFile) formData.append('profileImage', profileImageFile);
    if (resumeFile) formData.append('resume', resumeFile);
    if (role === 'employer') formData.append('companyName', companyName);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setSnack({ open: true, message: 'User registered successfully!', severity: 'success' });
      setTimeout(() => {
        const user = res.data.user;
        if (user.role === 'employer') navigate('/employer/dashboard');
        else navigate('/find-jobs');
      }, 1200);
    } catch (err: any) {
      setSnack({ open: true, message: 'User already exists', severity: 'error' });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <TextField
        label="Name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        size="small"
        InputLabelProps={{ style: { fontSize: 14 } }}
        inputProps={{ style: { fontSize: 13 } }}
      />
      <TextField
        label="Email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        size="small"
        InputLabelProps={{ style: { fontSize: 14 } }}
        inputProps={{ style: { fontSize: 13 } }}
      />
      <TextField
        label="Password"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        size="small"
        InputLabelProps={{ style: { fontSize: 14 } }}
        inputProps={{ style: { fontSize: 13 } }}
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        fullWidth
        size="small"
        InputLabelProps={{ style: { fontSize: 14 } }}
        inputProps={{ style: { fontSize: 13 } }}
      />
      <Select
        value={role}
        onChange={e => setRole(e.target.value)}
        fullWidth
        size="small"
        sx={{ fontSize: 13 }}
      >
        <MenuItem value="jobseeker" sx={{ fontSize: 13 }}>Job Seeker</MenuItem>
        <MenuItem value="employer" sx={{ fontSize: 13 }}>Employer</MenuItem>
      </Select>
      <Button variant="outlined" component="label" sx={{ fontSize: 13, py: 0.5 }}>
        Upload Profile Image
        <input type="file" hidden accept="image/*" onChange={e => setProfileImageFile(e.target.files?.[0] || null)} />
      </Button>
      {role === 'jobseeker' && (
        <Button variant="outlined" component="label" sx={{ fontSize: 13, py: 0.5 }}>
          Upload Resume
          <input type="file" hidden accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} />
        </Button>
      )}
      {role === 'employer' && (
        <TextField
          label="Company Name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          fullWidth
          size="small"
          InputLabelProps={{ style: { fontSize: 14 } }}
          inputProps={{ style: { fontSize: 13 } }}
        />
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: '#2563eb',
          color: '#fff',
          fontWeight: 600,
          fontSize: 14,
          py: 0.7,
          mt: 1
        }}
        fullWidth
      >
        Signup
      </Button>
      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity as any} sx={{ width: '100%', fontSize: 13 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignupForm;