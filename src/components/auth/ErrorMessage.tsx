
import React from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-destructive/15 text-destructive p-3 rounded-lg mb-6">
      {message}
    </div>
  );
};
