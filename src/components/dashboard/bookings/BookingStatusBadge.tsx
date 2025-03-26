
import React from 'react';
import { Calendar, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const statusIcons = {
    confirmed: <Check className="h-4 w-4" />,
    pending: <Calendar className="h-4 w-4" />,
    cancelled: <Trash2 className="h-4 w-4" />,
    completed: <Check className="h-4 w-4" />,
  };

  return (
    <div className={cn(
      "px-2 py-1 text-xs rounded-full flex items-center gap-1",
      status === 'confirmed' ? "bg-green-500/20 text-green-300" : 
      status === 'pending' ? "bg-amber-500/20 text-amber-300" :
      status === 'completed' ? "bg-blue-500/20 text-blue-300" :
      "bg-red-500/20 text-red-300"
    )}>
      {statusIcons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default BookingStatusBadge;
