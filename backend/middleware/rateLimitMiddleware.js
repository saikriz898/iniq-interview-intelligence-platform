const createRateLimiter = (options = {}) => {
    const {
        maxRequests = 10,
        windowMs    = 60_000,
        message     = 'Too many requests. Please slow down and try again later.',
    } = options;

    const store = new Map();

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

        res.setHeader('X-RateLimit-Limit', maxRequests);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count));
        res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetAt / 1000));

        next();
    };
};

module.exports = { createRateLimiter };
