
import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

interface HotelTableProps {
  hotels: any[];
}

export const HotelTable: React.FC<HotelTableProps> = ({ hotels }) => {
  return (
    <div className="overflow-x-auto max-w-6xl mx-auto">
      <table className="table-auto border-collapse" style={{ width: 'auto' }}>
        <thead>
          <tr className="border-b border-purple-600">
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '200px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Hotel Name</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '150px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Location</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '100px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Status</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '120px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Price/Month</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '100px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Category</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '120px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Owner</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '100px', resize: 'horizontal', overflow: 'hidden' }}>
              <div className="break-words">Created</div>
            </th>
            <th className="text-left px-2 py-2 text-white font-medium text-sm" style={{ width: '120px' }}>
              <div className="break-words">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="border-b border-purple-600/30 hover:bg-purple-800/20">
              <td className="px-2 py-2" style={{ maxWidth: '200px' }}>
                <div className="text-white font-medium text-sm break-words leading-tight">{hotel.name}</div>
                {hotel.is_featured && (
                  <span className="text-xs bg-yellow-500 text-yellow-900 px-1 py-0.5 rounded mt-1 inline-block">
                    Featured
                  </span>
                )}
              </td>
              <td className="px-2 py-2 text-white/80 text-sm" style={{ maxWidth: '150px' }}>
                <div className="break-words leading-tight">
                  {hotel.city}, {hotel.country}
                </div>
              </td>
              <td className="px-2 py-2" style={{ maxWidth: '100px' }}>
                <StatusBadge status={hotel.status} />
              </td>
              <td className="px-2 py-2 text-white/80 text-sm" style={{ maxWidth: '120px' }}>
                <div className="break-words leading-tight">
                  €{hotel.price_per_month || 'N/A'}
                </div>
              </td>
              <td className="px-2 py-2 text-white/80 text-sm" style={{ maxWidth: '100px' }}>
                <div className="break-words leading-tight">
                  {hotel.category ? `${hotel.category} ⭐` : 'N/A'}
                </div>
              </td>
              <td className="px-2 py-2 text-white/80 text-sm" style={{ maxWidth: '120px' }}>
                <div className="break-words leading-tight">
                  {hotel.profiles ? 
                    `${hotel.profiles.first_name || ''} ${hotel.profiles.last_name || ''}`.trim() || 'Unknown'
                    : 'Unknown'
                  }
                </div>
              </td>
              <td className="px-2 py-2 text-white/80 text-sm" style={{ maxWidth: '100px' }}>
                <div className="break-words leading-tight">
                  {new Date(hotel.created_at).toLocaleDateString()}
                </div>
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
