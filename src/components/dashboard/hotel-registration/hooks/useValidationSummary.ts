import { useState, useCallback } from 'react';
import { ZodError } from 'zod';
import { 
  hotelRegistrationValidationSchema, 
  ValidationError, 
  STEP_MAPPING,
  STEP_ACCORDION_VALUES
} from '../validation/hotelRegistrationValidation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

export const useValidationSummary = () => {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValidationComplete, setIsValidationComplete] = useState(false);
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  const validateAllSteps = useCallback((formData: HotelRegistrationFormData): boolean => {
    try {
      // Parse with the validation schema
      hotelRegistrationValidationSchema.parse(formData);
      
      // If we reach here, validation passed
      setValidationErrors([]);
      setIsValidationComplete(true);
      setShowValidationSummary(false);
      return true;
      
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ValidationError[] = error.errors.map(err => {
          const fieldPath = err.path.join('.');
          const stepInfo = STEP_MAPPING[fieldPath as keyof typeof STEP_MAPPING] || { step: 1, title: 'Unknown' };
          
          return {
            step: stepInfo.step,
            field: fieldPath,
            message: err.message,
            stepTitle: stepInfo.title
          };
        });
        
        setValidationErrors(errors);
        setIsValidationComplete(false);
        setShowValidationSummary(true);
        return false;
      }
      
      // Unexpected error
      console.error('Validation error:', error);
      return false;
    }
  }, []);

  const getErrorsByStep = useCallback((step: number): ValidationError[] => {
    return validationErrors.filter(error => error.step === step);
  }, [validationErrors]);

  const hasErrorsInStep = useCallback((step: number): boolean => {
    return validationErrors.some(error => error.step === step);
  }, [validationErrors]);

  const getStepsWithErrors = useCallback((): number[] => {
    const steps = new Set(validationErrors.map(error => error.step));
    return Array.from(steps).sort();
  }, [validationErrors]);

  const getTotalErrorCount = useCallback((): number => {
    return validationErrors.length;
  }, [validationErrors]);

  const getAccordionValueForStep = useCallback((step: number): string => {
    return STEP_ACCORDION_VALUES[step as keyof typeof STEP_ACCORDION_VALUES] || '';
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors([]);
    setIsValidationComplete(false);
    setShowValidationSummary(false);
  }, []);

  return {
    validationErrors,
    isValidationComplete,
    showValidationSummary,
    validateAllSteps,
    getErrorsByStep,
    hasErrorsInStep,
    getStepsWithErrors,
    getTotalErrorCount,
    getAccordionValueForStep,
    clearValidationErrors,
    setShowValidationSummary
  };
};