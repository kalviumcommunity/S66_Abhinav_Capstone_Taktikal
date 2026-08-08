/** Canonical sports + sport-specific coaching content for the client. */

export const SPORTS = [
    'Football',
    'Cricket',
    'Volleyball',
    'Handball',
    'Rugby',
    'Basketball',
    'Chess',
    'Table Tennis',
    'Badminton',
];

export const getSportPositions = (sport) => {
    switch (sport) {
        case 'Cricket':
            return ['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'];
        case 'Volleyball':
            return ['Setter', 'Libero', 'Middle Blocker', 'Outside Hitter', 'Opposite Hitter'];
        case 'Basketball':
            return ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'];
        case 'Handball':
            return ['Goalkeeper', 'Left Wing', 'Right Wing', 'Pivot', 'Left Back', 'Right Back'];
        case 'Rugby':
            return ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback'];
        case 'Chess':
            return ['Grandmaster Candidate', 'Blitz Specialist', 'Endgame Strategist', 'Opening Analyst', 'Tactical Solver'];
        case 'Table Tennis':
            return ['Attacker', 'Defensive Chopper', 'Serve Specialist', 'Doubles Partner'];
        case 'Badminton':
            return ['Singles Specialist', 'Doubles Specialist', 'Net Specialist', 'Smash Specialist'];
        case 'Football':
        default:
            return ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
    }
};

export const DEFAULT_SPORT_ACTIVITIES = {
    Football: [
        { id: 1, text: 'High-Pressing Rondo 5v2 (20 mins)', checked: true, category: 'Tactical' },
        { id: 2, text: 'Corner Kick Far-Post Outswingers', checked: true, category: 'Set Pieces' },
        { id: 3, text: 'Counter-Attack Transition Sprint (15 mins)', checked: false, category: 'Conditioning' },
        { id: 4, text: 'Post-Session Hydrotherapy & Foam Rolling', checked: false, category: 'Recovery' },
    ],
    Cricket: [
        { id: 5, text: 'Net Batting against Off-Spin & Pace', checked: true, category: 'Tactical' },
        { id: 6, text: 'Slip Catching & High-Flyer Drills', checked: false, category: 'Fielding' },
        { id: 7, text: 'Death-Overs Yorker Scenarios', checked: true, category: 'Bowling' },
        { id: 8, text: 'Match Simulation & Target Chasing', checked: false, category: 'Strategy' },
    ],
    Rugby: [
        { id: 9, text: 'Scrum Engagement & Ruck Clearing', checked: true, category: 'Physical' },
        { id: 10, text: 'Backline Passing & Blindside Overloads', checked: true, category: 'Tactical' },
        { id: 11, text: 'Lineout Catch & Drive Drills', checked: false, category: 'Set Pieces' },
        { id: 12, text: 'Tackle Breakdown & Jackal Practice', checked: false, category: 'Defense' },
    ],
    Basketball: [
        { id: 13, text: 'Pick & Roll Defensive Coverage', checked: true, category: 'Tactical' },
        { id: 14, text: '3-Point Spot Shooting & Transition Threes', checked: false, category: 'Offense' },
        { id: 15, text: 'Full-Court Press Breakout Scenarios', checked: true, category: 'Conditioning' },
        { id: 16, text: 'Free-Throw Routine Under Fatigue', checked: false, category: 'Skill' },
    ],
    Volleyball: [
        { id: 17, text: 'Overhead Setting & Middle-Block Spikes', checked: true, category: 'Attack' },
        { id: 18, text: '5-1 Rotation Serve-Receive Drills', checked: false, category: 'Tactical' },
        { id: 19, text: 'Dig & Transition Counter-Attacks', checked: false, category: 'Defense' },
        { id: 20, text: 'Serve Placement Targeting Zones', checked: true, category: 'Skill' },
    ],
    Handball: [
        { id: 21, text: 'Fast-Break Wing Finishing Drills', checked: true, category: 'Attack' },
        { id: 22, text: '6-0 Defensive Slide & Block Timing', checked: true, category: 'Defense' },
        { id: 23, text: 'Pivot Screening & Circle Entry', checked: false, category: 'Tactical' },
        { id: 24, text: 'Goalkeeper Reaction & Angle Closing', checked: false, category: 'Skill' },
    ],
    Chess: [
        { id: 25, text: 'Opening Repertoire Review (30 mins)', checked: true, category: 'Theory' },
        { id: 26, text: 'Tactics Puzzle Sprint (15 puzzles)', checked: true, category: 'Calculation' },
        { id: 27, text: 'Endgame Technique: Rook + Pawn', checked: false, category: 'Endgame' },
        { id: 28, text: 'Annotated Game Review vs Engine', checked: false, category: 'Analysis' },
    ],
    'Table Tennis': [
        { id: 29, text: 'Multiball Forehand Loop Consistency', checked: true, category: 'Attack' },
        { id: 30, text: 'Short Serve + 3rd Ball Attack', checked: true, category: 'Serve' },
        { id: 31, text: 'Chop Defense to Counter-Loop', checked: false, category: 'Defense' },
        { id: 32, text: 'Footwork Shadow Sequences', checked: false, category: 'Conditioning' },
    ],
    Badminton: [
        { id: 33, text: 'Clear–Drop–Net Pattern Drills', checked: true, category: 'Tactical' },
        { id: 34, text: 'Smash Defense & Lift Recovery', checked: true, category: 'Defense' },
        { id: 35, text: 'Doubles Rotation & Front-Court Intercept', checked: false, category: 'Doubles' },
        { id: 36, text: 'Multi-Shuttle Footwork Circuits', checked: false, category: 'Conditioning' },
    ],
};

export const SPORT_PRESET_TACTICS = {
    Football: [
        { id: 'f1', name: 'High-Pressing 4-3-3', phase: 'Offensive Press', focus: 'Possession & Wing Overload', intensity: 'High' },
        { id: 'f2', name: 'Low-Block Counter 4-4-2', phase: 'Defensive Shape', focus: 'Compactness & Quick Sprints', intensity: 'Medium' },
    ],
    Cricket: [
        { id: 'c1', name: 'Aggressive Powerplay Field', phase: 'First 6 Overs', focus: 'Slip Catcher & Full Length', intensity: 'High' },
        { id: 'c2', name: 'Death Overs Wide-Yorker Plan', phase: 'Overs 16-20', focus: 'Boundary Protection', intensity: 'High' },
    ],
    Rugby: [
        { id: 'r1', name: 'Standard 15s Phase Play', phase: 'Attacking 22m', focus: 'Heavy Ruck & Forward Carry', intensity: 'High' },
        { id: 'r2', name: 'Blindside Wing Overload', phase: 'Set Piece Lineout', focus: 'Fast Backline Pass', intensity: 'Medium' },
    ],
    Basketball: [
        { id: 'b1', name: '2-3 Zone Trap Defense', phase: 'Defensive Rotation', focus: 'Wing Traps & Paint Lock', intensity: 'High' },
        { id: 'b2', name: 'Pick & Pop Motion Offense', phase: 'Half-Court Sets', focus: 'Spacer Threes', intensity: 'Medium' },
    ],
    Volleyball: [
        { id: 'v1', name: '5-1 Rotation Offense', phase: 'Serve Receive', focus: 'Setter Acceleration', intensity: 'High' },
        { id: 'v2', name: 'Perimeter Block Read Defense', phase: 'Opposition Attack', focus: 'Antenna Coverage', intensity: 'Medium' },
    ],
    Handball: [
        { id: 'h1', name: 'Fast-Break 2nd Wave Attack', phase: 'Transition', focus: 'Wing Timing & GK Outlet', intensity: 'High' },
        { id: 'h2', name: '5-1 Defensive Press', phase: 'Half-Court Defense', focus: 'Lane Denial & Steal Triggers', intensity: 'High' },
    ],
    Chess: [
        { id: 'ch1', name: 'Catalan / Solid Opening Plan', phase: 'Opening', focus: 'Long-term Structure & Quiet Pressure', intensity: 'Medium' },
        { id: 'ch2', name: 'Initiative Sacrifice Attack', phase: 'Middlegame', focus: 'King Hunt & Piece Activity', intensity: 'High' },
    ],
    'Table Tennis': [
        { id: 'tt1', name: '3rd-Ball Attack System', phase: 'Serve Receive', focus: 'Short Pendulum Serve → Forehand Loop', intensity: 'High' },
        { id: 'tt2', name: 'Chop-to-Counter Transition', phase: 'Long Rallies', focus: 'Depth Control then Sudden Loop', intensity: 'Medium' },
    ],
    Badminton: [
        { id: 'bd1', name: 'Singles Control Pattern', phase: 'Rally Construction', focus: 'Clear Deep → Drop → Net Kill', intensity: 'High' },
        { id: 'bd2', name: 'Doubles Front-Court Pressure', phase: 'Attack Formation', focus: 'Intercept & Smash Rotation', intensity: 'High' },
    ],
};

export const SPORT_EXECUTION_DIRECTIVES = {
    Football: [
        { label: 'Pressing / Tempo Control', value: 'Aggressive Front Press' },
        { label: 'Transition Directives', value: 'Quick Vertical Pass' },
        { label: 'Defensive Compactness', value: 'Mid-Block Line' },
        { label: 'Set-Piece Focus', value: 'Far-Post Target Scheme' },
    ],
    Cricket: [
        { label: 'Field Placement', value: 'Attacking Powerplay Ring' },
        { label: 'Bowling Plan', value: 'Full Length + Wide Yorker Mix' },
        { label: 'Batting Intent', value: 'Rotate Strike, Punish Width' },
        { label: 'Game Situation', value: 'Death-Overs Boundary Denial' },
    ],
    Rugby: [
        { label: 'Breakdown Focus', value: 'Clear-Out + Fast Recycle' },
        { label: 'Attack Shape', value: 'Pod Carry then Wide Sweep' },
        { label: 'Set Piece', value: 'Lineout Drive Option' },
        { label: 'Defensive Line', value: 'Upright Tackle + Fold' },
    ],
    Basketball: [
        { label: 'Offense Trigger', value: 'Pick & Roll / Pop Reads' },
        { label: 'Spacing Rule', value: '45° Corner + Slot Spacers' },
        { label: 'Defensive Cover', value: 'Drop then Recover to 3' },
        { label: 'Transition', value: 'Push Pace, Early Trailer Three' },
    ],
    Volleyball: [
        { label: 'Serve Receive', value: '5-1 Platform Stability' },
        { label: 'Attack Call', value: 'Quick Middle + Pipe Option' },
        { label: 'Block Scheme', value: 'Read Outside Hitter Line' },
        { label: 'Transition', value: 'Dig-Set-Hit within 3 Touches' },
    ],
    Handball: [
        { label: 'Attack Structure', value: 'Wing Overload + Pivot Screen' },
        { label: 'Defense Shape', value: '6-0 Sliding Compact Block' },
        { label: 'Transition', value: 'GK Long Outlet Fast Break' },
        { label: 'Set Play', value: 'Circle Entry after Screen' },
    ],
    Chess: [
        { label: 'Opening Goal', value: 'Healthy Structure + Piece Activity' },
        { label: 'Middlegame Plan', value: 'Improve Worst Piece First' },
        { label: 'Tactical Alert', value: 'Check Forced Captures Daily' },
        { label: 'Endgame Priority', value: 'Activate King + Passed Pawn' },
    ],
    'Table Tennis': [
        { label: 'Serve Intent', value: 'Short Side-Spin to Forehand' },
        { label: '3rd Ball', value: 'Aggressive Forehand Loop' },
        { label: 'Rally Control', value: 'Vary Placement Wide Angles' },
        { label: 'Defense Mode', value: 'Chop Deep then Counter' },
    ],
    Badminton: [
        { label: 'Rally Shape', value: 'High Clear → Tight Drop' },
        { label: 'Attack Focus', value: 'Steep Smash to Body' },
        { label: 'Defense', value: 'Flat Lift then Regain Base' },
        { label: 'Doubles Role', value: 'Front Intercept / Rear Cover' },
    ],
};

export const getSportDirectives = (sport) =>
    SPORT_EXECUTION_DIRECTIVES[sport] || SPORT_EXECUTION_DIRECTIVES.Football;

export const getSportActivities = (sport) =>
    DEFAULT_SPORT_ACTIVITIES[sport] || DEFAULT_SPORT_ACTIVITIES.Football;

export const getSportPresetTactics = (sport) =>
    SPORT_PRESET_TACTICS[sport] || SPORT_PRESET_TACTICS.Football;

/** Sport-aware AI Q&A content. Recovery/nutrition stay shared; tactics/training vary. */
export const buildSportKnowledgeBase = (sport) => {
    const shared = [
        {
            keywords: ['recovery', 'rest', 'exercise', 'cool down', 'sore'],
            question: 'Recommend recovery exercises',
            answer: `🏆 Coach AI Recovery Protocol (${sport}):

1. Active Recovery (10 mins)
   • Light movement at 40-50% effort to flush fatigue without adding load.

2. Mobility (10 mins)
   • Sport-relevant mobility for hips, shoulders, and spine (45s holds).

3. Soft Tissue (10 mins)
   • Foam roll key working muscles from today's session (60s each).

4. Refuel
   • 500ml fluids + ~25g protein within 45 mins post-session.`,
        },
        {
            keywords: ['nutrition', 'diet', 'food', 'meal', 'carbs', 'protein', 'water'],
            question: 'Nutrition tips',
            answer: `🥗 High-Performance Nutrition Guide (${sport}):

• 3–4 hrs before: complex carbs + lean protein + water.
• 60 mins before: easy carbs (banana / small energy snack).
• During long sessions: electrolytes every 15–20 mins.
• After: ~3:1 carbs-to-protein recovery snack within 45 mins.

Adjust portions to session length and ${sport.toLowerCase()} match demands.`,
        },
        {
            keywords: ['strength', 'weights', 'gym', 'power'],
            question: 'How to build athletic strength?',
            answer: `🏋️ Athletic Strength Guidelines for ${sport}:

1. Compound lifts 2–3x/week (squat/hinge/push/pull patterns).
2. Explosive work: medicine-ball throws or jumps suited to your sport.
3. Injury prevention: eccentric control and single-leg stability.

Keep gym work complementary — freshness for ${sport.toLowerCase()} skill sessions comes first.`,
        },
    ];

    const bySport = {
        Football: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Football Session Plan:

• Warm-up & mobility (15)
• Rondo 5v2 + circulation (20)
• Transition: defense → attack (30)
• Small-sided 7v7 pressing game (20)
• Set pieces (15)
• Cool-down & hydrate (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense'],
                question: 'Suggest tactics',
                answer: `♟️ Football Tactical Ideas:

1. High press in a 4-3-3 — trap buildup wide, trigger on full-back receive.
2. Invert a winger to create midfield 3v2 in transition.
3. Keep a 2+1 rest defense to stop counters.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Football Performance Snapshot:

• Track high-speed running, pressing success, and pass completion.
• Review defensive compactness and rest-defense moments.
• Tip: protect midfielders' recovery before the next match.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Football Speed Work:

1. Short accelerations (10–20m) with full recovery.
2. Resisted sprints lightly (sled / partner).
3. Cue: high knee drive, strong arm action, short ground contact.`,
            },
        ],
        Cricket: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Cricket Session Plan:

• Dynamic warm-up & throw-downs (15)
• Net batting: pace + spin (40)
• Bowling scenarios: powerplay & death (30)
• Fielding: slips + boundary saves (20)
• Cool-down & stretch (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense', 'field'],
                question: 'Suggest tactics',
                answer: `♟️ Cricket Strategy Ideas:

1. Powerplay: attacking ring + full length.
2. Middle overs: stump-to-stump + cutters; protect midwicket.
3. Death: wide yorker / slower-ball mix; deep square + long-on.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Cricket Performance Snapshot:

• Review strike rate vs required rate and bowling economy by phase.
• Note catching % and misfields under pressure.
• Tip: prioritise death-overs execution in the next nets.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Cricket Running Speed:

1. Singles/twos acceleration drills between wickets.
2. Boundary-save sprint + throw sequences.
3. Keep bowling/batting skill quality — speed supports fielding & running.`,
            },
        ],
        Volleyball: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Volleyball Session Plan:

• Warm-up & pepper (15)
• Serve-receive platforms (25)
• Middle quick + pipe attack (30)
• Block-dig transition (20)
• Serving targets (15)
• Cool-down (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense', 'rotation'],
                question: 'Suggest tactics',
                answer: `♟️ Volleyball Tactical Ideas:

1. Stable 5-1 serve receive with clear setter calls.
2. Mix quick middle with high outside to stretch the block.
3. On defense, read the setter’s shoulders and commit outside first.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Volleyball Performance Snapshot:

• Track side-out %, kill %, and serve errors.
• Review first-touch quality under serve pressure.
• Tip: reduce unforced attack errors before adding speed.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity', 'jump'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Volleyball Approach & Quickness:

1. Approach-footwork repeats to the antenna.
2. Lateral shuffle + plant for block jumps.
3. Plyometrics 1–2x/week with full landing quality.`,
            },
        ],
        Handball: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Handball Session Plan:

• Warm-up & ball handling (15)
• Fast-break finishing (20)
• 6-0 defensive slides (25)
• Pivot screens & circle shots (25)
• GK reaction work (15)
• Cool-down (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense'],
                question: 'Suggest tactics',
                answer: `♟️ Handball Tactical Ideas:

1. Outlet long from GK into wing for 1st-wave break.
2. In half-court, use pivot screens to free back-court shooters.
3. Defend 6-0 compact; step out only on clear shooting threats.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Handball Performance Snapshot:

• Review turnovers on fast break and 9m shot efficiency.
• Track GK save % and wing conversion.
• Tip: cut technical faults before increasing tempo.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Handball Speed Work:

1. Court-length break sprints with pass finish.
2. Lateral slides into recovery sprint.
3. Short accelerations with ball — decision + speed together.`,
            },
        ],
        Rugby: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Rugby Session Plan:

• Warm-up & contact prep (15)
• Scrum / lineout units (25)
• Phase attack pods (25)
• Tackle technique & fold (20)
• Conditioned game (20)
• Cool-down (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense'],
                question: 'Suggest tactics',
                answer: `♟️ Rugby Tactical Ideas:

1. Attack 22m with pod carries then wide sweep.
2. Lineout drive as primary; backs peel on second option.
3. Defense: line speed with disciplined fold after tackle.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Rugby Performance Snapshot:

• Review ruck speed, tackle completion, and lineout %.
• Note penalty sources at breakdown.
• Tip: win the collision without giving away soft penalties.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Rugby Speed Work:

1. Short 10–30m accelerations in boots.
2. Change-of-direction into tackle bags.
3. Maintain contact freshness — quality over volume.`,
            },
        ],
        Basketball: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Basketball Session Plan:

• Dynamic warm-up (10)
• Form shooting + free throws (20)
• Pick & roll reads (25)
• Defensive closeouts & help (20)
• Transition 3s / conditioned scrimmage (20)
• Cool-down (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense'],
                question: 'Suggest tactics',
                answer: `♟️ Basketball Tactical Ideas:

1. Offense: pick & roll with pop spacer threes.
2. Defense: drop coverage then recover to the 3-point line.
3. Push early offense; trailer three as second option.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Basketball Performance Snapshot:

• Track eFG%, turnovers, and defensive rebound rate.
• Review paint protection vs perimeter closeouts.
• Tip: cut live-ball turnovers before adding pace.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Basketball Quickness:

1. Lane-line closeout sprints.
2. First-step acceleration into layup finishes.
3. Lateral shuffle → open-step recover drills.`,
            },
        ],
        Chess: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Chess Training Plan:

• Opening review of your main lines (30)
• Tactics puzzles (mixed motifs) (30)
• Slow game or training match (45)
• Annotate critical moments (20)
• Endgame technique focus (20)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense', 'opening'],
                question: 'Suggest tactics',
                answer: `♟️ Chess Planning Ideas:

1. Choose one solid opening and learn typical middlegame plans.
2. Before every move: checks, captures, threats.
3. In endgames, activate the king and create a passed pawn.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Chess Performance Snapshot:

• Review blunders vs inaccuracies in time pressure.
• Note opening exits where you felt lost for a plan.
• Tip: train the motifs that caused your last losses.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity', 'blitz', 'calculation'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Calculation Speed (Chess):

1. Daily short tactics with a clock.
2. Practice candidate-move listing before calculating.
3. Blitz is useful for pattern recognition — review mistakes after.`,
            },
        ],
        'Table Tennis': [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Table Tennis Session Plan:

• Footwork warm-up (10)
• Multiball forehand consistency (20)
• Serve + 3rd-ball attack (25)
• Chop / block to counter-loop (20)
• Match play points (20)
• Cool-down (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense', 'serve'],
                question: 'Suggest tactics',
                answer: `♟️ Table Tennis Tactical Ideas:

1. Short side-spin serve → aggressive 3rd-ball forehand.
2. Vary depth and wide angles once the rally lengthens.
3. If pushed defensive, chop deep then sudden counter-loop.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Table Tennis Performance Snapshot:

• Track 3rd-ball success rate and unforced errors.
• Review receive quality against long serves.
• Tip: win more short-serve battles before changing rubber setup.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity', 'footwork'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Table Tennis Footwork Speed:

1. Shadow side-to-side and in-and-out patterns.
2. Multiball with recovery to ready position every ball.
3. Keep strokes compact — speed comes from legs + timing.`,
            },
        ],
        Badminton: [
            {
                keywords: ['tomorrow', 'plan', 'schedule', 'agenda', 'training plan'],
                question: "Plan tomorrow's training",
                answer: `📋 Badminton Session Plan:

• Dynamic warm-up & shadow (15)
• Clear–drop–net patterns (25)
• Smash defense & lifts (20)
• Doubles rotation / front intercept (20)
• Multi-shuttle conditioning (15)
• Cool-down (10)`,
            },
            {
                keywords: ['tactics', 'tactic', 'formation', 'strategy', 'press', 'defense'],
                question: 'Suggest tactics',
                answer: `♟️ Badminton Tactical Ideas:

1. Singles: deep clear → tight drop → net kill pattern.
2. Attack with steep smash to the body, then follow to net.
3. Doubles: front player intercepts; rear covers lifts and smashes.`,
            },
            {
                keywords: ['analyze', 'performance', 'stats', 'recent', 'data'],
                question: 'Analyze recent performance',
                answer: `📊 Badminton Performance Snapshot:

• Review unforced errors on net and lift quality under smash pressure.
• Track winners vs errors by zone.
• Tip: improve base recovery before adding smash volume.`,
            },
            {
                keywords: ['speed', 'sprint', 'pace', 'fast', 'velocity', 'footwork'],
                question: 'How to improve sprint speed?',
                answer: `⚡ Badminton Court Speed:

1. Multi-shuttle 6-corner footwork.
2. Lunge + recover to centre repeats.
3. Keep racket up — first step quality beats raw sprinting.`,
            },
        ],
    };

    return [...(bySport[sport] || bySport.Football), ...shared];
};
