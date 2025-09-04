import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Card, TextField, IconButton, ListItemButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const SIDEBAR_WIDTH = 220;
const EmployerMessages: React.FC = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/messages/applicants?employer=${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (Array.isArray(res.data)) setApplicants(res.data);
        else setApplicants([]);
      })
      .catch(() => setApplicants([]));
  }, [user._id]);

  useEffect(() => {
    if (selectedApplicant) {
      axios.get(`http://localhost:5000/api/messages/chat?user1=${user._id}&user2=${selectedApplicant._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => setMessages(Array.isArray(res.data) ? res.data : []));
    }
  }, [selectedApplicant, user._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    await axios.post('http://localhost:5000/api/messages/send', {
      sender: user._id,
      receiver: selectedApplicant._id,
      text: newMsg
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNewMsg('');
    axios.get(`http://localhost:5000/api/messages/chat?user1=${user._id}&user2=${selectedApplicant._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setMessages(Array.isArray(res.data) ? res.data : []));
  };

  return (
    <Box sx={{
      display: 'flex',
      height: '80vh',
      bgcolor: '#eaf3fb',
      borderRadius: 3,
      boxShadow: 4,
      width: 'calc(100vw - 220px)', // Sidebar width subtracted
      marginLeft: `${SIDEBAR_WIDTH}px`, // Start after sidebar
      overflow: 'hidden',
      marginTop: '16px',
      marginRight: '16px',
    }}>
      {/* Applicants Sidebar */}
      <Box sx={{
        width: SIDEBAR_WIDTH,
        bgcolor: '#fff', // white sidebar
        p: 0,
        borderRight: '1px solid #cfd8dc',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '16px'
      }}>
        <Typography variant="h6" sx={{
          mb: 2,
          p: 2,
          color: '#fcf6f6ff', // black text
          bgcolor: '#2563eb',
          fontWeight: 700,
          letterSpacing: 1,
          borderRadius: '0 0 18px 0'
        }}>
          Applicants
        </Typography>
        <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
          {Array.isArray(applicants) && applicants.length > 0 ? applicants.map(app => (
            <ListItem key={app._id} disablePadding>
              <ListItemButton
                selected={selectedApplicant?._id === app._id}
                onClick={() => setSelectedApplicant(app)}
                sx={{
                  alignItems: 'flex-start',
                  bgcolor: selectedApplicant?._id === app._id ? '#eaf3fb' : 'inherit',
                  borderRadius: 2,
                  my: 1,
                  px: 2
                }}
              >
                <ListItemAvatar>
                  <Avatar src={app?.profileImage || ''} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 600, color: '#222' }}>{app?.name || 'No Name'}</Typography>}
                  secondary={<Typography sx={{ color: '#555', fontSize: 13 }}>{app?.email || ''}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          )) : (
            <Typography sx={{ px: 2, py: 1, color: '#222' }}>No applicants found.</Typography>
          )}
        </List>
      </Box>
      {/* Chat Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f7faff',
        position: 'relative'
      }}>
        {/* Chat Header */}
        <Box sx={{
          px: 4,
          py: 2,
          borderBottom: '1px solid #e3ecf7',
          display: 'flex',
          alignItems: 'center',
          minHeight: 64,
          bgcolor: '#2563eb',
          color: '#fff',
          borderRadius: '0 0 18px 0'
        }}>
          {selectedApplicant ? (
            <>
              <Avatar src={selectedApplicant?.profileImage || ''} sx={{ mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                {selectedApplicant.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton sx={{ color: '#fff' }}>
                  <CallIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}>
                  <VideocamIcon />
                </IconButton>
              </Stack>
            </>
          ) : (
            <Typography variant="h6" sx={{ color: '#fff' }}>Select an applicant</Typography>
          )}
        </Box>
        {/* Messages */}
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          px: 4,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: '#f7faff'
        }}>
          {Array.isArray(messages) && messages.length > 0 ? messages.map(msg => (
            <Box
              key={msg._id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === user._id ? 'flex-end' : 'flex-start'
              }}
            >
              <Card sx={{
                px: 2,
                py: 1,
                bgcolor: msg.sender === user._id ? '#2563eb' : '#e3ecf7',
                color: msg.sender === user._id ? '#fff' : '#222',
                maxWidth: '60%',
                boxShadow: 0,
                borderRadius: 3,
                fontSize: 16
              }}>
                <Typography sx={{ wordBreak: 'break-word' }}>{msg.text}</Typography>
                <Typography variant="caption" sx={{
        display: 'block',
        mt: 0.5,
        color: msg.sender === user._id ? '#e0e7ff' : '#888',
        textAlign: 'right'
      }}>
        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
      </Typography>
              </Card>
            </Box>
          )) : (
            <Typography sx={{ px: 2, py: 1, color: '#888' }}>No messages yet.</Typography>
          )}
          <div ref={chatEndRef} />
        </Box>
        {/* Message Input */}
        {selectedApplicant && (
          <Box sx={{
            px: 4,
            py: 2,
            bgcolor: '#f5f8fa',
            borderTop: '1px solid #e3ecf7',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              size="small"
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
            />
            <IconButton color="primary" onClick={sendMessage} sx={{ bgcolor: '#2563eb', color: '#fff', borderRadius: 2 }}>
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmployerMessages;