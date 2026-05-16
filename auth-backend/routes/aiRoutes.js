/**
 * routes/aiRoutes.js
 * -------------------
 * Mounts the AI chat endpoint with:
 *  - Per-IP rate limiting (10 req / 60 s per client IP)
 *  - JWT protection (reuses existing authMiddleware)
 */

const express              = require('express');
const { chat }             = require('../controllers/aiController');
const { protect }          = require('../middleware/authMiddleware');
const { createRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

// Allow max 10 AI requests per IP per minute
const aiRateLimit = createRateLimiter({
    maxRequests: 10,
    windowMs:    60_000,
    message:     'You are sending too many AI requests. Please wait a moment and try again.',
});

// POST /api/ai/chat
// Headers: Authorization: Bearer <jwt>
// Body:    { "prompt": "..." }
router.post('/chat', protect, aiRateLimit, chat);

module.exports = router;
