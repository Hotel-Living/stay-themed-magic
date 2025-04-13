
import React from 'react';

interface ComparisonItem {
  id: number;
  traditional: string;
  hotelLiving: string;
}

interface ComparisonTableProps {
  items: ComparisonItem[];
}

export function ComparisonTable({ items }: ComparisonTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#460F54]/10 rounded-lg p-6">
      <div className="space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
        <h3 className="text-xl font-bold text-yellow-300 mb-4 tracking-wide">TRADITIONAL MODEL</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`traditional-${item.id}`} className="flex text-sm md:text-base">
              <span className="font-bold text-yellow-300 mr-2 w-6">{item.id}.</span> 
              <span className="text-white/90">{item.traditional}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
        <h3 className="text-xl font-bold text-yellow-300 mb-4 tracking-wide">HOTEL LIVING MODEL</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`hotel-living-${item.id}`} className="flex text-sm md:text-base">
              <span className="font-bold text-yellow-300 mr-2 w-6">{item.id}.</span> 
              <span className="text-white/90">{item.hotelLiving}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
