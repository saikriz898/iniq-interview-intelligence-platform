const express = require('express');
const { register, login, googleLogin, refreshToken, forgotPassword, resetPassword, checkEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/check-email', checkEmail);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
