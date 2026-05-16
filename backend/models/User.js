const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'User',
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password required only if no googleId
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple nulls for users with only password
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    domain: {
        type: String,
        default: ''
    },
    linkedin: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        default: ''
    },
    portfolio: {
        type: String,
        default: ''
    },
    resume: {
        type: String,
        default: ''
    },
    college: {
        type: String,
        default: ''
    },
    likedStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    }],
    savedStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    }]
}, { timestamps: true });

// Hash password before saving to database
userSchema.pre('save', async function() {
    if (!this.password || !this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
