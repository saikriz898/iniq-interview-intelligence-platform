const Experience = require('../models/Experience');
const Notification = require('../models/Notification');
const User = require('../models/User');

exports.submitExperience = async (req, res) => {
  try {
    const { 
      company, // Frontend sends name as 'company'
      role, 
      experienceLevel,
      candidateExperience,
      location,
      salary,
      interviewMode,
      applicationMethod,
      summary,
      processOverview, 
      topics, 
      rounds, 
      questions,
      difficulty,
      verdict, 
      advice 
    } = req.body;

    // Find company to get companyId if exists
    const Company = require('../models/Company');
    const existingCompany = await Company.findOne({ name: company });

    // Map topics array
    const formattedTopics = Array.isArray(topics) ? topics.map(t => ({
      name: t.name,
      details: t.details,
      importance: 5
    })).filter(t => t.name && t.name.trim() !== '') : [];

    // Map rounds
    const formattedRounds = rounds.map((r, index) => ({
      number: index + 1,
      title: r.title,
      desc: r.questions,
      details: r.explanation,
      codeQuestion: r.codeQuestion,
      solution: r.solution,
      videoLink: r.videoLink,
      frontendId: r.id // Keep it temporarily to map questions
    }));

    // Map questions
    const formattedQuestions = Array.isArray(questions) ? questions.map(q => {
      const parentRound = formattedRounds.find(r => String(r.frontendId) === String(q.roundId));
      return {
        text: q.text,
        codeSnippet: q.codeSnippet,
        output: q.output,
        explanation: q.explanation,
        topic: q.topic,
        roundId: parentRound ? parentRound.number.toString() : q.roundId
      };
    }).filter(q => q.text && q.text.trim() !== '') : [];

    // Clean up temporary frontendId
    formattedRounds.forEach(r => delete r.frontendId);

    const newExperience = new Experience({
      user: req.user.id,
      companyId: existingCompany ? existingCompany._id : null,
      companyName: company,
      role,
      experienceLevel: experienceLevel || 'Entry Level',
      candidateExperience: Number(candidateExperience) || 0,
      location: location || 'Remote',
      salary,
      interviewMode: interviewMode || 'Online',
      applicationMethod: applicationMethod || 'Off-campus',
      summary: summary || processOverview.substring(0, 200),
      processOverview,
      topics: formattedTopics,
      rounds: formattedRounds,
      questions: formattedQuestions,
      difficulty: difficulty || 'Medium',
      verdict: verdict || 'Pending',
      advice,
      status: 'Pending Review'
    });
    
    await newExperience.save();

    // Notify Admins
    const admins = await User.find({ role: 'admin' });
    const notificationPromises = admins.map(admin => {
      return new Notification({
        recipient: admin._id,
        sender: req.user.id,
        type: 'Moderation',
        title: 'PENDING_REVIEW_ALERT',
        message: `New ${company} ${role} submission from @${req.user.name || 'User'} requires administrative verification.`,
        link: `/admin/pending-reviews`,
        priority: 'High'
      }).save();
    });
    await Promise.all(notificationPromises);

    res.status(201).json({ message: 'Experience submitted successfully and is pending review.', experience: newExperience });
  } catch (error) {
    console.error('Error submitting experience:', error);
    res.status(500).json({ error: 'Failed to submit experience', details: error.message });
  }
};

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const experiences = await Experience.find({ user: userId });
    
    let total = experiences.length;
    let approved = experiences.filter(exp => exp.status === 'Approved').length;
    let pending = experiences.filter(exp => exp.status === 'Pending Review').length;
    let rejected = experiences.filter(exp => exp.status === 'Rejected').length;
    
    res.status(200).json({ total, approved, pending, rejected, experiences });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user dashboard data' });
  }
};

exports.getAdminSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100; // 100 default to prevent breaking old clients
    const skip = (page - 1) * limit;

    const submissions = await Experience.find()
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email');
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin submissions' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;
    
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const experience = await Experience.findByIdAndUpdate(id, { status, adminFeedback: feedback || '' }, { new: true }).populate('user');
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Notify User
    await new Notification({
      recipient: experience.user._id,
      type: 'User',
      title: status === 'Approved' ? 'EXPERIENCE_APPROVED' : 'EXPERIENCE_REJECTED',
      message: `Your experience submission for ${experience.company} has been ${status.toLowerCase()}.${feedback ? ` Admin Note: ${feedback}` : ''}`,
      link: '/dashboard',
      priority: status === 'Approved' ? 'Normal' : 'High'
    }).save();

    res.status(200).json({ message: `Status updated to ${status}`, experience });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.getApprovedExperiences = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const skip = (page - 1) * limit;

    const approved = await Experience.find({ status: 'Approved' })
        .skip(skip)
        .limit(limit)
        .populate('user', 'name');
    res.status(200).json(approved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch approved experiences' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if experience exists and belongs to user
    const existingExperience = await Experience.findById(id);
    if (!existingExperience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    // Allow if user is admin OR user is the owner
    if (req.user.role !== 'admin' && existingExperience.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized to edit this experience' });
    }

    const { rounds, questions, topics, ...rest } = req.body;
    
    const updateData = { ...rest };
    if (req.user.role !== 'admin') {
        updateData.status = 'Pending Review';
    }
    
    if (topics) {
        updateData.topics = Array.isArray(topics) ? topics.map(t => ({
          name: t.name,
          details: t.details,
          importance: 5
        })).filter(t => t.name && t.name.trim() !== '') : [];
    }

    if (rounds) {
        updateData.rounds = rounds.map((r, index) => ({
          number: index + 1,
          title: r.title,
          desc: r.questions,
          details: r.explanation,
          codeQuestion: r.codeQuestion,
          solution: r.solution,
          videoLink: r.videoLink,
          frontendId: r.id
        }));
    }

    if (questions) {
        updateData.questions = Array.isArray(questions) ? questions.map(q => {
          let parentRound;
          if (updateData.rounds) {
            parentRound = updateData.rounds.find(r => String(r.frontendId) === String(q.roundId));
          }
          return {
            text: q.text,
            codeSnippet: q.codeSnippet,
            output: q.output,
            explanation: q.explanation,
            topic: q.topic,
            roundId: parentRound ? parentRound.number.toString() : q.roundId
          };
        }).filter(q => q.text && q.text.trim() !== '') : [];
    }

    if (updateData.rounds) {
        updateData.rounds.forEach(r => delete r.frontendId);
    }
    
    const experience = await Experience.findByIdAndUpdate(id, updateData, { new: true });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(200).json({ message: 'Experience updated successfully', experience });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await Experience.findByIdAndDelete(id);
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).populate('user', 'name email');
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience details' });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const all = await Experience.countDocuments();
    const pending = await Experience.countDocuments({ status: 'Pending Review' });
    const approved = await Experience.countDocuments({ status: 'Approved' });
    const rejected = await Experience.countDocuments({ status: 'Rejected' });
    
    const recentPending = await Experience.find({ status: 'Pending Review' })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      total: all,
      pending,
      approved,
      rejected,
      recentPending
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin dashboard telemetry' });
  }
};
