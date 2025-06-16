
// Map English feature names to translation keys
export const mapHotelFeatureToKey = (featureName: string): string => {
  const mapping: Record<string, string> = {
    "Free WiFi": "hotelFeatures.freeWifi",
    "Parking": "hotelFeatures.parking",
    "Restaurant": "hotelFeatures.restaurant",
    "Pool": "hotelFeatures.pool",
    "Spa": "hotelFeatures.spa",
    "Gym": "hotelFeatures.gym",
    "24/7 Reception": "hotelFeatures.reception24h",
    "Room Service": "hotelFeatures.roomService",
    "Bar": "hotelFeatures.bar",
    "Lounge": "hotelFeatures.lounge",
    "Business Center": "hotelFeatures.businessCenter",
    "Conference Rooms": "hotelFeatures.conferenceRooms",
    "Laundry Service": "hotelFeatures.laundryService",
    "Concierge": "hotelFeatures.concierge",
    "Airport Shuttle": "hotelFeatures.airportShuttle",
    "Pet Friendly": "hotelFeatures.petFriendly",
    "Beach Access": "hotelFeatures.beachAccess",
    "Mountain View": "hotelFeatures.mountainView",
    "Garden": "hotelFeatures.garden",
    "Terrace": "hotelFeatures.terrace",
    "Fitness Center": "hotelFeatures.fitnessCenter",
    "Sauna": "hotelFeatures.sauna",
    "Hot Tub": "hotelFeatures.hotTub",
    "Steam Room": "hotelFeatures.steamRoom",
    "Tennis Court": "hotelFeatures.tennisCourt",
    "Golf Course": "hotelFeatures.golfCourse",
    "Kids Club": "hotelFeatures.kidsClub",
    "Playground": "hotelFeatures.playground",
    "Babysitting Service": "hotelFeatures.babysittingService",
    "Currency Exchange": "hotelFeatures.currencyExchange",
    "Gift Shop": "hotelFeatures.giftShop",
    "Library": "hotelFeatures.library"
  };
  
  return mapping[featureName] || featureName;
};

export const mapRoomFeatureToKey = (featureName: string): string => {
  const mapping: Record<string, string> = {
    "Air Conditioning": "roomFeatures.airConditioning",
    "Private Bathroom": "roomFeatures.privateBathroom",
    "TV": "roomFeatures.tv",
    "Safe": "roomFeatures.safe",
    "Mini Bar": "roomFeatures.miniBar",
    "Coffee Machine": "roomFeatures.coffeeMachine",
    "Kettle": "roomFeatures.kettle",
    "Hairdryer": "roomFeatures.hairdryer",
    "Iron": "roomFeatures.iron",
    "Work Desk": "roomFeatures.workDesk",
    "Balcony": "roomFeatures.balcony",
    "Sea View": "roomFeatures.seaView",
    "Mountain View": "roomFeatures.mountainView",
    "City View": "roomFeatures.cityView",
    "Bathtub": "roomFeatures.bathtub",
    "Walk-in Shower": "roomFeatures.walkInShower",
    "King Bed": "roomFeatures.kingBed",
    "Queen Bed": "roomFeatures.queenBed",
    "Twin Beds": "roomFeatures.twinBeds",
    "Sofa Bed": "roomFeatures.sofaBed",
    "High-speed Internet": "roomFeatures.highSpeedInternet",
    "Blackout Curtains": "roomFeatures.blackoutCurtains",
    "Soundproof": "roomFeatures.soundproof",
    "Room Service": "roomFeatures.roomService",
    "Pillow Menu": "roomFeatures.pillowMenu",
    "Turndown Service": "roomFeatures.turndownService",
    "Alarm Clock": "roomFeatures.alarmClock",
    "Phone": "roomFeatures.phone",
    "Interconnecting Rooms": "roomFeatures.interconnectingRooms",
    "Crib Available": "roomFeatures.cribAvailable",
    "Rollaway Beds": "roomFeatures.rollawayBeds",
    "Hypoallergenic Bedding": "roomFeatures.hypoallergenicBedding",
    "Robes & Slippers": "roomFeatures.robesSlippers",
    "Premium Toiletries": "roomFeatures.premiumToiletries"
  };
  
  return mapping[featureName] || featureName;
};
