
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
    <>
      {/* Show error only when validation is attempted */}
      {error && showValidationError && (
        <div className="p-3 mt-4 rounded-md bg-purple-800/50 text-white flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      
      {roomTypesCount > 0 && !error && (
        <div className="p-3 mt-4 rounded-md bg-green-500/20 text-white flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>{roomTypesCount} room type(s) added successfully</span>
        </div>
      )}
    </>
  );
}
