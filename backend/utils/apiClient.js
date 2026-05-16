const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const withJitter = (delay) => {
    const jitter = delay * 0.2 * (Math.random() * 2 - 1);
    return Math.max(0, Math.round(delay + jitter));
};

const callWithRetry = async (apiFn, options = {}) => {
    const {
        maxRetries = 5,
        baseDelayMs = 1000,
        maxDelayMs = 32000,
        label = 'API',
    } = options;

    let attempt = 0;

    while (attempt <= maxRetries) {
        try {
            const result = await apiFn();
            if (attempt > 0) {
                console.log(`[${label}] ✅ Succeeded on attempt ${attempt + 1}.`);
            }
            return result;
        } catch (err) {
            const status =
                err?.status ||
                err?.response?.status ||
                err?.statusCode ||
                null;

            const is429 = status === 429;

            if (!is429 || attempt >= maxRetries) {
                console.error(
                    `[${label}] ❌ Request failed (status=${status ?? 'unknown'}, ` +
                    `attempt=${attempt + 1}/${maxRetries + 1}): ${err.message}`
                );
                throw err;
            }

            const retryAfterHeader =
                err?.response?.headers?.['retry-after'] ||
                err?.headers?.['retry-after'];

            let delay;
            if (retryAfterHeader) {
                delay = parseFloat(retryAfterHeader) * 1000;
                console.warn(
                    `[${label}] ⚠️  429 received. Honouring Retry-After: ${retryAfterHeader}s ` +
                    `(attempt ${attempt + 1}/${maxRetries + 1}).`
                );
            } else {
                const exponential = baseDelayMs * Math.pow(2, attempt);
                delay = withJitter(Math.min(exponential, maxDelayMs));
                console.warn(
                    `[${label}] ⚠️  429 Too Many Requests. ` +
                    `Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})…`
                );
            }

            await sleep(delay);
            attempt++;
        }
    }
};

module.exports = { callWithRetry, sleep };
