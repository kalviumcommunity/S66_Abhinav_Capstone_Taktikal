import React from 'react'
import logo from '../assets/TAKTIKAL.svg'
import dashboardIcon from '../assets/dashboard@1x.svg'
import athletesIcon from '../assets/athletes@1x.svg'
import tacticsIcon from '../assets/tactics@1x.svg'
import aiAssistantIcon from '../assets/chat@1x.svg'
import profileIcon from '../assets/profile@1x.svg'

const Sidebar = () => {
    return (
        <div className="w-[190px] h-[800px] bg-gradient-to-br from-[#212121] to-[#483C32]  shadow-lg flex flex-col">
            {/* Top Logo Section */}
            <div className=" bg-[#000000]/30 border-b border-[#483C32] px-6 py-5">
                <img src={logo} alt="Logo" className="w-36 mx-auto" />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-8 mt-8 px-6">
                <div className="flex items-center gap-4 text-[#F5F5DC] hover:text-white cursor-pointer">
                    <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />
                    <span className="text-sm">Dashboard</span>
                </div>
                <div className="flex items-center gap-4 text-[#F5F5DC] hover:text-white cursor-pointer">
                    <img src={athletesIcon} alt="Athletes" className="w-5 h-5" />
                    <span className="text-sm">Athletes</span>
                </div>
                <div className="flex items-center gap-4 text-[#F5F5DC] hover:text-white cursor-pointer">
                    <img src={tacticsIcon} alt="Tactics" className="w-5 h-5" />
                    <span className="text-sm">Tactics</span>
                </div>
                <div className="flex items-center gap-4 text-[#F5F5DC] hover:text-white cursor-pointer">
                    <img src={aiAssistantIcon} alt="AI Assistant" className="w-5 h-5" />
                    <span className="text-sm">AI Assistant</span>
                </div>
                <div className="flex items-center gap-4 text-[#F5F5DC] hover:text-white cursor-pointer">
                    <img src={profileIcon} alt="Profile" className="w-5 h-5" />
                    <span className="text-sm">Profile</span>
                </div> 
            </div>

            {/* Bottom Profile */}
            <div className=" bg-[#000000]/30 border-t border-[#483C32] px-6 py-5 flex items-center gap-4 mt-auto">
                <div className="bg-[#483C32]  text-[#F5F5DC] w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold">
                    JD
                </div>
                <div>
                    <div className="text-[#F5F5DC] font-medium text-sm">John Doe</div>
                    <div className="text-[#483C32] text-xs">Head Coach</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar