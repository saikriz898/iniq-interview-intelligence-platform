const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/submit-experience', protect, experienceController.submitExperience);
router.get('/user-dashboard', protect, experienceController.getUserDashboard);
router.get('/admin-dashboard', protect, admin, experienceController.getAdminDashboard);
router.get('/admin-submissions', protect, admin, experienceController.getAdminSubmissions);
router.patch('/update-status/:id', protect, admin, experienceController.updateStatus);
router.put('/:id', protect, admin, experienceController.updateExperience);
router.delete('/:id', protect, admin, experienceController.deleteExperience);
router.get('/approved', experienceController.getApprovedExperiences);
router.get('/:id', experienceController.getExperienceById);

module.exports = router;
