import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Send, Sparkles, Lightbulb, Star, RefreshCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { buildSportKnowledgeBase } from "../../constants/sports";

/* ─── Page Header ─────────────────────────────────────────────────────── */
const PageHeader = ({ title, subtitle, children }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5DC] leading-tight">{title}</h1>
            <p className="text-sm md:text-base text-[#F5F5DC]/55 mt-1">{subtitle}</p>
        </div>
        {children}
    </div>
);

export default function AIAssistant() {
    const { user } = useAuth();
    const sportName = user?.sport || "Football";

    const knowledgeBase = useMemo(() => buildSportKnowledgeBase(sportName), [sportName]);

    const welcomeText = `Hello Coach! I'm your ${sportName} AI assistant. Click a prompt below or ask about tactics, training, recovery, or analytics for ${sportName}.`;

    const [messages, setMessages] = useState([{ from: "bot", text: welcomeText }]);
    const [input, setInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([{ from: "bot", text: welcomeText }]);
    }, [welcomeText]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const getAnswerForQuery = (queryText) => {
        const lower = queryText.toLowerCase().trim();

        const exactMatch = knowledgeBase.find((kb) => kb.question.toLowerCase() === lower);
        if (exactMatch) return exactMatch.answer;

        let bestMatch = null;
        let highestScore = 0;

        knowledgeBase.forEach((kb) => {
            let score = 0;
            kb.keywords.forEach((kw) => {
                if (lower.includes(kw)) score += 2;
            });
            if (score > highestScore) {
                highestScore = score;
                bestMatch = kb;
            }
        });

        if (bestMatch && highestScore > 0) {
            return bestMatch.answer;
        }

        return `🎯 Coach AI Analysis (${sportName}):

Thank you for your question regarding "${queryText}".

Key Recommendations:
1. Keep drills specific to ${sportName.toLowerCase()} match situations.
2. Monitor workload and fatigue with daily athlete feedback.
3. Align session plans with the strategies in your ${sportName} tactics playbook.

Ask for training schedules, recovery protocols, or tactical breakdowns anytime.`;
    };

    const handleSendMessage = (textToSend) => {
        const q = textToSend || input;
        if (!q.trim()) return;

        setMessages((prev) => [...prev, { from: "user", text: q }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const answer = getAnswerForQuery(q);
            setMessages((prev) => [...prev, { from: "bot", text: answer }]);
            setIsTyping(false);
        }, 600);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const capabilities = [
        { icon: Sparkles, title: "Training Plans", desc: `Personalized ${sportName.toLowerCase()} session plans` },
        { icon: Star, title: "Performance Analysis", desc: "Insights on team & athlete performance" },
        { icon: Lightbulb, title: "Tactical Advice", desc: `Strategies tailored to ${sportName}` },
        { icon: Sparkles, title: "Injury Prevention", desc: "Recommendations to minimize risks" },
    ];

    const suggestions = [
        "Recommend recovery exercises",
        "Plan tomorrow's training",
        "Analyze recent performance",
        "Suggest tactics",
        "Nutrition tips",
        "How to improve sprint speed?",
    ];

    const filteredSuggestions = suggestions.filter((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#212121] min-h-screen">
            <PageHeader
                title="AI Coach Assistant"
                subtitle={`${sportName} coaching insights, tactical recommendations, and structured Q&A`}
            >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center bg-[#1a1a1a] border border-[#483C32]/50 focus-within:border-[#a38b82] rounded-full px-3.5 py-2.5 gap-2 flex-1 sm:flex-none transition-colors shadow-sm">
                        <Search size={15} className="text-[#F5F5DC]/35 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Filter prompts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="outline-none text-sm bg-transparent text-[#F5F5DC] placeholder-[#F5F5DC]/30 w-full sm:w-32 md:w-44"
                        />
                    </div>
                    <button
                        onClick={() => setMessages([{ from: "bot", text: welcomeText }])}
                        className="min-w-11 min-h-11 w-11 h-11 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#483C32]/45 hover:border-[#a38b82]/60 text-[#F5F5DC]/55 hover:text-[#F5F5DC] transition-all flex-shrink-0"
                        title="Clear Chat History"
                    >
                        <RefreshCw size={15} />
                    </button>
                    <button
                        className="min-w-11 min-h-11 w-11 h-11 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#483C32]/45 hover:border-[#a38b82]/60 text-[#F5F5DC]/55 hover:text-[#F5F5DC] transition-all flex-shrink-0"
                        aria-label="Notifications"
                    >
                        <Bell size={16} />
                    </button>
                </div>
            </PageHeader>

            <div className="flex flex-col lg:flex-row gap-5 lg:h-[calc(100vh-200px)] lg:min-h-[520px]">
                <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4 order-2 lg:order-1">
                    <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a896]/20 to-[#483C32]/30 border border-[#483C32]/50 flex items-center justify-center">
                                <Star size={16} className="text-[#c9a896]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-[#F5F5DC]">Coach AI Intelligence</h3>
                                <p className="text-xs text-[#c9a896]">{sportName} Q&A System</p>
                            </div>
                        </div>
                        <p className="text-xs text-[#F5F5DC]/55 mb-4 leading-relaxed">
                            Ask about {sportName.toLowerCase()} training schedules, tactics, recovery, and nutrition.
                        </p>

                        <h4 className="text-xs font-semibold text-[#F5F5DC]/60 uppercase tracking-wide mb-3">
                            AI Capabilities
                        </h4>
                        <div className="space-y-2">
                            {capabilities.map((cap, i) => {
                                const Icon = cap.icon;
                                return (
                                    <div key={i} className="flex items-start gap-2.5 bg-[#262626] rounded-xl p-3 border border-[#483C32]/25">
                                        <Icon size={13} className="text-[#a38b82] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-semibold text-[#F5F5DC]/80">{cap.title}</p>
                                            <p className="text-xs text-[#F5F5DC]/45 mt-0.5">{cap.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 order-1 lg:order-2 flex flex-col bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-0 shadow-xl">
                    <div className="bg-[#262626] border-b border-[#483C32]/35 px-5 py-3.5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a896]/25 to-[#483C32]/40 border border-[#483C32]/60 flex items-center justify-center">
                            <Star size={14} className="text-[#c9a896]" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#F5F5DC]">AI Coach Assistant</p>
                            <p className="text-xs text-[#F5F5DC]/40">{sportName} Sports Intelligence</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs text-green-400 font-medium hidden sm:inline-block">Online</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1 p-4 md:p-5 overflow-y-auto space-y-4 scrollbar-thin max-h-[55vh] lg:max-h-none">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.from === "bot" && (
                                        <div className="w-7 h-7 rounded-full bg-[#483C32]/50 border border-[#483C32] flex items-center justify-center mr-2.5 flex-shrink-0 mt-0.5 shadow-sm">
                                            <Star size={12} className="text-[#c9a896]" />
                                        </div>
                                    )}
                                    <div
                                        className={`px-4 py-3 rounded-2xl text-sm max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl whitespace-pre-line leading-relaxed ${
                                            msg.from === "user"
                                                ? "bg-[#483C32] text-[#F5F5DC] rounded-br-sm shadow-md font-medium"
                                                : "bg-[#262626] text-[#F5F5DC]/90 border border-[#483C32]/40 rounded-bl-sm shadow-sm"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-7 h-7 rounded-full bg-[#483C32]/50 border border-[#483C32] flex items-center justify-center flex-shrink-0">
                                    <Star size={12} className="text-[#c9a896]" />
                                </div>
                                <div className="bg-[#262626] border border-[#483C32]/30 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                                    {[0, 1, 2].map((i) => (
                                        <span
                                            key={i}
                                            className="w-1.5 h-1.5 bg-[#a38b82] rounded-full animate-bounce"
                                            style={{ animationDelay: `${i * 0.15}s` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="px-4 py-3 border-t border-[#483C32]/25 flex gap-2 overflow-x-auto scrollbar-hide bg-[#181818]/60">
                        {(filteredSuggestions.length ? filteredSuggestions : suggestions).map((sug, i) => (
                            <button
                                key={i}
                                onClick={() => handleSendMessage(sug)}
                                className="bg-[#262626] hover:bg-[#332f2c] border border-[#483C32]/40 hover:border-[#a38b82]/60 rounded-full px-3.5 py-1.5 text-xs text-[#F5F5DC]/70 hover:text-[#F5F5DC] whitespace-nowrap flex-shrink-0 transition-all cursor-pointer shadow-sm"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 p-4 border-t border-[#483C32]/25 bg-[#1a1a1a]">
                        <Lightbulb size={16} className="text-[#a38b82] flex-shrink-0" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Ask about ${sportName.toLowerCase()} tactics, recovery, or training...`}
                            className="flex-1 bg-[#262626] border border-[#483C32]/45 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-4 py-2.5 rounded-xl outline-none text-sm transition-colors"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!input.trim()}
                            className="min-w-11 min-h-11 w-11 h-11 flex items-center justify-center rounded-xl bg-[#483C32] hover:bg-[#5a4a3e] disabled:opacity-35 disabled:cursor-not-allowed text-[#F5F5DC] transition-all flex-shrink-0 border border-[#483C32] cursor-pointer"
                            aria-label="Send message"
                        >
                            <Send size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
