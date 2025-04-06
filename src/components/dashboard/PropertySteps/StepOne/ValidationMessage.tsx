
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ValidationMessageProps {
  errors: Record<string, string>;
}

export default function ValidationMessage({ errors }: ValidationMessageProps) {
  const hasErrors = Object.keys(errors).length > 0;
  
  if (hasErrors) {
    return (
      <div className="p-2 rounded-md text-white flex items-center gap-2 bg-[#041888]/[0.97]">
        <AlertCircle className="h-5 w-5" />
        <span className="text-white text-sm">Please complete all required fields</span>
      </div>
    );
  }
  
  return (
    <div className="p-2 rounded-md bg-green-400/20 text-green-500 flex items-center gap-2">
      <CheckCircle className="h-5 w-5" />
      <span>All required information has been provided</span>
    </div>
  );
}
