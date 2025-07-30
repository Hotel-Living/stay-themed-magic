
import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

interface HotelTableProps {
  hotels: any[];
}

export const HotelTable: React.FC<HotelTableProps> = ({ hotels }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-auto max-w-5xl mx-auto table-auto" style={{ width: 'auto' }}>
        <thead>
          <tr className="border-b border-purple-600">
            <th className="text-left px-2 py-2 text-white font-medium min-w-[120px] w-auto">Hotel Name</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[100px] w-auto">Location</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[80px] w-auto">Status</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[90px] w-auto">Price/Month</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[70px] w-auto">Category</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[80px] w-auto">Owner</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[80px] w-auto">Created</th>
            <th className="text-left px-2 py-2 text-white font-medium min-w-[100px] w-auto">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
              <td className="px-2 py-2 max-w-[150px]">
                <div className="text-white font-medium truncate" title={hotel.name}>{hotel.name}</div>
                {hotel.is_featured && (
                  <span className="text-xs bg-yellow-500 text-yellow-900 px-1 py-0.5 rounded mt-1 inline-block">
                    Featured
                  </span>
                )}
              </td>
              <td className="px-2 py-2 text-white/80 max-w-[120px]">
                <div className="truncate" title={`${hotel.city}, ${hotel.country}`}>
                  {hotel.city}, {hotel.country}
                </div>
              </td>
              <td className="px-2 py-2">
                <StatusBadge status={hotel.status} />
              </td>
              <td className="px-2 py-2 text-white/80">
                €{hotel.price_per_month || 'N/A'}
              </td>
              <td className="px-2 py-2 text-white/80">
                {hotel.category ? `${hotel.category} ⭐` : 'N/A'}
              </td>
              <td className="px-2 py-2 text-white/80 max-w-[100px]">
                <div className="truncate" title={hotel.profiles ? 
                  `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim() || 'Unknown'
                  : 'Unknown'}>
                  {hotel.profiles ? 
                    `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim() || 'Unknown'
                    : 'Unknown'
                  }
                </div>
              </td>
              <td className="px-2 py-2 text-white/80">
                {new Date(hotel.created_at).toLocaleDateString()}
              </td>
              <td className="px-2 py-2">
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" className="h-7 w-7 p-0 bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
