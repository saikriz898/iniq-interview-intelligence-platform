/**
 * utils/requestQueue.js
 * ----------------------
 * A simple async FIFO queue that:
 *  - Serialises outgoing external API calls (one at a time)
 *  - Enforces a minimum delay between consecutive calls
 *  - Prevents bursts / thundering-herd when many route handlers
 *    fire simultaneously
 *
 * Usage:
 *   const queue = require('./requestQueue');
 *   const result = await queue.enqueue(() => myApiCall());
 */

const { sleep } = require('./apiClient');

class RequestQueue {
    /**
     * @param {object} options
     * @param {number} [options.minDelayMs=500]   Minimum ms between calls.
     * @param {number} [options.maxQueueSize=100]  Max pending jobs before rejecting.
     * @param {string} [options.label='Queue']    Label for log messages.
     */
    constructor(options = {}) {
        this.minDelayMs   = options.minDelayMs   ?? 500;
        this.maxQueueSize = options.maxQueueSize ?? 100;
        this.label        = options.label        ?? 'Queue';

        this._queue       = [];       // pending { fn, resolve, reject }
        this._running     = false;
        this._lastCallAt  = 0;        // timestamp of last completed call
    }

    /**
     * Adds an async function to the queue and returns its result.
     * @param {() => Promise<any>} fn
     * @returns {Promise<any>}
     */
    enqueue(fn) {
        return new Promise((resolve, reject) => {
            if (this._queue.length >= this.maxQueueSize) {
                console.error(
                    `[${this.label}] ❌ Queue full (${this.maxQueueSize} pending jobs). ` +
                    `Rejecting new request.`
                );
                return reject(
                    Object.assign(new Error('Request queue is full. Please try again later.'), {
                        status: 429,
                    })
                );
            }

            this._queue.push({ fn, resolve, reject });
            console.log(
                `[${this.label}] 📥 Job enqueued. Queue depth: ${this._queue.length}.`
            );
            this._drain();
        });
    }

    /** Internal: process queue one item at a time. */
    async _drain() {
        if (this._running) return;
        this._running = true;

        while (this._queue.length > 0) {
            const { fn, resolve, reject } = this._queue.shift();

            // Enforce minimum delay between calls
            const elapsed = Date.now() - this._lastCallAt;
            if (elapsed < this.minDelayMs) {
                const wait = this.minDelayMs - elapsed;
                console.log(`[${this.label}] ⏳ Rate-limit delay: waiting ${wait}ms…`);
                await sleep(wait);
            }

            try {
                console.log(
                    `[${this.label}] 🚀 Executing job. Queue remaining: ${this._queue.length}.`
                );
                const result = await fn();
                this._lastCallAt = Date.now();
                resolve(result);
            } catch (err) {
                this._lastCallAt = Date.now();
                reject(err);
            }
        }

        this._running = false;
    }

    /** Current number of pending jobs (not counting the running one). */
    get pendingCount() {
        return this._queue.length;
    }
}

// Export a singleton queue for AI / external API calls.
// Adjust minDelayMs to match your API tier's rate limit.
const aiQueue = new RequestQueue({
    minDelayMs:   600,   // at most ~1.6 calls/second by default
    maxQueueSize: 50,
    label:        'AI-Queue',
});

module.exports = { aiQueue, RequestQueue };
