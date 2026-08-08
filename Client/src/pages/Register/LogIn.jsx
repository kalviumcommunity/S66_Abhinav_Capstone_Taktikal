import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import taktikalLogo from "../../assets/TAKTIKAL.svg";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData]     = useState({ email: '', password: '' });
    const [loading, setLoading]       = useState(false);
    const [error, setError]           = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = () => navigate('/signup');
    const handleHome   = () => navigate('/');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate('/profile');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch {
            setError('Network error. Please try again.');
        }

        setLoading(false);
    };

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#212121] px-4 py-10 relative overflow-hidden bg-noise">
            <div className="fixed inset-0 vignette-overlay pointer-events-none z-0" />
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
            >
                <img
                    src={taktikalLogo}
                    alt="Taktikal Logo"
                    className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handleHome}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-4xl"
            >
                <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden border border-[#483C32]/40 bg-[#1a1a1a]">

                    {/* ─── Left Panel: Form ─────────────────────────────── */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                        <h2 className="font-bold text-2xl text-[#F5F5DC] mb-1">Welcome back</h2>
                        <p className="text-[#F5F5DC]/50 text-sm mb-7">Sign in to your Taktikal account</p>

                        {/* Error Banner */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-sm mb-5 flex items-center gap-2"
                            >
                                <span className="text-red-400">⚠</span> {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleLogin} className="flex flex-col gap-4 flex-1">
                            {/* Email */}
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F5F5DC]/30 pointer-events-none" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email address"
                                    required
                                    className="w-full bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 pl-10 pr-4 py-3 rounded-xl outline-none text-sm transition-colors"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F5F5DC]/30 pointer-events-none" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                    className="w-full bg-[#262626] border border-[#483C32]/50 focus:border-[#a38b82] text-[#F5F5DC] placeholder-[#F5F5DC]/30 pl-10 pr-10 py-3 rounded-xl outline-none text-sm transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F5F5DC]/40 hover:text-[#F5F5DC]/70 transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-xs text-[#F5F5DC]/50">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" className="rounded" />
                                    Remember me
                                </label>
                                <a href="#" className="text-[#a38b82] hover:text-[#c9a896] transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#c9a896] to-[#a38b82] hover:from-[#d4b5a2] hover:to-[#b09590] text-[#1a1a1a] font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-sm mt-1 flex items-center justify-center gap-2 shadow-lg"
                            >
                                {loading ? (
                                    <><span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />Logging in...</>
                                ) : (
                                    <><span>Login</span><ArrowRight size={15} /></>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-xs mt-6 text-[#F5F5DC]/40">
                            Don't have an account?{' '}
                            <button onClick={handleSignUp} className="text-[#a38b82] hover:text-[#c9a896] underline transition-colors font-medium">
                                Sign up
                            </button>
                        </p>
                    </div>

                    {/* ─── Right Panel: Decorative ──────────────────────── */}
                    <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-10 bg-gradient-to-br from-[#483C32] via-[#3a2f28] to-[#212121] relative overflow-hidden text-center">
                        {/* Decorative orbs */}
                        <div className="pointer-events-none absolute top-[-60px] right-[-60px] w-48 h-48 bg-[#c9a896]/10 rounded-full blur-3xl" />
                        <div className="pointer-events-none absolute bottom-[-40px] left-[-40px] w-36 h-36 bg-[#a38b82]/10 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-[#c9a896]/15 border border-[#c9a896]/20 flex items-center justify-center mx-auto mb-6">
                                <Lock size={28} className="text-[#c9a896]" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#F5F5DC]">Hello, Coach</h2>
                            <p className="text-[#F5F5DC]/55 text-sm leading-relaxed mb-8 max-w-xs">
                                Start your journey with the best coaching platform for managing your athletes and training programs.
                            </p>
                            <button
                                onClick={handleSignUp}
                                className="inline-flex items-center gap-2 bg-[#212121]/60 border border-[#483C32] hover:border-[#a38b82] text-[#F5F5DC]/80 hover:text-[#F5F5DC] font-medium rounded-xl py-3 px-6 transition-all text-sm"
                            >
                                Sign up <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
            </div>
        </div>
    );
}
