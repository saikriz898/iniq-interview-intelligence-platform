const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String,
    required: true,
    enum: ['Spam', 'Inappropriate Content', 'False Information', 'Harassment', 'Other']
  },
  details: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Resolved', 'Dismissed'],
    default: 'Pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Index for admin to find pending reports
ReportSchema.index({ status: 1, createdAt: -1 });
// Index for finding reports on a specific story
ReportSchema.index({ storyId: 1 });

module.exports = mongoose.model('Report', ReportSchema);
