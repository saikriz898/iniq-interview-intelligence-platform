const { callWithRetry } = require('../utils/apiClient');
const { aiQueue }       = require('../utils/requestQueue');

const callAIProvider = async (prompt) => {
    const apiKey = process.env.AI_API_KEY;
    const apiUrl = process.env.AI_API_URL;

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
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        const err  = new Error(`AI API error ${response.status}: ${body}`);
        err.status = response.status;
        err.response = response;
        throw err;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('AI API returned an empty or unexpected response body.');
    }

    return text.trim();
};

exports.chat = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({
            success: false,
            error:   'Please provide a non-empty "prompt" string in the request body.',
        });
    }

    const sanitisedPrompt = prompt.trim().slice(0, 2000);

    try {
        console.log(`[AI] 📨 New chat request from user ${req.user?._id ?? 'anonymous'}.`);

        const aiResponse = await aiQueue.enqueue(() =>
            callWithRetry(
                () => callAIProvider(sanitisedPrompt),
                {
                    maxRetries:  5,
                    baseDelayMs: 1000,
                    maxDelayMs:  32000,
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
