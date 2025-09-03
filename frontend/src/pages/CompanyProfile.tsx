import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Avatar, Button, TextField, Divider } from '@mui/material';
import axios from 'axios';

const CompanyProfile: React.FC = () => {
  const [edit, setEdit] = useState(false);
  const [company, setCompany] = useState<any>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user._id;
  const userCompanyName = user.companyName || '';

  useEffect(() => {
    // Fetch company info by userId
    axios.get(`http://localhost:5000/api/company/me?userId=${userId}`).then(res => setCompany(res.data));
  }, [userId]);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Upload logo to backend (which uploads to Cloudinary)
      const res = await axios.post('http://localhost:5000/api/company/upload-logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setCompany({ ...company, logo: res.data.secure_url });
      setLogoFile(null);
    }
  };

  const handleSave = async () => {
    try {
      const fd = new FormData();
      fd.append('userId', userId || '');
      fd.append('name', company.name || userCompanyName);
      fd.append('email', company.email || user.email || '');
      fd.append('about', company.about || '');
      fd.append('logo', company.logo || '');

      if (!company._id) {
        // Company does not exist, create new
        await axios.post('http://localhost:5000/api/company/create', {
          userId,
          name: company.name || userCompanyName,
          email: company.email || user.email || '',
          about: company.about || '',
          logo: company.logo || ''
        });
      } else {
        // Company exists, update
        await axios.put('http://localhost:5000/api/company/update', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setEdit(false);
    } catch (err) {
      console.log('Company save error:', err);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f6fbff', minHeight: '100vh', p: 4,width:'100vw'}}>
      <Card sx={{ p: 3, borderRadius: 4, maxWidth: 700, mx: 'auto', boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb' }}>Company Profile</Typography>
          <Button variant="contained" onClick={() => setEdit(!edit)} sx={{ bgcolor: '#2563eb', color: '#fff' }}>
            {edit ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {/* Company Information Section Only */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Company Information</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Avatar src={company.logo} sx={{ width: 64, height: 64, mr: 2 }} />
              {edit && (
                <Button variant="outlined" component="label" sx={{ ml: 2 }}>
                  Upload Logo
                  <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                </Button>
              )}
            </Box>
            {edit ? (
              <>
                <TextField
                  label="Company Name"
                  value={company.name || userCompanyName}
                  onChange={e => setCompany({ ...company, name: e.target.value })}
                  sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                  label="Email"
                  value={company.email || ''}
                  onChange={e => setCompany({ ...company, email: e.target.value })}
                  sx={{ mt: 2, width: '100%' }}
                />
              </>
            ) : (
              <>
                <Typography sx={{ mt: 2 }}>{company.name || userCompanyName}</Typography>
                <Typography sx={{ color: '#64748b' }}>{company.email || ''}</Typography>
              </>
            )}
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>About Company</Typography>
        {edit ? (
          <TextField
            multiline
            minRows={3}
            value={company.about || ''}
            onChange={e => setCompany({ ...company, about: e.target.value })}
            sx={{ mt: 2, width: '100%' }}
          />
        ) : (
          <Box sx={{ mt: 2, bgcolor: '#f6fbff', p: 2, borderRadius: 2 }}>
            <Typography sx={{ color: '#64748b' }}>{company.about}</Typography>
          </Box>
        )}
        {edit && (
          <Button variant="contained" sx={{ mt: 3, bgcolor: '#2563eb', color: '#fff' }} onClick={handleSave}>
            Save
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default CompanyProfile;