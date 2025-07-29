import React from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ValidationError } from '../validation/hotelRegistrationValidation';

interface ValidationSummaryProps {
  errors: ValidationError[];
  totalErrorCount: number;
  stepsWithErrors: number[];
  onNavigateToStep: (step: number) => void;
  onClose: () => void;
  isVisible: boolean;
}

export const ValidationSummary = ({
  errors,
  totalErrorCount,
  stepsWithErrors,
  onNavigateToStep,
  onClose,
  isVisible
}: ValidationSummaryProps) => {
  
  if (!isVisible || totalErrorCount === 0) {
    return null;
  }

  // Group errors by step
  const errorsByStep = errors.reduce((acc, error) => {
    if (!acc[error.step]) {
      acc[error.step] = [];
    }
    acc[error.step].push(error);
    return acc;
  }, {} as Record<number, ValidationError[]>);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-3xl w-full max-h-[80vh] overflow-hidden bg-white border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <CardTitle className="text-red-800">
                Validation Errors ({totalErrorCount})
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-red-600 hover:text-red-800 hover:bg-red-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Please complete the following required fields before submitting your hotel registration:
              </p>
              
              <div className="space-y-4">
                {stepsWithErrors.map((stepNumber) => {
                  const stepErrors = errorsByStep[stepNumber] || [];
                  const stepTitle = stepErrors[0]?.stepTitle || `Step ${stepNumber}`;
                  
                  return (
                    <div key={stepNumber} className="border border-gray-200 rounded-lg">
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                        onClick={() => onNavigateToStep(stepNumber)}
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant="destructive" className="text-xs">
                            Step {stepNumber}
                          </Badge>
                          <span className="font-medium text-gray-800">
                            {stepTitle}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {stepErrors.length} error{stepErrors.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      
                      <div className="p-4 space-y-2">
                        {stepErrors.map((error, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">{error.field}:</span> {error.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Click on any step above to navigate directly to the errors
                </p>
                <div className="space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button 
                    onClick={() => onNavigateToStep(stepsWithErrors[0])}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Fix First Error
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};