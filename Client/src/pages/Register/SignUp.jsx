import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import emailIcon from "../../assets/email2.svg";
import eyeOpenIcon from "../../assets/eye open.svg";
import passwordLockIcon from "../../assets/password lock.svg";
import taktikalLogo from "../../assets/TAKTIKAL.svg";

export default function SignUp() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const result = await register(formData.name, formData.email, formData.password);

            if (result.success) {
                // Navigate to profile page for setup
                navigate('/profile');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }

        setLoading(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#212121] font-sans">
        {/* Logo at the top */}
        <div className="mb-8">
            <img
                src={taktikalLogo}
                alt="Taktikal Logo"
                className="w-40 cursor-pointer hover:opacity-80 transition duration-300"
                onClick={handleHome}
            />
        </div>
        <div className="flex rounded-xl shadow-lg overflow-hidden max-w-4xl w-full mx-6 border border-[#483C32]">

            {/* Left Side - Register */}
            <div className="bg-[#000000]/30 text-[#B49E92] p-10 flex flex-col gap-5 w-1/2">
            <h2 className="font-semibold text-2xl text-center mb-5">Register</h2>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="bg-[#292320] text-[#B49E92] rounded-md p-3 text-base focus:outline-none mb-3 w-full"
                    required
                />
                <div className="relative mb-3">
                    <img src={emailIcon} alt="Email Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email ID / Username"
                    className="bg-[#292320] text-[#B49E92] rounded-md pl-10 p-3 text-base focus:outline-none w-full"
                    required
                    />
                </div>
                <div className="relative mb-3">
                    <img src={passwordLockIcon} alt="Password Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="bg-[#292320] text-[#B49E92] rounded-md pl-10 p-3 text-base focus:outline-none w-full"
                    required
                    />
                    <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                    <img src={eyeOpenIcon} alt="Show Password" className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                <label className="flex items-center gap-2 text-xs mt-3 select-none">
                    <input type="checkbox" className="w-3 h-3" required />
                    I agree to the{" "}
                    <a href="#" className="underline text-[#B49E92]">
                    Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline text-[#B49E92]">
                    Privacy Policy
                    </a>
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#B49E92] text-[#1D1714] font-semibold rounded-md py-3 mt-5 cursor-pointer text-base hover:bg-[#A08B7F] transition duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className="text-center text-xs mt-5 text-[#B49E92]">
                Already have an account?{" "}
                <button onClick={handleLogin} className="underline hover:text-white transition duration-300">
                Login
                </button>
            </div>
            </div>

            {/* Right Side - Login */}
            <div className="bg-gradient-to-br from-[#483C32] to-[#212121] text-[#F5F5DC] p-10 w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Hello, Friend</h2>
            <p className="text-sm leading-tight mb-8">
                Start your journey with the largest community of innovators in sports
                coaching and athlete development.
            </p>

            <button
                onClick={handleLogin}
                className="bg-[#212121] text-[#F5F5DC] font-semibold rounded-md py-3 cursor-pointer text-base hover:bg-[#000000] transition duration-300 border border-[#483C32]"
            >
                Login
            </button>
            </div>
        </div>
        </div>
    );
}
