import React from 'react';

interface HeaderProps {
    leadCount: number;
    onDownload: () => void;
    startDate: string;
    onStartDateChange: (date: string) => void;
    endDate: string;
    onEndDateChange: (date: string) => void;
}

const Header: React.FC<HeaderProps> = ({ leadCount, onDownload, startDate, onStartDateChange, endDate, onEndDateChange }) => {
  return (
    <header className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wider">
          Way2me Lead Collector
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/20 p-2 rounded-lg">
        <div className="text-center px-4">
            <span className="text-2xl font-bold text-green-400">{leadCount}</span>
            <p className="text-xs text-gray-400">Total Leads</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <label className="text-xs text-gray-400 mb-1">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="bg-gray-700 text-white font-semibold py-2 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-400 mb-1">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="bg-gray-700 text-white font-semibold py-2 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
          <button
            onClick={onDownload}
            className="self-end bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Download PDF
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;