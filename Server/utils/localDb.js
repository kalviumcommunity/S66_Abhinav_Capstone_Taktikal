// Simple in-memory database fallback for development when MongoDB is unavailable
class LocalDB {
    constructor() {
        this.coaches = new Map();
        this.athletes = new Map();
        this.performance = new Map();
        this.idCounter = 1;
    }

    generateId() {
        return (this.idCounter++).toString();
    }

    // Coach operations
    createCoach(coachData) {
        const id = this.generateId();
        const coach = {
            _id: id,
            ...coachData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.coaches.set(id, coach);
        return coach;
    }

    findCoachByEmail(email) {
        for (let coach of this.coaches.values()) {
            if (coach.email === email) {
                return coach;
            }
        }
        return null;
    }

    findCoachById(id) {
        return this.coaches.get(id) || null;
    }

    updateCoach(id, updateData) {
        const coach = this.coaches.get(id);
        if (coach) {
            const updated = { ...coach, ...updateData, updatedAt: new Date() };
            this.coaches.set(id, updated);
            return updated;
        }
        return null;
    }

    // Athlete operations
    createAthlete(athleteData) {
        const id = this.generateId();
        const athlete = {
            _id: id,
            ...athleteData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.athletes.set(id, athlete);
        return athlete;
    }

    findAthletesByCoach(coachId) {
        const athletes = [];
        for (let athlete of this.athletes.values()) {
            if (athlete.coach === coachId && athlete.isActive !== false) {
                athletes.push(athlete);
            }
        }
        return athletes;
    }

    findAthleteById(id) {
        return this.athletes.get(id) || null;
    }

    updateAthlete(id, updateData) {
        const athlete = this.athletes.get(id);
        if (athlete) {
            const updated = { ...athlete, ...updateData, updatedAt: new Date() };
            this.athletes.set(id, updated);
            return updated;
        }
        return null;
    }

    deleteAthlete(id) {
        const athlete = this.athletes.get(id);
        if (athlete) {
            athlete.isActive = false;
            this.athletes.set(id, athlete);
            return true;
        }
        return false;
    }

    // Performance operations
    createPerformance(performanceData) {
        const id = this.generateId();
        const performance = {
            _id: id,
            ...performanceData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.performance.set(id, performance);
        return performance;
    }

    findPerformanceByCoach(coachId) {
        const performances = [];
        for (let perf of this.performance.values()) {
            if (perf.coach === coachId) {
                performances.push(perf);
            }
        }
        return performances.sort((a, b) => a.week.localeCompare(b.week));
    }

    // Clear all data
    clear() {
        this.coaches.clear();
        this.athletes.clear();
        this.performance.clear();
        this.idCounter = 1;
    }

    // Get stats
    getStats() {
        return {
            coaches: this.coaches.size,
            athletes: this.athletes.size,
            performance: this.performance.size
        };
    }
}

// Export singleton instance
module.exports = new LocalDB();
