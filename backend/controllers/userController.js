const User = require('../models/User');

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
            user.profilePicture = req.body.profilePicture || user.profilePicture;
            user.bio = req.body.bio || user.bio;
            user.location = req.body.location || user.location;
            user.domain = req.body.domain || user.domain;
            user.linkedin = req.body.linkedin || user.linkedin;
            user.github = req.body.github || user.github;
            user.portfolio = req.body.portfolio || user.portfolio;
            user.resume = req.body.resume || user.resume;

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

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
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
