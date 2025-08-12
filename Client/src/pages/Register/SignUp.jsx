import React from "react";
import emailIcon from "../../assets/email2.svg";
import eyeOpenIcon from "../../assets/eye open.svg";
import passwordLockIcon from "../../assets/password lock.svg";

export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#372E28] font-sans">
        <div className="flex rounded-xl shadow-lg overflow-hidden max-w-4xl w-full mx-6">
            
            {/* Left Side - Register */}
            <div className="bg-[#1D1714] text-[#B49E92] p-10 flex flex-col gap-5 w-1/2">
            <h2 className="font-semibold text-2xl text-center mb-5">Register</h2>

            <input
                type="text"
                placeholder="Name"
                className="bg-[#292320] text-[#B49E92] rounded-md p-3 text-base focus:outline-none mb-3"
            />
            <div className="relative mb-3">
                <img src={emailIcon} alt="Email Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                type="email"
                placeholder="Email ID / Username"
                className="bg-[#292320] text-[#B49E92] rounded-md pl-10 p-3 text-base focus:outline-none w-full"
                />
            </div>
            <div className="relative">
                <img src={passwordLockIcon} alt="Password Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                type="password"
                placeholder="Password"
                className="bg-[#292320] text-[#B49E92] rounded-md pl-10 p-3 text-base focus:outline-none w-full"
                />
                <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                <img src={eyeOpenIcon} alt="Show Password" className="w-5 h-5 cursor-pointer" />
                </button>
            </div>

            <label className="flex items-center gap-2 text-xs mt-3 select-none">
                <input type="checkbox" className="w-3 h-3" />
                I agree to the{" "}
                <a href="#" className="underline text-[#B49E92]">
                Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline text-[#B49E92]">
                Privacy Policy
                </a>
            </label>

            <button className="bg-[#B49E92] text-[#1D1714] font-semibold rounded-md py-3 mt-5 cursor-pointer text-base">
                Register
            </button>

            <div className="text-center text-xs mt-5 text-[#B49E92]">
                Already have an account?{" "}
                <a href="#" className="underline">
                Login
                </a>
            </div>
            </div>

            {/* Right Side - Login */}
            <div className="bg-gradient-to-r from-[#2E241D] to-[#4B3E35] text-[#B49E92] p-10 w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Hello, Friend</h2>
            <p className="text-sm leading-tight mb-8">
                Start your journey with the largest community of innovators in sports
                coaching and athlete development.
            </p>

            <button className="bg-[#B49E92] text-[#4B3E35] font-semibold rounded-md py-3 cursor-pointer text-base">
                Login
            </button>
            </div>
        </div>
        </div>
    );
}
