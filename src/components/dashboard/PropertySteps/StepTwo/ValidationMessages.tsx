
import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ValidationMessagesProps {
  message: string;
  error?: string;
  showValidationError?: boolean;
  roomTypesCount?: number;
}

export default function ValidationMessages({
  message,
  error,
  showValidationError = false,
  roomTypesCount = 0
}: ValidationMessagesProps) {
  return (
    <div className="mt-4">
      {message && (
        <div className="p-3 rounded-md bg-red-500/20 text-red-200 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{message}</span>
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
