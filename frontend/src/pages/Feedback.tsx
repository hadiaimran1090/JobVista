import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Rating, Snackbar } from '@mui/material';
import axios from 'axios';

const Feedback: React.FC = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(5);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/feedback', {
      user: user._id,
      comment,
      rating
    });
    setComment('');
    setRating(5);
    setOpen(true);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#b6cbe6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw'
        
    }}>
      <Box sx={{
        bgcolor: '#e3ecf7',
        borderRadius: 3,
        p: 4,
        width: 350,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
          We value your opinion.
        </Typography>
        <Typography sx={{ mb: 1, textAlign: 'center', fontSize: 16 }}>
          How would you rate your overall experience?
        </Typography>
        <Rating
          value={rating}
          onChange={(_, value) => setRating(value)}
          sx={{ mb: 2 }}
          defaultValue={0}
          emptyIcon={<span style={{ color: '#b0b8c1' }}>★</span>}
        />
        <Typography sx={{ mb: 1, textAlign: 'center', fontSize: 15 }}>
          Kindly take a moment to tell us what you think.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder="Your feedback..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': { borderRadius: 2 }
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#355a8c',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 2,
              py: 1.2,
              fontSize: 16,
              boxShadow: 1,
              textTransform: 'none',
              '&:hover': { bgcolor: '#27406b' }
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        message="Your feedback submitted!"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Feedback;