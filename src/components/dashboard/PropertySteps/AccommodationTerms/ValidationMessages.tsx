
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ValidationMessagesProps {
  hasStayLengths?: boolean;
  hasMealPlans?: boolean;
  hasRoomTypes?: boolean;
  error?: string;
  showErrors?: boolean;
  isValid?: boolean;
}

export default function ValidationMessages({
  hasStayLengths,
  hasMealPlans,
  hasRoomTypes,
  error,
  showErrors,
  isValid
}: ValidationMessagesProps) {
  // If we have the individual flags, use them to determine overall validity
  const calculatedIsValid = hasStayLengths !== undefined && 
                           hasMealPlans !== undefined && 
                           hasRoomTypes !== undefined ? 
                           (hasStayLengths && hasMealPlans && hasRoomTypes) : 
                           isValid;

  // Show specific validation messages based on fields
  const showFieldErrors = hasStayLengths !== undefined && !hasStayLengths || 
                         hasMealPlans !== undefined && !hasMealPlans || 
                         hasRoomTypes !== undefined && !hasRoomTypes;

  return (
    <>
      {/* Field-specific validation */}
      {showFieldErrors && (
        <div className="p-3 rounded-md text-white flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>
            {!hasStayLengths && "Length of Stay is required. "}
            {!hasMealPlans && "Meal Plans are required. "}
            {!hasRoomTypes && "Room Types are required."}
          </span>
        </div>
      )}
      
      {/* Generic error message */}
      {error && showErrors && (
        <div className="p-3 rounded-md text-white flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      
      {calculatedIsValid && (
        <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>
      )}
    </>
  );
}
