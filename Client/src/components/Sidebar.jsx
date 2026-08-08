import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCoach } from '../context/CoachContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Users,
    Target,
    Bot,
    User,
    Menu,
    X,
    ChevronRight
} from 'lucide-react'
import logo from '../assets/TAKTIKAL.svg'

const menuItems = [
    { name: 'Dashboard',    icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Athletes',     icon: Users,           path: '/athletes' },
    { name: 'Tactics',      icon: Target,          path: '/tactics' },
    { name: 'AI Assistant', icon: Bot,             path: '/ai-assistant' },
    { name: 'Profile',      icon: User,            path: '/profile' },
]

const Sidebar = () => {
    const navigate    = useNavigate()
    const location    = useLocation()
    const { user }    = useAuth()
    const { profileData } = useCoach()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const getUserDisplayName = () => profileData?.name || user?.name || 'Coach'
    const getUserTitle       = () => profileData?.title || user?.title || 'Coach'
    const getUserInitials    = () => {
        const name = getUserDisplayName()
        if (name === 'Coach') return 'C'
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    }

    const handleNavigation = (path) => {
        navigate(path)
        setIsMobileMenuOpen(false)
    }

    const isActive = (path) => location.pathname === path

    /* ─── Nav Item ───────────────────────────────────────────────────── */
    const NavItem = ({ item, compact = false }) => {
        const Icon   = item.icon
        const active = isActive(item.path)
        return (
            <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                    active
                        ? 'bg-[#483C32] text-[#F5F5DC] shadow-md'
                        : 'text-[#F5F5DC]/70 hover:bg-[#483C32]/30 hover:text-[#F5F5DC]'
                }`}
                aria-current={active ? 'page' : undefined}
            >
                {/* Active indicator bar */}
                {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#c9a896] rounded-full" />
                )}
                <Icon
                    size={18}
                    className={`flex-shrink-0 transition-colors ${
                        active ? 'text-[#c9a896]' : 'text-[#F5F5DC]/60 group-hover:text-[#c9a896]'
                    }`}
                />
                {!compact && <span className="truncate">{item.name}</span>}
                {active && !compact && (
                    <ChevronRight size={14} className="ml-auto text-[#c9a896]/60" />
                )}
            </button>
        )
    }

    /* ─── Profile Card ───────────────────────────────────────────────── */
    const ProfileCard = () => (
        <button
            onClick={() => handleNavigation('/profile')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#483C32]/30 transition-all duration-200 group cursor-pointer"
            title="View & edit profile"
        >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a896] to-[#483C32] flex items-center justify-center text-[#1a1a1a] text-xs font-bold flex-shrink-0 ring-2 ring-[#483C32]">
                {getUserInitials()}
            </div>
            <div className="flex-1 text-left min-w-0">
                <p className="text-[#F5F5DC] text-sm font-semibold truncate leading-tight">
                    {getUserDisplayName()}
                </p>
                <p className="text-[#F5F5DC]/50 text-xs truncate mt-0.5">
                    {getUserTitle()}
                </p>
            </div>
            <ChevronRight size={14} className="text-[#F5F5DC]/30 group-hover:text-[#F5F5DC]/60 flex-shrink-0 transition-colors" />
        </button>
    )

    return (
        <>
            {/* ─── Mobile Top Bar ───────────────────────────────────────── */}
            <div className="lg:hidden bg-[#1a1a1a] border-b border-[#483C32]/40 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
                <img
                    src={logo}
                    alt="Taktikal"
                    className="h-7 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/')}
                />
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-[#F5F5DC] p-2 hover:bg-[#483C32]/30 rounded-lg transition-colors"
                    aria-label="Open navigation menu"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* ─── Mobile Drawer ────────────────────────────────────────── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#1a1a1a] border-r border-[#483C32]/40 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#483C32]/30">
                                <img
                                    src={logo}
                                    alt="Taktikal"
                                    className="h-7 cursor-pointer"
                                    onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                                />
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-[#F5F5DC]/60 hover:text-[#F5F5DC] p-1.5 hover:bg-[#483C32]/30 rounded-lg transition-colors"
                                    aria-label="Close navigation menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Nav */}
                            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                                {menuItems.map((item) => (
                                    <NavItem key={item.path} item={item} />
                                ))}
                            </nav>

                            {/* Drawer Profile */}
                            <div className="px-3 py-3 border-t border-[#483C32]/30">
                                <ProfileCard />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ─── Desktop Sidebar ──────────────────────────────────────── */}
            <aside className="hidden lg:flex w-[220px] min-h-screen bg-[#1a1a1a] border-r border-[#483C32]/40 flex-col flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-[#483C32]/30">
                    <img
                        src={logo}
                        alt="Taktikal"
                        className="w-32 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate('/')}
                    />
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {menuItems.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}
                </nav>

                {/* Bottom Profile */}
                <div className="px-3 py-3 border-t border-[#483C32]/30">
                    <ProfileCard />
                </div>
            </aside>
        </>
    )
}

export default Sidebar