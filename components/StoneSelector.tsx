import React from 'react';
import { Stone } from '../types';
import { STONES } from '../constants';

interface StoneSelectorProps {
  selectedStone: Stone | null;
  onSelectStone: (stone: Stone) => void;
}

const StoneSelector: React.FC<StoneSelectorProps> = ({ selectedStone, onSelectStone }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {STONES.map((stone) => (
        <div
          key={stone.id}
          onClick={() => onSelectStone(stone)}
          className={`cursor-pointer group rounded-lg border-2 transition-all duration-200 ${
            selectedStone?.id === stone.id ? 'border-indigo-500 shadow-lg' : 'border-gray-200 hover:border-indigo-400'
          }`}
        >
          <img
            src={stone.imageUrl}
            alt={stone.name}
            className="h-24 w-full object-cover rounded-t-md"
          />
          <div className="p-2 text-center">
            <p className={`text-sm font-medium ${selectedStone?.id === stone.id ? 'text-indigo-600' : 'text-gray-700'}`}>
              {stone.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoneSelector;