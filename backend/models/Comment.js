const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  }
}, { timestamps: true });

// Index for fast retrieval of comments for a story
CommentSchema.index({ storyId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', CommentSchema);
