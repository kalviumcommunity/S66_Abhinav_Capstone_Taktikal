import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AthleteContext = createContext();

export const useAthletes = () => {
    const context = useContext(AthleteContext);
    if (!context) {
        throw new Error('useAthletes must be used within an AthleteProvider');
    }
    return context;
};

export const AthleteProvider = ({ children }) => {
    const { token, API_BASE_URL, isAuthenticated } = useAuth();
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Performance data for the graph
    const [performanceData, setPerformanceData] = useState([]);

    // Fetch athletes from API
    const fetchAthletes = async () => {
        if (!isAuthenticated() || !token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/athletes/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAthletes(data.athletes || []);
            } else {
                console.error('Failed to fetch athletes');
            }
        } catch (error) {
            console.error('Error fetching athletes:', error);
        }
        setLoading(false);
    };

    // Fetch performance data from API
    const fetchPerformanceData = async () => {
        if (!isAuthenticated() || !token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/performance/data`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPerformanceData(data.performanceData || []);
            } else {
                console.error('Failed to fetch performance data');
                // Set default data if none exists
                setPerformanceData([
                    { week: "Week 1", speed: 5, strength: 6, endurance: 4, technique: 6 },
                    { week: "Week 2", speed: 6, strength: 6.2, endurance: 5, technique: 6.1 },
                    { week: "Week 3", speed: 6.5, strength: 7, endurance: 5.8, technique: 6.3 },
                    { week: "Week 4", speed: 7, strength: 7.1, endurance: 6.2, technique: 6.5 },
                    { week: "Week 5", speed: 7.4, strength: 8, endurance: 6.5, technique: 6.8 },
                    { week: "Week 6", speed: 8, strength: 8, endurance: 7, technique: 7 }
                ]);
            }
        } catch (error) {
            console.error('Error fetching performance data:', error);
        }
    };

    // Load athletes and performance data when component mounts or token changes
    useEffect(() => {
        if (token && isAuthenticated()) {
            fetchAthletes();
            fetchPerformanceData();
        } else {
            // Clear data when not authenticated
            setAthletes([]);
            setPerformanceData([]);
        }
    }, [token]); // Removed isAuthenticated from dependencies to avoid circular calls

    const addAthlete = async (athlete) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/athletes/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(athlete)
            });

            const data = await response.json();

            if (response.ok) {
                // Add the new athlete to local state
                setAthletes(prev => [...prev, data.athlete]);
                return { success: true, athlete: data.athlete };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error adding athlete:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const removeAthlete = async (id) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        // Prevent deleting the last athlete
        if (athletes.length <= 1) {
            alert("You must have at least one athlete in your team.");
            return { success: false, message: "Cannot delete the last athlete" };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Remove athlete from local state
                setAthletes(prev => prev.filter(athlete => athlete._id !== id));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error removing athlete:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const updateAthlete = async (id, updatedData) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();

            if (response.ok) {
                // Update athlete in local state
                setAthletes(prev => prev.map(athlete =>
                    athlete._id === id ? { ...athlete, ...data.athlete } : athlete
                ));
                return { success: true, athlete: data.athlete };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating athlete:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const getAthletesByPosition = (position) => {
        if (position === 'All Positions') return athletes;
        return athletes.filter(athlete => athlete.position === position);
    };

    const getAthleteStats = () => {
        const total = athletes.length;
        const byPosition = {
            Forward: athletes.filter(a => a.position === 'Forward').length,
            Midfielder: athletes.filter(a => a.position === 'Midfielder').length,
            Defender: athletes.filter(a => a.position === 'Defender').length,
            Goalkeeper: athletes.filter(a => a.position === 'Goalkeeper').length
        };
        
        return { total, byPosition };
    };

    const updatePerformanceData = async (newData) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/performance/data`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ performanceData: newData })
            });

            const data = await response.json();

            if (response.ok) {
                setPerformanceData(newData);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating performance data:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    // Add a single performance record
    const addPerformanceRecord = async (recordData) => {
        if (!isAuthenticated() || !token) {
            throw new Error('Not authenticated');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/performance/record`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(recordData)
            });

            const data = await response.json();

            if (response.ok) {
                // Add the new record to local state
                setPerformanceData(prev => [...prev, data.performance]);
                return { success: true, performance: data.performance };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error adding performance record:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const value = {
        athletes,
        setAthletes,
        performanceData,
        setPerformanceData,
        addAthlete,
        removeAthlete,
        updateAthlete,
        getAthletesByPosition,
        getAthleteStats,
        updatePerformanceData,
        addPerformanceRecord,
        fetchAthletes,
        fetchPerformanceData,
        loading
    };

    return (
        <AthleteContext.Provider value={value}>
            {children}
        </AthleteContext.Provider>
    );
};
