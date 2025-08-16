import React, { useState, useRef } from "react";
import Sidebar from "../../components/Sidebar";
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

    return (
        <div className="flex min-h-screen bg-[#212121]" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold" style={{ color: "#F5F5DC" }}>
                        Sports Tactics & Training
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white rounded-full px-3 py-1">
                            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="outline-none text-sm bg-transparent"
                            />
                        </div>
                        <img src={notificationIcon} alt="Notification" className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>

                {/* Formation & Checklist */}
                <div className="flex gap-6">
                    {/* Left Column */}
                    <div className="w-1/4 space-y-6">
                        {/* Formation Type */}
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold" style={{ color: "#F5F5DC" }}>Formation Type</h3>
                                <div className="flex gap-2">
                                    <img src={calendarIcon} alt="Calendar" className="w-5 h-5 cursor-pointer" />
                                    <img src={tacticsIcon} alt="Tactics" className="w-5 h-5 cursor-pointer" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                {["4-3-3", "4-4-2"].map((f) => (
                                    <div
                                        key={f}
                                        onClick={() => changeFormation(f)}
                                        className={`p-2 rounded cursor-pointer ${formation === f ? "bg-[#483C32]" : "bg-[#00000050]"}`}
                                        style={{ color: "#F5F5DC" }}
                                    >
                                        {f}
                                    </div>
                                ))}
                                <button
                                    onClick={enableCustomMode}
                                    className={`w-full border border-gray-400 rounded p-2 text-sm ${customMode ? "bg-[#483C32] text-white" : "text-gray-300"}`}
                                >
                                    + Create Custom Formation
                                </button>
                            </div>
                        </div>

                        {/* Training Checklist */}
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-lg p-4">
                            <h3 className="font-bold mb-3" style={{ color: "#F5F5DC" }}>Training Checklist</h3>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newActivity}
                                    onChange={(e) => setNewActivity(e.target.value)}
                                    placeholder="Add training activity..."
                                    className="flex-1 rounded p-1 text-sm bg-[#F5F5DC] text-[#212121] placeholder-gray-500"
                                />
                                <button
                                    onClick={addActivity}
                                    className="bg-[#483C32] text-white px-3 py-1 rounded"
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
                    <div className="flex-1">
                        <div className="bg-gradient-to-br from-[#212121] to-[#483C32] p-2 rounded-t-lg flex justify-between items-center" style={{ color: "#F5F5DC" }}>
                            <span>Football: {formation} Formation</span>
                            {customMode && <span className="text-sm text-yellow-300">Custom Mode Active - Drag to position players</span>}
                        </div>
                        <div
                            className="relative border-2 border-[#483C32] rounded-b-lg"
                            ref={pitchRef}
                            style={{
                                height: "730px",
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
        </div>
    );
}