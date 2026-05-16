/**
 * controllers/aiController.js
 * ----------------------------
 * Example AI chatbot controller that demonstrates:
 *  - callWithRetry  → automatic retry + exponential backoff on 429
 *  - aiQueue.enqueue → serialised calls with min-delay between them
 *  - Full try-catch with meaningful error responses
 *
 * Swap `callGemini` for any AI provider (OpenAI, Anthropic, etc.).
 * Set AI_API_KEY and AI_API_URL in your .env file.
 */

const { callWithRetry } = require('../utils/apiClient');
const { aiQueue }       = require('../utils/requestQueue');

// ---------------------------------------------------------------------------
// Internal helper — calls the actual AI provider
// ---------------------------------------------------------------------------

/**
 * Calls the configured AI API with a prompt.
 * Uses native fetch (Node 18+). Swap body/headers for your provider.
 *
 * @param {string} prompt
 * @returns {Promise<string>} AI response text
 */
const callAIProvider = async (prompt) => {
    const apiKey = process.env.AI_API_KEY;
    const apiUrl = process.env.AI_API_URL; // e.g. https://generativelanguage.googleapis.com/...

    if (!apiKey || !apiUrl) {
        throw Object.assign(
            new Error('AI_API_KEY or AI_API_URL is not configured in .env'),
            { status: 500 }
        );
    }

    const response = await fetch(apiUrl, {
        method:  'POST',
        headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            // --- Gemini example body ---
            contents: [{ parts: [{ text: prompt }] }],

            // --- OpenAI example body (uncomment if using OpenAI) ---
            // model:    'gpt-3.5-turbo',
            // messages: [{ role: 'user', content: prompt }],
        }),
    });

    // Throw an enriched error so callWithRetry can detect 429
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        const err  = new Error(`AI API error ${response.status}: ${body}`);
        err.status          = response.status;
        err.response        = response;           // lets callWithRetry read Retry-After
        throw err;
    }

    const data = await response.json();

    // --- Parse Gemini response ---
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // --- Parse OpenAI response (uncomment if using OpenAI) ---
    // const text = data?.choices?.[0]?.message?.content;

    if (!text) {
        throw new Error('AI API returned an empty or unexpected response body.');
    }

    return text.trim();
};

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

/**
 * @desc    Send a prompt to the AI and get a response
 * @route   POST /api/ai/chat
 * @access  Private (protect middleware applied in route file)
 */
exports.chat = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({
            success: false,
            error:   'Please provide a non-empty "prompt" string in the request body.',
        });
    }

    const sanitisedPrompt = prompt.trim().slice(0, 2000); // guard against huge payloads

    try {
        console.log(`[AI] 📨 New chat request from user ${req.user?._id ?? 'anonymous'}.`);

        // 1. Enqueue → enforces min delay between outgoing AI calls
        // 2. callWithRetry → retries on 429 with exponential backoff
        const aiResponse = await aiQueue.enqueue(() =>
            callWithRetry(
                () => callAIProvider(sanitisedPrompt),
                {
                    maxRetries:  5,
                    baseDelayMs: 1000,  // starts at 1 s, doubles each retry
                    maxDelayMs:  32000, // caps at 32 s
                    label:       'AI-Chat',
                }
            )
        );

        console.log(`[AI] ✅ Response returned successfully.`);

        return res.status(200).json({
            success:  true,
            response: aiResponse,
        });
    } catch (err) {
        const status = err?.status || 500;

        if (status === 429) {
            console.error(`[AI] ❌ Still hitting rate limit after all retries: ${err.message}`);
            return res.status(429).json({
                success: false,
                error:   'The AI service is temporarily rate-limited. Please try again in a moment.',
            });
        }

        if (status === 500 && err.message.includes('not configured')) {
            return res.status(500).json({ success: false, error: err.message });
        }

        console.error(`[AI] ❌ Unhandled error: ${err.message}`);
        return res.status(500).json({
            success: false,
            error:   'Failed to get a response from the AI service. Please try again.',
        });
    }
};
