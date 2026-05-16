const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        console.error('❌ FATAL ERROR: JWT_SECRET is not defined in environment variables.');
        // Fallback for development only if necessary, but better to fail clearly
        throw new Error('JWT_SECRET is missing from .env');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
exports.googleLogin = async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            return res.status(400).json({ success: false, error: 'Please provide Google Access Token' });
        }

        // Fetch user info from Google using the access token
        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
        const googleData = await googleRes.json();

        if (googleData.error || !googleData.email) {
            return res.status(401).json({ success: false, error: 'Invalid Google token' });
        }

        const { sub, email, name, picture } = googleData;

        let user = await User.findOne({ email });

        if (user) {
            // Update user with googleId if they don't have it
            if (!user.googleId) {
                user.googleId = sub;
                await user.save();
            }
        } else {
            // Create new user for Google login
            user = await User.create({
                name,
                email,
                googleId: sub,
                password: Math.random().toString(36).slice(-10) // Random password for schema requirement if needed, though we made it optional
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'User logged in with Google successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('❌ Google Login error:', error);
        res.status(500).json({ success: false, error: 'Google Login failed', details: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        console.log('📥 Registration request received');
        console.log('📝 Request body:', req.body);
        
        const { email, password } = req.body;
        const name = req.body.name || 'User';

        console.log('📝 Registration attempt:', { name, email });

        if (!email || !password) {
            console.log('⚠️ Missing fields');
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('⚠️ User already exists:', email);
            return res.status(400).json({ success: false, error: 'User with this email already exists' });
        }

        console.log('🔄 Creating user in MongoDB...');
        const user = await User.create({
            name,
            email,
            password,
        });

        console.log('✅ User created in MongoDB:', user._id);
        console.log('💾 User data:', { id: user._id, name: user.name, email: user.email });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
