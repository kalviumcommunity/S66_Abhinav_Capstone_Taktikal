import React, { useState } from 'react';

const PerformanceEditModal = ({ isOpen, onClose, performanceData, onSave }) => {
    const [editData, setEditData] = useState(performanceData);

    const handleInputChange = (weekIndex, metric, value) => {
        const newData = [...editData];
        newData[weekIndex] = {
            ...newData[weekIndex],
            [metric]: parseFloat(value) || 0
        };
        setEditData(newData);
    };

    const handleSave = () => {
        onSave(editData);
        onClose();
    };

    const handleCancel = () => {
        setEditData(performanceData); // Reset to original data
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-[#212121] to-[#483C32] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#F5F5DC]">Edit Performance Data</h2>
                        <button
                            onClick={handleCancel}
                            className="text-[#F5F5DC] hover:text-white text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-6">
                        {editData.map((weekData, index) => (
                            <div key={index} className="bg-[#483C32] rounded-lg p-4 border border-[#5a4a3e]">
                                <h3 className="text-lg font-semibold text-[#F5F5DC] mb-4">{weekData.week}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                                            Speed
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={weekData.speed}
                                            onChange={(e) => handleInputChange(index, 'speed', e.target.value)}
                                            className="w-full px-3 py-2 bg-[#212121] text-[#F5F5DC] rounded-lg border border-[#5a4a3e] focus:outline-none focus:border-[#F5F5DC]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                                            Strength
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={weekData.strength}
                                            onChange={(e) => handleInputChange(index, 'strength', e.target.value)}
                                            className="w-full px-3 py-2 bg-[#212121] text-[#F5F5DC] rounded-lg border border-[#5a4a3e] focus:outline-none focus:border-[#F5F5DC]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                                            Endurance
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={weekData.endurance}
                                            onChange={(e) => handleInputChange(index, 'endurance', e.target.value)}
                                            className="w-full px-3 py-2 bg-[#212121] text-[#F5F5DC] rounded-lg border border-[#5a4a3e] focus:outline-none focus:border-[#F5F5DC]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#F5F5DC] mb-2">
                                            Technique
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={weekData.technique}
                                            onChange={(e) => handleInputChange(index, 'technique', e.target.value)}
                                            className="w-full px-3 py-2 bg-[#212121] text-[#F5F5DC] rounded-lg border border-[#5a4a3e] focus:outline-none focus:border-[#F5F5DC]"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-[#a38b82] text-white rounded-lg hover:bg-[#967969] transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceEditModal;
