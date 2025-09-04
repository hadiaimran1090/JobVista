import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Card, TextField, IconButton, ListItemButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const Messages: React.FC = () => {
  const [employers, setEmployers] = useState<any[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/messages/employers?jobseeker=${user._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (Array.isArray(res.data)) setEmployers(res.data);
        else setEmployers([]);
      })
      .catch(() => setEmployers([]));
  }, [user._id]);

  useEffect(() => {
    if (selectedEmployer) {
      axios.get(`http://localhost:5000/api/messages/chat?user1=${user._id}&user2=${selectedEmployer._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => setMessages(Array.isArray(res.data) ? res.data : []));
    }
  }, [selectedEmployer, user._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    await axios.post('http://localhost:5000/api/messages/send', {
      sender: user._id,
      receiver: selectedEmployer._id,
      text: newMsg
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setNewMsg('');
    axios.get(`http://localhost:5000/api/messages/chat?user1=${user._id}&user2=${selectedEmployer._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setMessages(Array.isArray(res.data) ? res.data : []));
  };

  return (
    <Box sx={{
      display: 'flex',
      height: '90vh',
      bgcolor: '#eaf3fb',
      borderRadius: 3,
      boxShadow: 4,
      width: '100vw',
      marginLeft: '160px',
      overflow: 'hidden'
    }}>
      {/* Employers List */}
      <Box sx={{
        width: 370,
        bgcolor: '#e6ecf5ff',
        p: 0,
        borderRight: '1px solid #cfd8dc',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h6" sx={{
          mb: 2,
          p: 2,
          color: '#fff',
          bgcolor: '#2563eb',
          fontWeight: 700,
          letterSpacing: 1,
          borderRadius: '0 0 18px 0'
        }}>
          Employers
        </Typography>
        <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
          {Array.isArray(employers) && employers.length > 0 ? employers.map(emp => (
            <ListItem key={emp._id} disablePadding>
              <ListItemButton
                selected={selectedEmployer?._id === emp._id}
                onClick={() => setSelectedEmployer(emp)}
                sx={{
                  alignItems: 'flex-start',
                  bgcolor: selectedEmployer?._id === emp._id ? '#05163a22' : 'inherit',
                  borderRadius: 2,
                  my: 1,
                  px: 2
                }}
              >
                <ListItemAvatar>
                  <Avatar src={emp?.profileImage || ''} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 600, color: '#0c0c0cff' }}>{emp?.name || 'No Name'}</Typography>}
                  secondary={<Typography sx={{ color: '#0f1010ff', fontSize: 13 }}>{emp?.email || ''}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          )) : (
            <Typography sx={{ px: 2, py: 1, color: '#fff' }}>No employers found.</Typography>
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
          {selectedEmployer ? (
            <>
              <Avatar src={selectedEmployer?.profileImage || ''} sx={{ mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                {selectedEmployer.name}
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
            <Typography variant="h6" sx={{ color: '#fff' }}>Select an employer</Typography>
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
        {selectedEmployer && (
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

export default Messages;