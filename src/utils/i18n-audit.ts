// COMPREHENSIVE I18N AUDIT FOR ADD PROPERTY INTERFACE
// This file documents all translation keys currently being used vs what should be used

export const i18nAudit = {
  // 1. AFFINITIES SECTION (AffinitiesSection.tsx)
  affinities: {
    currentlyUsing: [
      't("affinities.title")',
      't("affinities.description")',
      't("affinities.moreInformation")',
      't("affinities.personalDevelopment")',
      't("affinities.relationships")',
      't("affinities.scienceTechnology")',
      // PROBLEM: Using activities.* keys for affinity subcategories
      't("activities.art")',
      't("activities.painting")',
      't("activities.sculpture")',
      // ... many more activities.* keys
    ],
    shouldBeUsing: [
      't("affinities.title")',
      't("affinities.description")',
      't("affinities.moreInformation")',
      't("affinities.personalDevelopment")',
      't("affinities.relationships")',
      't("affinities.scienceTechnology")',
      // Should use dedicated affinity keys or keep using activities if that's the design
    ],
    hardcodedStrings: [] // None found - good!
  },

  // 2. ACTIVITIES SECTION (HierarchicalActivitiesDisplay.tsx & ActivitiesSection.tsx)
  activities: {
    currentlyUsing: [
      't("activities.title")',
      't("activities.selectAvailableActivities")',
      't("activities.interior")',
      't("activities.artCreativity")',
      't("activities.cinemaMedia")',
      't("activities.cookingFood")',
      't("activities.fitnessMovement")',
      't("activities.gamesEntertainment")',
      't("activities.languageActivities")',
      't("activities.learningTalks")',
      't("activities.mindBalance")',
      't("activities.musicStage")',
      't("activities.techScience")',
      't("activities.wellnessCare")',
      // Comprehensive subcategory keys - these look correct
    ],
    shouldBeUsing: [
      // Current usage appears correct
    ],
    hardcodedStrings: [] // None found - good!
  },

  // 3. HOTEL FEATURES (HotelFeaturesStep.tsx & FeaturesList.tsx)
  hotelFeatures: {
    currentlyUsing: [
      't("hotelFeatures.title")', // NEEDS VERIFICATION - is this key defined?
      't("hotelFeatures.selectAll")', // NEEDS VERIFICATION
      't("hotelFeatures.deselectAll")', // NEEDS VERIFICATION
      // Individual features using dynamic keys:
      't(`hotelFeatures.${feature}`)', // Where feature = "Free WiFi", "Parking", etc.
    ],
    shouldBeUsing: [
      // Need to verify if hotelFeatures.* keys exist in translation files
    ],
    hardcodedStrings: [
      // Individual feature names like "Free WiFi", "Parking", "Restaurant" etc.
      // These are in featuresData.ts and need translation keys
    ]
  },

  // 4. ROOM FEATURES (HotelFeaturesStep.tsx & FeaturesList.tsx)
  roomFeatures: {
    currentlyUsing: [
      't("roomFeatures.title")', // NEEDS VERIFICATION
      // Individual features using dynamic keys:
      't(`hotelFeatures.${feature}`)', // PROBLEM: Using hotelFeatures key for room features
    ],
    shouldBeUsing: [
      't("roomFeatures.title")',
      't(`roomFeatures.${feature}`)', // Should use roomFeatures namespace
    ],
    hardcodedStrings: [
      // Individual room feature names from featuresData.ts
      // Like "Air Conditioning", "Private Bathroom", "TV", etc.
    ]
  },

  // 5. STEP NAVIGATION & GENERAL FORM
  stepNavigation: {
    currentlyUsing: [
      // NEEDS INVESTIGATION - likely hardcoded
    ],
    shouldBeUsing: [
      't("propertyForm.step1")',
      't("propertyForm.step2")',
      't("propertyForm.step3")',
      't("propertyForm.previousStep")',
      't("propertyForm.nextStep")',
      't("propertyForm.submit")',
    ],
    hardcodedStrings: [
      // Likely many hardcoded strings in navigation
    ]
  },

  // 6. ACCOMMODATION TERMS
  accommodationTerms: {
    currentlyUsing: [
      't("accommodation.lengthOfStay")',
      't("accommodation.selectStayDurations")',
      't("accommodation.preferredWeekday")',
      't("accommodation.selectPreferredDay")',
      't("accommodation.availabilityDates")',
      't("accommodation.selectAvailableDates")',
    ],
    shouldBeUsing: [
      // Current usage looks correct
    ],
    hardcodedStrings: [] // None found - good!
  },

  // 7. ROOM TYPES & PRICING
  roomTypes: {
    currentlyUsing: [
      // NEEDS INVESTIGATION - likely hardcoded
    ],
    shouldBeUsing: [
      't("roomTypes.title")',
      't("roomTypes.addRoom")',
      't("roomTypes.roomName")',
      't("roomTypes.basePrice")',
      't("roomTypes.capacity")',
      't("roomTypes.description")',
    ],
    hardcodedStrings: [
      // Likely many hardcoded strings in room management
    ]
  }
};

// CRITICAL MISSING TRANSLATION NAMESPACES
export const missingTranslationNamespaces = [
  'hotelFeatures', // For hotel amenities
  'roomFeatures',  // For room amenities
  'propertyForm',  // For form navigation and labels
  'roomTypes',     // For room management
  'validation',    // For error messages
  'pricing',       // For pricing related text
];

// HARDCODED STRINGS THAT NEED TRANSLATION KEYS
export const hardcodedStringsNeedingKeys = {
  hotelFeatures: [
    "Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", 
    "24/7 Reception", "Room Service", "Bar", "Lounge", 
    "Business Center", "Conference Rooms", "Laundry Service",
    "Concierge", "Airport Shuttle", "Pet Friendly",
    // ... all from featuresData.ts
  ],
  roomFeatures: [
    "Air Conditioning", "Private Bathroom", "TV", "Safe", "Mini Bar", 
    "Coffee Machine", "Kettle", "Hairdryer", "Iron", "Work Desk",
    // ... all from featuresData.ts
  ],
  stepTitles: [
    // Likely hardcoded step titles
  ],
  formLabels: [
    // Various form labels throughout the interface
  ]
};

export default i18nAudit;
