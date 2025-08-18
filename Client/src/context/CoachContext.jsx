import React, { createContext, useContext, useState } from 'react';

const CoachContext = createContext();

export const useCoach = () => {
    const context = useContext(CoachContext);
    if (!context) {
        throw new Error('useCoach must be used within a CoachProvider');
    }
    return context;
};

export const CoachProvider = ({ children }) => {
    // Track if this is a new user (first time setup)
    const [isNewUser, setIsNewUser] = useState(true);
    
    // Profile data state - start with empty values for new users
    const [profileData, setProfileData] = useState({
        name: "",
        title: "",
        description: "",
        email: "",
        location: "",
        athletes: ""
    });

    // Stats data state - start with empty values
    const [statsData, setStatsData] = useState({
        teamsCoached: "",
        currentAthletes: "",
        championships: "",
        yearsActive: ""
    });

    // Contacts data state - start with empty values
    const [contactsData, setContactsData] = useState({
        linkedin: "",
        twitter: "",
        videoChannel: ""
    });

    const [profileImage, setProfileImage] = useState(null);

    // Check if profile is complete (only required fields)
    const isProfileComplete = () => {
        const requiredFields = [
            profileData.name,
            profileData.title,
            profileData.email,
            profileData.location
        ];

        // Check if all required fields are filled and not just whitespace
        const allFieldsFilled = requiredFields.every(field => field && field.trim() !== '');

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = profileData.email && emailRegex.test(profileData.email.trim());

        return allFieldsFilled && isEmailValid;
    };

    // Check if basic profile is complete (for navigation)
    const isBasicProfileComplete = () => {
        return isProfileComplete();
    };

    // Update profile data
    const updateProfileData = (newData) => {
        setProfileData(prev => ({ ...prev, ...newData }));
    };

    // Update stats data
    const updateStatsData = (newData) => {
        setStatsData(prev => ({ ...prev, ...newData }));
    };

    // Update contacts data
    const updateContactsData = (newData) => {
        setContactsData(prev => ({ ...prev, ...newData }));
    };

    // Complete profile setup
    const completeProfileSetup = () => {
        setIsNewUser(false);
    };

    // Reset to new user state (for testing or logout)
    const resetToNewUser = () => {
        setIsNewUser(true);
        setProfileData({
            name: "",
            title: "",
            description: "",
            email: "",
            location: "",
            athletes: ""
        });
        setStatsData({
            teamsCoached: "",
            currentAthletes: "",
            championships: "",
            yearsActive: ""
        });
        setContactsData({
            linkedin: "",
            twitter: "",
            videoChannel: ""
        });
        setProfileImage(null);
    };

    const value = {
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
        isBasicProfileComplete,
        completeProfileSetup,
        resetToNewUser,
        setIsNewUser
    };

    return (
        <CoachContext.Provider value={value}>
            {children}
        </CoachContext.Provider>
    );
};
