const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUsers, adminUpdateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.get('/', protect, admin, getUsers);
router.put('/:id', protect, admin, adminUpdateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
