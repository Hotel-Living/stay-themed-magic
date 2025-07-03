
import { PropertyFormData } from "../../usePropertyFormData";

/**
 * Prepares hotel data for update, including relationship fields
 */
export const prepareHotelData = (formData: PropertyFormData) => {
  // Convert the stay lengths from an array of numbers to a PostgreSQL array
  const stayLengths = formData.stayLengths || [];
  
  // Get available months from formData
  const availableMonths = formData.available_months || [];
  
  // Get meal plans array
  const mealPlans = formData.mealPlans || [];
  
  // Get room types data
  const roomTypes = formData.roomTypes || [];
  
  // Extract faqs
  const faqs = formData.faqs || [];
  
  // Get the selected weekday
  const preferredWeekday = formData.preferredWeekday || "Monday";

  // Extract hotel and room features - ensure they're actually objects
  const featuresHotel = formData.featuresHotel || {};
  const featuresRoom = formData.featuresRoom || {};
  
  // Extract rates for different stay lengths
  const rates = formData.rates || {
    "8": formData.price_8,
    "15": formData.price_15,
    "22": formData.price_22,
    "29": formData.price_29
  };

  // Parse latitude and longitude if they're strings
  const latitude = formData.latitude ? 
    (typeof formData.latitude === 'string' ? parseFloat(formData.latitude) : formData.latitude) : 
    null;
  
  const longitude = formData.longitude ? 
    (typeof formData.longitude === 'string' ? parseFloat(formData.longitude) : formData.longitude) : 
    null;
  
  // Prepare the hotel data including relationship fields for comparison
  return {
    name: formData.hotelName,
    description: formData.description,
    country: formData.country,
    city: formData.city,
    address: formData.address || null,
    postal_code: formData.postalCode || null,
    latitude: latitude,
    longitude: longitude,
    price_per_month: parseInt(formData.category) * 1000,
    category: parseInt(formData.category),
    property_type: formData.propertyType,
    style: formData.style,
    ideal_guests: formData.idealGuests,
    atmosphere: formData.atmosphere,
    perfect_location: formData.perfectLocation,
    contact_name: formData.contactName,
    contact_email: formData.contactEmail,
    contact_phone: formData.contactPhone,
    stay_lengths: stayLengths,
    meal_plans: mealPlans,
    room_types: roomTypes,
    faqs: faqs,
    terms: formData.terms || null,
    preferredWeekday: preferredWeekday,
    features_hotel: featuresHotel,
    features_room: featuresRoom,
    available_months: availableMonths,
    rates: rates,
    main_image_url: formData.mainImageUrl || null,
    enable_price_increase: formData.enablePriceIncrease || false,
    price_increase_cap: formData.priceIncreaseCap || 20,
    // Include relationship fields for change detection
    themes: formData.themes || [],
    activities: formData.activities || []
  };
};
