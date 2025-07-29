import React from 'react';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';

interface StepStatusIndicatorProps {
  isValid: boolean;
  hasErrors: boolean;
  isComplete: boolean;
  className?: string;
}

export const StepStatusIndicator = ({ 
  isValid, 
  hasErrors, 
  isComplete, 
  className = '' 
}: StepStatusIndicatorProps) => {
  if (hasErrors) {
    return (
      <AlertCircle 
        className={`h-5 w-5 text-red-400 ${className}`}
        aria-label="Step has errors"
      />
    );
  }
  
  if (isValid && isComplete) {
    return (
      <CheckCircle 
        className={`h-5 w-5 text-green-400 ${className}`}
        aria-label="Step is complete"
      />
    );
  }
  
  return (
    <Circle 
      className={`h-5 w-5 text-white/40 ${className}`}
      aria-label="Step is incomplete"
    />
  );
};