import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
    const { user, setUser, token, API_BASE_URL, isAuthenticated } = useAuth();

    const [isNewUser, setIsNewUser] = useState(true);

    const [profileData, setProfileData] = useState({
        name: "",
        title: "",
        description: "",
        email: "",
        location: "",
        athletes: "",
        sport: ""
    });

    const [statsData, setStatsData] = useState({
        teamsCoached: "",
        currentAthletes: "",
        championships: "",
        yearsActive: ""
    });

    const [contactsData, setContactsData] = useState({
        linkedin: "",
        twitter: "",
        videoChannel: ""
    });

    const [profileImage, setProfileImage] = useState(null);
    const [events, setEvents] = useState([]);
    const [activities, setActivities] = useState([]);

    // Load profile data from authenticated user object
    useEffect(() => {
        if (user && isAuthenticated()) {
            setProfileData({
                name: user.name || "",
                title: user.title || "",
                description: user.description || "",
                email: user.email || "",
                location: user.location || "",
                athletes: user.athletes || "",
                sport: user.sport || "Football"
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

            setIsNewUser(user.isNewUser !== undefined ? user.isNewUser : false);
            setProfileImage(user.profileImage || null);
            setEvents(user.events || []);
            setActivities(user.activities || []);
        } else {
            setProfileData({ name: "", title: "", description: "", email: "", location: "", athletes: "", sport: "" });
            setStatsData({ teamsCoached: "", currentAthletes: "", championships: "", yearsActive: "" });
            setContactsData({ linkedin: "", twitter: "", videoChannel: "" });
            setIsNewUser(true);
            setProfileImage(null);
            setEvents([]);
            setActivities([]);
        }
    }, [user, isAuthenticated]);

    const isProfileComplete = useCallback(() => {
        const requiredFields = [
            profileData.name,
            profileData.title,
            profileData.email,
            profileData.location
        ];

        const allFieldsFilled = requiredFields.every(field => field && field.trim() !== '');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = profileData.email && emailRegex.test(profileData.email.trim());

        return allFieldsFilled && isEmailValid;
    }, [profileData]);

    const updateProfileData = useCallback((newData) => {
        setProfileData(prev => ({ ...prev, ...newData }));
        return { success: true };
    }, []);

    const updateStatsData = useCallback((newData) => {
        setStatsData(prev => ({ ...prev, ...newData }));
        return { success: true };
    }, []);

    const updateContactsData = useCallback((newData) => {
        setContactsData(prev => ({ ...prev, ...newData }));
        return { success: true };
    }, []);

    const getAuthHeaders = useCallback(() => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }, [token]);

    const saveProfileToBackend = async () => {
        if (!isAuthenticated()) {
            return { success: false, message: 'Not authenticated' };
        }

        try {
            const dataToSave = {
                ...profileData,
                ...statsData,
                profileImage: profileImage,
                events: events,
                activities: activities,
                socialLinks: {
                    linkedin: contactsData.linkedin || "",
                    twitter: contactsData.twitter || "",
                    videoChannel: contactsData.videoChannel || ""
                }
            };

            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify(dataToSave)
            });

            const data = await response.json();

            if (response.ok) {
                if (data.coach && setUser) {
                    setUser(data.coach);
                }
                return { success: true, coach: data.coach };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const completeProfileSetup = async () => {
        if (!isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/complete-setup`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setIsNewUser(false);
                if (setUser) {
                    setUser(prev => prev ? ({ ...prev, isNewUser: false }) : prev);
                }
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error completing profile setup:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const value = useMemo(() => ({
        isNewUser,
        profileData,
        statsData,
        contactsData,
        profileImage,
        events,
        activities,
        setProfileImage,
        setEvents,
        setActivities,
        updateProfileData,
        updateStatsData,
        updateContactsData,
        isProfileComplete,
        completeProfileSetup,
        saveProfileToBackend,
        setIsNewUser
    }), [
        isNewUser, profileData, statsData, contactsData, profileImage,
        events, activities, updateProfileData, updateStatsData,
        updateContactsData, isProfileComplete, completeProfileSetup,
        saveProfileToBackend
    ]);

    return (
        <CoachContext.Provider value={value}>
            {children}
        </CoachContext.Provider>
    );
};
