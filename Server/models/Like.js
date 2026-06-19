const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  }
}, { timestamps: true });

// Ensure a user can only like a story once
LikeSchema.index({ userId: 1, storyId: 1 }, { unique: true });
// Index for finding all likes on a story
LikeSchema.index({ storyId: 1 });

module.exports = mongoose.model('Like', LikeSchema);
