const mongoose = require('mongoose');

const RoundSchema = new mongoose.Schema({
  number: { type: Number },
  title: { type: String, required: true },
  desc: { type: String, required: true }, // Detailed interview story for this round
  details: { type: String }, // Focus areas / questions
  solution: { type: String }, // Optional solution or approach
  videoLink: { type: String }
});

const ExperienceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  // Denormalized for fast display
  companyName: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Internship', 'Fresh Graduate'],
    required: true
  },
  candidateExperience: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    default: 'Remote'
  },
  salary: {
    type: String // Optional: Range or specific amount
  },
  interviewMode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    default: 'Online'
  },
  verdict: {
    type: String,
    required: true,
    enum: ['Selected', 'Rejected']
  },
  applicationMethod: {
    type: String,
    enum: ['Referral', 'Off-campus', 'On-campus', 'LinkedIn', 'Career Portal'],
    default: 'Off-campus'
  },
  summary: {
    type: String,
    required: true,
    maxlength: 300
  },
  processOverview: {
    type: String,
    required: true
  },
  topics: [{
    name: { type: String },
    importance: { type: Number, min: 1, max: 5 }
  }],
  rounds: [RoundSchema],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  preparationTips: {
    type: String
  },
  advice: {
    type: String
  },
  resources: [{
    title: { type: String },
    link: { type: String }
  }],
  tags: [String],
  
  // Engagement Stats
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  bookmarkCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  
  // Status & Moderation
  status: {
    type: String,
    enum: ['Pending Review', 'Approved', 'Rejected'],
    default: 'Pending Review'
  },
  isVerified: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// --- INDEXING STRATEGY ---

// Fast filtering
ExperienceSchema.index({ companyId: 1 });
ExperienceSchema.index({ role: 1 });
ExperienceSchema.index({ experienceLevel: 1 });
ExperienceSchema.index({ verdict: 1 });
ExperienceSchema.index({ difficulty: 1 });
ExperienceSchema.index({ status: 1 });

// Multi-key index for tags and topics
ExperienceSchema.index({ tags: 1 });
ExperienceSchema.index({ 'topics.name': 1 });

// Text Search Index
ExperienceSchema.index({ 
    companyName: 'text', 
    role: 'text', 
    summary: 'text', 
    processOverview: 'text',
    tags: 'text'
}, {
    weights: {
        companyName: 10,
        role: 8,
        tags: 5,
        summary: 3,
        processOverview: 1
    },
    name: 'ExperienceTextSearchIndex'
});

// Sort by recency and popularity
ExperienceSchema.index({ createdAt: -1 });
ExperienceSchema.index({ likesCount: -1 });

module.exports = mongoose.model('Experience', ExperienceSchema);
