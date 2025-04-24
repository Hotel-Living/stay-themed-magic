
import React from "react";
import { format } from "date-fns";

interface CalendarDateButtonProps {
  date: Date;
  isSelected: boolean;
  canSelect: boolean;
  isCheckout: boolean;
  onClick: () => void;
}

export function CalendarDateButton({ 
  date, 
  isSelected, 
  canSelect, 
  isCheckout,
  onClick 
}: CalendarDateButtonProps) {
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 rounded-md text-sm transition
        ${
          isSelected
            ? isCheckout
              ? "bg-fuchsia-800 text-white hover:bg-fuchsia-900"
              : "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
            : canSelect
              ? "bg-fuchsia-900/20 text-white hover:bg-fuchsia-700/70"
              : "bg-gray-400/30 text-white cursor-not-allowed opacity-50"
        }`}
      onClick={canSelect ? onClick : undefined}
      disabled={!canSelect}
    >
      {format(date, "EEE, MMM d, yyyy")}
      {isCheckout && (
        <span className="ml-2 text-xs font-medium">(Check-out only)</span>
      )}
    </button>
  );
}
