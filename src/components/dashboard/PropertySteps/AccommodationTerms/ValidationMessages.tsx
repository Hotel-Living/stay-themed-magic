
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ValidationMessagesProps {
  error: string;
  showErrors: boolean;
  isValid: boolean;
}

export default function ValidationMessages({
  error,
  showErrors,
  isValid
}: ValidationMessagesProps) {
  return (
    <>
      {/* Validation Messages - Only shown when errors exist and showErrors is true */}
      {error && showErrors && (
        <div className="p-3 rounded-md text-white flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      
      {isValid && (
        <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>
      )}
    </>
  );
}
