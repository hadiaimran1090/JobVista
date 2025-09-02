import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token); // Store the token
      const user = res.data.user;
      localStorage.setItem('userId', user._id); // user._id backend se milta hai
      setSnack({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => {
        if (user.role === 'employer') navigate('/employer/dashboard');
        else navigate('/find-jobs');
      }, 1200);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error;
      if (errorMsg === 'User not found') {
        setSnack({ open: true, message: 'User not found', severity: 'error' });
      } else {
        setSnack({ open: true, message: 'Invalid email or password', severity: 'error' });
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
      <Button type="submit" variant="contained" sx={{ bgcolor: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 14 }}>
        Login
      </Button>
      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity as any} sx={{ width: '100%', fontSize: 13 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;