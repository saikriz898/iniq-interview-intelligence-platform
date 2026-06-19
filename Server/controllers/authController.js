const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const sendTokenResponse = async (user, statusCode, res, message) => {
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };
    
    res.status(statusCode).cookie('refreshToken', refreshToken, options).json({
        success: true,
        message,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing from .env');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.googleLogin = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) return res.status(400).json({ success: false, error: 'Please provide Google Access Token' });

        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
        const googleData = await googleRes.json();

        if (googleData.error || !googleData.email) return res.status(401).json({ success: false, error: 'Invalid Google token' });

        const { sub, email, name } = googleData;
        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = sub;
                await user.save();
            }
        } else {
            user = await User.create({
                name,
                email,
                googleId: sub,
                password: Math.random().toString(36).slice(-10)
            });
        }

        return sendTokenResponse(user, 200, res, 'User logged in with Google successfully');
    } catch (error) {
        console.error('❌ Google Login error:', error);
        res.status(500).json({ success: false, error: 'Google Login failed', details: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, domain, college, location, linkedin, github } = req.body;
        const name = req.body.name || 'User';

        if (!email || !password || !name || !domain || !college || !location || !linkedin || !github) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        const normalizedEmail = email.toLowerCase();
        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email already taken, please provide another.' 
            });
        }

        const user = await User.create({
            name,
            email: normalizedEmail,
            password,
            domain: domain || '',
            college: college || '',
            location: location || '',
            linkedin: linkedin || '',
            github: github || ''
        });

        return sendTokenResponse(user, 201, res, 'User registered successfully');
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, error: 'Email required' });

        const normalizedEmail = email.toLowerCase();
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.json({ available: false });
        }
        return res.json({ available: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        return sendTokenResponse(user, 200, res, 'User logged in successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(401).json({ success: false, error: 'No refresh token' });
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, error: 'Invalid refresh token' });
        }
        
        const token = generateToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid refresh token' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        
        res.status(200).json({ success: true, message: 'Password reset token generated', resetToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        
        if (!user) return res.status(400).json({ success: false, error: 'Invalid or expired token' });
        
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        
        return sendTokenResponse(user, 200, res, 'Password reset successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
