import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, RefreshCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { sendAiChatMessage } from "../utils/aiService";

/**
 * Floating AI Coach Chatbot widget accessible across all protected dashboard pages
 * (automatically hidden on /ai-assistant where the full-page assistant lives).
 */
export default function FloatingChatbot() {
    const { pathname } = useLocation();
    const { user, token, API_BASE_URL } = useAuth();
    const sportName = user?.sport || "Football";

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: `Hi Coach! Need quick ${sportName.toLowerCase()} drills, tactics, or roster advice?`,
        },
    ]);

    const endRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping, isOpen]);

    if (pathname === "/ai-assistant") {
        return null;
    }

    const handleSend = async (customText) => {
        const q = (customText || input).trim();
        if (!q || isTyping) return;

        const history = messages.slice(1);
        setMessages((prev) => [...prev, { from: "user", text: q }]);
        setInput("");
        setIsTyping(true);

        try {
            const reply = await sendAiChatMessage({
                apiBaseUrl: API_BASE_URL,
                token,
                message: q,
                messages: history,
            });
            setMessages((prev) => [...prev, { from: "bot", text: reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: `⚠️ ${err.message || "Unable to reach AI Coach right now."}`,
                    isError: true,
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleReset = () => {
        setMessages([
            {
                from: "bot",
                text: `Hi Coach! Need quick ${sportName.toLowerCase()} drills, tactics, or roster advice?`,
            },
        ]);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-3 w-[340px] sm:w-[380px] h-[480px] bg-[#1a1a1a] border border-[#483C32]/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#262626] border-b border-[#483C32]/40 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a896]/25 to-[#483C32]/40 border border-[#483C32]/60 flex items-center justify-center">
                                    <Sparkles size={14} className="text-[#c9a896]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#F5F5DC] leading-tight">Taktikal AI</p>
                                    <p className="text-[11px] text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                                        {sportName} Coach
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleReset}
                                    className="p-1.5 rounded-lg text-[#F5F5DC]/50 hover:text-[#F5F5DC] hover:bg-[#332f2c] transition-colors cursor-pointer"
                                    title="Clear chat"
                                    aria-label="Clear chat"
                                >
                                    <RefreshCw size={14} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg text-[#F5F5DC]/50 hover:text-[#F5F5DC] hover:bg-[#332f2c] transition-colors cursor-pointer"
                                    aria-label="Close chatbot"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 scrollbar-thin">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm max-w-[85%] whitespace-pre-line leading-relaxed ${
                                            msg.from === "user"
                                                ? "bg-[#483C32] text-[#F5F5DC] rounded-br-sm"
                                                : "bg-[#262626] text-[#F5F5DC]/90 border border-[#483C32]/40 rounded-bl-sm"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#262626] border border-[#483C32]/30 px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-1.5 h-1.5 bg-[#a38b82] rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-[#483C32]/30 bg-[#1a1a1a] flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Ask Taktikal AI..."
                                className="flex-1 bg-[#262626] border border-[#483C32]/45 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/35 px-3 py-2 rounded-xl outline-none text-xs sm:text-sm transition-colors"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#483C32] hover:bg-[#5a4a3e] disabled:opacity-35 disabled:cursor-not-allowed text-[#F5F5DC] transition-all cursor-pointer flex-shrink-0"
                                aria-label="Send message"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-13 h-13 rounded-full bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] shadow-xl border border-[#c9a896]/40 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ml-auto"
                aria-label="Toggle AI Coach Chatbot"
                title="AI Coach Chatbot"
            >
                {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
            </button>
        </div>
    );
}
