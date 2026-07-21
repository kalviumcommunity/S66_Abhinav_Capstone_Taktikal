import React from 'react';
import { useNavigate } from 'react-router-dom';
import taktikalLogo from '../../assets/TAKTIKAL.svg';

export default function TermsOfService() {
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

            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-sm text-[#F5F5DC]/70 mb-6">Last updated: July 21, 2026</p>

            <div className="space-y-6 text-sm leading-relaxed text-[#F5F5DC]/90">
                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">1. Acceptance of Terms</h2>
                    <p>By accessing or using the Taktikal Sports Management platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">2. Account Registration</h2>
                    <p>Coaches and sports administrators must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities occurring under your account.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">3. Athlete Data & Privacy</h2>
                    <p>You affirm that you have acquired necessary consents from athletes or their legal guardians before storing performance metrics, physical stats, or tactical positioning data on the platform.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">4. Acceptable Use</h2>
                    <p>You agree not to use the Service for any unlawful purpose, attempt unauthorized access to server infrastructure, or transmit malicious payloads.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-[#F5F5DC] mb-2">5. Limitation of Liability</h2>
                    <p>Taktikal is provided "as is" without warranty of any kind. We are not liable for athletic injury, match results, or data loss arising from platform usage.</p>
                </section>
            </div>
        </div>
    );
}
