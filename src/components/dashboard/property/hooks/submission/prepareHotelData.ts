import { PropertyFormData } from "../usePropertyFormData";

export const prepareHotelData = (formData: PropertyFormData) => {
  console.log("Preparing hotel data with ALL form fields:", formData);
  
  return {
    // Basic information
    name: formData.hotelName,
    description: formData.description,
    category: parseInt(formData.category) || null,
    property_type: formData.propertyType,
    style: formData.style,
    
    // Extended descriptions - ENSURE THESE ARE SAVED
    ideal_guests: formData.idealGuests || '',
    atmosphere: formData.atmosphere || '',
    perfect_location: formData.perfectLocation || '',
    
    // Location information - ENSURE ADDRESS IS SAVED
    country: formData.country,
    city: formData.city,
    address: formData.address || '',
    postal_code: formData.postalCode || '',
    latitude: formData.latitude ? parseFloat(formData.latitude.toString()) : null,
    longitude: formData.longitude ? parseFloat(formData.longitude.toString()) : null,
    
    // Contact information
    contact_name: formData.contactName || '',
    contact_email: formData.contactEmail || '',
    contact_phone: formData.contactPhone || '',
    
    // ENSURE ROOM TYPES ARE SAVED
    room_types: formData.roomTypes || [],
    
    // ENSURE MEAL PLANS ARE SAVED
    meal_plans: formData.mealPlans || [],
    
    // ENSURE STAY DURATIONS ARE SAVED
    stay_lengths: formData.stayLengths || formData.stayDurations || [],
    
    // ENSURE CHECK-IN DAY IS SAVED
    check_in_weekday: formData.checkinDay || formData.preferredWeekday || 'Monday',
    
    // ENSURE AVAILABILITY IS SAVED
    available_months: formData.available_months || [],
    
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
};
