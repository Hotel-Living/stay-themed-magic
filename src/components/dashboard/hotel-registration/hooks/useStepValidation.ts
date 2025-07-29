import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface StepValidationState {
  isValid: boolean;
  hasErrors: boolean;
  isComplete: boolean;
}

export const useStepValidation = (
  form: UseFormReturn<HotelRegistrationFormData>,
  validationErrors: any[] = []
) => {
  const formData = form.watch();

  const getStepValidation = useMemo(() => {
    const getValidationForStep = (step: number): StepValidationState => {
      const stepErrors = validationErrors.filter(err => err.step === step);
      const hasErrors = stepErrors.length > 0;

      switch (step) {
        case 1: {
          // Step 1: All address fields mandatory
          const required = ['hotelName', 'address', 'city', 'postalCode', 'country'];
          const completed = required.every(field => formData[field as keyof typeof formData]?.toString().trim());
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 2: {
          // Step 2: Hotel Classification - single selection
          const completed = !!formData.classification;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 3: {
          // Step 3: Property Type - single selection
          const completed = !!formData.propertyType;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 4: {
          // Step 4: Property Style - at least one selection
          const completed = !!formData.propertyStyle;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 5: {
          // Step 5: Hotel Description - minimum 200 characters
          const completed = (formData.hotelDescription?.length || 0) >= 200;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 6: {
          // Step 6: Room Description - minimum 100 characters
          const completed = (formData.roomDescription?.length || 0) >= 100;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 7: {
          // Step 7: Complete Phrases - 3 fields, 40+ characters each
          const completed = (formData.idealGuests?.length || 0) >= 40 &&
                           (formData.atmosphere?.length || 0) >= 40 &&
                           (formData.location?.length || 0) >= 40;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 8: {
          // Step 8: Hotel Features - minimum 5 required
          const completed = (formData.hotelFeatures?.length || 0) >= 5;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 9: {
          // Step 9: Room Features - minimum 5 required
          const completed = (formData.roomFeatures?.length || 0) >= 5;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 10: {
          // Step 10: Client Affinities - optional
          return {
            isValid: true,
            hasErrors: false,
            isComplete: true
          };
        }
        
        case 11: {
          // Step 11: Activities - optional
          return {
            isValid: true,
            hasErrors: false,
            isComplete: true
          };
        }
        
        case 12: {
          // Step 12: Meal Plan + Laundry - 1 meal plan + 1 laundry option
          const mealPlanSelected = !!formData.mealPlan;
          const laundrySelected = formData.weeklyLaundryIncluded || formData.externalLaundryAvailable;
          const completed = mealPlanSelected && laundrySelected;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 13: {
          // Step 13: Stay Lengths - at least 1 required
          const completed = (formData.stayLengths?.length || 0) >= 1;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 14: {
          // Step 14: Check-in Day - exactly 1 required
          const completed = !!formData.checkInDay;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 15: {
          // Step 15: Availability Packages - 1-40 packages
          const packageCount = formData.availabilityPackages?.length || 0;
          const completed = packageCount >= 1 && packageCount <= 40;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 16: {
          // Step 16: Image Uploads - 5+ hotel photos, 5+ room photos
          const hotelPhotos = formData.photos?.hotel?.length || 0;
          const roomPhotos = formData.photos?.room?.length || 0;
          const completed = hotelPhotos >= 5 && roomPhotos >= 5;
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        case 17: {
          // Step 17: Pricing Matrix - all fields filled
          const pricingMatrix = formData.pricingMatrix || [];
          const stayLengths = formData.stayLengths || [];
          const expectedRows = stayLengths.length;
          const completed = pricingMatrix.length === expectedRows && 
                           pricingMatrix.every((row: any) => 
                             row.doubleRoom && row.singleRoom && 
                             row.doubleRoom > 0 && row.singleRoom > 0
                           );
          return {
            isValid: completed && !hasErrors,
            hasErrors,
            isComplete: completed
          };
        }
        
        default:
          return {
            isValid: false,
            hasErrors: false,
            isComplete: false
          };
      }
    };

    return getValidationForStep;
  }, [formData, validationErrors]);

  return { getStepValidation };
};