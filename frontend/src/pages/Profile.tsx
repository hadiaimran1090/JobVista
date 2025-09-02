import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, Chip, Stack } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';   // 👈 added

const Profile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: user.name || '',
    profileImage: user.profileImage || '',
    email: user.email || '',
    resume: user.resume || '',
    phone: user.phone || '',
    bio: user.bio || '',
    experience: user.experience || '',
    skills: user.skills || [],
    newProfileImage: null as File | null,
    newResume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({
        ...form,
        newProfileImage: file,
        profileImage: URL.createObjectURL(file),
      });
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, newResume: e.target.files[0] });
    }
  };

  const handleSave = async () => {
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('bio', form.bio);
      fd.append('experience', form.experience);
      fd.append('skills', form.skills.join(','));

      if (form.newProfileImage) fd.append('profileImage', form.newProfileImage);
      if (form.newResume) fd.append('resume', form.newResume);

      const res = await axios.put(
        `http://localhost:5000/api/auth/update/${user._id}`,
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      localStorage.setItem('user', JSON.stringify(res.data.user));
      setEdit(false);

      // ✅ Success Popup
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully.',
        confirmButtonColor: '#2563eb',
      });

    } catch (err) {
      console.error('Profile update error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while updating your profile.',
      });
    }
  };

  return (
    <Box sx={{
      maxWidth: 320,
      minWidth: 260,
      width: 320,
      height: '100vh',
      bgcolor: '#fff',
      p: 3,
      borderRadius: 3,
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      <Avatar src={form.profileImage} sx={{ width: 80, height: 80, mb: 2 }} />
      {edit ? (
        <TextField name="name" value={form.name} onChange={handleChange} label="Name" size="small" sx={{ mb: 1, width: '100%' }} />
      ) : (
        <Typography variant="h6" sx={{ mb: 1 }}>{form.name}</Typography>
      )}
      <Stack spacing={1} sx={{ width: '100%' }}>
        {edit ? (
          <>
            <TextField name="email" value={form.email} onChange={handleChange} label="Email" size="small" />
            <TextField name="phone" value={form.phone} onChange={handleChange} label="Phone" size="small" />
            <TextField name="bio" value={form.bio} onChange={handleChange} label="Bio" size="small" multiline />
            <TextField name="experience" value={form.experience} onChange={handleChange} label="Experience" size="small" />
            <TextField
              name="skills"
              value={form.skills.join(', ')}
              onChange={e => setForm({ ...form, skills: e.target.value.split(',').map(s => s.trim()) })}
              label="Skills (comma separated)"
              size="small"
            />
            <Button variant="outlined" component="label" sx={{ mt: 1, width: '100%' }}>
              Upload New Profile Image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            {form.newProfileImage && (
              <Typography variant="caption" sx={{ ml: 1 }}>{form.newProfileImage.name}</Typography>
            )}
            <Button variant="outlined" component="label" sx={{ mt: 1, width: '100%' }}>
              Upload New Resume
              <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
            </Button>
            {form.newResume && (
              <Typography variant="caption" sx={{ ml: 1 }}>{form.newResume.name}</Typography>
            )}
          </>
        ) : (
          <>
            <Typography variant="body2"><b>Email:</b> {form.email}</Typography>
            <Typography variant="body2"><b>Phone:</b> {form.phone}</Typography>
            <Typography variant="body2"><b>Resume:</b> {form.resume ? (
              <a href={form.resume} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>View Resume</a>
            ) : (
              <span style={{ color: '#64748b' }}>Not uploaded</span>
            )}</Typography>
            <Typography variant="body2"><b>Bio:</b> {form.bio}</Typography>
            <Typography variant="body2"><b>Experience:</b> {form.experience}</Typography>
            <Box>
              <Typography variant="body2"><b>Skills:</b></Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {form.skills.map((skill: string, idx: number) => (
                  <Chip key={idx} label={skill} sx={{ mb: 0.5 }} />
                ))}
              </Stack>
            </Box>
          </>
        )}
      </Stack>
      <Box sx={{ mt: 3, width: '100%' }}>
        {edit ? (
          <Button variant="contained" onClick={handleSave} sx={{ width: '100%' }}>Save</Button>
        ) : (
          <Button variant="outlined" onClick={() => setEdit(true)} sx={{ width: '100%' }}>Edit Profile</Button>
        )}
      </Box>
    </Box>
  );
};

export default Profile;

