import { PropertyFormData } from "../usePropertyFormData";

export const prepareHotelData = (formData: PropertyFormData) => {
  console.log("📋 Preparing hotel data with COMPLETE form fields:", formData);
  console.log("📋 Room types being prepared:", formData.roomTypes);
  console.log("📋 Meal plans being prepared:", formData.mealPlans);
  console.log("📋 Stay lengths being prepared:", formData.stayLengths);
  console.log("📋 Available months being prepared:", formData.available_months);
  
  // Ensure arrays are properly formatted and not null
  const safeRoomTypes = Array.isArray(formData.roomTypes) ? formData.roomTypes : [];
  const safeMealPlans = Array.isArray(formData.mealPlans) ? formData.mealPlans : [];
  const safeStayLengths = Array.isArray(formData.stayLengths) ? formData.stayLengths : 
                         Array.isArray(formData.stayDurations) ? formData.stayDurations : [];
  const safeAvailableMonths = Array.isArray(formData.available_months) ? formData.available_months : [];
  
  console.log("📋 Safe arrays prepared:", {
    roomTypes: safeRoomTypes,
    mealPlans: safeMealPlans,
    stayLengths: safeStayLengths,
    availableMonths: safeAvailableMonths
  });
  
  const hotelData = {
    // Basic information
    name: formData.hotelName || '',
    description: formData.description || '',
    category: formData.category ? parseInt(formData.category) : null,
    property_type: formData.propertyType || '',
    style: formData.style || '',
    
    // Extended descriptions - ENSURE THESE ARE SAVED
    ideal_guests: formData.idealGuests || '',
    atmosphere: formData.atmosphere || '',
    perfect_location: formData.perfectLocation || '',
    
    // Location information - ENSURE ADDRESS IS SAVED
    country: formData.country || '',
    city: formData.city || '',
    address: formData.address || '',
    postal_code: formData.postalCode || '',
    latitude: formData.latitude ? parseFloat(formData.latitude.toString()) : null,
    longitude: formData.longitude ? parseFloat(formData.longitude.toString()) : null,
    
    // Contact information
    contact_name: formData.contactName || '',
    contact_email: formData.contactEmail || '',
    contact_phone: formData.contactPhone || '',
    
    // CRITICAL: ENSURE ARRAYS ARE PROPERLY SAVED - NOT EMPTY
    room_types: safeRoomTypes,
    meal_plans: safeMealPlans,
    stay_lengths: safeStayLengths,
    
    // ENSURE CHECK-IN DAY IS SAVED
    check_in_weekday: formData.checkinDay || formData.preferredWeekday || 'Monday',
    
    // ENSURE AVAILABILITY IS SAVED
    available_months: safeAvailableMonths,
    
    // Features
    features_hotel: formData.featuresHotel || {},
    features_room: formData.featuresRoom || {},
    
    // Pricing information
    price_per_month: formData.price_8 || formData.price_16 || formData.price_24 || formData.price_32 || 1000,
    rates: formData.rates || {},
    pricingmatrix: formData.pricingMatrix || [],
    
    // Dynamic pricing
    enable_price_increase: formData.enablePriceIncrease || false,
    price_increase_cap: formData.priceIncreaseCap || 20,
    
    // Other data
    faqs: formData.faqs || [],
    terms: formData.terms || '',
    
    // Status
    status: 'pending'
  };
  
  console.log("✅ Final prepared hotel data:", hotelData);
  return hotelData;
};
