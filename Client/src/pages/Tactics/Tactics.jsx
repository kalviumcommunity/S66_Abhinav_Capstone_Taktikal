import React, { useState, useRef } from "react";
import tacticsIcon from "../../assets/tactics@1x copy.svg";
import footballField from "../../assets/Football field@1x.png";
import calendarIcon from "../../assets/calendar@1x.svg";
import searchIcon from "../../assets/search@1x.svg";
import notificationIcon from "../../assets/notification@1x.svg";

export default function Tactics() {
    // Formation state
    const [formation, setFormation] = useState("4-3-3");
    const [customMode, setCustomMode] = useState(false);

    // Checklist state
    const [activities, setActivities] = useState([
        { text: "Warm-up drills", checked: true },
        { text: "Formation practice", checked: false },
        { text: "Conditioning exercises", checked: false },
    ]);
    const [newActivity, setNewActivity] = useState("");

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Search data
    const searchData = [
        { id: 1, title: '4-3-3 Formation', type: 'formation' },
        { id: 2, title: '4-4-2 Formation', type: 'formation' },
        { id: 3, title: 'Custom Formation', type: 'formation' },
        { id: 4, title: 'Warm-up drills', type: 'training' },
        { id: 5, title: 'Formation practice', type: 'training' },
        { id: 6, title: 'Conditioning exercises', type: 'training' },
        { id: 7, title: 'Training Checklist', type: 'training' },
        { id: 8, title: 'Formation Type', type: 'formation' },
    ];

    // Formation positions (relative to container width/height percentages)
    const getFormationPositions = (formation, containerWidth = 800, containerHeight = 730) => {
        const positions = {
            "4-3-3": [
                { x: 0.48, y: 0.95, position: "GK" }, // Goalkeeper
                { x: 0.25, y: 0.78, position: "LB" }, // Left Back
                { x: 0.4, y: 0.78, position: "CB" }, // Center Back 1
                { x: 0.6, y: 0.78, position: "CB" }, // Center Back 2
                { x: 0.75, y: 0.78, position: "RB" }, // Right Back
                { x: 0.3, y: 0.5, position: "CM" },  // Center Mid 1
                { x: 0.5, y: 0.5, position: "CM" },  // Center Mid 2
                { x: 0.7, y: 0.5, position: "CM" },  // Center Mid 3
                { x: 0.3, y: 0.15, position: "LW" }, // Left Wing
                { x: 0.5, y: 0.10, position: "ST" }, // Striker
                { x: 0.7, y: 0.15, position: "RW" }  // Right Wing
            ],
            "4-4-2": [
                { x: 0.48, y: 0.95, position: "GK" }, // Goalkeeper
                { x: 0.25, y: 0.78, position: "LB" }, // Left Back
                { x: 0.4, y: 0.78, position: "CB" }, // Center Back 1
                { x: 0.6, y: 0.78, position: "CB" }, // Center Back 2
                { x: 0.75, y: 0.78, position: "RB" }, // Right Back
                { x: 0.25, y: 0.45, position: "LM" }, // Left Mid
                { x: 0.4, y: 0.45, position: "CM" }, // Center Mid 1
                { x: 0.6, y: 0.45, position: "CM" }, // Center Mid 2
                { x: 0.75, y: 0.45, position: "RM" }, // Right Mid
                { x: 0.4, y: 0.15, position: "ST" }, // Striker 1
                { x: 0.6, y: 0.15, position: "ST" }  // Striker 2
            ]
        };

        return positions[formation].map((pos, i) => ({
            id: i,
            x: pos.x * containerWidth,
            y: pos.y * containerHeight,
            position: pos.position
        }));
    };

    // Player positions (relative to pitch container)
    const [players, setPlayers] = useState(() => getFormationPositions("4-3-3"));

    const pitchRef = useRef(null);
    const draggingPlayer = useRef(null);

    // Function to determine player position based on coordinates
    const getPlayerPosition = (x, y, containerWidth = 800, containerHeight = 730) => {
        const xPercent = (x / containerWidth) * 100;
        const yPercent = (y / containerHeight) * 100;

        // Define field zones based on your image
        if (yPercent < 20) {
            // Top third (attacking)
            if (xPercent < 25) return "LW";
            if (xPercent > 75) return "RW";
            return "ST";
        } else if (yPercent < 40) {
            // Upper middle (attacking midfield)
            if (xPercent < 30) return "LM";
            if (xPercent > 70) return "RM";
            return "AMF";
        } else if (yPercent < 60) {
            // Center middle (midfield)
            if (xPercent < 30) return "LM";
            if (xPercent > 70) return "RM";
            return "CM";
        } else if (yPercent < 80) {
            // Lower middle (defensive midfield)
            if (xPercent < 30) return "LB";
            if (xPercent > 70) return "RB";
            return "DMF";
        } else {
            // Bottom third (defense/goalkeeper)
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
        const newPosition = getPlayerPosition(newX, newY, rect.width, rect.height);

        setPlayers((prev) =>
            prev.map((p) =>
                p.id === draggingPlayer.current
                    ? { ...p, x: newX, y: newY, position: newPosition }
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
        const rect = pitchRef.current?.getBoundingClientRect();
        if (rect) {
            setPlayers(getFormationPositions(newFormation, rect.width, rect.height));
        } else {
            setPlayers(getFormationPositions(newFormation));
        }
    };

    // Custom formation handler
    const enableCustomMode = () => {
        setCustomMode(true);
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
            if (result.title.includes('4-3-3')) {
                changeFormation('4-3-3');
            } else if (result.title.includes('4-4-2')) {
                changeFormation('4-4-2');
            } else if (result.title.includes('Custom')) {
                enableCustomMode();
            }
        }
        setShowResults(false);
        setSearchQuery('');
    };

    return (
        <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 bg-[#212121] min-h-screen" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
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
                                {["4-3-3", "4-4-2"].map((f) => (
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
                            <span className="text-base md:text-lg lg:text-xl font-bold leading-tight">Football: {formation} Formation</span>
                            {customMode && <span className="text-sm md:text-base text-yellow-300 font-normal bg-yellow-300/10 px-2 py-1 rounded">Custom Mode Active - Drag to position players</span>}
                        </div>
                        <div
                            className="relative border-2 border-[#483C32] rounded-b-lg w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[730px]"
                            ref={pitchRef}
                            style={{
                                backgroundImage: `url(${footballField})`,
                                backgroundColor: "#8FBC8F",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            {players.map((player) => (
                                <div
                                    key={player.id}
                                    onMouseDown={(e) => handleMouseDown(e, player.id)}
                                    className={`absolute w-8 h-8 bg-[#483C32] text-white rounded-full flex items-center justify-center select-none text-xs font-bold ${customMode ? 'cursor-move' : 'cursor-default'}`}
                                    style={{ top: player.y, left: player.x }}
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