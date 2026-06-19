const User = require('../models/User');
const bcrypt = require('bcrypt');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update current user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.profilePicture = req.body.profilePicture !== undefined ? req.body.profilePicture : user.profilePicture;
            user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
            user.location = req.body.location !== undefined ? req.body.location : user.location;
            user.domain = req.body.domain !== undefined ? req.body.domain : user.domain;
            user.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : user.linkedin;
            user.github = req.body.github !== undefined ? req.body.github : user.github;
            user.portfolio = req.body.portfolio !== undefined ? req.body.portfolio : user.portfolio;
            user.resume = req.body.resume !== undefined ? req.body.resume : user.resume;

            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profilePicture: updatedUser.profilePicture,
                bio: updatedUser.bio,
                location: updatedUser.location,
                domain: updatedUser.domain,
                linkedin: updatedUser.linkedin,
                github: updatedUser.github,
                portfolio: updatedUser.portfolio,
                resume: updatedUser.resume
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Please provide both current and new passwords' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const skip = (page - 1) * limit;

        const users = await User.find({}).skip(skip).limit(limit).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update user profile (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.adminUpdateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.profilePicture = req.body.profilePicture || user.profilePicture;
            user.bio = req.body.bio || user.bio;
            user.location = req.body.location || user.location;
            user.domain = req.body.domain || user.domain;
            user.linkedin = req.body.linkedin || user.linkedin;
            user.github = req.body.github || user.github;
            user.portfolio = req.body.portfolio || user.portfolio;
            user.resume = req.body.resume || user.resume;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ message: 'User removed' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update user settings & FCM tokens
// @route   PUT /api/users/settings
// @access  Private
exports.updateSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            if (req.body.settings) {
                user.settings = {
                    ...user.settings,
                    ...req.body.settings
                };
            }
            
            // Manage FCM Tokens
            if (req.body.fcmToken) {
                const token = req.body.fcmToken;
                const action = req.body.fcmAction || 'add'; // 'add' or 'remove'
                
                if (!user.fcmTokens) user.fcmTokens = [];
                
                if (action === 'add' && !user.fcmTokens.includes(token)) {
                    user.fcmTokens.push(token);
                } else if (action === 'remove') {
                    user.fcmTokens = user.fcmTokens.filter(t => t !== token);
                }
            }

            const updatedUser = await user.save();
            res.status(200).json({
                settings: updatedUser.settings,
                fcmTokens: updatedUser.fcmTokens
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ error: 'Server error' });
    }
};