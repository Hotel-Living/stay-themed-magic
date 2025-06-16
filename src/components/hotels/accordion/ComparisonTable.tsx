
import React from 'react';
import { ComparisonItem } from './types';
import { useTranslation } from "@/hooks/useTranslation";

interface ComparisonTableProps {
  items: ComparisonItem[];
}

export function ComparisonTable({ items }: ComparisonTableProps) {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-[#460F54]/10 rounded-lg p-6 overflow-visible py-4">
      {/* Traditional Model Column */}
      <div className="space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
        <h3 className="text-xl font-bold text-[#FEF7CD] mb-4 tracking-wide">{t('hotels.accordion.comparison.traditional')}</h3>
        <ul className="space-y-3 pr-2">
          {items.map((item) => (
            <li key={`traditional-${item.id}`} className="flex text-xs md:text-sm whitespace-nowrap">
              <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">{item.id}.</span> 
              <span className="text-white/90">{item.traditional}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Hotel Living Model Column */}
      <div className="space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
        <h3 className="text-xl font-bold text-[#FEF7CD] mb-4 tracking-wide">{t('hotels.accordion.comparison.hotelLiving')}</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`hotel-living-${item.id}`} className="flex text-xs md:text-sm whitespace-nowrap">
              <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">{item.id}.</span> 
              <span className="text-white/90">{item.hotelLiving}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
