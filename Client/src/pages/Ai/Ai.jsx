import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Send, Sparkles, Lightbulb, Star, RefreshCw } from "lucide-react";

/* ─── Page Header ─────────────────────────────────────────────────────── */
const PageHeader = ({ title, subtitle, children }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5DC] leading-tight">{title}</h1>
            <p className="text-sm md:text-base text-[#F5F5DC]/55 mt-1">{subtitle}</p>
        </div>
        {children}
    </div>
)

/* ─── Smart Q&A Knowledge Base ────────────────────────────────────────── */
const QA_KNOWLEDGE_BASE = [
    {
        keywords: ['recovery', 'rest', 'exercise', 'cool down', 'sore'],
        question: 'Recommend recovery exercises',
        answer: `🏆 Coach AI 30-Minute Recovery Protocol:

1. Active Recovery (10 mins)
   • Light cycling or low-intensity jog at 40-50% HRmax to flush lactate.

2. Dynamic & Static Mobility (10 mins)
   • Hamstring sweeps, hip flexor openers, seated groin stretches, and thoracic spine rotations (45s per hold).

3. Myofascial Release (10 mins)
   • Target calves, IT bands, quads, and hamstrings with foam roller (60s per muscle group).

4. Hydration & Refueling
   • Rehydrate with 500ml electrolyte solution + 25g protein within 45 mins post-session.`
    },
    {
        keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
        question: "Plan tomorrow's training",
        answer: `📋 Coach AI High-Performance Session Agenda:

• 09:00 AM — Dynamic Warmup & Mobility Drills (15 mins)
• 09:15 AM — High-Tempo Rondo 5v2 & Ball Circulation (20 mins)
• 09:35 AM — Tactical Phase of Play: Transitioning Defense to Attack (30 mins)
• 10:05 AM — Small-Sided Game 7v7 High-Pressing Scenarios (20 mins)
• 10:25 AM — Specific Set Pieces & Tactical Free Kicks (15 mins)
• 10:40 AM — Cool-down, Foam Rolling & Hydration Check (10 mins)`
    },
    {
        keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
        question: 'Analyze recent performance',
        answer: `📊 Team Performance Intelligence Summary:

• Squad Physical Intensity: 88% (+4% increase vs last week)
• High-Speed Running Distance: Average 1,240m per player
• Tactical Formation Compliance: High (Disciplined defensive compactness)
• Tactical Passing Efficiency: 84.5% completion rate

💡 Recommendation: Maintain workload density; schedule extra recovery for midfielders ahead of the weekend match.`
    },
    {
        keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense'],
        question: 'Suggest tactics',
        answer: `♟️ Coach AI Tactical Recommendations:

1. High Pressing Trap (4-3-3 / 4-2-3-1)
   • Force opponent buildup toward the touchline and trigger a 3-player press when fullbacks receive the ball.

2. In-Possession Overload
   • Invert left winger inside to create a 3v2 mid-field numerical advantage during transition.

3. Rest Defense Safety
   • Maintain a 2+1 rest defense structure (both CBs + 1 DM) behind the ball line to prevent counter-attacks.`
    },
    {
        keywords: ['nutrition', 'diet', 'food', 'meal', 'carbs', 'protein', 'water'],
        question: 'Nutrition tips',
        answer: `🥗 Matchday & High-Performance Nutrition Guide:

• Pre-Match (3-4 hrs prior):
  Complex carbohydrates (oatmeal, brown rice, lean chicken/pasta) + 500ml water.

• Pre-Match (60 mins prior):
  Fast-digesting carbs (banana, energy bar) for rapid glycogen reserves.

• Intra-Match / Session:
  Electrolyte replenishment (150-200ml every 15-20 minutes).

• Post-Session Recovery:
  3:1 Carbohydrate-to-Protein ratio shake (e.g. 50g carbs + 25g whey protein) within 45 minutes.`
    },
    {
        keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity'],
        question: 'How to improve sprint speed?',
        answer: `⚡ Sprint Velocity & Acceleration Protocol:

1. Plyometric Drills (2x per week)
   • Depth jumps, bounding, and single-leg hurdle hops to increase ground reaction force.

2. Resisted Sprinting
   • Sled pulls at 10-15% bodyweight for 10-20m max efforts (4-6 reps, full rest).

3. Technique Cues
   • High knee drive, aggressive triple extension at hip-knee-ankle, and neutral head posture.`
    },
    {
        keywords: ['strength', 'weights', 'gym', 'power'],
        question: 'How to build athletic strength?',
        answer: `🏋️ Athletic Strength & Power Guidelines:

1. Compound Movements: Trap bar deadlifts, rear-foot elevated split squats, and Romanian deadlifts (3-4 sets of 5 reps).
2. Rate of Force Development: Barbell hip thrusts and medicine ball rotational slams.
3. Injury Prevention: Eccentric Nordic hamstring curls (3 sets of 6 reps) for strain prevention.`
    }
];

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: "Hello Coach! I'm your AI assistant powered by sports intelligence. Click a prompt below or ask me any question about tactics, training, recovery, or analytics."
        }
    ]);
    const [input, setInput]             = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isTyping, setIsTyping]       = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const getAnswerForQuery = (queryText) => {
        const lower = queryText.toLowerCase().trim();
        
        // Exact match check
        const exactMatch = QA_KNOWLEDGE_BASE.find(kb => kb.question.toLowerCase() === lower);
        if (exactMatch) return exactMatch.answer;

        // Keyword score match check
        let bestMatch = null;
        let highestScore = 0;

        QA_KNOWLEDGE_BASE.forEach(kb => {
            let score = 0;
            kb.keywords.forEach(kw => {
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

        // Generic fallback with professional structure
        return `🎯 Coach AI Analysis:

Thank you for your question regarding "${queryText}".

Key Recommendations:
1. Focus on high-intensity specificity during team drills.
2. Monitor workload & fatigue metrics using daily athlete feedback.
3. Align tactical positioning with your team's core formation strengths.

Feel free to ask for specific training schedules, recovery protocols, or tactical breakdowns!`;
    };

    const handleSendMessage = (textToSend) => {
        const q = textToSend || input;
        if (!q.trim()) return;

        const newMessages = [...messages, { from: 'user', text: q }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const answer = getAnswerForQuery(q);
            setMessages(prev => [...prev, { from: 'bot', text: answer }]);
            setIsTyping(false);
        }, 600);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const capabilities = [
        { icon: Sparkles,  title: 'Training Plans',       desc: 'Generate personalized training plans' },
        { icon: Star,      title: 'Performance Analysis', desc: 'Get insights on team & player performance' },
        { icon: Lightbulb, title: 'Tactical Advice',     desc: 'Suggestions for strategies and formations' },
        { icon: Sparkles,  title: 'Injury Prevention',   desc: 'Recommendations to minimize risks' },
    ];

    const suggestions = [
        'Recommend recovery exercises',
        'Plan tomorrow\'s training',
        'Analyze recent performance',
        'Suggest tactics',
        'Nutrition tips',
        'How to improve sprint speed?',
    ];

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#212121] min-h-screen">
            <PageHeader
                title="AI Coach Assistant"
                subtitle="Get intelligent insights, tactical recommendations, and structured coaching Q&A"
            >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center bg-[#1a1a1a] border border-[#483C32]/50 focus-within:border-[#a38b82] rounded-full px-3.5 py-2.5 gap-2 flex-1 sm:flex-none transition-colors shadow-sm">
                        <Search size={15} className="text-[#F5F5DC]/35 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search AI features..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="outline-none text-sm bg-transparent text-[#F5F5DC] placeholder-[#F5F5DC]/30 w-full sm:w-32 md:w-44"
                        />
                    </div>
                    <button
                        onClick={() => setMessages([{ from: 'bot', text: "Hello Coach! Chat history reset. Ask me any question about tactics or training." }])}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#483C32]/45 hover:border-[#a38b82]/60 text-[#F5F5DC]/55 hover:text-[#F5F5DC] transition-all flex-shrink-0"
                        title="Clear Chat History"
                    >
                        <RefreshCw size={15} />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#483C32]/45 hover:border-[#a38b82]/60 text-[#F5F5DC]/55 hover:text-[#F5F5DC] transition-all flex-shrink-0" aria-label="Notifications">
                        <Bell size={16} />
                    </button>
                </div>
            </PageHeader>

            {/* ─── Content Layout ────────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row gap-5 h-[calc(100vh-200px)] min-h-[520px]">

                {/* ─── Left Panel ─────────────────────────────────────── */}
                <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4 order-2 lg:order-1">
                    {/* Coach AI info card */}
                    <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-5 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a896]/20 to-[#483C32]/30 border border-[#483C32]/50 flex items-center justify-center">
                                <Star size={16} className="text-[#c9a896]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-[#F5F5DC]">Coach AI Intelligence</h3>
                                <p className="text-xs text-[#c9a896]">Sports Q&A System</p>
                            </div>
                        </div>
                        <p className="text-xs text-[#F5F5DC]/55 mb-4 leading-relaxed">
                            Ask questions regarding training schedules, tactics, recovery, and athlete sports nutrition.
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

                {/* ─── Chat Panel ──────────────────────────────────────── */}
                <div className="flex-1 order-1 lg:order-2 flex flex-col bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl overflow-hidden min-h-[420px] shadow-xl">
                    {/* Chat header */}
                    <div className="bg-[#262626] border-b border-[#483C32]/35 px-5 py-3.5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a896]/25 to-[#483C32]/40 border border-[#483C32]/60 flex items-center justify-center">
                            <Star size={14} className="text-[#c9a896]" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#F5F5DC]">AI Coach Assistant</p>
                            <p className="text-xs text-[#F5F5DC]/40">Active Sports Intelligence Assistant</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-xs text-green-400 font-medium hidden sm:inline-block">Online</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </div>
                    </div>

                    {/* Messages Feed */}
                    <div className="flex-1 p-4 md:p-5 overflow-y-auto space-y-4 scrollbar-thin">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.from === 'bot' && (
                                        <div className="w-7 h-7 rounded-full bg-[#483C32]/50 border border-[#483C32] flex items-center justify-center mr-2.5 flex-shrink-0 mt-0.5 shadow-sm">
                                            <Star size={12} className="text-[#c9a896]" />
                                        </div>
                                    )}
                                    <div
                                        className={`px-4 py-3 rounded-2xl text-sm max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl whitespace-pre-line leading-relaxed ${
                                            msg.from === 'user'
                                                ? 'bg-[#483C32] text-[#F5F5DC] rounded-br-sm shadow-md font-medium'
                                                : 'bg-[#262626] text-[#F5F5DC]/90 border border-[#483C32]/40 rounded-bl-sm shadow-sm'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing indicator */}
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
                                    {[0, 1, 2].map(i => (
                                        <span key={i} className="w-1.5 h-1.5 bg-[#a38b82] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Question Prompt Chips */}
                    <div className="px-4 py-3 border-t border-[#483C32]/25 flex gap-2 overflow-x-auto scrollbar-hide bg-[#181818]/60">
                        {suggestions.map((sug, i) => (
                            <button
                                key={i}
                                onClick={() => handleSendMessage(sug)}
                                className="bg-[#262626] hover:bg-[#332f2c] border border-[#483C32]/40 hover:border-[#a38b82]/60 rounded-full px-3.5 py-1.5 text-xs text-[#F5F5DC]/70 hover:text-[#F5F5DC] whitespace-nowrap flex-shrink-0 transition-all cursor-pointer shadow-sm"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <div className="flex items-center gap-3 p-4 border-t border-[#483C32]/25 bg-[#1a1a1a]">
                        <Lightbulb size={16} className="text-[#a38b82] flex-shrink-0" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask any question about tactics, recovery, or training..."
                            className="flex-1 bg-[#262626] border border-[#483C32]/45 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-4 py-2.5 rounded-xl outline-none text-sm transition-colors"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!input.trim()}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#483C32] hover:bg-[#5a4a3e] disabled:opacity-35 disabled:cursor-not-allowed text-[#F5F5DC] transition-all flex-shrink-0 border border-[#483C32] cursor-pointer"
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
