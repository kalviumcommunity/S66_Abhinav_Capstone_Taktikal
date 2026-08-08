import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    Search, Bell, Plus, Check, Trash2, Shield, Target,
    Activity, Sliders, CheckCircle2, Flame, Award, ChevronRight, Layers, X
} from "lucide-react";

/* ─── Default Training Checklist by Sport ─────────────────────────────── */
const DEFAULT_SPORT_ACTIVITIES = {
    Football: [
        { id: 1, text: "High-Pressing Rondo 5v2 (20 mins)", checked: true, category: "Tactical" },
        { id: 2, text: "Corner Kick Far-Post Outswingers", checked: true, category: "Set Pieces" },
        { id: 3, text: "Counter-Attack Transition Sprint (15 mins)", checked: false, category: "Conditioning" },
        { id: 4, text: "Post-Session Hydrotherapy & Foam Rolling", checked: false, category: "Recovery" }
    ],
    Cricket: [
        { id: 5, text: "Net Batting against Off-Spin & Pace", checked: true, category: "Tactical" },
        { id: 6, text: "Slip Catching & High-Flyer Drills", checked: false, category: "Fielding" },
        { id: 7, text: "Death-Overs Yorkbowling Scenarios", checked: true, category: "Bowling" },
        { id: 8, text: "Match Simulation & Target Chasing", checked: false, category: "Strategy" }
    ],
    Rugby: [
        { id: 9, text: "Scrum Engagement & Ruck Clearing", checked: true, category: "Physical" },
        { id: 10, text: "Backline Passing & Blindside Overloads", checked: true, category: "Tactical" },
        { id: 11, text: "Lineout Catch & Drive Drills", checked: false, category: "Set Pieces" },
        { id: 12, text: "Tackle Breakdown & Jackal Practice", checked: false, category: "Defense" }
    ],
    Basketball: [
        { id: 13, text: "Pick & Roll Defensive Coverage", checked: true, category: "Tactical" },
        { id: 14, text: "3-Point Spot Shooting & Transition Threes", checked: false, category: "Offense" },
        { id: 15, text: "Full-Court Press Breakout Scenarios", checked: true, category: "Conditioning" }
    ],
    Volleyball: [
        { id: 16, text: "Overhead Setting & Middle-Block Spikes", checked: true, category: "Attack" },
        { id: 17, text: "5-1 Rotation Serve-Receive Drills", checked: false, category: "Tactical" },
        { id: 18, text: "Dig & Transition Counter-Attacks", checked: false, category: "Defense" }
    ]
};

/* ─── Sport-Specific Preset Strategies ───────────────────────────────── */
const SPORT_PRESET_TACTICS = {
    Football: [
        { id: "f1", name: "High-Pressing 4-3-3", phase: "Offensive Press", focus: "Possession & Wing Overload", intensity: "High" },
        { id: "f2", name: "Low-Block Counter 4-4-2", phase: "Defensive Shape", focus: "Compactness & Quick Sprints", intensity: "Medium" }
    ],
    Cricket: [
        { id: "c1", name: "Aggressive Powerplay Field", phase: "First 6 Overs", focus: "Slip Catcher & Full Length", intensity: "High" },
        { id: "c2", name: "Death Overs Wide-Yorker Plan", phase: "Overs 16-20", focus: "Boundary Protection", intensity: "High" }
    ],
    Rugby: [
        { id: "r1", name: "Standard 15s Phase Play", phase: "Attacking 22m", focus: "Heavy Ruck & Forward Carry", intensity: "High" },
        { id: "r2", name: "Blindside Wing Overload", phase: "Set Piece Lineout", focus: "Fast Backline Pass", intensity: "Medium" }
    ],
    Basketball: [
        { id: "b1", name: "2-3 Zone Trap Defense", phase: "Defensive Rotation", focus: "Wing Traps & Paint Lock", intensity: "High" },
        { id: "b2", name: "Picks & Pop Motion Offense", phase: "Half-Court Sets", focus: "Spacer Threes", intensity: "Medium" }
    ],
    Volleyball: [
        { id: "v1", name: "5-1 Rotation Offense", phase: "Serve Receive", focus: "Setter Acceleration", intensity: "High" }
    ]
};

export default function Tactics() {
    const { user } = useAuth();
    const sportName = user?.sport || "Football";
    // Scope storage per-user so tactics/checklists don't leak across accounts on a shared browser.
    const userKey = user?.id || "guest";

    // ── Navigation & Active View ──
    const [activeTab, setActiveTab] = useState("creator"); // "creator" | "tracker" | "playbook"

    // ── Saved Tactics State ──
    const [tacticsList, setTacticsList] = useState(() => {
        const saved = localStorage.getItem(`tactics_list_${userKey}_${sportName}`);
        return saved ? JSON.parse(saved) : (SPORT_PRESET_TACTICS[sportName] || SPORT_PRESET_TACTICS.Football);
    });

    const [selectedTacticId, setSelectedTacticId] = useState(() => tacticsList[0]?.id || "");

    // ── New Tactic Form State ──
    const [newTactic, setNewTactic] = useState({
        name: "",
        phase: "General Strategy",
        focus: "",
        intensity: "High",
        notes: ""
    });
    const [showNewTacticModal, setShowNewTacticModal] = useState(false);

    // ── Training Checklist State ──
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem(`checklist_${userKey}_${sportName}`);
        return saved ? JSON.parse(saved) : (DEFAULT_SPORT_ACTIVITIES[sportName] || DEFAULT_SPORT_ACTIVITIES.Football);
    });
    const [newActivityText, setNewActivityText] = useState("");
    const [newActivityCategory, setNewActivityCategory] = useState("Tactical");
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

    // ── Search State ──
    const [searchQuery, setSearchQuery] = useState("");

    // ── Save checklist & tactics to local storage ──
    useEffect(() => {
        localStorage.setItem(`tactics_list_${userKey}_${sportName}`, JSON.stringify(tacticsList));
    }, [tacticsList, userKey, sportName]);

    useEffect(() => {
        localStorage.setItem(`checklist_${userKey}_${sportName}`, JSON.stringify(checklist));
    }, [checklist, userKey, sportName]);

    // ── Handlers for Tactics ──
    const handleCreateTactic = (e) => {
        e.preventDefault();
        if (!newTactic.name.trim()) return;

        const created = {
            id: Date.now().toString(),
            name: newTactic.name,
            phase: newTactic.phase || "General Strategy",
            focus: newTactic.focus || "Tactical Objective",
            intensity: newTactic.intensity || "High",
            notes: newTactic.notes || ""
        };

        const updated = [created, ...tacticsList];
        setTacticsList(updated);
        setSelectedTacticId(created.id);
        setNewTactic({ name: "", phase: "General Strategy", focus: "", intensity: "High", notes: "" });
        setShowNewTacticModal(false);
    };

    const handleDeleteTactic = (id) => {
        const updated = tacticsList.filter(t => t.id !== id);
        setTacticsList(updated);
        if (selectedTacticId === id && updated.length > 0) {
            setSelectedTacticId(updated[0].id);
        }
    };

    // ── Handlers for Checklist ──
    const handleAddActivity = () => {
        if (!newActivityText.trim()) return;
        const newItem = {
            id: Date.now(),
            text: newActivityText.trim(),
            checked: false,
            category: newActivityCategory || "Tactical"
        };
        setChecklist(prev => [...prev, newItem]);
        setNewActivityText("");
    };

    const handleToggleActivity = (id) => {
        setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const handleDeleteActivity = (id) => {
        setChecklist(checklist.filter(item => item.id !== id));
    };

    // Calculate completion percentage
    const completedCount = checklist.filter(item => item.checked).length;
    const totalCount     = checklist.length;
    const progressPct    = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const filteredChecklist = checklist.filter(item => {
        if (selectedCategoryFilter !== "All" && item.category !== selectedCategoryFilter) return false;
        if (searchQuery && !item.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const activeTactic = tacticsList.find(t => t.id === selectedTacticId) || tacticsList[0];

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#212121] min-h-screen text-[#F5F5DC] space-y-6">

            {/* ── Page Header ──────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#483C32]/35 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-1 rounded-full bg-[#483C32]/40 border border-[#483C32] text-xs font-semibold text-[#c9a896]">
                            {sportName} Command Center
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5DC]">
                        Tactics Creation &amp; Training Progress
                    </h1>
                    <p className="text-xs md:text-sm text-[#F5F5DC]/55 mt-1">
                        Design game strategies, manage playbook directives, and track team training goals
                    </p>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center bg-[#1a1a1a] border border-[#483C32]/50 focus-within:border-[#a38b82] rounded-full px-3.5 py-2 gap-2 flex-1 sm:flex-none transition-colors shadow-sm">
                        <Search size={14} className="text-[#F5F5DC]/35 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder={`Search ${sportName} tactics...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="outline-none text-xs bg-transparent text-[#F5F5DC] placeholder-[#F5F5DC]/30 w-full sm:w-36"
                        />
                    </div>
                    <button
                        onClick={() => setShowNewTacticModal(true)}
                        className="bg-gradient-to-r from-[#c9a896] to-[#a38b82] text-[#1a1a1a] px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md hover:scale-105 flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                    >
                        <Plus size={14} /> Create Tactic
                    </button>
                </div>
            </div>

            {/* ── View Navigation Tabs ─────────────────────────────────── */}
            <div className="flex gap-2 border-b border-[#483C32]/30 pb-3 overflow-x-auto scrollbar-hide">
                {[
                    { id: "creator", label: "Tactics Creator & Playbook", icon: Layers },
                    { id: "tracker", label: `Training Progress (${progressPct}%)`, icon: Activity },
                ].map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                            activeTab === id
                                ? 'bg-[#483C32] text-[#F5F5DC] border border-[#a38b82]/40 shadow-sm'
                                : 'bg-[#1a1a1a] text-[#F5F5DC]/55 border border-[#483C32]/25 hover:bg-[#262626] hover:text-[#F5F5DC]'
                        }`}
                    >
                        <Icon size={14} className={activeTab === id ? 'text-[#c9a896]' : 'text-[#F5F5DC]/40'} />
                        {label}
                    </button>
                ))}
            </div>

            {/* ── Tab 1: Tactics Creator & Playbook ──────────────────────── */}
            {activeTab === "creator" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left: Saved Playbook Tactics List (4 Cols) */}
                    <div className="lg:col-span-4 bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-5 shadow-xl space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-[#483C32]/30">
                            <h3 className="font-bold text-sm text-[#F5F5DC] flex items-center gap-2">
                                <Shield size={16} className="text-[#c9a896]" />
                                {sportName} Playbook ({tacticsList.length})
                            </h3>
                            <button
                                onClick={() => setShowNewTacticModal(true)}
                                className="text-xs text-[#c9a896] hover:text-[#d4b5a2] font-semibold flex items-center gap-1"
                            >
                                + New
                            </button>
                        </div>

                        <div className="space-y-2.5 max-h-[550px] overflow-y-auto scrollbar-thin pr-1">
                            {tacticsList.map((tactic) => {
                                const isSelected = tactic.id === selectedTacticId;
                                return (
                                    <div
                                        key={tactic.id}
                                        onClick={() => setSelectedTacticId(tactic.id)}
                                        className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start ${
                                            isSelected
                                                ? 'bg-[#262626] border-[#a38b82]/60 shadow-md'
                                                : 'bg-[#181818] border-[#483C32]/30 hover:border-[#483C32]/60 hover:bg-[#222222]'
                                        }`}
                                    >
                                        <div>
                                            <h4 className="text-sm font-bold text-[#F5F5DC] mb-1">{tactic.name}</h4>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#483C32]/40 text-[#c9a896] font-medium border border-[#483C32]/50">
                                                    {tactic.phase}
                                                </span>
                                                <span className="text-[11px] text-[#F5F5DC]/45 flex items-center gap-1">
                                                    <Flame size={10} className="text-amber-400" /> {tactic.intensity}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTactic(tactic.id); }}
                                            className="text-[#F5F5DC]/30 hover:text-red-400 p-1 transition-colors"
                                            title="Delete tactic"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Detailed Strategy Inspector (8 Cols) */}
                    <div className="lg:col-span-8 bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-6 shadow-xl flex flex-col justify-between">
                        {activeTactic ? (
                            <div className="space-y-6">
                                {/* Strategy Banner */}
                                <div className="bg-[#262626] border border-[#483C32]/35 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <span className="text-xs font-semibold text-[#a38b82] uppercase tracking-wider block mb-1">Active Tactic</span>
                                        <h2 className="text-xl font-bold text-[#F5F5DC]">{activeTactic.name}</h2>
                                        <p className="text-xs text-[#F5F5DC]/55 mt-0.5">Phase: {activeTactic.phase}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-semibold flex items-center gap-1">
                                            <Flame size={12} /> {activeTactic.intensity} Intensity
                                        </span>
                                    </div>
                                </div>

                                {/* Tactical Focus Card */}
                                <div className="bg-[#181818] border border-[#483C32]/30 p-5 rounded-xl">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F5DC]/50 mb-2 flex items-center gap-2">
                                        <Target size={14} className="text-[#c9a896]" /> Tactical Objective &amp; Focus
                                    </h4>
                                    <p className="text-sm text-[#F5F5DC]/90 leading-relaxed font-medium">
                                        {activeTactic.focus || "No specific objective detailed yet."}
                                    </p>
                                </div>

                                {/* Sport-Specific Execution Controls */}
                                <div className="bg-[#181818] border border-[#483C32]/30 p-5 rounded-xl space-y-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F5DC]/50 flex items-center gap-2">
                                        <Sliders size={14} className="text-[#c9a896]" /> {sportName} Execution Directives
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                        <div className="bg-[#262626] p-3 rounded-lg border border-[#483C32]/25">
                                            <span className="text-[#F5F5DC]/50 block mb-1">Pressing / Tempo Control</span>
                                            <span className="text-[#F5F5DC] font-semibold">Aggressive Front Press</span>
                                        </div>
                                        <div className="bg-[#262626] p-3 rounded-lg border border-[#483C32]/25">
                                            <span className="text-[#F5F5DC]/50 block mb-1">Transition Directives</span>
                                            <span className="text-[#F5F5DC] font-semibold">Quick Vertical Pass</span>
                                        </div>
                                        <div className="bg-[#262626] p-3 rounded-lg border border-[#483C32]/25">
                                            <span className="text-[#F5F5DC]/50 block mb-1">Defensive Compactness</span>
                                            <span className="text-[#F5F5DC] font-semibold">Mid-Block Line</span>
                                        </div>
                                        <div className="bg-[#262626] p-3 rounded-lg border border-[#483C32]/25">
                                            <span className="text-[#F5F5DC]/50 block mb-1">Set-Piece Focus</span>
                                            <span className="text-[#F5F5DC] font-semibold">Far-Post Target Scheme</span>
                                        </div>
                                    </div>
                                </div>

                                {activeTactic.notes && (
                                    <div className="bg-[#181818] border border-[#483C32]/30 p-4 rounded-xl">
                                        <span className="text-xs text-[#F5F5DC]/50 block mb-1">Coach Notes</span>
                                        <p className="text-xs text-[#F5F5DC]/75 leading-relaxed">{activeTactic.notes}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-[#F5F5DC]/40 text-sm">
                                No tactic selected. Create a new tactic to get started.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Tab 2: Training Progress Tracker ───────────────────────── */}
            {activeTab === "tracker" && (
                <div className="space-y-6">
                    {/* Overall Progress Banner */}
                    <div className="bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-6 shadow-xl">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#F5F5DC] flex items-center gap-2">
                                    <Activity size={18} className="text-[#c9a896]" />
                                    {sportName} Training Completion Status
                                </h3>
                                <p className="text-xs text-[#F5F5DC]/55 mt-1">
                                    Completed <strong className="text-[#c9a896]">{completedCount}</strong> of <strong className="text-[#F5F5DC]">{totalCount}</strong> scheduled drills &amp; recovery items
                                </p>
                            </div>
                            <div className="text-2xl font-black text-[#c9a896]">
                                {progressPct}%
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-[#262626] rounded-full h-3 border border-[#483C32]/30 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] transition-all duration-500 rounded-full"
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>
                    </div>

                    {/* Quick Add & Filter Bar */}
                    <div className="bg-[#1a1a1a] border border-[#483C32]/45 rounded-xl p-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto flex-1">
                            <input
                                type="text"
                                value={newActivityText}
                                onChange={(e) => setNewActivityText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
                                placeholder="Add new training activity or drill..."
                                className="w-full sm:flex-1 bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-4 py-2.5 rounded-xl text-xs outline-none transition-colors"
                            />
                            <select
                                value={newActivityCategory}
                                onChange={(e) => setNewActivityCategory(e.target.value)}
                                className="w-full sm:w-auto bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] px-3.5 py-2.5 rounded-xl text-xs outline-none cursor-pointer transition-colors"
                            >
                                <option value="Tactical">Tactical</option>
                                <option value="Conditioning">Conditioning</option>
                                <option value="Recovery">Recovery</option>
                                <option value="Set Pieces">Set Pieces</option>
                                <option value="Physical">Physical</option>
                                <option value="General">General</option>
                            </select>
                            <button
                                onClick={handleAddActivity}
                                className="w-full sm:w-auto bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex-shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>

                        {/* Category filter */}
                        <div className="flex gap-1 overflow-x-auto scrollbar-hide w-full sm:w-auto">
                            {["All", "Tactical", "Conditioning", "Recovery", "Set Pieces", "General"].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategoryFilter(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                                        selectedCategoryFilter === cat
                                            ? 'bg-[#483C32] text-[#F5F5DC] border border-[#a38b82]/30'
                                            : 'bg-[#262626] text-[#F5F5DC]/50 hover:text-[#F5F5DC]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Checklist Grid */}
                    <div className="space-y-2">
                        {filteredChecklist.length > 0 ? filteredChecklist.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-[#1a1a1a] border border-[#483C32]/35 p-4 rounded-xl flex items-center justify-between transition-all ${
                                    item.checked ? 'opacity-65 bg-[#181818]' : 'hover:border-[#a38b82]/50'
                                }`}
                            >
                                <label className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0">
                                    <div
                                        onClick={() => handleToggleActivity(item.id)}
                                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                            item.checked
                                                ? 'bg-green-700 border-green-600 text-white'
                                                : 'border-[#483C32] bg-[#262626] hover:border-[#a38b82]'
                                        }`}
                                    >
                                        {item.checked && <Check size={13} />}
                                    </div>
                                    <span className={`text-sm font-medium transition-all truncate ${
                                        item.checked ? 'line-through text-[#F5F5DC]/40' : 'text-[#F5F5DC]/90'
                                    }`}>
                                        {item.text}
                                    </span>
                                </label>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#262626] border border-[#483C32]/30 text-[#F5F5DC]/50 font-medium hidden sm:inline-block">
                                        {item.category}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteActivity(item.id)}
                                        className="text-[#F5F5DC]/30 hover:text-red-400 p-1 transition-colors"
                                        title="Delete activity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-[#1a1a1a] border border-[#483C32]/30 rounded-xl text-sm text-[#F5F5DC]/40">
                                No training activities found. Add a new activity above.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Create Tactic Modal ────────────────────────────────────── */}
            {showNewTacticModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowNewTacticModal(false)}>
                    <div className="bg-[#1a1a1a] border border-[#483C32]/50 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-3 border-b border-[#483C32]/30">
                            <h3 className="font-bold text-[#F5F5DC] text-base flex items-center gap-2">
                                <Plus size={16} className="text-[#c9a896]" /> Create New {sportName} Strategy
                            </h3>
                            <button onClick={() => setShowNewTacticModal(false)} className="text-[#F5F5DC]/40 hover:text-[#F5F5DC]">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTactic} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-[#F5F5DC]/60 uppercase tracking-wide block mb-1.5">Strategy Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. High-Pressing 4-3-3 Wing Overload"
                                    value={newTactic.name}
                                    onChange={e => setNewTactic({ ...newTactic, name: e.target.value })}
                                    className="w-full bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#F5F5DC]/60 uppercase tracking-wide block mb-1.5">Match Phase</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Offensive Press / Powerplay / Attacking 22m"
                                    value={newTactic.phase}
                                    onChange={e => setNewTactic({ ...newTactic, phase: e.target.value })}
                                    className="w-full bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#F5F5DC]/60 uppercase tracking-wide block mb-1.5">Tactical Objective &amp; Focus</label>
                                <textarea
                                    rows={3}
                                    placeholder="Describe key directives and positional instructions..."
                                    value={newTactic.focus}
                                    onChange={e => setNewTactic({ ...newTactic, focus: e.target.value })}
                                    className="w-full bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors resize-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#F5F5DC]/60 uppercase tracking-wide block mb-1.5">Intensity Level</label>
                                <select
                                    value={newTactic.intensity}
                                    onChange={e => setNewTactic({ ...newTactic, intensity: e.target.value })}
                                    className="w-full bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors"
                                >
                                    <option value="High">High Intensity</option>
                                    <option value="Medium">Medium Intensity</option>
                                    <option value="Low">Low Intensity</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowNewTacticModal(false)}
                                    className="px-4 py-2.5 rounded-xl bg-[#262626] hover:bg-[#2e2e2e] text-[#F5F5DC]/70 text-xs font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c9a896] to-[#a38b82] text-[#1a1a1a] text-xs font-bold transition-all hover:scale-105 shadow-md"
                                >
                                    Save Tactic
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}