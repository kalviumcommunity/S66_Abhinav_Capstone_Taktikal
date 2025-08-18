import React, { useState } from "react";
import notificationIcon from "../../assets/notification@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import teamIcon from "../../assets/TeamIcon@3x.svg";
import { useAthletes } from "../../context/AthleteContext";
import PerformanceEditModal from "../../components/PerformanceEditModal";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const { performanceData, updatePerformanceData, getAthleteStats } = useAthletes();

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Add search functionality here
        console.log('Dashboard search:', query);
    };

    const handleEditPerformance = () => {
        setShowEditModal(true);
    };

    const handleSavePerformance = (newData) => {
        updatePerformanceData(newData);
    };

    const athleteStats = getAthleteStats();
    const previousWeekCount = Math.max(0, athleteStats.total - 2); // Simulated previous week count

    return (
        <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 bg-[#212121] min-h-screen">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5DC] mb-2 leading-tight">
                            Coach Dashboard
                        </h1>
                        <p className="text-base md:text-lg text-[#F5F5DC]/80 font-normal leading-relaxed">
                            Welcome back! Here's what's happening with your team today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
                        {/* Global Search */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 flex-1 sm:flex-none shadow-sm">
                            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search dashboard..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="outline-none text-sm bg-transparent text-black placeholder-gray-500 w-full sm:w-32 md:w-40 font-normal"
                            />
                        </div>
                        {/* Notification Icon */}
                        <img src={notificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                    {/* Total Athletes Card */}
                    <div className="flex items-center justify-between bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] shadow-lg rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex-1">
                            <p className="text-sm md:text-base lg:text-lg text-[#F5F5DC] font-normal mb-1">
                                Total Athletes
                            </p>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5DC] leading-tight mb-1">
                                {athleteStats.total}
                            </h3>
                            <p className="text-green-400 text-xs md:text-sm font-normal">
                                {athleteStats.total > previousWeekCount ? '+' : ''}{athleteStats.total - previousWeekCount} from last week
                            </p>
                        </div>
                        <img src={teamIcon} alt="Athletes Icon" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 opacity-80" />
                    </div>

                    {/* Active Players Card */}
                    <div className="flex items-center justify-between bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] shadow-lg rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex-1">
                            <p className="text-sm md:text-base lg:text-lg text-[#F5F5DC] font-normal mb-1">
                                Active Players
                            </p>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5DC] leading-tight mb-1">
                                {athleteStats.total - athleteStats.byPosition.Goalkeeper}
                            </h3>
                            <p className="text-blue-400 text-xs md:text-sm font-normal">Field players</p>
                        </div>
                        <img src={teamIcon} alt="Players Icon" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 opacity-80" />
                    </div>

                    {/* Positions Filled Card */}
                    <div className="flex items-center justify-between bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] shadow-lg rounded-lg p-4 md:p-5 lg:p-6 hover:shadow-xl transition-all duration-300">
                        <div className="flex-1">
                            <p className="text-sm md:text-base lg:text-lg text-[#F5F5DC] font-normal mb-1">
                                Positions Filled
                            </p>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5DC] leading-tight mb-1">
                                {Object.values(athleteStats.byPosition).filter(count => count > 0).length}/4
                            </h3>
                            <p className="text-yellow-400 text-xs md:text-sm font-normal">Position coverage</p>
                        </div>
                        <img src={teamIcon} alt="Positions Icon" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0 opacity-80" />
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] shadow-lg rounded-lg p-4 md:p-6">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="text-base md:text-lg font-bold text-[#F5F5DC]">
                                Team Performance Trends
                            </h3>
                            <p className="text-xs md:text-sm text-[#F5F5DC]">
                                Performance metrics over time
                            </p>
                        </div>
                        <button
                            onClick={handleEditPerformance}
                            className="bg-[#a38b82] hover:bg-[#967969] text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                            <XAxis dataKey="week" stroke="#F5F5DC" />
                            <YAxis stroke="#F5F5DC" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="speed" stroke="#a38b82" strokeWidth={2} />
                            <Line type="monotone" dataKey="strength" stroke="#d4b59e" strokeWidth={2} />
                            <Line type="monotone" dataKey="endurance" stroke="#967969" strokeWidth={2} />
                            <Line type="monotone" dataKey="technique" stroke="#deb887" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Performance Edit Modal */}
                <PerformanceEditModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    performanceData={performanceData}
                    onSave={handleSavePerformance}
                />
            </div>
    );
}
