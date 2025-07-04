
import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

interface HotelTableProps {
  hotels: any[];
}

export const HotelTable: React.FC<HotelTableProps> = ({ hotels }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-purple-600">
            <th className="text-left p-3 text-white font-medium">Hotel Name</th>
            <th className="text-left p-3 text-white font-medium">Location</th>
            <th className="text-left p-3 text-white font-medium">Status</th>
            <th className="text-left p-3 text-white font-medium">Price/Month</th>
            <th className="text-left p-3 text-white font-medium">Category</th>
            <th className="text-left p-3 text-white font-medium">Owner</th>
            <th className="text-left p-3 text-white font-medium">Created</th>
            <th className="text-left p-3 text-white font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
              <td className="p-3">
                <div className="text-white font-medium">{hotel.name}</div>
                {hotel.is_featured && (
                  <span className="text-xs bg-yellow-500 text-yellow-900 px-2 py-1 rounded mt-1 inline-block">
                    Featured
                  </span>
                )}
              </td>
              <td className="p-3 text-white/80">
                {hotel.city}, {hotel.country}
              </td>
              <td className="p-3">
                <StatusBadge status={hotel.status} />
              </td>
              <td className="p-3 text-white/80">
                €{hotel.price_per_month || 'N/A'}
              </td>
              <td className="p-3 text-white/80">
                {hotel.category ? `${hotel.category} ⭐` : 'N/A'}
              </td>
              <td className="p-3 text-white/80">
                {hotel.profiles ? 
                  `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim() || 'Unknown'
                  : 'Unknown'
                }
              </td>
              <td className="p-3 text-white/80">
                {new Date(hotel.created_at).toLocaleDateString()}
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4" />
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
