require('dotenv').config();
const express = require('express');
const cors     = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aiRoutes   = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai',   aiRoutes);

// Error Handling middleware for invalid routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            console.log(`🌐 Backend API: http://localhost:${PORT}`);
            console.log(`📝 Demo Users: admin/admin123, user/user123`);
        });
    })
    .catch(err => {
        console.error('❌ FATAL: MongoDB connection failed. Server cannot start.');
        process.exit(1);
    });
