import React, { useState } from "react";
import { useAthletes } from "../../context/AthleteContext";
import PerformanceEditModal from "../../components/PerformanceEditModal";
import { motion } from "framer-motion";
import { Search, Bell, Users, Zap, Target, Pencil } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";

/* ─── Page header shared pattern ─────────────────────────────────────── */
const PageHeader = ({ title, subtitle, children }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5DC] leading-tight">{title}</h1>
            <p className="text-sm md:text-base text-[#F5F5DC]/55 mt-1">{subtitle}</p>
        </div>
        {children}
    </div>
)

/* ─── Stat card ───────────────────────────────────────────────────────── */
const StatCard = ({ label, value, sub, subColor = 'text-green-400', icon: Icon }) => (
    <motion.div
        whileHover={{ y: -2, boxShadow: '0 6px 28px rgba(0,0,0,0.45)' }}
        className="stat-card bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-5 md:p-6 flex items-start justify-between gap-4 transition-shadow duration-300"
    >
        <div className="flex-1 min-w-0">
            <p className="text-[#F5F5DC]/55 text-xs md:text-sm font-medium mb-2">{label}</p>
            <p className="text-2xl md:text-3xl font-bold text-[#F5F5DC] leading-tight mb-1">{value}</p>
            <p className={`text-xs md:text-sm ${subColor}`}>{sub}</p>
        </div>
        {Icon && (
            <div className="w-10 h-10 rounded-xl bg-[#483C32]/30 border border-[#483C32]/50 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#c9a896]" />
            </div>
        )}
    </motion.div>
)

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show:   { opacity: 1, y: 0 },
}

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const { performanceData, updatePerformanceData, getAthleteStats, sportPositions } = useAthletes();

    const handleSearch   = (query) => { setSearchQuery(query); console.log('Dashboard search:', query); };
    const handleSavePerf = (newData) => updatePerformanceData(newData);

    const athleteStats       = getAthleteStats() || { total: 0, byPosition: {} };
    const safePositions      = sportPositions || [];
    const safeByPosition     = athleteStats.byPosition || {};
    const lastPosition       = safePositions.length > 0 ? safePositions[safePositions.length - 1] : null;
    const subOrLastCount     = lastPosition ? (safeByPosition[lastPosition] || 0) : 0;
    const activePlayers      = Math.max(0, (athleteStats.total || 0) - subOrLastCount);
    const filledPositionsCnt = Object.values(safeByPosition).filter(c => c > 0).length;
    const previousWeekCount  = Math.max(0, (athleteStats.total || 0) - 2);
    const weekDiff           = (athleteStats.total || 0) - previousWeekCount;

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#212121] min-h-screen">
            <PageHeader
                title="Coach Dashboard"
                subtitle="Welcome back! Here's what's happening with your team today."
            >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <div className="flex items-center bg-[#1a1a1a] border border-[#483C32]/50 focus-within:border-[#a38b82] rounded-full px-3.5 py-2.5 gap-2 flex-1 sm:flex-none transition-colors shadow-sm">
                        <Search size={15} className="text-[#F5F5DC]/35 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search metrics..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="outline-none text-sm bg-transparent text-[#F5F5DC] placeholder-[#F5F5DC]/30 w-full sm:w-32 md:w-44"
                        />
                    </div>
                    {/* Bell */}
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#483C32]/45 hover:border-[#a38b82]/60 text-[#F5F5DC]/55 hover:text-[#F5F5DC] transition-all flex-shrink-0" aria-label="Notifications">
                        <Bell size={16} />
                    </button>
                </div>
            </PageHeader>

            {/* ─── Stat Cards ─────────────────────────────────────────── */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-6"
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={fadeUp}>
                    <StatCard
                        label="Total Athletes"
                        value={athleteStats.total || 0}
                        sub={`${weekDiff >= 0 ? '+' : ''}${weekDiff} from last week`}
                        subColor="text-green-400"
                        icon={Users}
                    />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatCard
                        label="Active Players"
                        value={activePlayers}
                        sub="Field players"
                        subColor="text-blue-400"
                        icon={Zap}
                    />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatCard
                        label="Positions Filled"
                        value={`${filledPositionsCnt}/${safePositions.length}`}
                        sub="Position coverage"
                        subColor="text-[#c9a896]"
                        icon={Target}
                    />
                </motion.div>
            </motion.div>

            {/* ─── Chart ──────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-5 md:p-6"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                    <div>
                        <h3 className="text-base md:text-lg font-bold text-[#F5F5DC]">Team Performance Trends</h3>
                        <p className="text-xs md:text-sm text-[#F5F5DC]/45 mt-0.5">Performance metrics over time</p>
                    </div>
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center gap-2 bg-[#483C32]/60 hover:bg-[#483C32] text-[#F5F5DC]/80 hover:text-[#F5F5DC] px-3.5 py-2 rounded-xl text-sm font-medium transition-all border border-[#483C32]/50 hover:border-[#a38b82]/50"
                    >
                        <Pencil size={13} />
                        Edit
                    </button>
                </div>

                <div className="h-[250px] sm:h-[300px] md:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="week" stroke="#F5F5DC" fontSize={11} tickMargin={10} tick={{ fill: 'rgba(245,245,220,0.50)' }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#F5F5DC" fontSize={11} tickMargin={10} tick={{ fill: 'rgba(245,245,220,0.50)' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(72,60,50,0.7)', borderRadius: '10px', color: '#F5F5DC', fontSize: '12px' }}
                                itemStyle={{ color: '#F5F5DC' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px', color: 'rgba(245,245,220,0.7)' }} />
                            <Line type="monotone" dataKey="speed"     stroke="#a38b82" strokeWidth={2.5} dot={{ r: 3, fill: '#a38b82' }} activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="strength"  stroke="#d4b59e" strokeWidth={2.5} dot={{ r: 3, fill: '#d4b59e' }} activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="endurance" stroke="#967969" strokeWidth={2.5} dot={{ r: 3, fill: '#967969' }} activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="technique" stroke="#c9a896" strokeWidth={2.5} dot={{ r: 3, fill: '#c9a896' }} activeDot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Modal */}
            <PerformanceEditModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                performanceData={performanceData}
                onSave={handleSavePerf}
            />
        </div>
    );
}
