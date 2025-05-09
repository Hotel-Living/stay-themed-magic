
import { PropertyFormData } from "../../usePropertyFormData";

/**
 * Prepares hotel data from form data for update
 */
export const prepareHotelData = (formData: PropertyFormData): Record<string, any> => {
  // Extract data from formData
  const {
    hotelName, description, country, city, address, postalCode,
    latitude: rawLatitude, longitude: rawLongitude,
    category, propertyType, style,
    idealGuests, atmosphere, perfectLocation,
    contactName, contactEmail, contactPhone,
    stayLengths = [], mealPlans = [], roomTypes = [], faqs = [],
    terms, preferredWeekday = "Monday",
    featuresHotel = {}, featuresRoom = {},
    available_months = [], mainImageUrl,
    price_8, price_16, price_24, price_32
  } = formData;

  // Parse latitude and longitude if they're strings
  const latitude = rawLatitude ? 
    (typeof rawLatitude === 'string' ? parseFloat(rawLatitude) : rawLatitude) : 
    null;
  
  const longitude = rawLongitude ? 
    (typeof rawLongitude === 'string' ? parseFloat(rawLongitude) : rawLongitude) : 
    null;

  // Extract rates for different stay lengths
  const rates = formData.rates || {
    "8": price_8,
    "16": price_16,
    "24": price_24,
    "32": price_32
  };

  // Return prepared data object
  return {
    name: hotelName,
    description,
    country,
    city,
    address: address || null,
    postal_code: postalCode || null,
    latitude,
    longitude,
    price_per_month: parseInt(category) * 1000,
    category: parseInt(category),
    property_type: propertyType,
    style,
    ideal_guests: idealGuests,
    atmosphere,
    perfect_location: perfectLocation,
    contact_name: contactName,
    contact_email: contactEmail,
    contact_phone: contactPhone,
    stay_lengths: stayLengths,
    meal_plans: mealPlans,
    room_types: roomTypes,
    faqs,
    terms: terms || null,
    preferredWeekday,
    features_hotel: featuresHotel,
    features_room: featuresRoom,
    available_months,
    rates,
    main_image_url: mainImageUrl || null
  };
};
