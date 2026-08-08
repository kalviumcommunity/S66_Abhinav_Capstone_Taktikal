import React, { useState } from "react";
import { useAthletes } from "../../context/AthleteContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Plus, ArrowUpDown, X, Trophy } from "lucide-react";
import progressIcon from "../../assets/ProgressIcon@3x.svg";
import statsIcon    from "../../assets/StatsIcon@3x.svg";
import teamIcon     from "../../assets/TeamIcon@3x.svg";

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

const overlayVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1 },
}
const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 12 },
    show:   { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', stiffness: 340, damping: 28 } },
    exit:   { opacity: 0, scale: 0.95, y: 8,  transition: { duration: 0.18 } },
}

export default function Athletes() {
    const [globalSearchQuery,  setGlobalSearchQuery]  = useState('');
    const [athleteSearchQuery, setAthleteSearchQuery]  = useState('');
    const [selectedPosition,   setSelectedPosition]   = useState('All Positions');
    const [showAddModal,       setShowAddModal]       = useState(false);
    const [showSortModal,      setShowSortModal]      = useState(false);
    const [sortBy,   setSortBy]   = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const { athletes = [], addAthlete, removeAthlete, sportPositions = [] } = useAthletes() || {};
    const safePositions = sportPositions || [];

    const [newAthlete, setNewAthlete] = useState({
        name: '', position: safePositions[0] || 'Forward', speed: 5, strength: 5, stamina: 5
    });

    const filterPositions = ['All Positions', ...safePositions];

    const calculateAverageScore = (a) => {
        if (!a) return 0;
        return Math.round(((a.speed || 0) + (a.strength || 0) + (a.stamina || 0)) / 3);
    };

    const filteredAndSortedAthletes = () => {
        let filtered = [...(athletes || [])];
        if (selectedPosition !== 'All Positions')
            filtered = filtered.filter(a => a.position === selectedPosition);

        const q = (globalSearchQuery || athleteSearchQuery).toLowerCase().trim();
        if (q) filtered = filtered.filter(a =>
            a.name.toLowerCase().includes(q) || a.position.toLowerCase().includes(q)
        );

        filtered.sort((a, b) => {
            let aVal, bVal;
            switch (sortBy) {
                case 'score':    aVal = calculateAverageScore(a); bVal = calculateAverageScore(b); break;
                case 'speed':    aVal = a.speed;    bVal = b.speed;    break;
                case 'strength': aVal = a.strength; bVal = b.strength; break;
                case 'stamina':  aVal = a.stamina;  bVal = b.stamina;  break;
                default:         aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase();
            }
            return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });
        return filtered;
    };

    const handleAddAthlete = async () => {
        if (newAthlete.name.trim()) {
            try {
                const result = await addAthlete(newAthlete);
                if (result.success) {
                    setNewAthlete({ name: '', position: safePositions[0] || 'Forward', speed: 5, strength: 5, stamina: 5 });
                    setShowAddModal(false);
                } else {
                    alert(result.message || 'Failed to add athlete');
                }
            } catch {
                alert('Failed to add athlete. Please try again.');
            }
        }
    };

    const handleSort = (criteria, order) => {
        setSortBy(criteria); setSortOrder(order); setShowSortModal(false);
    };

    const sortOptions = [
        { label: 'Name (A–Z)',            criteria: 'name',     order: 'asc' },
        { label: 'Name (Z–A)',            criteria: 'name',     order: 'desc' },
        { label: 'Score (High to Low)',   criteria: 'score',    order: 'desc' },
        { label: 'Score (Low to High)',   criteria: 'score',    order: 'asc' },
        { label: 'Speed (High to Low)',   criteria: 'speed',    order: 'desc' },
        { label: 'Strength (High to Low)',criteria: 'strength', order: 'desc' },
        { label: 'Stamina (High to Low)', criteria: 'stamina',  order: 'desc' },
    ];

    const displayed = filteredAndSortedAthletes();

    /* ─── Stat bar ──── */
    const StatBar = ({ label, value }) => (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#F5F5DC]/55">{label}</span>
                <span className="text-xs text-[#F5F5DC]/70 font-medium">{value}/10</span>
            </div>
            <div className="w-full bg-[#000]/40 rounded-full h-1.5">
                <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-[#a38b82] to-[#c9a896] transition-all duration-500"
                    style={{ width: `${value * 10}%` }}
                />
            </div>
        </div>
    );

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#212121] min-h-screen">
            <PageHeader
                title="Athletes Management"
                subtitle="Manage your team roster, track performance, and monitor progress"
            >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center bg-[#1a1a1a] border border-[#483C32]/50 focus-within:border-[#a38b82] rounded-full px-3.5 py-2.5 gap-2 flex-1 sm:flex-none transition-colors shadow-sm">
                        <Search size={15} className="text-[#F5F5DC]/35 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search athletes..."
                            value={globalSearchQuery}
                            onChange={(e) => setGlobalSearchQuery(e.target.value)}
                            className="outline-none text-sm bg-transparent text-[#F5F5DC] placeholder-[#F5F5DC]/30 w-full sm:w-32 md:w-44"
                        />
                    </div>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#483C32]/45 hover:border-[#a38b82]/60 text-[#F5F5DC]/55 hover:text-[#F5F5DC] transition-all flex-shrink-0" aria-label="Notifications">
                        <Bell size={16} />
                    </button>
                </div>
            </PageHeader>

            {/* ─── Filter + Controls ─────────────────────────────────── */}
            <div className="bg-[#1a1a1a] border border-[#483C32]/40 rounded-xl p-4 mb-6">
                {/* Position tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
                    {filterPositions.map((pos, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedPosition(pos)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                                selectedPosition === pos
                                    ? 'bg-[#483C32] text-[#F5F5DC] border border-[#a38b82]/40 shadow-sm'
                                    : 'bg-[#262626] text-[#F5F5DC]/55 border border-[#483C32]/30 hover:bg-[#2e2e2e] hover:text-[#F5F5DC]'
                            }`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>

                {/* Search + Action buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex items-center bg-[#262626] border border-[#483C32]/40 focus-within:border-[#a38b82] rounded-xl px-4 py-2.5 gap-2.5 flex-1 transition-colors">
                        <Search size={15} className="text-[#F5F5DC]/35 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name or position..."
                            value={athleteSearchQuery}
                            onChange={(e) => setAthleteSearchQuery(e.target.value)}
                            className="outline-none text-sm bg-transparent text-[#F5F5DC] placeholder-[#F5F5DC]/30 w-full"
                        />
                        {athleteSearchQuery && (
                            <button onClick={() => setAthleteSearchQuery('')} className="text-[#F5F5DC]/40 hover:text-[#F5F5DC]/70">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <button
                            onClick={() => setShowSortModal(true)}
                            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm text-[#F5F5DC]/60 hover:text-[#F5F5DC] border border-[#483C32]/40 hover:border-[#a38b82]/50 bg-[#262626] transition-all"
                            aria-label="Sort athletes"
                        >
                            <ArrowUpDown size={15} />
                            <span className="hidden sm:inline">Sort</span>
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] transition-all border border-[#483C32] hover:border-[#a38b82]/40"
                        >
                            <Plus size={15} />
                            <span>Add Athlete</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Athlete Cards ─────────────────────────────────────── */}
            {displayed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-[#483C32]/40 flex items-center justify-center mb-4">
                        <Trophy size={28} className="text-[#483C32]" />
                    </div>
                    <p className="text-[#F5F5DC]/50 font-medium mb-1">No athletes found</p>
                    <p className="text-[#F5F5DC]/30 text-sm">Try adjusting your filters or add a new athlete.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {displayed.map((athlete) => {
                        const avg = calculateAverageScore(athlete);
                        return (
                            <motion.div
                                key={athlete.id || athlete._id}
                                layout
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#1a1a1a] border border-[#483C32]/40 hover:border-[#a38b82]/50 rounded-xl p-4 flex flex-col gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.45)] transition-all duration-300 group"
                            >
                                {/* Card header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#483C32] to-[#c9a896]/30 flex items-center justify-center text-[#F5F5DC] text-sm font-bold flex-shrink-0 border border-[#483C32]">
                                            {athlete.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-sm text-[#F5F5DC] truncate">{athlete.name}</h3>
                                            <span className="text-xs text-[#F5F5DC]/50">{athlete.position}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        {/* Score badge */}
                                        <span className="w-8 h-8 rounded-full bg-[#483C32]/50 border border-[#483C32] text-[#c9a896] text-xs font-bold flex items-center justify-center">
                                            {avg}
                                        </span>
                                        {/* Delete */}
                                        <button
                                            onClick={async () => {
                                                if (window.confirm(`Are you sure you want to delete ${athlete.name}?`)) {
                                                    try {
                                                        const r = await removeAthlete(athlete._id || athlete.id);
                                                        if (!r.success) alert(r.message || 'Failed to delete');
                                                    } catch { alert('Failed to delete. Please try again.'); }
                                                }
                                            }}
                                            className="w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete athlete"
                                        >
                                            <X size={13} />
                                        </button>
                                    </div>
                                </div>

                                {/* Stat bars */}
                                <div className="space-y-2.5">
                                    <StatBar label="Speed"    value={athlete.speed} />
                                    <StatBar label="Strength" value={athlete.strength} />
                                    <StatBar label="Stamina"  value={athlete.stamina} />
                                </div>

                                {/* Action row */}
                                <div className="flex justify-between items-center pt-1 border-t border-[#483C32]/25">
                                    {[
                                        { src: progressIcon, label: 'Progress' },
                                        { src: statsIcon,    label: 'Stats' },
                                        { src: teamIcon,     label: 'Team' },
                                    ].map(({ src, label }) => (
                                        <button key={label} className="flex items-center gap-1 text-xs text-[#F5F5DC]/40 hover:text-[#F5F5DC]/70 transition-colors">
                                            <img src={src} alt={label} className="w-3.5 h-3.5 opacity-50" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* ─── Add Athlete Modal ─────────────────────────────────── */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        variants={overlayVariants} initial="hidden" animate="show" exit="hidden"
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            variants={modalVariants} initial="hidden" animate="show" exit="exit"
                            className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md border border-[#483C32]/50 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-[#F5F5DC]">Add New Athlete</h2>
                                <button onClick={() => setShowAddModal(false)} className="text-[#F5F5DC]/40 hover:text-[#F5F5DC] transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#F5F5DC]/60 mb-1.5 uppercase tracking-wide">Name</label>
                                    <input
                                        type="text"
                                        value={newAthlete.name}
                                        onChange={(e) => setNewAthlete({ ...newAthlete, name: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#262626] text-[#F5F5DC] rounded-xl border border-[#483C32]/50 focus:border-[#a38b82] outline-none text-sm placeholder-[#F5F5DC]/30 transition-colors"
                                        placeholder="Enter athlete name"
                                    />
                                </div>

                                {/* Position */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#F5F5DC]/60 mb-1.5 uppercase tracking-wide">Position</label>
                                    <select
                                        value={newAthlete.position}
                                        onChange={(e) => setNewAthlete({ ...newAthlete, position: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#262626] text-[#F5F5DC] rounded-xl border border-[#483C32]/50 focus:border-[#a38b82] outline-none text-sm transition-colors appearance-none"
                                    >
                                        {safePositions.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>

                                {/* Sliders */}
                                {[
                                    { key: 'speed',    label: 'Speed' },
                                    { key: 'strength', label: 'Strength' },
                                    { key: 'stamina',  label: 'Stamina' },
                                ].map(({ key, label }) => (
                                    <div key={key}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="text-xs font-semibold text-[#F5F5DC]/60 uppercase tracking-wide">{label}</label>
                                            <span className="text-xs font-bold text-[#c9a896]">{newAthlete[key]}/10</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="10"
                                            value={newAthlete[key]}
                                            onChange={(e) => setNewAthlete({ ...newAthlete, [key]: parseInt(e.target.value) })}
                                            className="w-full"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-[#262626] text-[#F5F5DC]/70 rounded-xl hover:bg-[#2e2e2e] transition-colors text-sm font-medium border border-[#483C32]/40"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddAthlete}
                                    className="flex-1 px-4 py-2.5 bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] rounded-xl transition-colors text-sm font-medium border border-[#483C32]"
                                >
                                    Add Athlete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Sort Modal ────────────────────────────────────────── */}
            <AnimatePresence>
                {showSortModal && (
                    <motion.div
                        variants={overlayVariants} initial="hidden" animate="show" exit="hidden"
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowSortModal(false)}
                    >
                        <motion.div
                            variants={modalVariants} initial="hidden" animate="show" exit="exit"
                            className="bg-[#1a1a1a] rounded-2xl p-5 w-full max-w-sm border border-[#483C32]/50 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-[#F5F5DC]">Sort Athletes</h2>
                                <button onClick={() => setShowSortModal(false)} className="text-[#F5F5DC]/40 hover:text-[#F5F5DC] transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="space-y-1">
                                {sortOptions.map(({ label, criteria, order }) => {
                                    const isSelected = sortBy === criteria && sortOrder === order;
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => handleSort(criteria, order)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                                                isSelected
                                                    ? 'bg-[#483C32] text-[#F5F5DC] border border-[#a38b82]/30'
                                                    : 'text-[#F5F5DC]/65 hover:bg-[#262626] hover:text-[#F5F5DC] border border-transparent'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
