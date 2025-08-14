import React from "react";
import Sidebar from "../../components/Sidebar";
import linkedinIcon from "../../assets/linkedin@1x.svg";
import twitterIcon from "../../assets/twitter@1x.svg";
import videoIcon from "../../assets/video@1x.svg";
import locationIcon from "../../assets/location@1x.svg";
import emailIcon from "../../assets/email2.svg";

export default function Profile() {
    return (
        <div className="flex min-h-screen bg-[#212121]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-4 space-y-6">
                {/* Profile Info Section */}
                <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full border border-gray-400"></div>
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold" style={{ color: "#F5F5DC" }}>John Doe</h2>
                                <span className="text-xs px-2 py-1 rounded bg-[#483C32] text-white">Head Coach</span>
                            </div>
                            <p className="text-sm" style={{ color: "#F5F5DC" }}>Elite Performance Specialist</p>
                            <div className="flex items-center gap-2 text-sm" style={{ color: "#F5F5DC" }}>
                                <img src={emailIcon} alt="Email" className="w-4 h-4" />
                                <span>john.doe@taktikal.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm" style={{ color: "#F5F5DC" }}>
                                <img src={locationIcon} alt="Location" className="w-4 h-4" />
                                <span>Punjab, INDIA</span>
                            </div>
                            <p className="font-semibold mt-1" style={{ color: "#F5F5DC" }}>97 Athletes</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button className="px-4 py-1 bg-[#212121] rounded text-white text-sm hover:bg-[#383838]">Edit</button>
                        <button className="px-4 py-1 bg-[#483C32] rounded text-white text-sm hover:bg-[#5a4333]">Share</button>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: "#F5F5DC" }}>Activity</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>Training Session: Advanced Tactics</p>
                                <p className="text-xs" style={{ color: "#F5F5DC" }}>Published Jul 10, 2023</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>Performance Analysis Workshop</p>
                                <p className="text-xs" style={{ color: "#F5F5DC" }}>Published Jul 12, 2023</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>Team Building Exercise</p>
                                <p className="text-xs" style={{ color: "#F5F5DC" }}>Published Jul 05, 2023</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-white text-black text-sm py-1 rounded hover:bg-gray-200">View All Activity</button>
                </div>

                {/* Events, Stats, and Contacts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Events */}
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: "#F5F5DC" }}>Events</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Squad Briefing <span className="text-green-400 ml-2 text-xs">Live</span></span>
                                <span className="text-xs" style={{ color: "#F5F5DC" }}>July 11</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Regional Tournament</span>
                                <span className="text-xs" style={{ color: "#F5F5DC" }}>July 23</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Performance Review <span className="text-[#941502] ml-2 text-xs">Joined</span></span>
                                <span className="text-xs" style={{ color: "#F5F5DC" }}>Aug 2</span>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-white text-black text-sm py-1 rounded hover:bg-gray-200">View Calendar</button>
                    </div>

                    {/* Stats */}
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: "#F5F5DC" }}>Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Teams Coached</span>
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>12</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Current Athletes</span>
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>28</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Championships</span>
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>4</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>Years Active</span>
                                <span className="text-sm" style={{ color: "#F5F5DC" }}>10</span>
                            </div>
                        </div>
                    </div>

                    {/* Contacts */}
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4" style={{ color: "#F5F5DC" }}>Contacts</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
                                    <span className="text-base" style={{ color: "#F5F5DC" }}>LinkedIn</span>
                                </div>
                                <button className="bg-white text-black text-sm px-4 py-1 rounded hover:bg-gray-200">Connect</button>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
                                    <span className="text-base" style={{ color: "#F5F5DC" }}>Twitter</span>
                                </div>
                                <button className="bg-white text-black text-sm px-4 py-1 rounded hover:bg-gray-200">Follow</button>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <img src={videoIcon} alt="Video" className="w-6 h-6" />
                                    <span className="text-base" style={{ color: "#F5F5DC" }}>Video Channel</span>
                                </div>
                                <button className="bg-white text-black text-sm px-4 py-1 rounded hover:bg-gray-200">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}