const mongoose = require('mongoose');
const { sendPushNotification } = require('../config/firebase');

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['Moderation', 'System', 'Security', 'User'],
    default: 'Moderation'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High', 'Critical'],
    default: 'Normal'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Trigger Firebase Push Notification
NotificationSchema.post('save', async function(doc) {
  try {
    const User = mongoose.model('User');
    const recipient = await User.findById(doc.recipient);
    
    if (recipient && recipient.fcmTokens && recipient.fcmTokens.length > 0) {
      await sendPushNotification(
        recipient.fcmTokens,
        doc.title,
        doc.message,
        { link: doc.link || '', type: doc.type }
      );
    }
  } catch (err) {
    console.error('Error triggering push notification:', err);
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
