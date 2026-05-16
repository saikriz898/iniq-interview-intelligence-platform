require('dotenv').config();
const express = require('express');
const cors     = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aiRoutes   = require('./routes/aiRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());          // allow cross-origin requests from frontend
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai',   aiRoutes);   // AI chat route (rate-limited + JWT-protected)

// Error Handling middleware for invalid routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
