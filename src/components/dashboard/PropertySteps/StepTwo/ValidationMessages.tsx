
import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ValidationMessagesProps {
  error: string;
  showValidationError: boolean;
  roomTypesCount: number;
}

export default function ValidationMessages({
  error,
  showValidationError,
  roomTypesCount
}: ValidationMessagesProps) {
  return (
    <div className="mt-4">
      {error && showValidationError && (
        <div className="p-3 rounded-md bg-red-500/20 text-red-200 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>Please add at least one room type with Affinities to proceed</span>
        </div>
      )}
      
      {roomTypesCount > 0 && !error && (
        <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>Room types added successfully!</span>
        </div>
      )}
    </div>
  );
}
