
import React from 'react';
import { format, isSameDay } from 'date-fns';

interface DateButtonProps {
  date: Date;
  isSelected: boolean;
  isSelecting: boolean;
  potentialPeriod: { days: number; isValid: boolean } | null;
  onSelect: (date: Date) => void;
}

export function DateButton({
  date,
  isSelected,
  isSelecting,
  potentialPeriod,
  onSelect
}: DateButtonProps) {
  return (
    <button
      onClick={() => onSelect(date)}
      className={`
        p-2 rounded-lg flex flex-col items-center justify-center relative
        ${isSelected ? 'bg-fuchsia-600 text-white' : 'bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200'}
        ${isSelecting ? 'ring-2 ring-fuchsia-600' : ''}
        ${potentialPeriod && !potentialPeriod.isValid ? 'opacity-50' : ''}
      `}
    >
      <span className="text-sm">{format(date, 'EEEE')}</span>
      <span className="text-lg font-bold">{format(date, 'd')}</span>
      
      {potentialPeriod && (
        <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
          potentialPeriod.isValid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {potentialPeriod.days} days
        </span>
      )}
    </button>
  );
}
