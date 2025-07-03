// Comprehensive data logging system to track hotel submission and editing data flow
export const logFormDataState = (stage: string, formData: any) => {
  console.group(`🔍 DATA LOGGER - ${stage.toUpperCase()}`);
  
  // Basic information
  console.log("📝 Basic Info:", {
    hotelName: formData.hotelName,
    description: formData.description,
    country: formData.country,
    city: formData.city,
    address: formData.address,
    propertyType: formData.propertyType,
    style: formData.style,
    category: formData.category
  });
  
  // Extended descriptions
  console.log("📄 Extended Descriptions:", {
    idealGuests: formData.idealGuests,
    atmosphere: formData.atmosphere,
    perfectLocation: formData.perfectLocation
  });
  
  // Contact information
  console.log("📞 Contact Info:", {
    contactName: formData.contactName,
    contactEmail: formData.contactEmail,
    contactPhone: formData.contactPhone
  });
  
  // CRITICAL ARRAYS - Check if they exist and have data
  console.log("🏠 Room Types:", {
    exists: !!formData.roomTypes,
    isArray: Array.isArray(formData.roomTypes),
    count: formData.roomTypes?.length || 0,
    data: formData.roomTypes
  });
  
  console.log("🍽️ Meal Plans:", {
    exists: !!formData.mealPlans,
    isArray: Array.isArray(formData.mealPlans),
    count: formData.mealPlans?.length || 0,
    data: formData.mealPlans
  });
  
  console.log("📅 Stay Lengths:", {
    exists: !!formData.stayLengths,
    isArray: Array.isArray(formData.stayLengths),
    count: formData.stayLengths?.length || 0,
    data: formData.stayLengths,
    alternativeStayDurations: formData.stayDurations
  });
  
  console.log("📆 Available Months:", {
    exists: !!formData.available_months,
    isArray: Array.isArray(formData.available_months),
    count: formData.available_months?.length || 0,
    data: formData.available_months
  });
  
  // Relationships
  console.log("🎨 Themes/Affinities:", {
    exists: !!formData.themes,
    isArray: Array.isArray(formData.themes),
    count: formData.themes?.length || 0,
    data: formData.themes,
    alternative: formData.affinities
  });
  
  console.log("🎯 Activities:", {
    exists: !!formData.activities,
    isArray: Array.isArray(formData.activities),
    count: formData.activities?.length || 0,
    data: formData.activities
  });
  
  // Images
  console.log("🖼️ Hotel Images:", {
    exists: !!formData.hotelImages,
    isArray: Array.isArray(formData.hotelImages),
    count: formData.hotelImages?.length || 0,
    urls: formData.hotelImages?.map((img: any) => img.url),
    mainImageUrl: formData.mainImageUrl
  });
  
  console.log("🛏️ Room Images:", {
    exists: !!formData.roomImages,
    isArray: Array.isArray(formData.roomImages),
    count: formData.roomImages?.length || 0,
    data: formData.roomImages
  });
  
  // Features
  console.log("🏨 Hotel Features:", {
    exists: !!formData.featuresHotel,
    type: typeof formData.featuresHotel,
    keys: formData.featuresHotel ? Object.keys(formData.featuresHotel) : [],
    enabledFeatures: formData.featuresHotel ? Object.entries(formData.featuresHotel).filter(([_, enabled]) => enabled).map(([key]) => key) : []
  });
  
  console.log("🛏️ Room Features:", {
    exists: !!formData.featuresRoom,
    type: typeof formData.featuresRoom,
    keys: formData.featuresRoom ? Object.keys(formData.featuresRoom) : [],
    enabledFeatures: formData.featuresRoom ? Object.entries(formData.featuresRoom).filter(([_, enabled]) => enabled).map(([key]) => key) : []
  });
  
  // Other critical data
  console.log("⚙️ Other Data:", {
    preferredWeekday: formData.preferredWeekday,
    checkinDay: formData.checkinDay,
    rates: formData.rates,
    faqs: formData.faqs?.length || 0,
    terms: formData.terms?.length || 0,
    enablePriceIncrease: formData.enablePriceIncrease,
    priceIncreaseCap: formData.priceIncreaseCap
  });
  
  console.groupEnd();
};

export const logDatabaseData = (stage: string, data: any) => {
  console.group(`💾 DATABASE LOGGER - ${stage.toUpperCase()}`);
  
  console.log("📋 Hotel Table Data:", {
    name: data.name,
    country: data.country,
    city: data.city,
    address: data.address,
    room_types: data.room_types,
    meal_plans: data.meal_plans,
    stay_lengths: data.stay_lengths,
    available_months: data.available_months,
    features_hotel: data.features_hotel,
    features_room: data.features_room,
    main_image_url: data.main_image_url,
    photos: data.photos
  });
  
  console.groupEnd();
};

export const logRelationshipData = (stage: string, data: { themes?: any[], activities?: any[], availability?: any[], images?: any[] }) => {
  console.group(`🔗 RELATIONSHIP LOGGER - ${stage.toUpperCase()}`);
  
  if (data.themes) {
    console.log("🎨 Hotel Themes:", data.themes);
  }
  
  if (data.activities) {
    console.log("🎯 Hotel Activities:", data.activities);
  }
  
  if (data.availability) {
    console.log("📅 Hotel Availability:", data.availability);
  }
  
  if (data.images) {
    console.log("🖼️ Hotel Images:", data.images);
  }
  
  console.groupEnd();
};
