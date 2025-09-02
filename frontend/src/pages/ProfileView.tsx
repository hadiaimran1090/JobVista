import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Avatar, Chip, Stack, Button, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileView: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:5000/api/users/${id}`);
    setUser(res.data);
  };

  if (!user) return null;

  const experiences =
    user && user.experience
      ? Array.isArray(user.experience)
        ? user.experience
        : [{ title: user.experience }]
      : [];

  return (
    <Box sx={{
      bgcolor: '#f6fbff',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 6,
      width: '100vw'
    }}>
      <Card sx={{
        p: 2,
        borderRadius: 4,
        boxShadow: '0 4px 16px 0 rgba(54, 115, 248, 0.12)',
        maxWidth: 340,
        width: '100%',
        bgcolor: '#fff',
        textAlign: 'center',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: '0 8px 32px 0 rgba(21, 83, 215, 0.18)' }
      }}>
        <Stack alignItems="center" spacing={1.5}>
          <Avatar
            src={user.profileImage}
            sx={{
              width: 70,
              height: 70,
              boxShadow: 1,
              border: '3px solid #759cf1ff'
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', fontSize: 20 }}>
            {user.name}
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: 14, mb: 0.5 }}>
            {user.bio || 'No bio available.'}
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: 13, mb: 1 }}>
            <b>Phone:</b> {user.phone || 'N/A'}
          </Typography>
          <Divider sx={{ width: '100%', mb: 1 }} />
          <Box sx={{ width: '100%', textAlign: 'left' }}>
            <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#070708ff', fontSize: 14 }}>Skills:</Typography>
            <Stack direction="row" spacing={0.7} sx={{ flexWrap: 'wrap', mb: 1 }}>
              {(user.skills || []).length > 0 ? (
                user.skills.map((skill: string, idx: number) => (
                  <Chip key={idx} label={skill} sx={{ bgcolor: '#12b7d0ff', color: '#fff', fontWeight: 600, fontSize: 12, height: 24 }} />
                ))
              ) : (
                <Typography sx={{ color: '#64748b', fontSize: 12 }}>No skills added.</Typography>
              )}
            </Stack>
            <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#0e0e0eff', fontSize: 14 }}>Experience:</Typography>
            <Stack spacing={0.7}>
              {experiences.length > 0 ? (
                experiences.map((exp: any, idx: number) => (
                  <Card key={idx} sx={{ p: 1, bgcolor: '#f6fbff', boxShadow: 0, mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, color: '#141515ff', fontSize: 13 }}>{exp.title}</Typography>
                    {exp.company && (
                      <Typography sx={{ fontSize: 12 }}>{exp.company} {exp.years ? `(${exp.years} years)` : ''}</Typography>
                    )}
                    {exp.description && (
                      <Typography sx={{ fontSize: 12, color: '#64748b' }}>{exp.description}</Typography>
                    )}
                  </Card>
                ))
              ) : (
                <Typography sx={{ color: '#64748b', fontSize: 12 }}>No experience added.</Typography>
              )}
            </Stack>
          </Box>
          {user.resume && (
            <Button
              variant="contained"
              sx={{
                bgcolor: '#2563eb',
                color: '#fff',
                mt: 2,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: 1,
                px: 2,
                fontSize: 14,
                height: 36
              }}
              onClick={() => window.open(user.resume, '_blank')}
            >
              VIEW RESUME
            </Button>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default ProfileView;