import * as z from 'zod';

// Enhanced validation schema for 17-step hotel registration
export const hotelRegistrationValidationSchema = z.object({
  // Step 1: Basic Info - All address fields mandatory
  hotelName: z.string().min(1, 'Hotel name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  
  // Contact Info (optional in basic info)
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  
  // Step 2: Hotel Classification - Single selection required
  classification: z.string().min(1, 'Hotel classification must be selected'),
  
  // Step 3: Property Type - Single selection required
  propertyType: z.string().min(1, 'Property type must be selected'),
  
  // Step 4: Property Style - At least one selection required
  propertyStyle: z.string().min(1, 'At least one property style must be selected'),
  
  // Step 5: Hotel Description - Minimum 200 characters
  hotelDescription: z.string().min(200, 'Hotel description must be at least 200 characters'),
  
  // Step 6: Room Description - Minimum 100 characters  
  roomDescription: z.string().min(100, 'Room description must be at least 100 characters'),
  
  // Step 7: Complete Phrases - Three mandatory phrases, 40+ characters each
  idealGuests: z.string().min(40, 'Ideal guests description must be at least 40 characters'),
  atmosphere: z.string().min(40, 'Atmosphere description must be at least 40 characters'),
  location: z.string().min(40, 'Location description must be at least 40 characters'),
  
  // Step 8: Hotel Features - Minimum 5 required
  hotelFeatures: z.array(z.string()).min(5, 'At least 5 hotel features must be selected'),
  
  // Step 9: Room Features - Minimum 5 required
  roomFeatures: z.array(z.string()).min(5, 'At least 5 room features must be selected'),
  
  // Step 10: Client Affinities - Optional
  clientAffinities: z.array(z.string()).default([]),
  
  // Step 11: Activities - Optional
  activities: z.array(z.string()).default([]),
  
  // Step 12: Meal Plan + Laundry - 1 meal plan + 1 laundry option required
  mealPlan: z.string().min(1, 'Meal plan must be selected'),
  weeklyLaundryIncluded: z.boolean().default(false),
  externalLaundryAvailable: z.boolean().default(false),
  
  // Step 13: Stay Lengths - At least 1 required
  stayLengths: z.array(z.enum(['8', '15', '22', '29'])).min(1, 'At least one stay length must be selected'),
  
  // Step 14: Check-in Day - Exactly 1 required
  checkInDay: z.string().min(1, 'Check-in day must be selected'),
  
  // Step 15: Availability Packages - 1-40 packages, valid dates
  availabilityPackages: z.array(z.object({
    id: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    duration: z.number().min(1),
    availableRooms: z.number().min(1)
  })).min(1, 'At least 1 availability package is required').max(40, 'Maximum 40 availability packages allowed'),
  
  // Step 16: Image Uploads - 5+ hotel photos, 5+ room photos
  photos: z.object({
    hotel: z.array(z.any()).min(5, 'At least 5 hotel photos are required'),
    room: z.array(z.any()).min(5, 'At least 5 room photos are required')
  }),
  
  // Step 17: Pricing Matrix - All fields required
  pricingMatrix: z.array(z.object({
    duration: z.number(),
    doubleRoom: z.number().min(1, 'Double room price is required'),
    singleRoom: z.number().min(1, 'Single room price is required')
  })).min(1, 'Pricing matrix must be completed'),
  
  // Additional fields
  numberOfRooms: z.string().optional(),
  price_per_month: z.number().optional(),
  termsAccepted: z.boolean().refine(val => val === true, 'Terms and conditions must be accepted')
}).refine((data) => {
  // Custom validation: At least one laundry option must be selected
  return data.weeklyLaundryIncluded || data.externalLaundryAvailable;
}, {
  message: 'At least one laundry option must be selected',
  path: ['weeklyLaundryIncluded']
}).refine((data) => {
  // Custom validation: Pricing matrix must match selected stay lengths
  const selectedLengths = data.stayLengths.map(l => parseInt(l));
  const pricingDurations = data.pricingMatrix.map(p => p.duration);
  
  return selectedLengths.every(length => pricingDurations.includes(length));
}, {
  message: 'Pricing matrix must include all selected stay lengths',
  path: ['pricingMatrix']
}).refine((data) => {
  // Custom validation: All pricing matrix entries must have complete data
  return data.pricingMatrix.every(entry => 
    entry.doubleRoom > 0 && entry.singleRoom > 0
  );
}, {
  message: 'All pricing matrix entries must have both double and single room prices',
  path: ['pricingMatrix']
});

export type HotelRegistrationValidationData = z.infer<typeof hotelRegistrationValidationSchema>;

// Validation error type
export interface ValidationError {
  step: number;
  field: string;
  message: string;
  stepTitle: string;
}

// Step mapping for error display
export const STEP_MAPPING = {
  // Step 1
  hotelName: { step: 1, title: 'Basic Information' },
  address: { step: 1, title: 'Basic Information' },
  city: { step: 1, title: 'Basic Information' },
  postalCode: { step: 1, title: 'Basic Information' },
  country: { step: 1, title: 'Basic Information' },
  
  // Step 2
  classification: { step: 2, title: 'Hotel Classification' },
  
  // Step 3
  propertyType: { step: 3, title: 'Property Type' },
  
  // Step 4
  propertyStyle: { step: 4, title: 'Property Style' },
  
  // Step 5
  hotelDescription: { step: 5, title: 'Hotel Description' },
  
  // Step 6
  roomDescription: { step: 6, title: 'Room Description' },
  
  // Step 7
  idealGuests: { step: 7, title: 'Complete Phrases' },
  atmosphere: { step: 7, title: 'Complete Phrases' },
  location: { step: 7, title: 'Complete Phrases' },
  
  // Step 8
  hotelFeatures: { step: 8, title: 'Hotel Features' },
  
  // Step 9
  roomFeatures: { step: 9, title: 'Room Features' },
  
  // Step 10
  clientAffinities: { step: 10, title: 'Client Affinities' },
  
  // Step 11
  activities: { step: 11, title: 'Activities' },
  
  // Step 12
  mealPlan: { step: 12, title: 'Meal Plan & Services' },
  weeklyLaundryIncluded: { step: 12, title: 'Meal Plan & Services' },
  
  // Step 13
  stayLengths: { step: 13, title: 'Stay Lengths' },
  
  // Step 14
  checkInDay: { step: 14, title: 'Check-in Day' },
  
  // Step 15
  availabilityPackages: { step: 15, title: 'Availability Packages' },
  
  // Step 16
  photos: { step: 16, title: 'Image Uploads' },
  
  // Step 17
  pricingMatrix: { step: 17, title: 'Pricing Matrix' },
  
  // Terms
  termsAccepted: { step: 17, title: 'Terms & Conditions' }
};

// Accordion value mapping for navigation
export const STEP_ACCORDION_VALUES = {
  1: 'basic-info',
  2: 'hotel-classification',
  3: 'property-type',
  4: 'property-style',
  5: 'hotel-description',
  6: 'room-description',
  7: 'complete-phrases',
  8: 'hotel-features',
  9: 'room-features',
  10: 'client-affinities',
  11: 'activities',
  12: 'meal-plan',
  13: 'stay-lengths',
  14: 'check-in-day',
  15: 'availability-packages',
  16: 'image-uploads',
  17: 'pricing-matrix'
};