/**
 * utils/apiClient.js
 * ------------------
 * Reusable API call wrapper with:
 *  - Automatic retry on HTTP 429 (Too Many Requests)
 *  - Exponential backoff with jitter between retries
 *  - Configurable max retries and base delay
 *  - Structured error logging
 */

/**
 * Sleep for `ms` milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Adds random jitter (±20 %) to a delay to avoid thundering-herd.
 * @param {number} delay  base delay in ms
 * @returns {number}
 */
const withJitter = (delay) => {
    const jitter = delay * 0.2 * (Math.random() * 2 - 1); // ±20 %
    return Math.max(0, Math.round(delay + jitter));
};

/**
 * Calls an async function and retries automatically on HTTP 429.
 *
 * @param {() => Promise<any>} apiFn   - Async function that performs the API call.
 *                                       Must throw an error with a `status` or
 *                                       `response.status` property on failure.
 * @param {object}  options
 * @param {number}  [options.maxRetries=5]     - Max number of retry attempts.
 * @param {number}  [options.baseDelayMs=1000] - Initial backoff delay in ms.
 * @param {number}  [options.maxDelayMs=32000] - Cap for backoff delay in ms.
 * @param {string}  [options.label='API']      - Label used in log messages.
 * @returns {Promise<any>}  Resolved value of apiFn on success.
 * @throws  Last error after all retries are exhausted.
 */
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
            // Normalise the HTTP status from various error shapes
            const status =
                err?.status ||
                err?.response?.status ||
                err?.statusCode ||
                null;

            const is429 = status === 429;

            if (!is429 || attempt >= maxRetries) {
                // Not a rate-limit error, or we've exhausted retries
                console.error(
                    `[${label}] ❌ Request failed (status=${status ?? 'unknown'}, ` +
                    `attempt=${attempt + 1}/${maxRetries + 1}): ${err.message}`
                );
                throw err;
            }

            // --- 429: back off and retry ---
            // Honour the Retry-After header when provided (value in seconds)
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
                // Exponential backoff: baseDelay * 2^attempt, capped at maxDelay
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
