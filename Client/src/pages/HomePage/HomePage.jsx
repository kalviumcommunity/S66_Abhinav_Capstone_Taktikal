import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, MessageCircle, BookOpen } from 'lucide-react'

import taktikalLogo from '../../assets/TAKTIKAL.svg'
import athleteIcon from '../../assets/athlete management@3x.png'
import tacticalIcon from '../../assets/tactical planning@3x.png'
import analyticsIcon from '../../assets/performance analytics@3x.png'
import emailIcon from '../../assets/email support@3x.png'
import chatIcon from '../../assets/live chat@3x.png'
import knowledgeIcon from '../../assets/knowledge base@3x.png'
import facebookIcon from '../../assets/facebook@3x.png'
import twitterIcon from '../../assets/twitter@3x.png'
import githubIcon from '../../assets/github@3x.png'

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.12 } },
}

const HomePage = () => {
    const navigate = useNavigate()
    const { isAuthenticated, logout, user } = useAuth()

    const handleSignUp    = () => navigate('/signup')
    const handleDashboard = () => {
        if (isAuthenticated()) { navigate('/dashboard') }
        else { alert('Please log in to access the dashboard'); navigate('/login') }
    }
    const handleLogin  = () => navigate('/login')
    const handleLogout = () => { logout(); alert('You have been logged out successfully!') }

    const scrollToSection = (id) => {
        const targetId = (id === 'about' || id === 'support') ? 'about-support-footer' : id
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    const navLinks = ['Overview', 'Features', 'About', 'Support']

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#212121] text-[#F5F5DC] relative bg-noise">
            <div className="fixed inset-0 vignette-overlay pointer-events-none z-0" />

            {/* ── Sticky Navbar ──────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-[#141414]/90 backdrop-blur-md border-b border-[#483C32]/30">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <nav className="flex items-center justify-between h-16">
                        <img
                            src={taktikalLogo}
                            alt="Taktikal"
                            className="h-7 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => navigate('/')}
                        />

                        {/* Desktop nav links */}
                        <ul className="hidden md:flex items-center gap-7">
                            {navLinks.map((link) => (
                                <li key={link}>
                                    <button
                                        onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                                        className="nav-link text-sm font-medium text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors pb-0.5"
                                    >
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Auth buttons */}
                        <div className="flex items-center gap-3">
                            {isAuthenticated() ? (
                                <>
                                    <span className="hidden sm:block text-sm text-[#F5F5DC]/70">
                                        Welcome, <span className="text-[#F5F5DC] font-medium">{user?.name || 'Coach'}</span>!
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="border border-[#483C32] text-[#F5F5DC]/80 hover:border-[#a38b82] hover:text-[#F5F5DC] px-4 py-2 rounded-full text-sm font-medium transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLogin}
                                        className="border border-[#483C32] text-[#F5F5DC]/80 hover:border-[#a38b82] hover:text-[#F5F5DC] px-4 py-2 rounded-full text-sm font-medium transition-all"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={handleSignUp}
                                        className="bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            {/* ── Hero & Features ────────────────────────────────────────── */}
            <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 px-5 overflow-hidden bg-[#181818]">
                {/* Infinite Moving Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <motion.div
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -60, 40, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[5%] left-[15%] w-[380px] h-[380px] bg-[#483C32]/30 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -70, 50, 0],
                            y: [0, 50, -60, 0],
                            scale: [1, 0.9, 1.15, 1],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[10%] right-[10%] w-[480px] h-[480px] bg-[#a38b82]/18 rounded-full blur-[110px]"
                    />
                    <motion.div
                        animate={{
                            x: [-30, 30, -30],
                            y: [30, -30, 30],
                            scale: [0.95, 1.05, 0.95]
                        }}
                        transition={{
                            duration: 14,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-[#c9a896]/10 rounded-full blur-[80px]"
                    />
                </div>

                <motion.div
                    className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
                        
                        {/* Left Column (Hero Content) */}
                        <div className="lg:col-span-5 space-y-6">
                            <motion.div variants={fadeUp}>
                                <span className="inline-block text-[#a38b82] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#483C32]/50 bg-[#483C32]/15">
                                    The Coach's Command Centre
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
                            >
                                Welcome to <br />
                                <span className="gradient-text">TAKTIKAL</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="text-[#F5F5DC]/60 text-lg leading-relaxed max-w-lg"
                            >
                                Your ultimate solution for tactical planning and execution.
                            </motion.p>

                            <motion.div variants={fadeUp} className="pt-2">
                                <button
                                    onClick={handleDashboard}
                                    className="group inline-flex items-center gap-2 px-8 py-4 text-[#1E1E1E] font-bold rounded-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] hover:from-[#d4b5a2] hover:to-[#b09590] hover:scale-105 transition-all duration-300 shadow-[0_0_28px_rgba(163,139,130,0.35)] text-base md:text-lg cursor-pointer"
                                >
                                    {isAuthenticated() ? 'Go to Dashboard' : 'Get Started Now'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>

                        {/* Right Column (Features Stack) */}
                        <div id="features" className="lg:col-span-7 space-y-4">
                            <span className="block text-xs font-semibold text-[#a38b82] tracking-widest uppercase mb-4">
                                FEATURES AT A GLANCE
                            </span>
                            <motion.div
                                className="space-y-4"
                                variants={stagger}
                                initial="hidden"
                                animate="show"
                            >
                                {[
                                    { icon: athleteIcon, title: 'Athlete Management', desc: 'Keep track of your athletes\' information, performance metrics, and development progress securely.' },
                                    { icon: tacticalIcon, title: 'Tactical Planning', desc: 'Create and store tactical formations with visual drag-and-drop precise player positioning tools.' },
                                    { icon: analyticsIcon, title: 'Performance Analytics', desc: 'Gain actionable insights from performance data intelligently to track and visualize improvements over time.' },
                                ].map((card, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        className="group bg-[#1a1a1a]/70 backdrop-blur-sm border border-[#483C32]/40 hover:border-[#a38b82]/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-[#483C32]/35 border border-[#483C32]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#483C32]/50 transition-colors">
                                            <img src={card.icon} alt={card.title} className="w-8 h-8 object-contain" />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-base font-bold text-[#F5F5DC] mb-1.5">{card.title}</h3>
                                            <p className="text-[#F5F5DC]/55 leading-relaxed text-sm">{card.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </section>

            {/* ── Overview ───────────────────────────────────────────────── */}
            <section id="overview" className="py-24 md:py-32 px-5 md:px-10 bg-gradient-to-b from-[#181818] to-[#221f1d]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid lg:grid-cols-2 gap-12 items-center bg-[#1a1a1a] border border-[#483C32]/35 rounded-2xl p-8 md:p-14 shadow-2xl"
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Left */}
                        <div>
                            <span className="text-[#a38b82] font-semibold text-xs tracking-widest uppercase mb-3 block">Overview</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-[#F5F5DC]">
                                All-in-One <br /> Coaching Solution
                            </h2>
                            <p className="text-[#F5F5DC]/60 text-base md:text-lg leading-relaxed">
                                Taktikal provides{' '}
                                <span className="text-[#F5F5DC]/90 font-semibold">everything coaches need to manage their teams effectively</span>.
                                From athlete profiles to tactical planning and AI-powered insights, we've got you covered.
                            </p>
                        </div>

                        {/* Right - checklist */}
                        <motion.ul
                            className="space-y-3"
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            {[
                                'Athlete Management & Profiles',
                                'Tactical Planning & Formations',
                                'Automated Performance Analytics',
                                'AI-Powered Strategy Assistance',
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    variants={fadeUp}
                                    className="flex items-center gap-4 bg-[#212121] border border-[#483C32]/40 rounded-xl p-4 hover:border-[#a38b82]/60 hover:bg-[#262626] transition-all duration-300 cursor-default"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#483C32]/40 border border-[#483C32] flex items-center justify-center flex-shrink-0">
                                        <Check size={14} className="text-[#c9a896]" />
                                    </div>
                                    <span className="text-[#F5F5DC]/90 font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </section>

            {/* ── Unified About, Support, and Footer Section ────────────── */}
            <section id="about-support-footer" className="py-20 px-5 md:px-10 bg-gradient-to-b from-[#221f1d] to-[#121110]">
                <div className="max-w-7xl mx-auto bg-[#1a1a1a] border border-[#483C32]/45 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left Column (About & Mission) */}
                    <div className="w-full md:w-1/3 p-8 md:p-12 border-r border-[#483C32]/35 flex flex-col justify-between bg-gradient-to-b from-[#1a1a1a] to-[#121110]">
                        <div>
                            <img src={taktikalLogo} alt="Taktikal" className="h-8 w-auto mb-8" />
                            <h3 className="text-xl font-bold text-[#F5F5DC] mb-4">Our Mission</h3>
                            <p className="text-sm text-[#F5F5DC]/60 leading-relaxed mb-6">
                                At Taktikal, we believe great coaching needs both art and science. We provide tools to develop athletes, plan effectively, and succeed.
                            </p>
                        </div>
                        <p className="text-sm text-[#c9a896] font-medium leading-relaxed mt-auto">
                            Empowering coaches with advanced tools to develop champions and effectively manage tactical formations seamlessly.
                        </p>
                    </div>

                    {/* Right Column (Support & Contact Form) */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                        
                        {/* Top row: Nav and Contact details */}
                        <div className="flex flex-col sm:flex-row justify-between gap-8 pb-8 border-b border-[#483C32]/25">
                            <div>
                                <span className="block text-xs font-semibold text-[#F5F5DC]/40 uppercase tracking-wider mb-3">Navigation</span>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link}
                                            onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                                            className="text-sm text-[#F5F5DC]/75 hover:text-[#F5F5DC] transition-colors cursor-pointer"
                                        >
                                            {link}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-[#F5F5DC]/40 uppercase tracking-wider mb-3">Contact</span>
                                <a href="mailto:abhinavv0215@gmail.com" className="text-sm font-semibold text-[#c9a896] hover:text-[#d4b5a2] transition-colors">
                                    abhinavv0215@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Middle row: Contact Form */}
                        <div className="py-8 grid lg:grid-cols-5 gap-8 items-start">
                            <div className="lg:col-span-2">
                                <span className="block text-xs font-semibold text-[#F5F5DC]/40 uppercase tracking-wider mb-2">LET'S BUILD SOMETHING GREAT.</span>
                                <h4 className="text-2xl font-bold text-[#F5F5DC] leading-tight">Get in touch with Taktikal.</h4>
                            </div>
                            <form action="mailto:abhinavv0215@gmail.com" method="GET" className="lg:col-span-3 space-y-4">
                                <input type="hidden" name="subject" value="Taktikal Inquiry" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        required
                                        className="bg-[#262626] border border-[#483C32]/45 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-4 py-3 rounded-xl outline-none text-sm transition-colors w-full"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        required
                                        className="bg-[#262626] border border-[#483C32]/45 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-4 py-3 rounded-xl outline-none text-sm transition-colors w-full"
                                    />
                                </div>
                                <textarea
                                    name="body"
                                    placeholder="Your message..."
                                    rows={4}
                                    required
                                    className="bg-[#262626] border border-[#483C32]/45 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 px-4 py-3 rounded-xl outline-none text-sm transition-colors w-full resize-none"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 bg-[#483C32] hover:bg-[#5a4a3e] text-[#F5F5DC] px-6 py-3 rounded-xl text-sm font-semibold transition-colors border border-[#483C32] hover:border-[#a38b82]/40 cursor-pointer"
                                >
                                    Send Message <ArrowRight size={14} />
                                </button>
                            </form>
                        </div>

                        {/* Bottom row: Copyright & Social links */}
                        <div className="pt-8 border-t border-[#483C32]/25 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F5F5DC]/40">
                            <span>© 2026 TAKTIKAL. All rights reserved.</span>
                            <div className="flex items-center gap-4">
                                {[
                                    { href: 'https://abhinav-v.netlify.app/', src: facebookIcon, alt: 'Facebook' },
                                    { href: 'https://abhinav-v.netlify.app/', src: twitterIcon, alt: 'Twitter' },
                                    { href: 'https://abhinav-v.netlify.app/', src: githubIcon, alt: 'GitHub' },
                                ].map(({ href, src, alt }) => (
                                    <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-40 transition-opacity">
                                        <img src={src} alt={alt} className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
