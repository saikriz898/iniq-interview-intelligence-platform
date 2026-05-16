const express              = require('express');
const { chat }             = require('../controllers/aiController');
const { protect }          = require('../middleware/authMiddleware');
const { createRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

const aiRateLimit = createRateLimiter({
    maxRequests: 10,
    windowMs:    60_000,
    message:     'You are sending too many AI requests. Please wait a moment and try again.',
});

router.post('/chat', protect, aiRateLimit, chat);

module.exports = router;
