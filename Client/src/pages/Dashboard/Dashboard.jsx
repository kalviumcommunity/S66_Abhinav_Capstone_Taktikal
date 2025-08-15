import React from "react";
import Sidebar from "../../components/Sidebar";
import notificationIcon from "../../assets/notification@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import teamIcon from "../../assets/TeamIcon@3x.svg";
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

const data = [
    { week: "Week 1", speed: 5, strength: 6, endurance: 4, technique: 6 },
    { week: "Week 2", speed: 6, strength: 6.2, endurance: 5, technique: 6.1 },
    { week: "Week 3", speed: 6.5, strength: 7, endurance: 5.8, technique: 6.3 },
    { week: "Week 4", speed: 7, strength: 7.1, endurance: 6.2, technique: 6.5 },
    { week: "Week 5", speed: 7.4, strength: 8, endurance: 6.5, technique: 6.8 },
    { week: "Week 6", speed: 8, strength: 8, endurance: 7, technique: 7 }
];

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-[#212121]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Top Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: "#F5F5DC" }}>
                        Coach Dashboard
                    </h2>
                    <div className="flex items-center gap-4">
                        {/* Global Search */}
                        <div className="flex items-center bg-white rounded-full px-3 py-1">
                            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="outline-none text-sm bg-transparent"
                            />
                        </div>
                        {/* Notification Icon */}
                        <img src={notificationIcon} alt="Notification" className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between bg-gradient-to-br from-[#212121] to-[#483C32] shadow-lg rounded-lg p-4"
                        >
                            <div>
                                <p style={{ color: "#F5F5DC" }} className="text-sm">
                                    Athletes
                                </p>
                                <h3
                                    className="text-2xl font-bold"
                                    style={{ color: "#F5F5DC" }}
                                >
                                    24
                                </h3>
                                <p className="text-green-400 text-xs">+2 from last week</p>
                            </div>
                            <img src={teamIcon} alt="Team Icon" className="w-8 h-8" />
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <div className="bg-gradient-to-br from-[#212121] to-[#483C32] shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#F5F5DC" }}>
                        Team Performance Trends
                    </h3>
                    <p className="text-xs mb-4" style={{ color: "#F5F5DC" }}>
                        Performance metrics over time
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
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
            </div>
        </div>
    );
}
