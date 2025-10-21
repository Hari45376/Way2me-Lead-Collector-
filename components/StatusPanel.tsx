import React, { useState } from 'react';
import { LeadStatus } from '../types';

interface StatusPanelProps {
  onSave: (status: LeadStatus, afterwardsNotes: string) => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ onSave }) => {
  const [afterwardsNotes, setAfterwardsNotes] = useState('');

  const handleSave = (status: LeadStatus) => {
    onSave(status, afterwardsNotes);
    setAfterwardsNotes(''); // Reset notes after saving
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-lg border border-white/20 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Set Lead Status</h2>
      <div className="space-y-4">
        <button
          onClick={() => handleSave(LeadStatus.OK)}
          className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          OK
        </button>
        <button
          onClick={() => handleSave(LeadStatus.NotOK)}
          className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Not OK
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSave(LeadStatus.Afterwards)}
            className="flex-shrink-0 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Afterwards
          </button>
          <textarea
            value={afterwardsNotes}
            onChange={(e) => setAfterwardsNotes(e.target.value)}
            placeholder="Notes..."
            rows={1}
            className="w-full p-2.5 text-sm bg-black/20 text-white border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow duration-300 placeholder-gray-400"
          ></textarea>
        </div>
      </div>
       <p className="text-xs text-center mt-6 text-gray-400">Click a status button to save the current lead and clear the form.</p>
    </div>
  );
};

export default StatusPanel;
