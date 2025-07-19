import React from 'react'
import logo from '../assets/TAKTIKAL.svg'
import dashboardIcon from '../assets/dashboard@1x.svg'
import athletesIcon from '../assets/athletes@1x.svg'
import tacticsIcon from '../assets/tactics@1x.svg'
import aiAssistantIcon from '../assets/chat@1x.svg'
import profileIcon from '../assets/profile@1x.svg'

const Sidebar = () => {
    return (
        <div className="w-[190px] h-[800px] bg-[#272727] text-white flex flex-col">
            {/* Top Logo Section */}
            <div className="bg-[#1E1D1D] border-b border-[#8D6E63] px-6 py-5">
                <img src={logo} alt="Logo" className="w-36 mx-auto" />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-8 mt-8 px-6">
                <div className="flex items-center gap-4 text-[#b9b5b5] hover:text-white cursor-pointer">
                    <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />
                    <span className="text-sm">Dashboard</span>
                </div>
                <div className="flex items-center gap-4 text-[#b9b5b5] hover:text-white cursor-pointer">
                    <img src={athletesIcon} alt="Athletes" className="w-5 h-5" />
                    <span className="text-sm">Athletes</span>
                </div>
                <div className="flex items-center gap-4 text-[#b9b5b5] hover:text-white cursor-pointer">
                    <img src={tacticsIcon} alt="Tactics" className="w-5 h-5" />
                    <span className="text-sm">Tactics</span>
                </div>
                <div className="flex items-center gap-4 text-[#b9b5b5] hover:text-white cursor-pointer">
                    <img src={aiAssistantIcon} alt="AI Assistant" className="w-5 h-5" />
                    <span className="text-sm">AI Assistant</span>
                </div>
                <div className="flex items-center gap-4 text-[#b9b5b5] hover:text-white cursor-pointer">
                    <img src={profileIcon} alt="Profile" className="w-5 h-5" />
                    <span className="text-sm">Profile</span>
                </div> 
            </div>

            {/* Bottom Profile */}
            <div className="bg-[#1E1D1D] border-t border-[#8D6E63] px-6 py-5 flex items-center gap-4 mt-auto">
                <div className="bg-[#8D6E63] w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold">
                    JD
                </div>
                <div>
                    <div className="text-[#f9f9e9] font-medium text-sm">John Doe</div>
                    <div className="text-[#8D6E63] text-xs">Head Coach</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar