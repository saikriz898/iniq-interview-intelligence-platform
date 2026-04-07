const { sleep } = require('./apiClient');

class RequestQueue {
    constructor(options = {}) {
        this.minDelayMs   = options.minDelayMs   ?? 500;
        this.maxQueueSize = options.maxQueueSize ?? 100;
        this.label        = options.label        ?? 'Queue';

        this._queue       = [];
        this._running     = false;
        this._lastCallAt  = 0;
    }

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

    async _drain() {
        if (this._running) return;
        this._running = true;

        while (this._queue.length > 0) {
            const { fn, resolve, reject } = this._queue.shift();

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

    get pendingCount() {
        return this._queue.length;
    }
}

const aiQueue = new RequestQueue({
    minDelayMs:   600,
    maxQueueSize: 50,
    label:        'AI-Queue',
});

module.exports = { aiQueue, RequestQueue };
