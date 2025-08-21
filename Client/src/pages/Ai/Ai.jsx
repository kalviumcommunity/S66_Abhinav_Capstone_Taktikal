import { useState } from "react";
import notificationIcon from "../../assets/notification@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import bulbIcon from "../../assets/bulb icon@1x.svg";
import starIcon from "../../assets/star icon@1x.svg";
import sendIcon from "../../assets/send icon@1x.svg";

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hello Coach! I'm your AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Add search functionality here
        console.log('AI Assistant search:', query);
    };

    const botReplies = [
        "Got it! I’ll prepare a plan for you.",
        "Here’s a quick suggestion: focus on recovery drills today.",
        "Interesting! I’ll analyze the performance data for you.",
        "Noted, let’s try a 4-3-3 setup for the next match.",
        "I recommend some light conditioning exercises."
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { from: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        // Random bot reply after short delay
        setTimeout(() => {
            const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
            setMessages((prev) => [...prev, { from: "bot", text: reply }]);
        }, 600);
    };

    return (
        <div className="flex-1 p-6 space-y-6 bg-[#212121] min-h-screen">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5DC] mb-2 leading-tight">
                            AI Coach Assistant
                        </h1>
                        <p className="text-base md:text-lg text-[#F5F5DC]/80 font-normal leading-relaxed">
                            Get intelligent insights and recommendations for your team
                        </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
                        {/* Global Search */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 flex-1 sm:flex-none shadow-sm">
                            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search AI features..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="outline-none text-sm bg-transparent text-black placeholder-gray-500 w-full sm:w-32 md:w-40 font-normal"
                            />
                        </div>
                        {/* Notification Icon */}
                        <img src={notificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300" />
                    </div>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                    {/* Left Panel */}
                    <div className="w-full lg:w-1/3 space-y-4 md:space-y-6 order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-lg shadow p-4 border border-[#483C32]">
                            <div className="flex items-center gap-2 mb-3">
                                <img src={starIcon} alt="Star" className="w-5 h-5" />
                                <h3 className="font-bold text-[#F5F5DC]">
                                    Coach AI
                                </h3>
                            </div>
                            <p className="text-sm mb-4 text-[#F5F5DC]">
                                Powered by advanced sports intelligence
                            </p>
                            <h4 className="font-bold mb-2 text-[#F5F5DC]">
                                AI Capabilities
                            </h4>
                            <div className="space-y-2">
                                {[
                                    "Training Plans - Generate personalized training plans",
                                    "Performance Analysis - Get insights on team & player performance",
                                    "Tactical Advice - Suggestions for strategies and formations",
                                    "Injury Prevention - Recommendations to minimize risks"
                                ].map((cap, idx) => (
                                    <div key={idx} className="bg-[#000000]/30 border border-[#483C32] rounded p-2 text-sm shadow text-[#F5F5DC]">
                                        {cap}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel (Chat) */}
                    <div className="flex-1 w-full lg:w-2/3 order-1 lg:order-2 flex flex-col bg-gradient-to-br from-[#212121] to-[#483C32] rounded-lg shadow-lg border border-[#483C32]">
                        <div className="bg-[#483C32] text-[#F5F5DC] px-4 md:px-5 py-3 rounded-t-lg flex items-center gap-3">
                            <img src={starIcon} alt="AI Assistant" className="w-5 h-5" />
                            <span className="text-base md:text-lg font-bold leading-tight">AI Coach Assistant</span>
                        </div>

                        {/* Chat Messages - Fixed height with scroll */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-96 min-h-96">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`px-3 py-2 rounded-lg shadow text-sm max-w-xs ${
                                            msg.from === "user"
                                                ? "bg-[#a38b82] text-[#F5F5DC]"
                                                : "bg-[#000000]/30 text-[#F5F5DC] border border-[#483C32]"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Suggested Prompts */}
                        <div className="px-4 py-2 border-t border-[#483C32] bg-gradient-to-br from-[#212121] to-[#483C32] flex flex-wrap gap-2">
                            {[
                                "Recommend recovery exercises for my team",
                                "Help me plan tomorrow's training session",
                                "Analyze our recent performance data",
                                "Suggest tactics for our upcoming match",
                                "Nutrition tips for athletes"
                            ].map((sug, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInput(sug)}
                                    className="bg-[#000000]/30 border border-[#483C32] rounded-full px-3 py-1 text-xs shadow text-[#F5F5DC] hover:bg-[#000000]/50 transition duration-300"
                                >
                                    {sug}
                                </button>
                            ))}
                        </div>

                        {/* Input Box */}
                        <div className="flex items-center border-t border-[#483C32] p-3 bg-gradient-to-br from-[#212121] to-[#483C32] rounded-b-lg">
                            <img src={bulbIcon} alt="Bulb" className="w-5 h-5 mr-2" />
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about coaching..."
                                className="flex-1 px-3 py-2 rounded-lg border border-[#483C32] text-sm outline-none bg-white text-black placeholder-gray-500"
                            />
                            <button onClick={handleSend} className="ml-2 hover:opacity-80 transition duration-300">
                                <img src={sendIcon} alt="Send" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
}
