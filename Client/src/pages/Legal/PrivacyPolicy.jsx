import React from 'react';
import { useNavigate } from 'react-router-dom';
import taktikalLogo from '../../assets/TAKTIKAL.svg';

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#212121] text-[#F5F5DC] p-6 md:p-12 font-sans max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-[#483C32] pb-4">
                <img
                    src={taktikalLogo}
                    alt="Taktikal"
                    className="w-36 cursor-pointer"
                    onClick={() => navigate('/')}
                />
                <button
                    onClick={() => navigate(-1)}
                    className="bg-[#483C32] hover:bg-[#5a4a3e] px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    ← Back
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-sm text-[#F5F5DC]/70 mb-6">Last updated: July 21, 2026</p>

            <div className="space-y-6 text-sm leading-relaxed text-[#F5F5DC]/90">
                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us: name, email address, password, sports discipline, coaching titles, athlete roster stats, and tactical formations.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">2. How We Use Information</h2>
                    <p>Your data is used solely to provide sports management services, track team performance trends, generate tactical insights, and secure your account access.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">3. Data Security & Storage</h2>
                    <p>Authentication credentials are hashed using industry-standard bcrypt algorithms. All network communications are transmitted via TLS encryption. We do not sell or rent user data to third parties.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">4. Your Data Rights</h2>
                    <p>Under applicable regulations (GDPR/CCPA), you have the right to access, export, modify, or request deletion of your personal data and team roster at any time.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">5. Contact Us</h2>
                    <p>If you have questions regarding this Privacy Policy, please contact privacy@taktikal.app.</p>
                </section>
            </div>
        </div>
    );
}
