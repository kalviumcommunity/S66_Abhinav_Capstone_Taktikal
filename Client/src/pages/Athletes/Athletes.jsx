import React from "react";
import Sidebar from "../../components/Sidebar";
import notificationIcon from "../../assets/notification@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import filterIcon from "../../assets/filter.png";
import sortIcon from "../../assets/sort.png";
import progressIcon from "../../assets/ProgressIcon@3x.svg";
import statsIcon from "../../assets/StatsIcon@3x.svg";
import teamIcon from "../../assets/TeamIcon@3x.svg";

export default function Athletes() {
    return (
        <div className="flex min-h-screen bg-[#212121]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Top Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: "#F5F5DC" }}>Athletes</h2>
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

                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-3 bg-[#00000030] p-3 rounded-lg">
                    {/* Position Buttons */}
                    <div className="flex items-center gap-2">
                        {["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"].map((pos, idx) => (
                            <button
                                key={idx}
                                className="px-4 py-1 rounded-full text-sm"
                                style={{
                                    backgroundColor: idx === 0 ? "#483C32" : "#00000050",
                                    color: "#F5F5DC"
                                }}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>

                    {/* Search Athletes */}
                    <div className="flex items-center bg-white rounded-full px-3 py-1 ml-auto">
                        <img src={searchIcon} alt="Search Athlete" className="w-4 h-4 mr-2" />
                        <input
                            type="text"
                            placeholder="Search athletes..."
                            className="outline-none text-sm bg-transparent"
                        />
                    </div>

                    {/* Filter Icon */}
                    <img src={filterIcon} alt="Filter" className="w-6 h-6 cursor-pointer" />

                    {/* Sort Icon */}
                    <img src={sortIcon} alt="Sort" className="w-6 h-6 cursor-pointer" />

                    {/* Add Athlete Button */}
                    <button className="flex items-center gap-2 bg-[#483C32] text-white px-4 py-2 rounded-full">
                        <span>+ Add Athlete</span>
                    </button>
                </div>

                {/* Athlete Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl p-4 shadow-lg bg-gradient-to-br from-[#212121] to-[#483C32]"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="font-bold text-lg" style={{ color: "#F5F5DC" }}>Michael Johnson</h3>
                                    <p className="text-sm" style={{ color: "#F5F5DC" }}>Forward</p>
                                </div>
                                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                                    8
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                {[...Array(3)].map((__, i) => (
                                    <div key={i}>
                                        <p className="text-xs mb-1" style={{ color: "#F5F5DC" }}>Speed</p>
                                        <div className="w-full bg-black/30 rounded-full h-2">
                                            <div className="bg-[#a38b82] h-2 rounded-full" style={{ width: "80%" }}></div>
                                        </div>
                                        <p className="text-xs text-right" style={{ color: "#F5F5DC" }}>8/10</p>
                                    </div>
                                ))}
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
                    ))}
                </div>
            </div>
        </div>
    );
}
