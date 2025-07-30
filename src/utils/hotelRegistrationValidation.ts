import { HotelRegistrationFormData } from '@/components/dashboard/hotel-registration/NewHotelRegistrationForm';

export interface ValidationResult {
  isValid: boolean;
  incompleteSteps: number[];
  errors: Record<string, string>;
}

export const validateHotelRegistration = (data: HotelRegistrationFormData): ValidationResult => {
  const incompleteSteps: number[] = [];
  const errors: Record<string, string> = {};

  // Step 1: All address fields are mandatory
  if (!data.hotelName?.trim() || !data.address?.trim() || !data.city?.trim() || !data.postalCode?.trim() || !data.country?.trim()) {
    incompleteSteps.push(1);
    errors.step1 = 'All address fields are required';
  }

  // Step 2: One single option must be selected (classification)
  if (!data.classification?.trim()) {
    incompleteSteps.push(2);
    errors.step2 = 'One classification must be selected';
  }

  // Step 3: One single option must be selected (property type)
  if (!data.propertyType?.trim()) {
    incompleteSteps.push(3);
    errors.step3 = 'One property type must be selected';
  }

  // Step 4: At least one option must be selected (property style)
  if (!data.propertyStyle?.trim()) {
    incompleteSteps.push(4);
    errors.step4 = 'At least one property style must be selected';
  }

  // Step 5: Minimum 200 characters required (hotel description)
  if (!data.hotelDescription?.trim() || data.hotelDescription.length < 200) {
    incompleteSteps.push(5);
    errors.step5 = 'Hotel description must be at least 200 characters';
  }

  // Step 6: Minimum 100 characters required (room description)
  if (!data.roomDescription?.trim() || data.roomDescription.length < 100) {
    incompleteSteps.push(6);
    errors.step6 = 'Room description must be at least 100 characters';
  }

  // Step 7: Three mandatory phrases, each with at least 40 characters
  const phrases = [data.idealGuests, data.atmosphere, data.location];
  const invalidPhrases = phrases.filter(phrase => !phrase?.trim() || phrase.length < 40);
  if (invalidPhrases.length > 0) {
    incompleteSteps.push(7);
    errors.step7 = 'All three phrases must be at least 40 characters each';
  }

  // Step 8: At least 5 hotel features must be selected
  if (!data.hotelFeatures || data.hotelFeatures.length < 5) {
    incompleteSteps.push(8);
    errors.step8 = 'At least 5 hotel features must be selected';
  }

  // Step 9: At least 5 room features must be selected
  if (!data.roomFeatures || data.roomFeatures.length < 5) {
    incompleteSteps.push(9);
    errors.step9 = 'At least 5 room features must be selected';
  }

  // Step 10: Optional (affinities) - no validation needed

  // Step 11: Optional (activities) - no validation needed

  // Step 12: At least 1 meal plan and 1 laundry option required
  const hasLaundry = data.weeklyLaundryIncluded || data.externalLaundryAvailable;
  if (!data.mealPlan?.trim() || !hasLaundry) {
    incompleteSteps.push(12);
    errors.step12 = 'At least 1 meal plan and 1 laundry option required';
  }

  // Step 13: At least 1 stay length option required
  if (!data.stayLengths || data.stayLengths.length === 0) {
    incompleteSteps.push(13);
    errors.step13 = 'At least 1 stay length option required';
  }

  // Step 14: Exactly 1 weekly check-in/out day required
  if (!data.checkInDay?.trim()) {
    incompleteSteps.push(14);
    errors.step14 = 'Exactly 1 weekly check-in/out day required';
  }

  // Step 15: At least 1 availability package required
  if (!data.availabilityPackages || data.availabilityPackages.length === 0) {
    incompleteSteps.push(15);
    errors.step15 = 'At least 1 availability package required';
  }

  // Step 16: Minimum 5 hotel photos and 5 room photos
  const hotelPhotos = data.photos?.hotel || [];
  const roomPhotos = data.photos?.room || [];
  if (hotelPhotos.length < 5 || roomPhotos.length < 5) {
    incompleteSteps.push(16);
    errors.step16 = 'Minimum 5 hotel photos and 5 room photos required';
  }

  // Step 17: All generated price fields in pricing matrix must be filled
  const pricingMatrix = data.pricingMatrix || [];
  const hasEmptyPrices = pricingMatrix.some((item: any) => 
    !item.price || item.price === 0 || item.price === '' || item.price === null
  );
  if (pricingMatrix.length === 0 || hasEmptyPrices) {
    incompleteSteps.push(17);
    errors.step17 = 'All pricing matrix fields must be filled';
  }

  return {
    isValid: incompleteSteps.length === 0,
    incompleteSteps,
    errors
  };
};

export const getStepRequirements = (step: number): string => {
  const requirements: Record<number, string> = {
    1: 'All address fields (hotel name, address, city, postal code, country) are required.',
    2: 'Select one hotel classification.',
    3: 'Select one property type.',
    4: 'Select one property style.',
    5: 'Hotel description must be at least 200 characters.',
    6: 'Room description must be at least 100 characters.',
    7: 'Complete all three phrases with at least 40 characters each.',
    8: 'Select at least 5 hotel features.',
    9: 'Select at least 5 room features.',
    10: 'Select any number of affinities (optional).',
    11: 'Select any number of activities (optional).',
    12: 'Select at least 1 meal plan and 1 laundry option.',
    13: 'Select at least 1 stay length option.',
    14: 'Select exactly 1 weekly check-in/out day.',
    15: 'Create at least 1 availability package (up to 40 allowed).',
    16: 'Upload minimum 5 hotel photos and 5 room photos.',
    17: 'Fill all pricing matrix fields with valid prices.'
  };
  
  return requirements[step] || '';
};