const SPORT_POSITIONS = {
    Football: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'],
    Cricket: ['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'],
    Volleyball: ['Setter', 'Libero', 'Middle Blocker', 'Outside Hitter', 'Opposite Hitter'],
    Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    Handball: ['Goalkeeper', 'Left Wing', 'Right Wing', 'Pivot', 'Left Back', 'Right Back'],
    Rugby: ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback'],
    Chess: ['Grandmaster Candidate', 'Blitz Specialist', 'Endgame Strategist', 'Opening Analyst', 'Tactical Solver'],
    'Table Tennis': ['Attacker', 'Defensive Chopper', 'Serve Specialist', 'Doubles Partner'],
    Badminton: ['Singles Specialist', 'Doubles Specialist', 'Net Specialist', 'Smash Specialist'],
};

const ALL_POSITIONS = [...new Set(Object.values(SPORT_POSITIONS).flat())];

const getSportPositions = (sport) => SPORT_POSITIONS[sport] || SPORT_POSITIONS.Football;

const isValidPosition = (position, sport = null) => {
    if (!position) return false;
    if (sport && SPORT_POSITIONS[sport]) {
        return SPORT_POSITIONS[sport].includes(position);
    }
    return ALL_POSITIONS.includes(position);
};

module.exports = {
    SPORT_POSITIONS,
    ALL_POSITIONS,
    getSportPositions,
    isValidPosition,
};
