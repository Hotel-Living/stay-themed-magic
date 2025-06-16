
// ANALYSIS OF MISSING TRANSLATION KEYS
// Based on examination of Add Property components

export const missingTranslationKeysAnalysis = {
  // 1. FEATURES DATA - Currently all hardcoded
  featuresData: {
    file: 'src/components/dashboard/PropertySteps/features/featuresData.ts',
    issue: 'All feature names are hardcoded English strings',
    solution: 'Need translation keys for each feature',
    hotelFeatures: [
      { english: "Free WiFi", key: "hotelFeatures.freeWifi" },
      { english: "Parking", key: "hotelFeatures.parking" },
      { english: "Restaurant", key: "hotelFeatures.restaurant" },
      { english: "Pool", key: "hotelFeatures.pool" },
      { english: "Spa", key: "hotelFeatures.spa" },
      { english: "Gym", key: "hotelFeatures.gym" },
      { english: "24/7 Reception", key: "hotelFeatures.reception24h" },
      { english: "Room Service", key: "hotelFeatures.roomService" },
      { english: "Bar", key: "hotelFeatures.bar" },
      { english: "Lounge", key: "hotelFeatures.lounge" },
      { english: "Business Center", key: "hotelFeatures.businessCenter" },
      { english: "Conference Rooms", key: "hotelFeatures.conferenceRooms" },
      { english: "Laundry Service", key: "hotelFeatures.laundryService" },
      { english: "Concierge", key: "hotelFeatures.concierge" },
      { english: "Airport Shuttle", key: "hotelFeatures.airportShuttle" },
      { english: "Pet Friendly", key: "hotelFeatures.petFriendly" },
      { english: "Beach Access", key: "hotelFeatures.beachAccess" },
      { english: "Mountain View", key: "hotelFeatures.mountainView" },
      { english: "Garden", key: "hotelFeatures.garden" },
      { english: "Terrace", key: "hotelFeatures.terrace" },
      { english: "Fitness Center", key: "hotelFeatures.fitnessCenter" },
      { english: "Sauna", key: "hotelFeatures.sauna" },
      { english: "Hot Tub", key: "hotelFeatures.hotTub" },
      { english: "Steam Room", key: "hotelFeatures.steamRoom" },
      { english: "Tennis Court", key: "hotelFeatures.tennisCourt" },
      { english: "Golf Course", key: "hotelFeatures.golfCourse" },
      { english: "Kids Club", key: "hotelFeatures.kidsClub" },
      { english: "Playground", key: "hotelFeatures.playground" },
      { english: "Babysitting Service", key: "hotelFeatures.babysittingService" },
      { english: "Currency Exchange", key: "hotelFeatures.currencyExchange" },
      { english: "Gift Shop", key: "hotelFeatures.giftShop" },
      { english: "Library", key: "hotelFeatures.library" }
    ],
    roomFeatures: [
      { english: "Air Conditioning", key: "roomFeatures.airConditioning" },
      { english: "Private Bathroom", key: "roomFeatures.privateBathroom" },
      { english: "TV", key: "roomFeatures.tv" },
      { english: "Safe", key: "roomFeatures.safe" },
      { english: "Mini Bar", key: "roomFeatures.miniBar" },
      { english: "Coffee Machine", key: "roomFeatures.coffeeMachine" },
      { english: "Kettle", key: "roomFeatures.kettle" },
      { english: "Hairdryer", key: "roomFeatures.hairdryer" },
      { english: "Iron", key: "roomFeatures.iron" },
      { english: "Work Desk", key: "roomFeatures.workDesk" },
      { english: "Balcony", key: "roomFeatures.balcony" },
      { english: "Sea View", key: "roomFeatures.seaView" },
      { english: "Mountain View", key: "roomFeatures.mountainView" },
      { english: "City View", key: "roomFeatures.cityView" },
      { english: "Bathtub", key: "roomFeatures.bathtub" },
      { english: "Walk-in Shower", key: "roomFeatures.walkInShower" },
      { english: "King Bed", key: "roomFeatures.kingBed" },
      { english: "Queen Bed", key: "roomFeatures.queenBed" },
      { english: "Twin Beds", key: "roomFeatures.twinBeds" },
      { english: "Sofa Bed", key: "roomFeatures.sofaBed" },
      { english: "High-speed Internet", key: "roomFeatures.highSpeedInternet" },
      { english: "Blackout Curtains", key: "roomFeatures.blackoutCurtains" },
      { english: "Soundproof", key: "roomFeatures.soundproof" },
      { english: "Room Service", key: "roomFeatures.roomService" },
      { english: "Pillow Menu", key: "roomFeatures.pillowMenu" },
      { english: "Turndown Service", key: "roomFeatures.turndownService" },
      { english: "Alarm Clock", key: "roomFeatures.alarmClock" },
      { english: "Phone", key: "roomFeatures.phone" },
      { english: "Interconnecting Rooms", key: "roomFeatures.interconnectingRooms" },
      { english: "Crib Available", key: "roomFeatures.cribAvailable" },
      { english: "Rollaway Beds", key: "roomFeatures.rollawayBeds" },
      { english: "Hypoallergenic Bedding", key: "roomFeatures.hypoallergenicBedding" },
      { english: "Robes & Slippers", key: "roomFeatures.robesSlippers" },
      { english: "Premium Toiletries", key: "roomFeatures.premiumToiletries" }
    ]
  },

  // 2. FEATURES LIST COMPONENT
  featuresList: {
    file: 'src/components/dashboard/PropertySteps/features/FeaturesList.tsx',
    issue: 'Uses dynamic key generation that may not match existing translations',
    currentImplementation: 't(`hotelFeatures.${feature}`)',
    problem: 'Feature variable contains spaces and special characters that don\'t match key format',
    solution: 'Need proper key mapping function'
  },

  // 3. STEP TITLES
  stepTitles: {
    file: 'Various step components',
    issue: 'Step titles likely hardcoded',
    needsKeys: [
      'step1.title', 'step2.title', 'step3.title', 'step4.title', 'step5.title', 'step6.title'
    ]
  }
};

// RECOMMENDED SOLUTION APPROACH
export const solutionApproach = {
  phase1: 'Fix key binding in existing components',
  phase2: 'Add missing translation keys to JSON files',
  phase3: 'Create proper key mapping functions',
  
  keyMappingStrategy: {
    description: 'Create functions to map English feature names to translation keys',
    example: 'mapFeatureToKey("Free WiFi") => "hotelFeatures.freeWifi"'
  }
};

export default missingTranslationKeysAnalysis;
