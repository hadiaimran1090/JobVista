const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
	res.send('JobVista backend running!');
});

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Job routes
const jobRoutes = require('./routes/job');
app.use('/api/jobs', jobRoutes);

// User routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Applicant routes
const applicantRoutes = require('./routes/applicant.routes');
app.use('/api/applicants', applicantRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
