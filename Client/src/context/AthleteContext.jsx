import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

const AthleteContext = createContext();

export const getSportPositions = (sport) => {
    switch(sport) {
        case 'Cricket': return ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"];
        case 'Volleyball': return ["Setter", "Libero", "Middle Blocker", "Outside Hitter", "Opposite Hitter"];
        case 'Basketball': return ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"];
        case 'Handball': return ["Left Wing", "Right Wing", "Pivot", "Left Back", "Right Back"];
        case 'Rugby': return ["Prop", "Hooker", "Lock", "Flanker", "Number 8", "Scrum-half", "Fly-half", "Centre", "Wing", "Fullback"];
        case 'Chess': return ["Grandmaster Candidate", "Blitz Specialist", "Endgame Strategist", "Opening Analyst", "Tactical Solver"];
        case 'Table Tennis': return ["Attacker", "Defensive Chopper", "Serve Specialist", "Doubles Partner"];
        case 'Badminton': return ["Singles Specialist", "Doubles Specialist", "Net Specialist", "Smash Specialist"];
        case 'Football':
        default:
            return ["Forward", "Midfielder", "Defender", "Goalkeeper"];
    }
};

export const useAthletes = () => {
    const context = useContext(AthleteContext);
    if (!context) {
        throw new Error('useAthletes must be used within an AthleteProvider');
    }
    return context;
};

export const AthleteProvider = ({ children }) => {
    const { user, token, API_BASE_URL, isAuthenticated } = useAuth();
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [performanceData, setPerformanceData] = useState([]);

    const sport = user?.sport || 'Football';
    const sportPositions = useMemo(() => getSportPositions(sport), [sport]);

    const getAuthHeaders = useCallback(() => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }, [token]);

    // Fetch athletes from API
    const fetchAthletes = useCallback(async () => {
        if (!isAuthenticated()) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/athletes/all`, {
                headers: getAuthHeaders(),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setAthletes(data.athletes || []);
            }
        } catch (error) {
            console.error('Error fetching athletes:', error);
        }
        setLoading(false);
    }, [API_BASE_URL, getAuthHeaders, isAuthenticated]);

    // Fetch performance data from API
    const fetchPerformanceData = useCallback(async () => {
        if (!isAuthenticated()) return;

        try {
            const response = await fetch(`${API_BASE_URL}/performance/data`, {
                headers: getAuthHeaders(),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setPerformanceData(data.performanceData || []);
            }
        } catch (error) {
            console.error('Error fetching performance data:', error);
        }
    }, [API_BASE_URL, getAuthHeaders, isAuthenticated]);

    useEffect(() => {
        if (user && isAuthenticated()) {
            fetchAthletes();
            fetchPerformanceData();
        } else {
            setAthletes([]);
            setPerformanceData([]);
        }
    }, [user, isAuthenticated, fetchAthletes, fetchPerformanceData]);

    const addAthlete = async (athleteData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/athletes/add`, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify(athleteData)
            });

            const data = await response.json();

            if (response.ok) {
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
        if (athletes.length <= 1) {
            return { success: false, message: "You must have at least one athlete in your team." };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setAthletes(prev => prev.filter(athlete => (athlete._id !== id && athlete.id !== id)));
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
        try {
            const response = await fetch(`${API_BASE_URL}/athletes/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();

            if (response.ok) {
                setAthletes(prev => prev.map(athlete =>
                    (athlete._id === id || athlete.id === id) ? { ...athlete, ...data.athlete } : athlete
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

    const getAthleteStats = useCallback(() => {
        const currentAthletes = athletes || [];
        const currentPositions = sportPositions || [];
        const total = currentAthletes.length;
        const byPosition = {};
        
        currentPositions.forEach(pos => {
            byPosition[pos] = currentAthletes.filter(a => a.position === pos).length;
        });
        
        return { total, byPosition };
    }, [athletes, sportPositions]);

    const updatePerformanceData = async (newData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/performance/data`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                credentials: 'include',
                body: JSON.stringify({ performanceData: newData })
            });

            const data = await response.json();

            if (response.ok) {
                setPerformanceData(data.performanceData || newData);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error updating performance data:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const value = useMemo(() => ({
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
        fetchAthletes,
        fetchPerformanceData,
        loading,
    }), [
        athletes, performanceData, loading,
        addAthlete, removeAthlete, updateAthlete, getAthletesByPosition,
        getAthleteStats, updatePerformanceData, fetchAthletes, fetchPerformanceData
    ]);

    return (
        <AthleteContext.Provider value={value}>
            {children}
        </AthleteContext.Provider>
    );
};
