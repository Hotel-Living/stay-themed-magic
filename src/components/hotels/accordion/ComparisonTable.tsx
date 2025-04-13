
import React from 'react';
import { ComparisonItem } from './types';
import { ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  items: ComparisonItem[];
}

export function ComparisonTable({ items }: ComparisonTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 gap-2 bg-[#460F54]/10 rounded-lg p-6 overflow-visible">
      {/* Traditional Model Column */}
      <div className="md:col-span-4 space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
        <h3 className="text-xl font-bold text-[#FEF7CD] mb-4 tracking-wide">TRADITIONAL MODEL</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`traditional-${item.id}`} className="flex text-xs md:text-sm">
              <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">{item.id}.</span> 
              <span className="text-white/90">{item.traditional}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow Column */}
      <div className="hidden md:flex md:col-span-1 flex-col justify-center items-center">
        {items.map((item) => (
          <div key={`arrow-${item.id}`} className="flex items-center h-8 my-1">
            <ArrowRight className="h-5 w-5 text-[#FEF7CD]" />
          </div>
        ))}
      </div>
      
      {/* Hotel Living Model Column */}
      <div className="md:col-span-4 space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
        <h3 className="text-xl font-bold text-[#FEF7CD] mb-4 tracking-wide">HOTEL LIVING MODEL</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`hotel-living-${item.id}`} className="flex text-xs md:text-sm">
              <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">{item.id}.</span> 
              <span className="text-white/90">{item.hotelLiving}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
