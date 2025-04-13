
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">TRADITIONAL MODEL</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`traditional-${item.id}`} className="flex text-lg">
              <span className="font-bold mr-2">{item.id}.</span> {item.traditional}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">HOTEL LIVING MODEL</h3>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`hotel-living-${item.id}`} className="flex text-lg">
              <span className="font-bold mr-2">{item.id}.</span> {item.hotelLiving}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
