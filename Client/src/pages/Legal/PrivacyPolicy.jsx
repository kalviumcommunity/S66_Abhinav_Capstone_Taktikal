import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import taktikalLogo from '../../assets/TAKTIKAL.svg';

const Section = ({ number, title, children }) => (
    <section>
        <h2 className="text-lg font-semibold text-[#F5F5DC] mb-2">{number}. {title}</h2>
        <p className="text-[#F5F5DC]/65 leading-relaxed text-sm">{children}</p>
    </section>
);

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#212121] text-[#F5F5DC] px-5 py-8 md:px-10 md:py-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-between items-center mb-10 pb-5 border-b border-[#483C32]/35"
                >
                    <img
                        src={taktikalLogo}
                        alt="Taktikal"
                        className="h-7 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate('/')}
                    />
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#483C32]/50 hover:border-[#a38b82]/60 text-[#F5F5DC]/70 hover:text-[#F5F5DC] px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    >
                        <ArrowLeft size={15} />
                        Back
                    </button>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-[#1a1a1a] border border-[#483C32]/35 rounded-2xl p-7 md:p-10 shadow-xl"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#F5F5DC]">Privacy Policy</h1>
                    <p className="text-sm text-[#F5F5DC]/40 mb-8 border-b border-[#483C32]/25 pb-6">
                        Last updated: July 21, 2026
                    </p>

                    <div className="space-y-7">
                        <Section number="1" title="Information We Collect">
                            We collect information you provide directly to us: name, email address, password, sports discipline, coaching titles, athlete roster stats, and tactical formations.
                        </Section>
                        <Section number="2" title="How We Use Information">
                            Your data is used solely to provide sports management services, track team performance trends, generate tactical insights, and secure your account access.
                        </Section>
                        <Section number="3" title="Data Security & Storage">
                            Authentication credentials are hashed using industry-standard bcrypt algorithms. All network communications are transmitted via TLS encryption. We do not sell or rent user data to third parties.
                        </Section>
                        <Section number="4" title="Your Data Rights">
                            Under applicable regulations (GDPR/CCPA), you have the right to access, export, modify, or request deletion of your personal data and team roster at any time.
                        </Section>
                        <Section number="5" title="Contact Us">
                            If you have questions regarding this Privacy Policy, please contact privacy@taktikal.app.
                        </Section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
