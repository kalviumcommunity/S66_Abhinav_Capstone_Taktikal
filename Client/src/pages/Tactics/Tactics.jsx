import React, { useState, useRef, useEffect } from "react";
import tacticsIcon from "../../assets/tactics@1x copy.svg";
import footballField from "../../assets/Football field@1x.png";
import cricketField from "../../assets/cricket_field.png";
import volleyballCourt from "../../assets/volleyball_court.png";
import handballCourt from "../../assets/handball_court.png";
import rugbyPitch from "../../assets/rugby_pitch.png";
import calendarIcon from "../../assets/calendar@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import notificationIcon from "../../assets/notification@1x.svg";
import { useAuth } from "../../context/AuthContext";

export default function Tactics() {
    // Formation state
    // Hook up auth & contexts
    const { user } = useAuth();
    const sportName = user?.sport || "Football";

    const sportConfig = {
        "Football": {
            formations: {
                "4-3-3": [
                    { x: 0.48, y: 0.95, position: "GK" },
                    { x: 0.25, y: 0.78, position: "LB" },
                    { x: 0.4, y: 0.78, position: "CB" },
                    { x: 0.6, y: 0.78, position: "CB" },
                    { x: 0.75, y: 0.78, position: "RB" },
                    { x: 0.3, y: 0.5, position: "CM" },
                    { x: 0.5, y: 0.5, position: "CM" },
                    { x: 0.7, y: 0.5, position: "CM" },
                    { x: 0.3, y: 0.15, position: "LW" },
                    { x: 0.5, y: 0.10, position: "ST" },
                    { x: 0.7, y: 0.15, position: "RW" }
                ],
                "4-4-2": [
                    { x: 0.48, y: 0.95, position: "GK" },
                    { x: 0.25, y: 0.78, position: "LB" },
                    { x: 0.4, y: 0.78, position: "CB" },
                    { x: 0.6, y: 0.78, position: "CB" },
                    { x: 0.75, y: 0.78, position: "RB" },
                    { x: 0.25, y: 0.45, position: "LM" },
                    { x: 0.4, y: 0.45, position: "CM" },
                    { x: 0.6, y: 0.45, position: "CM" },
                    { x: 0.75, y: 0.45, position: "RM" },
                    { x: 0.4, y: 0.15, position: "ST" },
                    { x: 0.6, y: 0.15, position: "ST" }
                ]
            },
            bgImage: `url("${footballField}")`,
            bgColor: "#8FBC8F",
            bgSize: "contain",
            bgShape: "none",
            borderRadius: "0%"
        },
        "Cricket": {
             formations: {
                "Aggressive Base": [
                    {x:0.48, y:0.8, position:"WK"}, {x:0.48, y:0.2, position:"BOWL"}, 
                    {x:0.42, y:0.7, position:"SLIP1"}, {x:0.38,y:0.7, position:"SLIP2"},
                    {x:0.3, y:0.6, position:"GULLY"}, {x:0.25, y:0.4, position:"POINT"},
                    {x:0.3, y:0.2, position:"COVER"}, {x:0.55, y:0.15, position:"MIDON"},
                    {x:0.7, y:0.25, position:"MIDOFF"}, {x:0.75, y:0.4, position:"SQUARE"},
                    {x:0.7, y:0.6, position:"FINE"}
                ],
                "Defensive Base": [
                    {x:0.48, y:0.8, position:"WK"}, {x:0.48, y:0.2, position:"BOWL"}, 
                    {x:0.42, y:0.85, position:"SLIP1"}, {x:0.2, y:0.5, position:"POINT"},
                    {x:0.25, y:0.2, position:"COVER"}, {x:0.35, y:0.1, position:"EX-CVR"},
                    {x:0.6, y:0.1, position:"LONGON"}, {x:0.75, y:0.2, position:"MDWKT"},
                    {x:0.8, y:0.45, position:"SQUARE"}, {x:0.75, y:0.7, position:"FINE"},
                    {x:0.65, y:0.85, position:"3RDM"}
                ]
            },
            bgImage: `url("${cricketField}")`,
            bgColor: "#DEE5DE",
            bgSize: "contain",
            bgShape: "none",
            borderRadius: "0%"
        },
        "Volleyball": {
            formations: {
                "5-1 System": [
                    {x:0.48, y:0.75, position:"S"}, {x:0.35, y:0.75, position:"L"}, {x:0.6, y:0.75, position:"MB"},
                    {x:0.35, y:0.25, position:"OH"}, {x:0.48, y:0.25, position:"MB"}, {x:0.6, y:0.25, position:"OPP"}
                ],
                "6-2 System": [
                    {x:0.48, y:0.75, position:"S/O"}, {x:0.35, y:0.75, position:"L"}, {x:0.6, y:0.75, position:"MB"},
                    {x:0.35, y:0.25, position:"OH"}, {x:0.48, y:0.25, position:"MB"}, {x:0.6, y:0.25, position:"S/O"}
                ]
            },
            bgImage: `url("${volleyballCourt}")`,
            bgColor: "#DEE5DE",
            bgSize: "contain",
            bgShape: "none",
            borderRadius: "0%"
        },
        "Handball": {
            formations: {
                "6-0 Defense": [
                    {x:0.48,y:0.85,position:"GK"}, {x:0.3,y:0.65,position:"LW"}, {x:0.4,y:0.55,position:"LB"},
                    {x:0.48,y:0.5,position:"CB"}, {x:0.56,y:0.55,position:"RB"}, {x:0.66,y:0.65,position:"RW"}, {x:0.48,y:0.4,position:"PVT"}
                ]
            },
            bgImage: `url("${handballCourt}")`,
            bgColor: "#DEE5DE",
            bgSize: "contain",
            bgShape: "none",
            borderRadius: "0%"
        },
        "Rugby": {
            formations: {
                "Standard 15s": [
                    {x:0.38,y:0.85,position:"PRP"}, {x:0.48,y:0.85,position:"HKR"}, {x:0.58,y:0.85,position:"PRP"},
                    {x:0.43,y:0.75,position:"LCK"}, {x:0.53,y:0.75,position:"LCK"}, {x:0.35,y:0.65,position:"FLK"},
                    {x:0.61,y:0.65,position:"FLK"}, {x:0.48,y:0.55,position:"8M"}, {x:0.48,y:0.45,position:"SH"}, 
                    {x:0.35,y:0.35,position:"FH"}, {x:0.61,y:0.35,position:"IC"}, {x:0.7,y:0.35,position:"OC"},
                    {x:0.28,y:0.25,position:"WG"}, {x:0.68,y:0.25,position:"WG"}, {x:0.48,y:0.15,position:"FB"}
                ]
            },
            bgImage: `url("${rugbyPitch}")`,
            bgColor: "#DEE5DE",
            bgSize: "contain",
            bgShape: "none",
            borderRadius: "0%"
        },
        "Basketball": {
            formations: {
                "2-3 Zone Defense": [
                    { x: 0.35, y: 0.70, position: "PG" },
                    { x: 0.65, y: 0.70, position: "SG" },
                    { x: 0.25, y: 0.35, position: "SF" },
                    { x: 0.50, y: 0.25, position: "C" },
                    { x: 0.75, y: 0.35, position: "PF" }
                ],
                "Picks & Roll Offense": [
                    { x: 0.50, y: 0.80, position: "PG" },
                    { x: 0.30, y: 0.60, position: "SG" },
                    { x: 0.50, y: 0.50, position: "C" },
                    { x: 0.75, y: 0.55, position: "SF" },
                    { x: 0.20, y: 0.30, position: "PF" }
                ]
            },
            bgImage: `linear-gradient(to bottom, #d97706, #92400e)`,
            bgColor: "#92400e",
            bgSize: "cover",
            bgShape: "none",
            borderRadius: "4px"
        },
        "Chess": {
            formations: {
                "Sicilian Defense Setup": [
                    { x: 0.50, y: 0.85, position: "GM-C" },
                    { x: 0.35, y: 0.65, position: "OPENING" },
                    { x: 0.65, y: 0.65, position: "TACTICS" },
                    { x: 0.30, y: 0.40, position: "BLITZ" },
                    { x: 0.70, y: 0.30, position: "ENDGAME" }
                ],
                "King's Indian Attack": [
                    { x: 0.50, y: 0.85, position: "GM-C" },
                    { x: 0.45, y: 0.60, position: "OPENING" },
                    { x: 0.55, y: 0.50, position: "TACTICS" },
                    { x: 0.25, y: 0.35, position: "BLITZ" },
                    { x: 0.75, y: 0.25, position: "ENDGAME" }
                ]
            },
            bgImage: `linear-gradient(45deg, #1f2937 25%, #374151 25%, #374151 50%, #1f2937 50%, #1f2937 75%, #374151 75%, #374151 100%)`,
            bgColor: "#1f2937",
            bgSize: "40px 40px",
            bgShape: "none",
            borderRadius: "4px"
        },
        "Table Tennis": {
            formations: {
                "Aggressive Counter-Loop": [
                    { x: 0.50, y: 0.80, position: "ATTACK" },
                    { x: 0.30, y: 0.70, position: "SERVE" },
                    { x: 0.70, y: 0.60, position: "CHOP" },
                    { x: 0.50, y: 0.30, position: "DBL" }
                ],
                "Defensive Chop Block": [
                    { x: 0.50, y: 0.85, position: "CHOP" },
                    { x: 0.25, y: 0.65, position: "SERVE" },
                    { x: 0.75, y: 0.65, position: "ATTACK" },
                    { x: 0.50, y: 0.25, position: "DBL" }
                ]
            },
            bgImage: `linear-gradient(to bottom, #1e3a8a, #1d4ed8)`,
            bgColor: "#1e3a8a",
            bgSize: "cover",
            bgShape: "none",
            borderRadius: "4px"
        },
        "Badminton": {
            formations: {
                "Front-Back Attack": [
                    { x: 0.50, y: 0.35, position: "NET" },
                    { x: 0.50, y: 0.80, position: "SMASH" },
                    { x: 0.30, y: 0.60, position: "SINGLES" },
                    { x: 0.70, y: 0.60, position: "DOUBLES" }
                ],
                "Side-by-Side Defense": [
                    { x: 0.35, y: 0.70, position: "DEF-L" },
                    { x: 0.65, y: 0.70, position: "DEF-R" },
                    { x: 0.50, y: 0.40, position: "NET" },
                    { x: 0.50, y: 0.85, position: "REAR" }
                ]
            },
            bgImage: `linear-gradient(to bottom, #047857, #065f46)`,
            bgColor: "#047857",
            bgSize: "cover",
            bgShape: "none",
            borderRadius: "4px"
        }
    };

    const currentSportConfig = sportConfig[sportName] || sportConfig["Football"];
    const baseFormations = Object.keys(currentSportConfig.formations);

    // Initial state setup depends on sport configuration
    const [formation, setFormation] = useState(baseFormations[0]);
    const [customMode, setCustomMode] = useState(false);

    const [savedFormations, setSavedFormations] = useState(() => {
        if (user && user.tactics_saved_formations) return user.tactics_saved_formations;
        const local = localStorage.getItem('tactics_saved_formations');
        return local ? JSON.parse(local) : [];
    });
    const [customFormationName, setCustomFormationName] = useState("");

    useEffect(() => {
        localStorage.setItem('tactics_saved_formations', JSON.stringify(savedFormations));
    }, [savedFormations]);

    // Sport-specific activity defaults
    const getSportActivities = (s) => {
        switch (s) {
            case "Cricket":
                return [
                    { text: "Net batting & bowling session", checked: true },
                    { text: "Slip catching & fielding drills", checked: false },
                    { text: "Run-rate scenario practice", checked: false }
                ];
            case "Volleyball":
                return [
                    { text: "Overhead set & spike drills", checked: true },
                    { text: "5-1 rotation transition", checked: false },
                    { text: "Block & dig reaction training", checked: false }
                ];
            case "Basketball":
                return [
                    { text: "Free-throw & 3-point shooting", checked: true },
                    { text: "Pick-and-roll execution", checked: false },
                    { text: "Full-court defensive press", checked: false }
                ];
            case "Chess":
                return [
                    { text: "Opening line study & prep", checked: true },
                    { text: "Daily tactical puzzle solving (30m)", checked: false },
                    { text: "Rook & endgame technique practice", checked: false }
                ];
            case "Table Tennis":
                return [
                    { text: "Serve spin & placement variation", checked: true },
                    { text: "Third-ball attack & counter-looping", checked: false },
                    { text: "Multi-ball speed drills", checked: false }
                ];
            case "Badminton":
                return [
                    { text: "Smash & steep angle drop shots", checked: true },
                    { text: "Net kill & shadow footwork", checked: false },
                    { text: "Doubles rotation & defense", checked: false }
                ];
            case "Handball":
                return [
                    { text: "Fast break & wing finishing", checked: true },
                    { text: "6-0 wall defense drills", checked: false },
                    { text: "7m penalty shot practice", checked: false }
                ];
            case "Rugby":
                return [
                    { text: "Scrum & lineout set-piece drills", checked: true },
                    { text: "Ruck clearing & tackle technique", checked: false },
                    { text: "Backline passing movement", checked: false }
                ];
            case "Football":
            default:
                return [
                    { text: "Pass-and-move warm-up", checked: true },
                    { text: "Tactical positioning & shape", checked: false },
                    { text: "Set-piece & penalty practice", checked: false }
                ];
        }
    };

    // Checklist state
    const [activities, setActivities] = useState(() => {
        if (user && user.tactics_checklist && user.tactics_checklist.length > 0) return user.tactics_checklist;
        const saved = localStorage.getItem(`tactics_checklist_${sportName}`);
        if (saved) return JSON.parse(saved);
        return getSportActivities(sportName);
    });

    useEffect(() => {
        setActivities(getSportActivities(sportName));
    }, [sportName]);

    useEffect(() => {
        localStorage.setItem(`tactics_checklist_${sportName}`, JSON.stringify(activities));
    }, [activities, sportName]);
    const [newActivity, setNewActivity] = useState("");

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Search data dynamically tailored per sport
    const searchData = [
        { id: 1, title: `${baseFormations[0]} Strategy`, type: 'formation' },
        { id: 2, title: `${baseFormations[1] || baseFormations[0]} Setup`, type: 'formation' },
        { id: 3, title: 'Custom Formation', type: 'formation' },
        ...activities.map((a, idx) => ({ id: idx + 4, title: a.text, type: 'training' }))
    ];

    // Format initial player positions depending on configuration array
    const getFormationPositions = (formQuery) => {
        const positions = currentSportConfig.formations[formQuery] || currentSportConfig.formations[baseFormations[0]];

        return positions.map((pos, i) => ({
            id: i,
            x: pos.x, // Store as fraction (0-1)
            y: pos.y, // Store as fraction (0-1)
            position: pos.position
        }));
    };

    // Player positions (relative to pitch container)
    const [players, setPlayers] = useState(() => getFormationPositions(formation));

    const pitchRef = useRef(null);
    const draggingPlayer = useRef(null);

    // Function to determine player position based on coordinates
    const getPlayerPosition = (x, y, containerWidth = 800, containerHeight = 730, sport = "Football") => {
        const xPercent = (x / containerWidth) * 100;
        const yPercent = (y / containerHeight) * 100;

        if (sport === "Volleyball") {
            if (yPercent < 40) {
                if (xPercent < 45) return "OH";
                if (xPercent > 55) return "OPP";
                return "MB";
            } else if (yPercent < 70) {
                if (xPercent < 40) return "S";
                if (xPercent > 60) return "S";
                return "MB";
            } else {
                if (xPercent < 40) return "L";
                if (xPercent > 60) return "L";
                return "S/O";
            }
        }

        if (sport === "Handball") {
            if (yPercent < 45) {
                if (xPercent < 35) return "LW";
                if (xPercent > 65) return "RW";
                return "PVT";
            } else if (yPercent < 75) {
                if (xPercent < 40) return "LB";
                if (xPercent > 60) return "RB";
                return "CB";
            } else {
                return "GK";
            }
        }

        if (sport === "Rugby") {
            if (yPercent < 30) {
                if (xPercent < 30) return "WG";
                if (xPercent > 70) return "WG";
                return "FB";
            } else if (yPercent < 55) {
                if (xPercent < 45) return "FH";
                if (xPercent > 55) return "OC";
                return "IC";
            } else if (yPercent < 75) {
                if (xPercent < 35) return "FLK";
                if (xPercent > 65) return "FLK";
                return "SH";
            } else {
                if (xPercent < 40) return "PRP";
                if (xPercent > 60) return "PRP";
                return "HKR";
            }
        }

        if (sport === "Cricket") {
            if (yPercent < 35) {
                if (xPercent < 45) return "COVER";
                if (xPercent > 55) return "MIDON";
                return "BOWL";
            } else if (yPercent < 60) {
                if (xPercent < 35) return "POINT";
                if (xPercent > 65) return "SQUARE";
                return "MIDOFF";
            } else {
                if (xPercent < 45) return "SLIP";
                if (xPercent > 55) return "FINE";
                if (yPercent > 85) return "WK";
                return "GULLY";
            }
        }

        if (sport === "Basketball") {
            if (yPercent < 40) {
                if (xPercent < 35) return "SF";
                if (xPercent > 65) return "PF";
                return "C";
            } else if (yPercent < 70) {
                if (xPercent < 45) return "PG";
                return "SG";
            } else {
                return "PG";
            }
        }

        if (sport === "Chess") {
            if (yPercent < 40) return "ENDGAME";
            if (yPercent < 70) {
                if (xPercent < 50) return "BLITZ";
                return "TACTICS";
            }
            if (xPercent < 50) return "OPENING";
            return "GM-C";
        }

        if (sport === "Table Tennis") {
            if (yPercent < 50) return "DBL";
            if (xPercent < 40) return "SERVE";
            if (xPercent > 60) return "CHOP";
            return "ATTACK";
        }

        if (sport === "Badminton") {
            if (yPercent < 45) return "NET";
            if (yPercent < 75) {
                if (xPercent < 50) return "SINGLES";
                return "DOUBLES";
            }
            return "SMASH";
        }

        // Default Football field zones
        if (yPercent < 20) {
            if (xPercent < 25) return "LW";
            if (xPercent > 75) return "RW";
            return "ST";
        } else if (yPercent < 40) {
            if (xPercent < 30) return "LM";
            if (xPercent > 70) return "RM";
            return "AMF";
        } else if (yPercent < 60) {
            if (xPercent < 30) return "LM";
            if (xPercent > 70) return "RM";
            return "CM";
        } else if (yPercent < 80) {
            if (xPercent < 30) return "LB";
            if (xPercent > 70) return "RB";
            return "DMF";
        } else {
            if (yPercent > 90 && xPercent > 40 && xPercent < 60) return "GK";
            if (xPercent < 25) return "LB";
            if (xPercent > 75) return "RB";
            return "CB";
        }
    };

    // Check if coordinates are within the football field image (not just the green background)
    const isWithinFieldImage = (x, y, containerWidth, containerHeight) => {
        // Assuming the image takes up about 80% of the container (due to backgroundSize: contain)
        const imageMargin = 0.1; // 10% margin on each side
        const imageLeft = containerWidth * imageMargin;
        const imageRight = containerWidth * (1 - imageMargin);
        const imageTop = containerHeight * imageMargin;
        const imageBottom = containerHeight * (1 - imageMargin);

        return x >= imageLeft && x <= imageRight && y >= imageTop && y <= imageBottom;
    };

    const handleMouseDown = (e, id) => {
        if (!customMode) return; // Only allow dragging in custom mode
        draggingPlayer.current = id;
    };

    const handleMouseMove = (e) => {
        if (draggingPlayer.current === null || !customMode) return;
        const rect = pitchRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Only allow movement within the field image bounds
        if (!isWithinFieldImage(x, y, rect.width, rect.height)) return;

        const newX = Math.max(0, Math.min(x, rect.width - 30));
        const newY = Math.max(0, Math.min(y, rect.height - 30));
        
        // Store as fractions for responsiveness
        const xFraction = newX / rect.width;
        const yFraction = newY / rect.height;
        const newPosition = getPlayerPosition(newX, newY, rect.width, rect.height, sportName);

        setPlayers((prev) =>
            prev.map((p) =>
                p.id === draggingPlayer.current
                    ? { ...p, x: xFraction, y: yFraction, position: newPosition }
                    : p
            )
        );
    };

    const handleMouseUp = () => {
        draggingPlayer.current = null;
    };

    // Formation change handler
    const changeFormation = (newFormation) => {
        setFormation(newFormation);
        setCustomMode(false); // Exit custom mode when changing formation

        const savedMatch = savedFormations.find(f => f.name === newFormation);
        if (savedMatch) {
            setPlayers(savedMatch.players);
            return;
        }

        setPlayers(getFormationPositions(newFormation));
    };

    // Custom formation handler
    const enableCustomMode = () => {
        setCustomMode(true);
        setFormation("Custom");
    };

    const handleSaveCustomFormation = () => {
        const nameToSave = customFormationName.trim() || `Custom ${savedFormations.length + 1}`;
        const existingIndex = savedFormations.findIndex(f => f.name === nameToSave);
        let newFormations = [...savedFormations];
        
        if (existingIndex >= 0) {
            newFormations[existingIndex].players = players;
        } else {
            newFormations.push({ name: nameToSave, players });
        }
        
        setSavedFormations(newFormations);
        setCustomFormationName("");
        setCustomMode(false);
        setFormation(nameToSave);
    };

    const handleDeleteSavedFormation = (name, e) => {
        e.stopPropagation();
        const newFormations = savedFormations.filter(f => f.name !== name);
        setSavedFormations(newFormations);
        if (formation === name) {
            changeFormation(baseFormations[0]);
        }
    };

    // Checklist functions
    const addActivity = () => {
        if (newActivity.trim() === "") return;
        setActivities([...activities, { text: newActivity, checked: false }]);
        setNewActivity("");
    };

    const toggleActivity = (index) => {
        setActivities((prev) =>
            prev.map((a, i) => (i === index ? { ...a, checked: !a.checked } : a))
        );
    };

    const removeActivity = (index) => {
        setActivities((prev) => prev.filter((_, i) => i !== index));
    };

    // Search functionality
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filtered);
        setShowResults(true);
    };

    const handleResultClick = (result) => {
        if (result.type === 'formation') {
            if (result.title.includes(baseFormations[0])) {
                changeFormation(baseFormations[0]);
            } else if (result.title.includes(baseFormations[1])) {
                changeFormation(baseFormations[1]);
            } else if (result.title.includes('Custom')) {
                enableCustomMode();
            }
        } else if (result.type === 'training') {
            if (!activities.some(a => a.text === result.title)) {
                setActivities([...activities, { text: result.title, checked: false }]);
            }
        }
        setShowResults(false);
        setSearchQuery('');
    };

    return (
        <div 
            className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 bg-[#212121] min-h-screen" 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
            onTouchMove={(e) => {
                if (draggingPlayer.current !== null) {
                    const touch = e.touches[0];
                    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
                }
            }}
            onTouchEnd={handleMouseUp}
        >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5DC] mb-2 leading-tight">
                            Sports Tactics & Training
                        </h1>
                        <p className="text-base md:text-lg text-[#F5F5DC]/80 font-normal leading-relaxed">
                            Design formations, plan strategies, and track training progress
                        </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
                        <div className="relative flex items-center bg-white rounded-full px-3 py-2 shadow-sm">
                            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search tactics..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => searchQuery && setShowResults(true)}
                                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                                className="outline-none text-sm bg-transparent font-normal w-full sm:w-32 md:w-40"
                            />

                            {/* Search Results Dropdown */}
                            {showResults && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((result) => (
                                            <div
                                                key={result.id}
                                                onClick={() => handleResultClick(result)}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black border-b border-gray-100 last:border-b-0 text-sm"
                                            >
                                                {result.title}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500 text-sm">
                                            No results found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <img src={notificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300" />
                    </div>
                </div>

                {/* Formation & Checklist */}
                <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
                    {/* Left Column */}
                    <div className="w-full xl:w-1/4 space-y-4 md:space-y-6 order-2 xl:order-1">
                        {/* Formation Type */}
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-lg p-4 md:p-5 shadow-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                <h3 className="font-bold text-[#F5F5DC] text-lg md:text-xl leading-tight">Formation Type</h3>
                                <div className="flex gap-3">
                                    <img src={calendarIcon} alt="Calendar" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-80 transition duration-300" />
                                    <img src={tacticsIcon} alt="Tactics" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-80 transition duration-300" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {baseFormations.map((f) => (
                                    <div
                                        key={f}
                                        onClick={() => changeFormation(f)}
                                        className={`p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 text-base md:text-lg font-normal ${
                                            formation === f
                                                ? "bg-[#483C32] text-white shadow-md font-bold"
                                                : "bg-[#00000050] text-[#F5F5DC] hover:bg-[#483C32]/30 hover:text-white"
                                        }`}
                                    >
                                        {f}
                                    </div>
                                ))}

                                {savedFormations.map((sf) => (
                                    <div
                                        key={sf.name}
                                        onClick={() => changeFormation(sf.name)}
                                        className={`p-3 md:p-4 rounded-lg flex justify-between items-center cursor-pointer transition-all duration-300 text-base md:text-lg font-normal ${
                                            formation === sf.name
                                                ? "bg-[#483C32] text-white shadow-md font-bold"
                                                : "bg-[#00000050] text-[#F5F5DC] hover:bg-[#483C32]/30 hover:text-white"
                                        }`}
                                    >
                                        <span>{sf.name}</span>
                                        <button 
                                            onClick={(e) => handleDeleteSavedFormation(sf.name, e)}
                                            className="text-red-400 hover:text-red-300 text-xl leading-none px-2 focus:outline-none"
                                            title="Delete formation"
                                        >×</button>
                                    </div>
                                ))}
                                <button
                                    onClick={enableCustomMode}
                                    className={`w-full border border-[#483C32] rounded-lg p-3 md:p-4 text-sm md:text-base font-normal transition-all duration-300 ${
                                        customMode
                                            ? "bg-[#483C32] text-white shadow-md font-bold"
                                            : "bg-[#00000050] text-[#F5F5DC] hover:bg-[#483C32]/30 hover:text-white"
                                    }`}
                                >
                                    + Create Custom Formation
                                </button>
                            </div>
                        </div>

                        {/* Training Checklist */}
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] rounded-lg p-4 md:p-5 shadow-lg">
                            <h3 className="font-bold mb-4 text-[#F5F5DC] text-lg md:text-xl leading-tight">Training Checklist</h3>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newActivity}
                                    onChange={(e) => setNewActivity(e.target.value)}
                                    placeholder="Add training activity..."
                                    className="flex-1 rounded p-1 text-sm bg-gradient-to-br from-[#212121] to-[#483C32] border border-[#483C32] text-[#F5F5DC] placeholder-[#F5F5DC]/70"
                                />
                                <button
                                    onClick={addActivity}
                                    className="bg-[#483C32] text-[#F5F5DC] px-3 py-1 rounded hover:bg-[#5a4a3e] transition duration-300"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {activities.map((a, i) => (
                                    <li key={i} className="flex items-center justify-between bg-[#ffffff10] p-2 rounded">
                                        <label className="flex items-center gap-2 cursor-pointer" style={{ color: "#F5F5DC" }}>
                                            <input
                                                type="checkbox"
                                                checked={a.checked}
                                                onChange={() => toggleActivity(i)}
                                            />
                                            {a.text}
                                        </label>
                                        <button onClick={() => removeActivity(i)} className="text-red-400">×</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Pitch */}
                    <div className="flex-1 w-full xl:w-3/4 order-1 xl:order-2">
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] p-3 md:p-4 rounded-t-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[#F5F5DC] border border-[#483C32] border-b-0">
                            <span className="text-base md:text-lg lg:text-xl font-bold leading-tight">{sportName}: {formation} Formation</span>
                            {customMode && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm md:text-base text-yellow-300 font-normal bg-yellow-300/10 px-2 py-1 rounded hidden sm:inline-block">Custom Mode Active</span>
                                    <input 
                                        type="text" 
                                        placeholder="Formation Name" 
                                        className="bg-[#212121] text-xs text-[#F5F5DC] p-1.5 md:p-2 rounded w-24 md:w-32 border border-[#483C32] outline-none" 
                                        value={customFormationName} 
                                        onChange={e => setCustomFormationName(e.target.value)} 
                                    />
                                    <button onClick={handleSaveCustomFormation} className="bg-green-600 text-white text-xs px-3 py-1.5 md:py-2 rounded hover:bg-green-700 transition">Save</button>
                                </div>
                            )}
                        </div>
                        <div
                            className="relative border-2 border-[#483C32] w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[730px] overflow-hidden"
                            ref={pitchRef}
                            style={{
                                ...(currentSportConfig.bgShape !== "none" 
                                    ? { background: currentSportConfig.bgShape } 
                                    : { 
                                        backgroundImage: currentSportConfig.bgImage,
                                        backgroundColor: currentSportConfig.bgColor
                                      }
                                ),
                                backgroundSize: currentSportConfig.bgSize,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                borderRadius: currentSportConfig.borderRadius,
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                                touchAction: "none" // Better for mobile drag
                            }}
                        >
                            {players.map((player) => (
                                <div
                                    key={player.id}
                                    onMouseDown={(e) => handleMouseDown(e, player.id)}
                                    onTouchStart={(e) => {
                                        if (customMode) {
                                            const touch = e.touches[0];
                                            handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY }, player.id);
                                        }
                                    }}
                                    className={`absolute w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-[#483C32] text-white rounded-full flex items-center justify-center select-none text-[10px] sm:text-xs font-bold shadow-md transform -translate-x-1/2 -translate-y-1/2 ${customMode ? 'cursor-move ring-2 ring-yellow-400' : 'cursor-default border border-[#F5F5DC]/30'}`}
                                    style={{ 
                                        top: `${player.y * 100}%`, 
                                        left: `${player.x * 100}%` 
                                    }}
                                >
                                    {player.position}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
}