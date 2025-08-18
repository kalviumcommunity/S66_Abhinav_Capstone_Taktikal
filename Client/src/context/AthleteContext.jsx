import React, { createContext, useContext, useState } from 'react';

const AthleteContext = createContext();

export const useAthletes = () => {
    const context = useContext(AthleteContext);
    if (!context) {
        throw new Error('useAthletes must be used within an AthleteProvider');
    }
    return context;
};

export const AthleteProvider = ({ children }) => {
    // Initial athletes data - start with one example athlete
    const [athletes, setAthletes] = useState([
        { id: 1, name: "Sample Player", position: "Forward", speed: 7, strength: 7, stamina: 7 }
    ]);

    // Performance data for the graph
    const [performanceData, setPerformanceData] = useState([
        { week: "Week 1", speed: 5, strength: 6, endurance: 4, technique: 6 },
        { week: "Week 2", speed: 6, strength: 6.2, endurance: 5, technique: 6.1 },
        { week: "Week 3", speed: 6.5, strength: 7, endurance: 5.8, technique: 6.3 },
        { week: "Week 4", speed: 7, strength: 7.1, endurance: 6.2, technique: 6.5 },
        { week: "Week 5", speed: 7.4, strength: 8, endurance: 6.5, technique: 6.8 },
        { week: "Week 6", speed: 8, strength: 8, endurance: 7, technique: 7 }
    ]);

    const addAthlete = (athlete) => {
        const newAthlete = {
            id: Date.now(),
            ...athlete
        };
        setAthletes(prev => [...prev, newAthlete]);
        return newAthlete;
    };

    const removeAthlete = (id) => {
        // Prevent deleting the last athlete
        if (athletes.length <= 1) {
            alert("You must have at least one athlete in your team.");
            return;
        }
        setAthletes(prev => prev.filter(athlete => athlete.id !== id));
    };

    const updateAthlete = (id, updatedData) => {
        setAthletes(prev => prev.map(athlete => 
            athlete.id === id ? { ...athlete, ...updatedData } : athlete
        ));
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

    const updatePerformanceData = (newData) => {
        setPerformanceData(newData);
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
        updatePerformanceData
    };

    return (
        <AthleteContext.Provider value={value}>
            {children}
        </AthleteContext.Provider>
    );
};
