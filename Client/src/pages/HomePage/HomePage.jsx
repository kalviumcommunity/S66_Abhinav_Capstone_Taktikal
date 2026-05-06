import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

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


const HomePage = () => {
    const navigate = useNavigate()
    const { isAuthenticated, logout, user } = useAuth()

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleDashboard = () => {
        if (isAuthenticated()) {
            navigate('/dashboard')
        } else {
            // Show alert and redirect to login
            alert('Please log in to access the dashboard')
            navigate('/login')
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        logout()
        // Optionally show a message
        alert('You have been logged out successfully!')
    }

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#272727] via-[#483C32] to-[#272727] text-white">



        {/* Navbar */}
        <div className="w-full max-w-7xl mx-auto">
            <nav className="flex justify-between items-center px-6 md:px-10 py-6">
                <img
                    src={taktikalLogo}
                    alt="Logo"
                    className="w-32 cursor-pointer hover:opacity-80 transition duration-300"
                    onClick={() => navigate('/')}
                />
                <ul className="hidden md:flex gap-6 lg:gap-8 text-md font-medium">
                    <li
                        className="hover:text-white text-gray-300 cursor-pointer transition-colors"
                        onClick={() => scrollToSection('overview')}
                    >
                        Overview
                    </li>
                    <li
                        className="hover:text-white text-gray-300 cursor-pointer transition-colors"
                        onClick={() => scrollToSection('features')}
                    >
                        Features
                    </li>
                    <li
                        className="hover:text-white text-gray-300 cursor-pointer transition-colors"
                        onClick={() => scrollToSection('about')}
                    >
                        About Us
                    </li>
                    <li
                        className="hover:text-white text-gray-300 cursor-pointer transition-colors"
                        onClick={() => scrollToSection('support')}
                    >
                        Support
                    </li>
                </ul>

                <div className="flex gap-3 items-center">
                    {isAuthenticated() ? (
                        <>
                            <span className="text-white text-sm hidden sm:block">
                                Welcome, {user?.name || 'Coach'}!
                            </span>
                            <button
                                onClick={handleLogout}
                                className="border border-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleLogin}
                                className="border border-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white hover:text-black transition duration-300"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleSignUp}
                                className="bg-white text-black px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition duration-300"
                            >
                                SignUp
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>




        {/* Hero Section */}
        <section className="relative mt-16 md:mt-32 px-6 md:px-10 w-full max-w-7xl mx-auto text-center flex flex-col items-center">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-6 mt-10">
                Welcome to <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a896] to-[#a38b82]">TAKTIKAL</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12">
                Your ultimate solution for tactical planning and execution.
            </p>
            <button
                onClick={handleDashboard}
                className="px-10 py-4 text-[#1E1E1E] text-lg sm:text-xl font-bold rounded-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(163,139,130,0.4)]"
            >
                {isAuthenticated() ? 'Go to Dashboard' : 'Get Started Now'}
            </button>
        </section>




        {/* Overview */}
        <section id="overview" className="mt-28 md:mt-40 px-6 md:px-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 bg-[#1E1E1E]/60 border border-[#483C32]/40 rounded-3xl p-8 md:p-16 shadow-2xl backdrop-blur-sm">
                <div className="lg:w-1/2 w-full text-center lg:text-left">
                    <div className="mb-6">
                        <span className="text-[#a38b82] font-semibold text-sm tracking-widest uppercase mb-3 block">Overview</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">All-in-One <br/> Coaching Solution</h2>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                        Taktikal provides <span className="text-gray-200 font-semibold">everything coaches need to manage their teams effectively</span>. From athlete profiles to tactical planning and AI-powered insights, we've got you covered.
                    </p>
                </div>
                <div className="lg:w-1/2 w-full">
                    <ul className="space-y-4">
                        {[
                            'Athlete Management & Profiles',
                            'Tactical Planning & Formations',
                            'Automated Performance Analytics',
                            'AI-Powered Strategy Assistance'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 bg-[#272727]/80 border border-[#483C32]/50 rounded-2xl p-5 shadow-sm hover:border-[#a38b82] hover:bg-[#272727] transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-[#a38b82]/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-[#c9a896] text-xl font-black">✓</span>
                                </div>
                                <span className="text-gray-200 text-lg font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>



        {/* Features */}
        <section id="features" className="mt-28 md:mt-40 px-6 md:px-10 w-full max-w-7xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Features</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-400 mt-8 text-lg max-w-2xl mx-auto">
                Powerful tools designed specifically for sports coaches and training professionals.
            </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1E1E1E]/40 border border-[#483C32]/50 hover:border-[#a38b82] transition-colors duration-300 rounded-3xl p-8 hover:-translate-y-2 transform flex flex-col items-center text-center">
                <img src={athleteIcon} alt="Athlete Management" className="w-14 h-14 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-white">Athlete Management</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Keep track of your athletes' information, performance metrics, and development progress securely.</p>
            </div>
            <div className="bg-[#1E1E1E]/40 border border-[#483C32]/50 hover:border-[#a38b82] transition-colors duration-300 rounded-3xl p-8 hover:-translate-y-2 transform flex flex-col items-center text-center">
                <img src={tacticalIcon} alt="Tactical Planning" className="w-14 h-14 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-white">Tactical Planning</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Create and store tactical formations with visual drag-and-drop precise player positioning tools.</p>
            </div>
            <div className="bg-[#1E1E1E]/40 border border-[#483C32]/50 hover:border-[#a38b82] transition-colors duration-300 rounded-3xl p-8 hover:-translate-y-2 transform flex flex-col items-center text-center">
                <img src={analyticsIcon} alt="Performance Analytics" className="w-14 h-14 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-white">Performance Analytics</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Gain actionable insights from performance data intelligently to track and visualize improvements over time.</p>
            </div>
            </div>
        </section>



        {/* About Us */}
        <section id="about" className="mt-28 md:mt-40 px-6 md:px-10 w-full max-w-7xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">About Us</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="max-w-4xl mx-auto text-center md:text-left bg-[#1E1E1E]/40 rounded-3xl p-8 md:p-12 border border-[#483C32]/30 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Mission</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed text-center">At Taktikal, we believe great coaching needs both art and science. We provide tools to develop athletes, plan effectively, and succeed.</p>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed text-center">Built by former coaches and sports experts, we understand real-world needs and build tailored solutions.</p>
                <div className="flex justify-center">
                    <button className="bg-transparent text-white px-8 py-3 rounded-full border border-[#d3b8a8] hover:bg-[#d3b8a8] hover:text-[#1E1E1E] transition-colors shadow-md font-medium">
                        Learn More About Our Team
                    </button>
                </div>
            </div>
        </section>



        {/* Support */}
        <section id="support" className="mt-28 md:mt-40 px-6 md:px-10 w-full max-w-7xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Support</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-400 mt-8 text-lg">We're here to help you get the most out of Taktikal.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-transparent border border-[#a38b82] hover:bg-[#a38b82]/10 transition duration-300 rounded-xl p-8 text-center cursor-pointer" onClick={() => window.location.href = 'mailto:abhinavv0215@gmail.com'}>
                <img src={emailIcon} alt="Email Support" className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Email Support</h3>
                <a href="mailto:abhinavv0215@gmail.com" className="text-gray-300 hover:text-white text-sm break-all font-medium">abhinavv0215@gmail.com</a>
                <p className="text-[#a38b82] text-sm mt-3 font-semibold">24/7 Response</p>
            </div>
            <div className="bg-transparent border border-[#a38b82] hover:bg-[#a38b82]/10 transition duration-300 rounded-xl p-8 text-center">
                <img src={chatIcon} alt="Live Chat" className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Live Chat</h3>
                <p className="text-gray-300 text-sm">Chat directly from the dashboard</p>
                <p className="text-[#a38b82] text-sm mt-3 font-semibold">9AM–5PM IST</p>
            </div>
            <div className="bg-transparent border border-[#a38b82] hover:bg-[#a38b82]/10 transition duration-300 rounded-xl p-8 text-center">
                <img src={knowledgeIcon} alt="Knowledge Base" className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Knowledge Base</h3>
                <p className="text-gray-300 text-sm">Browse tutorials and guides in our docs</p>
                <p className="text-[#a38b82] text-sm mt-3 font-semibold">Continuously Updated</p>
            </div>
            </div>
            
            {/* Contact Form Mailto Integration */}
            <div className="bg-[#1E1E1E]/80 shadow-2xl border border-[#483C32]/50 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-md">
                <h3 className="text-white text-3xl font-bold mb-8">Still Have Questions?</h3>
                <form action="mailto:abhinavv0215@gmail.com" method="GET" className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input type="hidden" name="subject" value="Taktikal Inquiry" />
                    <input 
                        type="text" 
                        name="body" 
                        placeholder="Tell us what you need help with..." 
                        className="bg-[#272727] border border-[#483C32] focus:border-[#a38b82] transition-colors text-white px-6 py-4 rounded-xl w-full sm:w-2/3 outline-none shadow-inner" 
                        required 
                    />
                    <button type="submit" className="bg-gradient-to-r from-[#d3b8a8] to-[#a38b82] text-[#1E1E1E] px-8 py-4 font-bold rounded-xl hover:scale-105 transform transition-transform shadow-lg">Email Us</button>
                </form>
            </div>
        </section>



        {/* Footer */}
        <footer className="bg-[#1E1E1E] border-t border-[#483C32] text-gray-400 mt-28 md:mt-32">
            <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-10">
                    <div className="md:w-1/2">
                        <img src={taktikalLogo} alt="Taktikal Logo" className="mb-6 w-32" />
                        <p className="mb-6 max-w-md text-gray-400 leading-relaxed">Empowering coaches with advanced tools to develop champions and effectively manage tactical formations seamlessly.</p>
                        <div className="flex space-x-6">
                            <a href="https://abhinav-v.netlify.app/" target="_blank" rel="noopener noreferrer">
                                <img src={facebookIcon} alt="Facebook" className="w-6 h-6 hover:opacity-100 opacity-60 transition cursor-pointer" />
                            </a>
                            <a href="https://abhinav-v.netlify.app/" target="_blank" rel="noopener noreferrer">
                                <img src={twitterIcon} alt="Twitter" className="w-6 h-6 hover:opacity-100 opacity-60 transition cursor-pointer" />
                            </a>
                            <a href="https://abhinav-v.netlify.app/" target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="GitHub" className="w-6 h-6 hover:opacity-100 opacity-60 transition cursor-pointer" />
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <h4 className="text-white font-semibold mb-5 text-lg">Quick Links</h4>
                        <ul className="space-y-4">
                            <li className="cursor-pointer hover:text-white transition" onClick={() => scrollToSection('overview')}>Overview</li>
                            <li className="cursor-pointer hover:text-white transition" onClick={() => scrollToSection('features')}>Features</li>
                            <li className="cursor-pointer hover:text-white transition" onClick={() => scrollToSection('about')}>About Us</li>
                            <li className="cursor-pointer hover:text-white transition" onClick={() => scrollToSection('support')}>Support Guide</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#483C32]/50 pt-8 text-center sm:text-left sm:flex sm:justify-between text-gray-500 text-sm">
                    <span>© 2026 TAKTIKAL. All rights reserved.</span>
                    <span className="mt-2 sm:mt-0 block">Made with passion.</span>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default HomePage
