
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";

export const createNewHotel = async (formData: PropertyFormData, userId?: string) => {
  console.log("Creating new hotel with data:", formData);
  
  if (!userId) {
    throw new Error("User must be authenticated to create a hotel");
  }

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
    "16": formData.price_16,
    "24": formData.price_24,
    "32": formData.price_32
  };

  // Parse latitude and longitude if they're strings
  const latitude = formData.latitude ? 
    (typeof formData.latitude === 'string' ? parseFloat(formData.latitude) : formData.latitude) : 
    null;
  
  const longitude = formData.longitude ? 
    (typeof formData.longitude === 'string' ? parseFloat(formData.longitude) : formData.longitude) : 
    null;
  
  // Get the pricing matrix from formData
  const pricingMatrix = formData.pricingMatrix || [];

  const hotelData = {
    owner_id: userId,
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
    ideal_guests: formData.idealGuests, // Use correct field name
    atmosphere: formData.atmosphere,
    perfect_location: formData.perfectLocation, // Use correct field name
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
    pricingmatrix: pricingMatrix // Use the correct lowercase column name from database
  };

  console.log("Inserting hotel with data:", {
    idealGuests: hotelData.ideal_guests,
    perfectLocation: hotelData.perfect_location
  });

  const { data, error } = await supabase
    .from('hotels')
    .insert([hotelData])
    .select()
    .single();

  if (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }

  console.log("Hotel created successfully:", data);
  return data;
};
