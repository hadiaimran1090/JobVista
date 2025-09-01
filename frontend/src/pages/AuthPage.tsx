import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Box, Button, Paper } from '@mui/material';

const AuthPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #2563eb 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 2,
          borderRadius: 3,
          minWidth: 260,
          maxWidth: 320,
          boxShadow: 6,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', mb: 2, width: '100%' }}>
          <Button
            variant={!isSignup ? 'contained' : 'outlined'}
            sx={{
              flex: 1,
              borderRadius: '20px 0 0 20px',
              bgcolor: !isSignup ? '#2563eb' : undefined,
              fontSize: 13,
              py: 0.7,
            }}
            onClick={() => setIsSignup(false)}
          >
            LOGIN
          </Button>
          <Button
            variant={isSignup ? 'contained' : 'outlined'}
            sx={{
              flex: 1,
              borderRadius: '0 20px 20px 0',
              bgcolor: isSignup ? '#2563eb' : undefined,
              fontSize: 13,
              py: 0.7,
            }}
            onClick={() => setIsSignup(true)}
          >
            SIGNUP
          </Button>
        </Box>
        <Box sx={{ width: '100%' }}>
          {isSignup ? <SignupForm /> : <LoginForm />}
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;