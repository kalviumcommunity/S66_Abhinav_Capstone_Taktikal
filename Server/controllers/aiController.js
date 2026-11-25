const Athlete = require('../models/athleteModel');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b';
const MAX_HISTORY_MESSAGES = 10;

/**
 * Build a concise roster summary for the coach's sport so the LLM can
 * give personalized, context-aware coaching advice.
 */
async function buildCoachContext(coach) {
    const sport = coach?.sport || 'Football';
    const coachName = coach?.name || 'Coach';

    let rosterSummary = 'No athletes registered on the roster yet.';
    try {
        const athletes = await Athlete.find({ coach: coach._id, isActive: true })
            .select('name position speed strength stamina')
            .limit(20)
            .lean();

        if (athletes.length > 0) {
            const lines = athletes.map(
                (a) => `- ${a.name} (${a.position}): Speed ${a.speed}/10, Strength ${a.strength}/10, Stamina ${a.stamina}/10`
            );
            rosterSummary = `Active roster (${athletes.length} athletes):\n${lines.join('\n')}`;
        }
    } catch (err) {
        // Non-fatal: continue without roster context if DB lookup fails
        console.warn('Could not load roster context for AI chat:', err.message);
    }

    return { sport, coachName, rosterSummary };
}

/**
 * POST /api/ai/chat
 * Send a coaching query (with optional conversation history) to Groq LLM.
 */
const chatWithAssistant = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ message: 'Please provide a valid message.' });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return res.status(503).json({
                message: 'AI service is not configured. Missing GROQ_API_KEY on server.'
            });
        }

        const model = process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;
        const { sport, coachName, rosterSummary } = await buildCoachContext(req.user);

        const systemPrompt = [
            `You are Taktikal AI, an expert ${sport} sports coach, tactician, strength & conditioning specialist, and sports nutritionist.`,
            `You are assisting ${coachName}, who coaches ${sport}.`,
            `Provide practical, actionable, structured coaching advice tailored to ${sport}.`,
            `Use clear formatting (bullet points or numbered steps) and keep responses concise and easy to read.`,
            `When relevant, reference the coach's actual team roster below:\n${rosterSummary}`
        ].join('\n\n');

        const sanitizedHistory = Array.isArray(history)
            ? history
                .filter(
                    (m) =>
                        m &&
                        (m.role === 'user' || m.role === 'assistant') &&
                        typeof m.content === 'string' &&
                        m.content.trim().length > 0
                )
                .slice(-MAX_HISTORY_MESSAGES)
                .map((m) => ({ role: m.role, content: m.content.trim() }))
            : [];

        const messages = [
            { role: 'system', content: systemPrompt },
            ...sanitizedHistory,
            { role: 'user', content: message.trim() }
        ];

        const groqResponse = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        const data = await groqResponse.json();

        if (!groqResponse.ok) {
            console.error('Groq API error:', data);
            return res.status(groqResponse.status === 401 ? 502 : groqResponse.status).json({
                message: data?.error?.message || 'Failed to generate AI response.'
            });
        }

        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (!reply) {
            return res.status(502).json({
                message: 'AI returned an empty response. Please try again.'
            });
        }

        return res.status(200).json({
            reply,
            model: data.model || model
        });
    } catch (error) {
        console.error('AI chat error:', error);
        return res.status(500).json({
            message: 'An error occurred while communicating with the AI assistant.'
        });
    }
};

module.exports = {
    chatWithAssistant
};
