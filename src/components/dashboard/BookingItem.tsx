import React from 'react';
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
interface BookingItemProps {
  name: string;
  dates: string;
  property: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}
export const BookingItem = ({
  name,
  dates,
  property,
  status
}: BookingItemProps) => {
  return <div className="flex items-start p-3 rounded-lg border border-fuchsia-800/20 bg-[#f1d5f8]">
      <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center mr-3">
        <Calendar className="w-5 h-5 text-fuchsia-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-[#096e13] font-bold text-lg">{name}</p>
        <p className="truncate text-[#034a0a] text-base font-medium">{property}</p>
        <p className="text-[#044f0b] font-medium text-base">{dates}</p>
      </div>
      <div className={cn("px-2 py-1 text-xs rounded-full", status === 'confirmed' ? "bg-green-500/20 text-green-300" : status === 'pending' ? "bg-amber-500/20 text-amber-300" : "bg-red-500/20 text-red-300")}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>;
};
export default BookingItem;