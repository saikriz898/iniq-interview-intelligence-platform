const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can only bookmark a story once
BookmarkSchema.index({ userId: 1, storyId: 1 }, { unique: true });
// Index for finding all bookmarks for a user
BookmarkSchema.index({ userId: 1, savedAt: -1 });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
