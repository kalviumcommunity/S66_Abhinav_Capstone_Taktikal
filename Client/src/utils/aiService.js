/**
 * Shared client helper for communicating with the Taktikal backend AI endpoint (/api/ai/chat).
 */
export async function sendAiChatMessage({ apiBaseUrl, token, message, messages = [] }) {
    const history = messages
        .filter((m) => m && typeof m.text === 'string' && m.text.trim() && !m.isError)
        .slice(-10)
        .map((m) => ({
            role: m.from === 'user' ? 'user' : 'assistant',
            content: m.text,
        }));

    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiBaseUrl}/ai/chat`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ message, history }),
    });

    const text = await response.text();
    let data = {};
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        throw new Error(
            response.ok
                ? 'Invalid response from AI server.'
                : `Server error (${response.status}). Please ensure the backend server is running.`
        );
    }

    if (!response.ok) {
        throw new Error(data.message || `AI request failed (${response.status}).`);
    }

    return data.reply;
}
