import React from 'react'

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
    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#272727] via-[#483C32] to-[#272727] text-white">



        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 sm:px-10 py-6 ">
            <img src={taktikalLogo} alt="Logo" className="w-24" />
            <ul className="hidden md:flex gap-6 text-md">
            <li className="hover:underline cursor-pointer">Overview</li>
            <li className="hover:underline cursor-pointer">Features</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Support</li>
            </ul>
            <button className="border border-white px-4 py-2 rounded-full text-sm cursor-pointer">SignUp</button>
        </nav>




        {/* Hero Section */}
        <section className="relative mt-20 px-8 sm:px-20">
            <div className="relative flex flex-col md:flex-row justify-around items-center">
                <div className="max-w-xl mb-10 md:mb-0">
                    <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                        Welcome to <br /> Taktikal
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Your ultimate solution for tactical planning and execution.
                    </p>
                </div>
                <div>
                    <button className="px-12 py-4 text-white text-lg sm:text-2xl font-normal rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition duration-300">
                        Dashboard
                    </button>
                </div>
            </div>
        </section>




        {/* Overview */}
        <section className="mt-[150px] px-6 sm:px-20">
            <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Overview</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto text-left">
            <h3 className="text-2xl font-semibold mb-4">All-in-One Coaching Solution</h3>
            <p className="text-gray-400 mb-6 text-lg">
                Taktikal provides <span className="text-gray-300">everything coaches need to manage their teams effectively</span>. From athlete profiles to tactical planning and AI-powered insights, we've got you covered.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg pl-5">
                <li className="flex items-start gap-2"><span className="text-[#a38b82]">•</span> Athlete Management</li>
                <li className="flex items-start gap-2"><span className="text-[#a38b82]">•</span> Tactical Planning</li>
                <li className="flex items-start gap-2"><span className="text-[#a38b82]">•</span> Performance Analytics</li>
                <li className="flex items-start gap-2"><span className="text-[#a38b82]">•</span> AI Assistance</li>
            </ul>
            </div>
        </section>



        {/* Features */}
        <section className="mt-[150px] px-6 sm:px-20">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Features</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-400 mt-8 text-lg">
                Powerful tools designed specifically for sports coaches and training professionals.
            </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1E1E1E]/40 rounded-xl p-6">
                <img src={athleteIcon} alt="Athlete Management" className="w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Athlete Management</h3>
                <p className="text-gray-400 text-sm">Keep track of your athletes' information, performance metrics, and development progress.</p>
            </div>
            <div className="bg-[#1E1E1E]/40 rounded-xl p-6">
                <img src={tacticalIcon} alt="Tactical Planning" className="w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tactical Planning</h3>
                <p className="text-gray-400 text-sm">Create and store tactical formations with drag-and-drop positioning.</p>
            </div>
            <div className="bg-[#1E1E1E]/40 rounded-xl p-6">
                <img src={analyticsIcon} alt="Performance Analytics" className="w-10 h-10 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                <p className="text-gray-400 text-sm">Gain insights from performance data and track improvements visually.</p>
            </div>
            </div>
        </section>



        {/* About Us */}
        <section className="mt-[150px] px-6 sm:px-20">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">About Us</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto text-left">
            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
            <p className="text-gray-400 text-lg mb-6">At Taktikal, we believe great coaching needs both art and science. We provide tools to develop athletes, plan effectively, and succeed.</p>
            <p className="text-gray-400 text-lg mb-8">Built by former coaches and sports experts, we understand real-world needs and build tailored solutions.</p>
            <button className="bg-white text-[#1E1E1E] px-6 py-3 rounded-md border border-[#d3b8a8] hover:bg-gray-100 transition">
                Learn More About Our Team
            </button>
            </div>
        </section>



        {/* Support */}
        <section className="mt-[150px] px-6 sm:px-20">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Support</h2>
            <div className="w-12 h-1 bg-[#a38b82] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-400 mt-8 text-lg">We're here to help you get the most out of CoachNexus.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-transparent border border-[#a38b82] rounded-xl p-6 text-center">
                <img src={emailIcon} alt="Email Support" className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-gray-400 text-sm">Reach us anytime at support@taktikal.com</p>
                <p className="text-[#a38b82] text-sm mt-2">24/7 Response</p>
            </div>
            <div className="bg-transparent border border-[#a38b82] rounded-xl p-6 text-center">
                <img src={chatIcon} alt="Live Chat" className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-gray-400 text-sm">Chat directly from the dashboard</p>
                <p className="text-[#a38b82] text-sm mt-2">9AM–5PM IST</p>
            </div>
            <div className="bg-transparent border border-[#a38b82] rounded-xl p-6 text-center">
                <img src={knowledgeIcon} alt="Knowledge Base" className="w-10 h-10 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Knowledge Base</h3>
                <p className="text-gray-400 text-sm">Browse tutorials, guides, and FAQs in our docs</p>
                <p className="text-[#a38b82] text-sm mt-2">Continuously Updated</p>
            </div>
            </div>
            <div className="bg-[#5a4333]/60 rounded-xl p-6 text-center max-w-3xl mx-auto">
            <h3 className="text-white text-xl font-semibold mb-4">Still Have Questions?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input type="email" placeholder="Enter your email" className="bg-[#1E1E1E] text-white px-4 py-3 rounded-md w-full sm:w-2/3 outline-none" />
                <button className="bg-[#a38b82] text-white px-6 py-3 rounded-md hover:bg-[#c9a896] transition">Contact Us</button>
            </div>
            </div>
        </section>



        {/* Footer */}
        <footer className="bg-[#272727] text-gray-400 px-6 sm:px-20 py-12 text-sm mt-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
                <img src={taktikalLogo} alt="Taktikal Logo" className="mb-4 w-24" />
                <p className="mb-4">Empowering coaches with advanced tools to develop champions.</p>
                <div className="flex space-x-4">
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
                <img src={twitterIcon} alt="Twitter" className="w-5 h-5" />
                <img src={githubIcon} alt="GitHub" className="w-5 h-5" />
                </div>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2">
                <li>Overview</li>
                <li>Features</li>
                <li>About Us</li>
                <li>Support</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                <li>Blog</li>
                <li>Documentation</li>
                <li>FAQs</li>
                <li>Community</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>GDPR Compliance</li>
                </ul>
            </div>
            </div>
            <div className="border-t border-gray-700 pt-4 text-center text-gray-500">
            © 2025 TAKTIKAL. All rights reserved.
            </div>
        </footer>
        </div>
    )
}

export default HomePage
