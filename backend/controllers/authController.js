const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        console.log('📥 Registration request received');
        console.log('📝 Request body:', req.body);
        
        const { name, email, password } = req.body;

        console.log('📝 Registration attempt:', { name, email });

        if (!name || !email || !password) {
            console.log('⚠️ Missing fields');
            return res.status(400).json({ success: false, error: 'Please provide name, email and password' });
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
                email: user.email
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
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
