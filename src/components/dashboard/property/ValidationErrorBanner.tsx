
import React from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface ValidationErrorBannerProps {
  errorFields: string[];
  isWarning?: boolean;
}

export default function ValidationErrorBanner({
  errorFields,
  isWarning = false
}: ValidationErrorBannerProps) {
  if (errorFields.length === 0) return null;
  
  return (
    <div className={`mb-6 p-4 border rounded-md ${
      isWarning ? 'bg-yellow-900/20 border-yellow-600/30' : 'bg-[#7A0486] border-red-500/30'
    } text-white py-[3px]`}>
      <div className="flex items-start gap-2">
        {isWarning ? (
          <AlertTriangle className="h-5 w-5 mt-0.5 text-yellow-500" />
        ) : (
          <AlertCircle className="h-5 w-5 mt-0.5 text-red-500" />
        )}
        <div>
          <p className="font-medium text-sm">
            {isWarning 
              ? 'The following fields are incomplete (you can continue, but they will be required before final submission):'
              : 'Please complete all required fields:'}
          </p>
          <ul className="list-disc pl-5 mt-2">
            {errorFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
