import React from "react";
import { useNavigate } from "react-router-dom";
import emailIcon from "../../assets/email2.svg";
import eyeOpenIcon from "../../assets/eye open.svg";
import passwordLockIcon from "../../assets/password lock.svg";
import taktikalLogo from "../../assets/TAKTIKAL.svg";

export default function Login() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        // Here you would typically handle the login logic
        // For now, we'll navigate to the profile page for setup
        navigate('/profile');
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

            {/* Left Side - Login */}
            <div className="bg-[#000000]/30 text-[#B49E92] p-10 flex flex-col gap-5 w-1/2">
            <h2 className="font-semibold text-2xl text-center mb-5">Login</h2>

            <div className="relative mb-3">
                <img
                src={emailIcon}
                alt="Email Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
                <input
                type="email"
                placeholder="Email ID / Username"
                className="bg-[#292320] text-[#B49E92] rounded-md pl-10 p-3 text-base focus:outline-none w-full"
                />
            </div>

            <div className="relative">
                <img
                src={passwordLockIcon}
                alt="Password Lock"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
                <input
                type="password"
                placeholder="Password"
                className="bg-[#292320] text-[#B49E92] rounded-md pl-10 p-3 text-base focus:outline-none w-full"
                />
                <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                <img
                    src={eyeOpenIcon}
                    alt="Show Password"
                    className="w-5 h-5 cursor-pointer"
                />
                </button>
            </div>

            <div className="flex justify-between items-center text-xs mt-3">
                <label className="flex items-center gap-2 select-none">
                <input type="checkbox" className="w-3 h-3" />
                Remember me
                </label>
                <a href="#" className="underline text-[#B49E92]">
                Forgot password?
                </a>
            </div>

            <button
                onClick={handleLogin}
                className="bg-[#B49E92] text-[#1D1714] font-semibold rounded-md py-3 mt-5 cursor-pointer text-base hover:bg-[#A08B7F] transition duration-300"
            >
                Login
            </button>

            <div className="text-center text-xs mt-5 text-[#B49E92]">
                Don’t have an account?{" "}
                <button onClick={handleSignUp} className="underline hover:text-white transition duration-300">
                Sign up
                </button>
            </div>
            </div>

            {/* Right Side - SignUp CTA */}
            <div className="bg-gradient-to-br from-[#483C32] to-[#212121] text-[#F5F5DC] p-10 w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Hello, Coach</h2>
            <p className="text-sm leading-tight mb-8">
                Start your journey with the best coaching platform for managing your
                athletes and training programs.
            </p>

            <button
                onClick={handleSignUp}
                className="bg-[#212121] text-[#F5F5DC] font-semibold rounded-md py-3 cursor-pointer text-base hover:bg-[#000000] transition duration-300 border border-[#483C32]"
            >
                Sign up
            </button>
            </div>
        </div>
        </div>
    );
}
