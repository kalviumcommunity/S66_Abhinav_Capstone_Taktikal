import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import linkedinIcon from "../../assets/linkedin@1x.svg";
import twitterIcon from "../../assets/twitter@1x.svg";
import videoIcon from "../../assets/video@1x.svg";
import locationIcon from "../../assets/location@1x.svg";
import emailIcon from "../../assets/email2.svg";
import { useCoach } from "../../context/CoachContext";

export default function Profile() {
    const navigate = useNavigate();
    const {
        isNewUser,
        profileData,
        statsData,
        contactsData,
        profileImage,
        setProfileImage,
        updateProfileData,
        updateStatsData,
        updateContactsData,
        isProfileComplete,
        completeProfileSetup,
        resetToNewUser
    } = useCoach();

    // Start in edit mode for new users, or if profile is incomplete
    const [isEditing, setIsEditing] = useState(isNewUser || !isProfileComplete());
    const [editSection, setEditSection] = useState('profile'); // 'profile', 'stats', 'contacts'

    // Auto-start editing for new users
    useEffect(() => {
        if (isNewUser || !isProfileComplete()) {
            setIsEditing(true);
        }
    }, [isNewUser, isProfileComplete]);

    // Helper function to check if a field is valid
    const isFieldValid = (fieldName) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (fieldName) {
            case 'name':
                return profileData.name && profileData.name.trim() !== '';
            case 'title':
                return profileData.title && profileData.title.trim() !== '';
            case 'email':
                return profileData.email && emailRegex.test(profileData.email.trim());
            case 'location':
                return profileData.location && profileData.location.trim() !== '';
            default:
                return true;
        }
    };

    // Helper function to get field border color
    const getFieldBorderColor = (fieldName) => {
        if (!isNewUser) return 'border-[#483C32]';
        return isFieldValid(fieldName) ? 'border-green-500' : 'border-red-500';
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Check if this is a new user completing their profile
        if (isNewUser) {
            // Validate all required fields
            const missingFields = [];
            if (!profileData.name || profileData.name.trim() === '') {
                missingFields.push('Name');
            }
            if (!profileData.title || profileData.title.trim() === '') {
                missingFields.push('Title');
            }
            if (!profileData.email || profileData.email.trim() === '') {
                missingFields.push('Email');
            }
            if (!profileData.location || profileData.location.trim() === '') {
                missingFields.push('Location');
            }

            // Check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (profileData.email && !emailRegex.test(profileData.email.trim())) {
                alert('Please enter a valid email address.');
                return;
            }

            if (missingFields.length > 0) {
                alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
                return;
            }

            // All validations passed
            completeProfileSetup();
            alert('Profile completed successfully! Welcome to Taktikal!');
            navigate('/dashboard');
        } else {
            // Here you would typically save to backend
            setIsEditing(false);
            setEditSection('profile');
        }
    };

    const handleCancel = () => {
        // If new user, don't allow cancel - they must complete profile
        if (isNewUser) {
            return;
        }
        setIsEditing(false);
        setEditSection('profile');
        // Reset any unsaved changes if needed
    };
    return (
        <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 bg-[#212121] min-h-screen">
                {/* Welcome Message for New Users */}
                {isNewUser && (
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 md:p-6 shadow-lg">
                        <h2 className="text-xl md:text-2xl font-bold text-[#F5F5DC] mb-2">
                            Welcome to Taktikal! 🎉
                        </h2>
                        <p className="text-[#F5F5DC]/90 mb-4">
                            Let's set up your coach profile. Fill in your details below to get started with managing your team.
                        </p>
                        <div className="bg-[#000000]/30 rounded-lg p-3">
                            <p className="text-[#F5F5DC] text-sm">
                                <strong>Required fields:</strong> Name, Title, Email, and Location<br/>
                                <span className="text-[#F5F5DC]/70">Stats and Contacts are optional and can be filled later</span>
                            </p>
                            {/* Progress indicator */}
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-[#F5F5DC]/70 mb-1">
                                    <span>Profile Completion</span>
                                    <span>{[
                                        isFieldValid('name'),
                                        isFieldValid('title'),
                                        isFieldValid('email'),
                                        isFieldValid('location')
                                    ].filter(Boolean).length}/4</span>
                                </div>
                                <div className="w-full bg-[#000000]/50 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${([
                                                isFieldValid('name'),
                                                isFieldValid('title'),
                                                isFieldValid('email'),
                                                isFieldValid('location')
                                            ].filter(Boolean).length / 4) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Profile Info Section */}
                <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#483C32] bg-gradient-to-br from-[#212121] to-[#483C32] overflow-hidden">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#F5F5DC] font-bold text-lg">
                                        {profileData.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            {isEditing && editSection === 'profile' && (
                                <label className="absolute -bottom-2 -right-2 bg-[#483C32] text-[#F5F5DC] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#5a4333] transition duration-300">
                                    <span className="text-xs">+</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                {isEditing && editSection === 'profile' ? (
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => updateProfileData({name: e.target.value})}
                                        placeholder="Enter your full name"
                                        className={`text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5DC] leading-tight bg-[#000000]/30 border ${getFieldBorderColor('name')} rounded px-2 py-1`}
                                    />
                                ) : (
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#F5F5DC] leading-tight">
                                        {profileData.name || "Your Name"}
                                    </h2>
                                )}

                                {isEditing && editSection === 'profile' ? (
                                    <input
                                        type="text"
                                        value={profileData.title}
                                        onChange={(e) => updateProfileData({title: e.target.value})}
                                        placeholder="e.g., Head Coach, Assistant Coach"
                                        className={`text-sm px-3 py-1 rounded-full bg-[#483C32] text-[#F5F5DC] w-fit font-normal border ${getFieldBorderColor('title')}`}
                                    />
                                ) : (
                                    <span className="text-sm px-3 py-1 rounded-full bg-[#483C32] text-[#F5F5DC] w-fit font-normal">
                                        {profileData.title || "Your Title"}
                                    </span>
                                )}
                            </div>

                            {isEditing && editSection === 'profile' ? (
                                <input
                                    type="text"
                                    value={profileData.description}
                                    onChange={(e) => updateProfileData({description: e.target.value})}
                                    placeholder="Brief description about yourself"
                                    className="text-base md:text-lg text-[#F5F5DC]/90 mb-3 font-normal leading-relaxed bg-[#000000]/30 border border-[#483C32] rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p className="text-base md:text-lg text-[#F5F5DC]/90 mb-3 font-normal leading-relaxed">
                                    {profileData.description || "Add a brief description about yourself"}
                                </p>
                            )}

                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm md:text-base text-[#F5F5DC] font-normal">
                                    <img src={emailIcon} alt="Email" className="w-4 h-4 md:w-5 md:h-5" />
                                    {isEditing && editSection === 'profile' ? (
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => updateProfileData({email: e.target.value})}
                                            placeholder="your.email@example.com"
                                            className={`bg-[#000000]/30 border ${getFieldBorderColor('email')} rounded px-2 py-1 text-[#F5F5DC]`}
                                        />
                                    ) : (
                                        <span>{profileData.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-sm md:text-base text-[#F5F5DC] font-normal">
                                    <img src={locationIcon} alt="Location" className="w-4 h-4 md:w-5 md:h-5" />
                                    {isEditing && editSection === 'profile' ? (
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => updateProfileData({location: e.target.value})}
                                            placeholder="City, Country"
                                            className={`bg-[#000000]/30 border ${getFieldBorderColor('location')} rounded px-2 py-1 text-[#F5F5DC]`}
                                        />
                                    ) : (
                                        <span>{profileData.location}</span>
                                    )}
                                </div>
                                {isEditing && editSection === 'profile' ? (
                                    <input
                                        type="text"
                                        value={profileData.athletes}
                                        onChange={(e) => updateProfileData({athletes: e.target.value})}
                                        className="font-bold text-base md:text-lg text-[#F5F5DC] leading-tight bg-[#000000]/30 border border-[#483C32] rounded px-2 py-1"
                                        placeholder="Number of Athletes"
                                    />
                                ) : (
                                    <p className="font-bold text-base md:text-lg text-[#F5F5DC] leading-tight">{profileData.athletes} Athletes</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 w-full md:w-auto">
                        {isEditing ? (
                            <>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={isNewUser && !isProfileComplete()}
                                        className={`px-3 md:px-4 py-1 md:py-2 rounded text-[#F5F5DC] text-sm transition duration-300 flex-1 md:flex-none ${
                                            isNewUser && !isProfileComplete()
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                    >
                                        {isNewUser ? 'Complete Profile' : 'Save'}
                                    </button>
                                    {isNewUser && !isProfileComplete() && (
                                        <div className="text-xs text-red-400">
                                            Missing: {[
                                                !isFieldValid('name') && 'Name',
                                                !isFieldValid('title') && 'Title',
                                                !isFieldValid('email') && 'Email',
                                                !isFieldValid('location') && 'Location'
                                            ].filter(Boolean).join(', ')}
                                        </div>
                                    )}
                                </div>
                                {!isNewUser && (
                                    <button
                                        onClick={handleCancel}
                                        className="px-3 md:px-4 py-1 md:py-2 bg-red-600 rounded text-[#F5F5DC] text-sm hover:bg-red-700 transition duration-300 flex-1 md:flex-none"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-3 md:px-4 py-1 md:py-2 bg-[#212121] border border-[#483C32] rounded text-[#F5F5DC] text-sm hover:bg-[#383838] transition duration-300 flex-1 md:flex-none"
                                >
                                    Edit
                                </button>
                                <button className="px-3 md:px-4 py-1 md:py-2 bg-[#483C32] rounded text-[#F5F5DC] text-sm hover:bg-[#5a4333] transition duration-300 flex-1 md:flex-none">Share</button>
                                {/* Development button to test new user flow */}
                                {import.meta.env.DEV && (
                                    <button
                                        onClick={resetToNewUser}
                                        className="px-3 md:px-4 py-1 md:py-2 bg-yellow-600 rounded text-[#F5F5DC] text-sm hover:bg-yellow-700 transition duration-300 flex-1 md:flex-none"
                                        title="Reset to new user (dev only)"
                                    >
                                        Reset
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Edit Section Navigation */}
                {isEditing && (
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-[#F5F5DC]">Edit Sections</h3>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setEditSection('profile')}
                                className={`px-4 py-2 rounded text-sm transition duration-300 ${
                                    editSection === 'profile'
                                        ? 'bg-[#483C32] text-[#F5F5DC]'
                                        : 'bg-[#000000]/30 text-[#F5F5DC]/70 hover:bg-[#000000]/50'
                                }`}
                            >
                                Profile Info <span className="text-red-400">*</span>
                            </button>
                            <button
                                onClick={() => setEditSection('stats')}
                                className={`px-4 py-2 rounded text-sm transition duration-300 ${
                                    editSection === 'stats'
                                        ? 'bg-[#483C32] text-[#F5F5DC]'
                                        : 'bg-[#000000]/30 text-[#F5F5DC]/70 hover:bg-[#000000]/50'
                                }`}
                            >
                                Stats <span className="text-green-400">(Optional)</span>
                            </button>
                            <button
                                onClick={() => setEditSection('contacts')}
                                className={`px-4 py-2 rounded text-sm transition duration-300 ${
                                    editSection === 'contacts'
                                        ? 'bg-[#483C32] text-[#F5F5DC]'
                                        : 'bg-[#000000]/30 text-[#F5F5DC]/70 hover:bg-[#000000]/50'
                                }`}
                            >
                                Contacts <span className="text-green-400">(Optional)</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Activity Section */}
                <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: "#F5F5DC" }}>Activity</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>Training Session: Advanced Tactics</p>
                                <p className="text-xs" style={{ color: "#F5F5DC" }}>Published Jul 10, 2023</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>Performance Analysis Workshop</p>
                                <p className="text-xs" style={{ color: "#F5F5DC" }}>Published Jul 12, 2023</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>Team Building Exercise</p>
                                <p className="text-xs" style={{ color: "#F5F5DC" }}>Published Jul 05, 2023</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] text-[#F5F5DC] text-sm py-2 rounded hover:bg-[#483C32] transition duration-300">View All Activity</button>
                </div>

                {/* Events, Stats, and Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                    {/* Events */}
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 md:p-6 shadow-lg">
                        <h3 className="text-base md:text-lg font-semibold mb-4 text-[#F5F5DC]">Events</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Squad Briefing <span className="text-green-400 ml-2 text-xs">Live</span></span>
                                <span className="text-xs text-[#F5F5DC]">July 11</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Regional Tournament</span>
                                <span className="text-xs text-[#F5F5DC]">July 23</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Performance Review <span className="text-[#941502] ml-2 text-xs">Joined</span></span>
                                <span className="text-xs text-[#F5F5DC]">Aug 2</span>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] text-[#F5F5DC] text-sm py-2 rounded hover:bg-[#483C32] transition duration-300">View Calendar</button>
                    </div>

                    {/* Stats */}
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 md:p-6 shadow-lg">
                        <h3 className="text-base md:text-lg font-semibold mb-4 text-[#F5F5DC]">Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Teams Coached</span>
                                {isEditing && editSection === 'stats' ? (
                                    <input
                                        type="number"
                                        value={statsData.teamsCoached}
                                        onChange={(e) => updateStatsData({teamsCoached: e.target.value})}
                                        className="text-sm text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 w-16 text-center"
                                    />
                                ) : (
                                    <span className="text-sm text-[#F5F5DC]">{statsData.teamsCoached}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Current Athletes</span>
                                {isEditing && editSection === 'stats' ? (
                                    <input
                                        type="number"
                                        value={statsData.currentAthletes}
                                        onChange={(e) => updateStatsData({currentAthletes: e.target.value})}
                                        className="text-sm text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 w-16 text-center"
                                    />
                                ) : (
                                    <span className="text-sm text-[#F5F5DC]">{statsData.currentAthletes}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Championships</span>
                                {isEditing && editSection === 'stats' ? (
                                    <input
                                        type="number"
                                        value={statsData.championships}
                                        onChange={(e) => updateStatsData({championships: e.target.value})}
                                        className="text-sm text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 w-16 text-center"
                                    />
                                ) : (
                                    <span className="text-sm text-[#F5F5DC]">{statsData.championships}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center bg-[#000000]/30 p-3 rounded-lg">
                                <span className="text-sm text-[#F5F5DC]">Years Active</span>
                                {isEditing && editSection === 'stats' ? (
                                    <input
                                        type="number"
                                        value={statsData.yearsActive}
                                        onChange={(e) => updateStatsData({yearsActive: e.target.value})}
                                        className="text-sm text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 w-16 text-center"
                                    />
                                ) : (
                                    <span className="text-sm text-[#F5F5DC]">{statsData.yearsActive}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contacts */}
                    <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-xl p-4 md:p-6 shadow-lg">
                        <h3 className="text-base md:text-lg font-semibold mb-4 text-[#F5F5DC]">Contacts</h3>
                        <div className="space-y-3">
                            <div className="bg-[#000000]/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="text-sm md:text-base text-[#F5F5DC]">LinkedIn</span>
                                </div>
                                {isEditing && editSection === 'contacts' ? (
                                    <input
                                        type="url"
                                        value={contactsData.linkedin}
                                        onChange={(e) => updateContactsData({linkedin: e.target.value})}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="w-full text-xs text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 mb-2"
                                    />
                                ) : (
                                    contactsData.linkedin && (
                                        <p className="text-xs text-[#F5F5DC]/70 mb-2 break-all">{contactsData.linkedin}</p>
                                    )
                                )}
                                {!isEditing && (
                                    <button
                                        onClick={() => contactsData.linkedin && window.open(contactsData.linkedin, '_blank')}
                                        disabled={!contactsData.linkedin}
                                        className={`w-full text-xs md:text-sm px-3 md:px-4 py-1 rounded transition duration-300 ${
                                            contactsData.linkedin
                                                ? 'bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] text-[#F5F5DC] hover:bg-[#483C32]'
                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {contactsData.linkedin ? 'Connect' : 'No URL Set'}
                                    </button>
                                )}
                            </div>

                            <div className="bg-[#000000]/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={twitterIcon} alt="Twitter" className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="text-sm md:text-base text-[#F5F5DC]">Twitter</span>
                                </div>
                                {isEditing && editSection === 'contacts' ? (
                                    <input
                                        type="url"
                                        value={contactsData.twitter}
                                        onChange={(e) => updateContactsData({twitter: e.target.value})}
                                        placeholder="https://twitter.com/yourhandle"
                                        className="w-full text-xs text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 mb-2"
                                    />
                                ) : (
                                    contactsData.twitter && (
                                        <p className="text-xs text-[#F5F5DC]/70 mb-2 break-all">{contactsData.twitter}</p>
                                    )
                                )}
                                {!isEditing && (
                                    <button
                                        onClick={() => contactsData.twitter && window.open(contactsData.twitter, '_blank')}
                                        disabled={!contactsData.twitter}
                                        className={`w-full text-xs md:text-sm px-3 md:px-4 py-1 rounded transition duration-300 ${
                                            contactsData.twitter
                                                ? 'bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] text-[#F5F5DC] hover:bg-[#483C32]'
                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {contactsData.twitter ? 'Follow' : 'No URL Set'}
                                    </button>
                                )}
                            </div>

                            <div className="bg-[#000000]/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={videoIcon} alt="Video" className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="text-sm md:text-base text-[#F5F5DC]">Video Channel</span>
                                </div>
                                {isEditing && editSection === 'contacts' ? (
                                    <input
                                        type="url"
                                        value={contactsData.videoChannel}
                                        onChange={(e) => updateContactsData({videoChannel: e.target.value})}
                                        placeholder="https://youtube.com/channel/yourchannel"
                                        className="w-full text-xs text-[#F5F5DC] bg-[#212121] border border-[#483C32] rounded px-2 py-1 mb-2"
                                    />
                                ) : (
                                    contactsData.videoChannel && (
                                        <p className="text-xs text-[#F5F5DC]/70 mb-2 break-all">{contactsData.videoChannel}</p>
                                    )
                                )}
                                {!isEditing && (
                                    <button
                                        onClick={() => contactsData.videoChannel && window.open(contactsData.videoChannel, '_blank')}
                                        disabled={!contactsData.videoChannel}
                                        className={`w-full text-xs md:text-sm px-3 md:px-4 py-1 rounded transition duration-300 ${
                                            contactsData.videoChannel
                                                ? 'bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] text-[#F5F5DC] hover:bg-[#483C32]'
                                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {contactsData.videoChannel ? 'Subscribe' : 'No URL Set'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}