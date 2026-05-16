const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, notificationController.getNotifications);
router.patch('/mark-read/:id', protect, notificationController.markAsRead);
router.patch('/mark-all-read', protect, notificationController.markAllRead);
router.delete('/clear', protect, notificationController.clearNotifications);

module.exports = router;
