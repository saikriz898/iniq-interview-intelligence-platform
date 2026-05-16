/**
 * middleware/rateLimitMiddleware.js
 * ----------------------------------
 * Per-IP in-memory rate limiter for Express routes.
 *
 * Protects your own endpoints from being called too rapidly by clients,
 * which in turn prevents you from hammering the external AI API.
 *
 * Usage (in server.js or a specific router):
 *   const { createRateLimiter } = require('./middleware/rateLimitMiddleware');
 *   app.use('/api/ai', createRateLimiter({ maxRequests: 10, windowMs: 60_000 }));
 */

/**
 * Creates an Express rate-limit middleware.
 *
 * @param {object}  options
 * @param {number}  [options.maxRequests=10]   Max allowed requests per IP per window.
 * @param {number}  [options.windowMs=60000]   Window size in milliseconds (default 1 min).
 * @param {string}  [options.message]          Custom error message.
 * @returns {import('express').RequestHandler}
 */
const createRateLimiter = (options = {}) => {
    const {
        maxRequests = 10,
        windowMs    = 60_000,
        message     = 'Too many requests. Please slow down and try again later.',
    } = options;

    /** @type {Map<string, { count: number, resetAt: number }>} */
    const store = new Map();

    // Periodically clean up expired entries to prevent memory leaks
    setInterval(() => {
        const now = Date.now();
        for (const [ip, record] of store.entries()) {
            if (now > record.resetAt) store.delete(ip);
        }
    }, windowMs);

    return (req, res, next) => {
        const ip  = req.ip || req.connection?.remoteAddress || 'unknown';
        const now = Date.now();

        let record = store.get(ip);

        if (!record || now > record.resetAt) {
            // New window
            record = { count: 1, resetAt: now + windowMs };
            store.set(ip, record);
            return next();
        }

        record.count++;

        if (record.count > maxRequests) {
            const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);

            console.warn(
                `[RateLimit] ⛔ IP ${ip} exceeded ${maxRequests} req / ${windowMs}ms. ` +
                `Retry-After: ${retryAfterSec}s.`
            );

            res.setHeader('Retry-After', retryAfterSec);
            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', 0);
            res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetAt / 1000));

            return res.status(429).json({
                success:     false,
                error:       message,
                retryAfter:  retryAfterSec,
            });
        }

        // Attach rate-limit info headers for clients
        res.setHeader('X-RateLimit-Limit', maxRequests);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count));
        res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetAt / 1000));

        next();
    };
};

module.exports = { createRateLimiter };
