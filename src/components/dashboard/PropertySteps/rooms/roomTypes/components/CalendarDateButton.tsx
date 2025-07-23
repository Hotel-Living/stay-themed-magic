
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface CalendarDateButtonProps {
  date: Date;
  isSelected: boolean;
  canSelect: boolean;
  isCheckout?: boolean;
  isExcluded?: boolean;
  onClick: () => void;
}

export function CalendarDateButton({
  date,
  isSelected,
  canSelect,
  isCheckout = false,
  isExcluded = false,
  onClick
}: CalendarDateButtonProps) {
  const getButtonVariant = () => {
    if (isExcluded) return "secondary";
    if (isSelected) return "default";
    return "outline";
  };

  const getButtonClassName = () => {
    let className = "w-full justify-start text-left h-auto p-3 ";
    
    if (isExcluded) {
      className += "opacity-50 cursor-not-allowed bg-gray-600 text-gray-400";
    } else if (isSelected) {
      className += isCheckout 
        ? "bg-red-600 hover:bg-red-700 text-white" 
        : "bg-green-600 hover:bg-green-700 text-white";
    } else if (canSelect) {
      className += "hover:bg-purple-600/50";
    } else {
      className += "opacity-50 cursor-not-allowed";
    }
    
    return className;
  };

  const getDisplayText = () => {
    const dateStr = format(date, "EEE, MMM d, yyyy");
    if (isExcluded) return `${dateStr} (No disponible)`;
    if (isCheckout) return `${dateStr} (Solo check-out)`;
    return dateStr;
  };

  return (
    <Button
      variant={getButtonVariant()}
      className={getButtonClassName()}
      onClick={onClick}
      disabled={isExcluded || (!isSelected && !canSelect)}
    >
      {getDisplayText()}
    </Button>
  );
}
