import React, { useState } from "react";
import notificationIcon from "../../assets/notification@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import sortIcon from "../../assets/sort.png";
import progressIcon from "../../assets/ProgressIcon@3x.svg";
import statsIcon from "../../assets/StatsIcon@3x.svg";
import teamIcon from "../../assets/TeamIcon@3x.svg";
import { useAthletes } from "../../context/AthleteContext";

export default function Athletes() {
    const [globalSearchQuery, setGlobalSearchQuery] = useState('');
    const [athleteSearchQuery, setAthleteSearchQuery] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('All Positions');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    // Use athletes from context
    const { athletes, addAthlete, removeAthlete } = useAthletes();

    const [newAthlete, setNewAthlete] = useState({
        name: '',
        position: 'Forward',
        speed: 5,
        strength: 5,
        stamina: 5
    });

    const positions = ["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"];

    // Calculate average score for an athlete
    const calculateAverageScore = (athlete) => {
        return Math.round((athlete.speed + athlete.strength + athlete.stamina) / 3);
    };

    // Filter and sort athletes
    const filteredAndSortedAthletes = () => {
        let filtered = athletes;

        // Filter by position
        if (selectedPosition !== 'All Positions') {
            filtered = filtered.filter(athlete => athlete.position === selectedPosition);
        }

        // Filter by search query
        if (athleteSearchQuery) {
            filtered = filtered.filter(athlete =>
                athlete.name.toLowerCase().includes(athleteSearchQuery.toLowerCase()) ||
                athlete.position.toLowerCase().includes(athleteSearchQuery.toLowerCase())
            );
        }

        // Sort athletes
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'score':
                    aValue = calculateAverageScore(a);
                    bValue = calculateAverageScore(b);
                    break;
                case 'speed':
                    aValue = a.speed;
                    bValue = b.speed;
                    break;
                case 'strength':
                    aValue = a.strength;
                    bValue = b.strength;
                    break;
                case 'stamina':
                    aValue = a.stamina;
                    bValue = b.stamina;
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    };

    const handleGlobalSearch = (query) => {
        setGlobalSearchQuery(query);
    };

    const handleAthleteSearch = (query) => {
        setAthleteSearchQuery(query);
    };

    const handlePositionFilter = (position) => {
        setSelectedPosition(position);
    };

    const handleAddAthlete = async () => {
        if (newAthlete.name.trim()) {
            try {
                const result = await addAthlete(newAthlete);
                if (result.success) {
                    setNewAthlete({ name: '', position: 'Forward', speed: 5, strength: 5, stamina: 5 });
                    setShowAddModal(false);
                    // Show success message (optional)
                    console.log('Athlete added successfully!');
                } else {
                    // Show error message
                    alert(result.message || 'Failed to add athlete');
                }
            } catch (error) {
                console.error('Error adding athlete:', error);
                alert('Failed to add athlete. Please try again.');
            }
        }
    };

    const handleSort = (criteria, order) => {
        setSortBy(criteria);
        setSortOrder(order);
        setShowSortModal(false);
    };

    return (
        <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 bg-[#212121] min-h-screen">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5DC] mb-2 leading-tight">
                            Athletes Management
                        </h1>
                        <p className="text-base md:text-lg text-[#F5F5DC]/80 font-normal leading-relaxed">
                            Manage your team roster, track performance, and monitor progress
                        </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
                        {/* Global Search */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-sm">
                            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search athletes..."
                                value={globalSearchQuery}
                                onChange={(e) => handleGlobalSearch(e.target.value)}
                                className="outline-none text-sm bg-transparent text-black placeholder-gray-500 w-full sm:w-32 md:w-40 font-normal"
                            />
                        </div>
                        {/* Notification Icon */}
                        <img src={notificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300" />
                    </div>
                </div>

                {/* Filter Row */}
                <div className="flex flex-col gap-4 bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] p-4 md:p-5 rounded-lg shadow-lg">
                    {/* Position Buttons */}
                    <div className="flex flex-wrap items-center gap-2 w-full">
                        {positions.map((pos, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePositionFilter(pos)}
                                className="px-3 md:px-4 py-2 rounded-full text-sm md:text-base text-[#F5F5DC] hover:opacity-80 transition-all duration-300 flex-shrink-0 font-normal"
                                style={{
                                    backgroundColor: selectedPosition === pos ? "#483C32" : "#00000050"
                                }}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>

                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                        {/* Search Athletes */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 flex-1 shadow-sm">
                            <img src={searchIcon} alt="Search Athletes" className="w-4 h-4 mr-3 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search by name, position, or stats..."
                                value={athleteSearchQuery}
                                onChange={(e) => handleAthleteSearch(e.target.value)}
                                className="outline-none text-sm bg-transparent text-black placeholder-gray-500 w-full font-normal"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 justify-center sm:justify-end">
                            <img
                                src={sortIcon}
                                alt="Sort Athletes"
                                className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300"
                                onClick={() => setShowSortModal(true)}
                            />
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 bg-[#483C32] text-[#F5F5DC] px-4 md:px-5 py-2 md:py-3 rounded-full text-sm md:text-base font-normal hover:bg-[#5a4a3e] transition-all duration-300 shadow-md"
                            >
                                <span className="hidden sm:inline">+ Add Athlete</span>
                                <span className="sm:hidden text-lg">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Athlete Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredAndSortedAthletes().map((athlete) => {
                        const avgScore = calculateAverageScore(athlete);

                        return (
                            <div
                                key={athlete.id}
                                className="rounded-xl p-4 shadow-lg bg-gradient-to-br from-[#212121] to-[#483C32]"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: "#F5F5DC" }}>{athlete.name}</h3>
                                        <p className="text-sm" style={{ color: "#F5F5DC" }}>{athlete.position}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                            {avgScore}
                                        </div>
                                        <button
                                            onClick={async () => {
                                                if (window.confirm(`Are you sure you want to delete ${athlete.name}?`)) {
                                                    try {
                                                        const result = await removeAthlete(athlete._id || athlete.id);
                                                        if (!result.success) {
                                                            alert(result.message || 'Failed to delete athlete');
                                                        }
                                                    } catch (error) {
                                                        console.error('Error deleting athlete:', error);
                                                        alert('Failed to delete athlete. Please try again.');
                                                    }
                                                }
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
                                            title="Delete athlete"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div>
                                        <p className="text-xs mb-1" style={{ color: "#F5F5DC" }}>Speed</p>
                                        <div className="w-full bg-black/30 rounded-full h-2">
                                            <div
                                                className="bg-[#a38b82] h-2 rounded-full"
                                                style={{ width: `${athlete.speed * 10}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-right" style={{ color: "#F5F5DC" }}>{athlete.speed}/10</p>
                                    </div>
                                    <div>
                                        <p className="text-xs mb-1" style={{ color: "#F5F5DC" }}>Strength</p>
                                        <div className="w-full bg-black/30 rounded-full h-2">
                                            <div
                                                className="bg-[#a38b82] h-2 rounded-full"
                                                style={{ width: `${athlete.strength * 10}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-right" style={{ color: "#F5F5DC" }}>{athlete.strength}/10</p>
                                    </div>
                                    <div>
                                        <p className="text-xs mb-1" style={{ color: "#F5F5DC" }}>Stamina</p>
                                        <div className="w-full bg-black/30 rounded-full h-2">
                                            <div
                                                className="bg-[#a38b82] h-2 rounded-full"
                                                style={{ width: `${athlete.stamina * 10}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-right" style={{ color: "#F5F5DC" }}>{athlete.stamina}/10</p>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs" style={{ color: "#F5F5DC" }}>
                                    <button className="flex items-center gap-1">
                                        <img src={progressIcon} alt="Progress" className="w-4 h-4" />
                                        Progress
                                    </button>
                                    <button className="flex items-center gap-1">
                                        <img src={statsIcon} alt="Stats" className="w-4 h-4" />
                                        Stats
                                    </button>
                                    <button className="flex items-center gap-1">
                                        <img src={teamIcon} alt="Team" className="w-4 h-4" />
                                        Team
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Add Athlete Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#212121] rounded-lg p-6 w-full max-w-md border border-[#483C32]">
                            <h2 className="text-xl font-bold text-[#F5F5DC] mb-4">Add New Athlete</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#F5F5DC] mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={newAthlete.name}
                                        onChange={(e) => setNewAthlete({...newAthlete, name: e.target.value})}
                                        className="w-full px-3 py-2 bg-[#483C32] text-[#F5F5DC] rounded-lg border border-[#5a4a3e] focus:outline-none focus:border-[#F5F5DC]"
                                        placeholder="Enter athlete name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#F5F5DC] mb-1">Position</label>
                                    <select
                                        value={newAthlete.position}
                                        onChange={(e) => setNewAthlete({...newAthlete, position: e.target.value})}
                                        className="w-full px-3 py-2 bg-[#483C32] text-[#F5F5DC] rounded-lg border border-[#5a4a3e] focus:outline-none focus:border-[#F5F5DC]"
                                    >
                                        <option value="Forward">Forward</option>
                                        <option value="Midfielder">Midfielder</option>
                                        <option value="Defender">Defender</option>
                                        <option value="Goalkeeper">Goalkeeper</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#F5F5DC] mb-1">Speed: {newAthlete.speed}/10</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={newAthlete.speed}
                                        onChange={(e) => setNewAthlete({...newAthlete, speed: parseInt(e.target.value)})}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#F5F5DC] mb-1">Strength: {newAthlete.strength}/10</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={newAthlete.strength}
                                        onChange={(e) => setNewAthlete({...newAthlete, strength: parseInt(e.target.value)})}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#F5F5DC] mb-1">Stamina: {newAthlete.stamina}/10</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={newAthlete.stamina}
                                        onChange={(e) => setNewAthlete({...newAthlete, stamina: parseInt(e.target.value)})}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddAthlete}
                                    className="flex-1 px-4 py-2 bg-[#483C32] text-[#F5F5DC] rounded-lg hover:bg-[#5a4a3e] transition-colors"
                                >
                                    Add Athlete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sort Modal */}
                {showSortModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#212121] rounded-lg p-6 w-full max-w-sm border border-[#483C32]">
                            <h2 className="text-xl font-bold text-[#F5F5DC] mb-4">Sort Athletes</h2>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSort('name', 'asc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Name (A-Z)
                                </button>
                                <button
                                    onClick={() => handleSort('name', 'desc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Name (Z-A)
                                </button>
                                <button
                                    onClick={() => handleSort('score', 'desc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Score (High to Low)
                                </button>
                                <button
                                    onClick={() => handleSort('score', 'asc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Score (Low to High)
                                </button>
                                <button
                                    onClick={() => handleSort('speed', 'desc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Speed (High to Low)
                                </button>
                                <button
                                    onClick={() => handleSort('strength', 'desc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Strength (High to Low)
                                </button>
                                <button
                                    onClick={() => handleSort('stamina', 'desc')}
                                    className="w-full text-left px-3 py-2 text-[#F5F5DC] hover:bg-[#483C32] rounded-lg transition-colors"
                                >
                                    Stamina (High to Low)
                                </button>
                            </div>

                            <button
                                onClick={() => setShowSortModal(false)}
                                className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
    );
}
