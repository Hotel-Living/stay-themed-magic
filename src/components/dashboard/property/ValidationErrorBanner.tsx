
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ValidationErrorBannerProps {
  errorFields: string[];
}

const ValidationErrorBanner: React.FC<ValidationErrorBannerProps> = ({ errorFields }) => {
  if (errorFields.length === 0) return null;

  return (
    <Alert variant="destructive" className="bg-[#7A0486] text-white border-white">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 mt-1 text-white" />
        <div>
          <AlertTitle className="text-white font-bold">Please complete all required fields:</AlertTitle>
          <AlertDescription className="text-white mt-2">
            <ul className="list-disc list-inside space-y-1">
              {errorFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default ValidationErrorBanner;
