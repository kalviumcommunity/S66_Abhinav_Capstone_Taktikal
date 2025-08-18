import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/TAKTIKAL.svg'
import dashboardIcon from '../assets/dashboard@1x.svg'
import athletesIcon from '../assets/athletes@1x.svg'
import tacticsIcon from '../assets/tactics@1x.svg'
import aiAssistantIcon from '../assets/chat@1x.svg'
import profileIcon from '../assets/profile@1x.svg'

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const menuItems = [
        { name: 'Dashboard', icon: dashboardIcon, path: '/dashboard' },
        { name: 'Athletes', icon: athletesIcon, path: '/athletes' },
        { name: 'Tactics', icon: tacticsIcon, path: '/tactics' },
        { name: 'AI Assistant', icon: aiAssistantIcon, path: '/ai-assistant' },
        { name: 'Profile', icon: profileIcon, path: '/profile' }
    ]

    const handleNavigation = (path) => {
        navigate(path)
        setIsMobileMenuOpen(false) // Close mobile menu after navigation
    }

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden bg-gradient-to-br from-[#212121] to-[#483C32] border-b border-[#483C32] px-4 py-3 flex justify-between items-center">
                <img
                    src={logo}
                    alt="Taktikal Logo"
                    className="h-8 cursor-pointer hover:opacity-80 transition duration-300"
                    onClick={() => navigate('/')}
                />
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-[#F5F5DC] p-2 hover:bg-[#483C32]/30 rounded-md transition duration-300"
                    aria-label="Open navigation menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] w-64 h-full shadow-lg flex flex-col" onClick={(e) => e.stopPropagation()}>
                        {/* Mobile Menu Header */}
                        <div className="bg-[#000000]/30 border-b border-[#483C32] px-6 py-5 flex justify-between items-center">
                            <img
                                src={logo}
                                alt="Taktikal Logo"
                                className="h-8 cursor-pointer hover:opacity-80 transition duration-300"
                                onClick={() => navigate('/')}
                            />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[#F5F5DC] p-1 hover:bg-[#483C32]/30 rounded-md transition duration-300"
                                aria-label="Close navigation menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>



                        {/* Mobile Menu Items */}
                        <div className="flex flex-col gap-2 mt-2 px-6">
                            {menuItems.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-4 cursor-pointer transition-all duration-300 p-3 rounded-lg font-normal ${
                                        isActive(item.path)
                                            ? 'text-white bg-[#483C32] shadow-md font-bold'
                                            : 'text-[#F5F5DC] hover:text-white hover:bg-[#483C32]/30'
                                    }`}
                                >
                                    <img
                                        src={item.icon}
                                        alt={`${item.name} icon`}
                                        className="w-5 h-5 flex-shrink-0 brightness-0 invert opacity-80"
                                        style={{
                                            filter: isActive(item.path)
                                                ? 'brightness(0) invert(1)'
                                                : 'brightness(0) invert(0.8)'
                                        }}
                                    />
                                    <span className="text-base leading-tight">{item.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Profile */}
                        <div className="bg-[#000000]/30 border-t border-[#483C32] px-6 py-5 flex items-center gap-4 mt-auto">
                            <div className="bg-[#483C32] text-[#F5F5DC] w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold">
                                JD
                            </div>
                            <div className="flex-1">
                                <div className="text-[#F5F5DC] font-bold text-base leading-tight">John Doe</div>
                                <div className="text-[#F5F5DC]/70 text-sm font-normal">Head Coach</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-[200px] min-h-screen bg-gradient-to-br from-[#212121] to-[#483C32] shadow-lg flex-col">
                {/* Top Logo Section */}
                <div className="bg-[#000000]/30 border-b border-[#483C32] px-6 py-6">
                    <img
                        src={logo}
                        alt="Taktikal Logo"
                        className="w-36 mx-auto cursor-pointer hover:opacity-80 transition duration-300"
                        onClick={() => navigate('/')}
                    />
                </div>



                {/* Menu Items */}
                <div className="flex flex-col gap-3 mt-4 px-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className={`flex items-center gap-4 cursor-pointer transition-all duration-300 px-3 py-3 rounded-lg font-normal ${
                                isActive(item.path)
                                    ? 'text-white bg-[#483C32] shadow-md font-bold'
                                    : 'text-[#F5F5DC] hover:text-white hover:bg-[#483C32]/30'
                            }`}
                        >
                            <img
                                src={item.icon}
                                alt={`${item.name} icon`}
                                className="w-5 h-5 flex-shrink-0 brightness-0 invert opacity-80"
                                style={{
                                    filter: isActive(item.path)
                                        ? 'brightness(0) invert(1)'
                                        : 'brightness(0) invert(0.8)'
                                }}
                            />
                            <span className="text-base leading-tight">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Profile */}
                <div className="bg-[#000000]/30 border-t border-[#483C32] px-6 py-5 flex items-center gap-4 mt-auto">
                    <div className="bg-[#483C32] text-[#F5F5DC] w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold">
                        JD
                    </div>
                    <div className="flex-1">
                        <div className="text-[#F5F5DC] font-bold text-base leading-tight">John Doe</div>
                        <div className="text-[#F5F5DC]/70 text-sm font-normal">Head Coach</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar