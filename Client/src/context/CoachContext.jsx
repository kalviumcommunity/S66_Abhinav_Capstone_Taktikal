import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CoachContext = createContext();

export const useCoach = () => {
    const context = useContext(CoachContext);
    if (!context) {
        throw new Error('useCoach must be used within a CoachProvider');
    }
    return context;
};

export const CoachProvider = ({ children }) => {
    const { user, token, API_BASE_URL, isAuthenticated } = useAuth();

    // Track if this is a new user (first time setup)
    const [isNewUser, setIsNewUser] = useState(true);

    // Profile data state - initialize from authenticated user
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

    // Load profile data from authenticated user
    useEffect(() => {
        if (user && isAuthenticated()) {
            setProfileData({
                name: user.name || "",
                title: user.title || "",
                description: user.description || "",
                email: user.email || "",
                location: user.location || "",
                athletes: user.athletes || ""
            });

            setStatsData({
                teamsCoached: user.teamsCoached || "",
                currentAthletes: user.currentAthletes || "",
                championships: user.championships || "",
                yearsActive: user.yearsActive || ""
            });

            setContactsData({
                linkedin: user.socialLinks?.linkedin || "",
                twitter: user.socialLinks?.twitter || "",
                videoChannel: user.socialLinks?.videoChannel || ""
            });

            setIsNewUser(user.isNewUser || false);
            setProfileImage(user.profileImage || null);
        } else {
            // Clear data when not authenticated
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
            setIsNewUser(true);
            setProfileImage(null);
        }
    }, [user]); // Removed isAuthenticated from dependencies to avoid circular calls

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
    const updateProfileData = async (newData) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (response.ok) {
                setProfileData(prev => ({ ...prev, ...newData }));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    // Update stats data
    const updateStatsData = async (newData) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatsData(prev => ({ ...prev, ...newData }));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating stats:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    // Update contacts data
    const updateContactsData = async (newData) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const socialLinks = {
                linkedin: newData.linkedin || "",
                twitter: newData.twitter || "",
                videoChannel: newData.videoChannel || ""
            };

            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ socialLinks })
            });

            const data = await response.json();

            if (response.ok) {
                setContactsData(prev => ({ ...prev, ...newData }));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating contacts:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    // Complete profile setup
    const completeProfileSetup = async () => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/complete-setup`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setIsNewUser(false);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error completing profile setup:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
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
