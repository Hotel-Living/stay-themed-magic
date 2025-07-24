
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";

export const createNewHotel = async (formData: PropertyFormData, userId?: string) => {
  console.log("=== CREATE NEW HOTEL START ===");
  console.log("Creating new hotel with data:", formData);
  console.log("User ID provided:", userId);
  
  // Validate required parameters
  if (!userId) {
    console.error("No user ID provided for hotel creation");
    throw new Error("User ID is required for hotel creation");
  }
  
  // Use the provided userId or get it from the current session
  // Since routes are protected, we can safely assume user is authenticated
  const ownerId = userId;

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

  // Calculate price_per_month from pricing matrix if available, otherwise use fallback
  const calculatedPricePerMonth = formData.price_per_month || (parseInt(formData.category) * 1000);

  const hotelData = {
    owner_id: ownerId,
    name: formData.hotelName,
    description: formData.description,
    country: formData.country,
    city: formData.city,
    address: formData.address || null,
    postal_code: formData.postalCode || null,
    latitude: latitude,
    longitude: longitude,
    price_per_month: calculatedPricePerMonth,
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

  console.log("=== INSERTING HOTEL DATA ===");
  console.log("Final hotel data to insert:", hotelData);

  try {
    const { data, error } = await supabase
      .from('hotels')
      .insert([hotelData])
      .select()
      .single();

    console.log("=== SUPABASE INSERT RESPONSE ===");
    console.log("Data returned:", data);
    console.log("Error returned:", error);

    if (error) {
      console.error("=== HOTEL CREATION ERROR ===");
      console.error("Error creating hotel:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);
      console.error("Error code:", error.code);
      throw error;
    }

    console.log("=== HOTEL CREATED SUCCESSFULLY ===");
    console.log("Hotel created successfully:", data);
    console.log("Hotel ID:", data?.id);
    console.log("Hotel name:", data?.name);

    // Trigger automatic translations asynchronously (non-blocking)
    if (data?.id) {
      const translationContent = {
        name: data.name,
        description: data.description || undefined,
        ideal_guests: data.ideal_guests || undefined,
        atmosphere: data.atmosphere || undefined,
        perfect_location: data.perfect_location || undefined
      };

      // Use setTimeout to ensure this runs after the main workflow completes
      setTimeout(async () => {
        try {
          const targetLanguages: ('es' | 'pt' | 'ro')[] = ['es', 'pt', 'ro'];
          
          for (const language of targetLanguages) {
            try {
              await supabase.functions.invoke('translate-hotel-content', {
                body: {
                  hotelId: data.id,
                  targetLanguage: language,
                  content: translationContent
                }
              });
              console.log(`Auto-translation triggered for hotel ${data.id} in ${language}`);
            } catch (translationError) {
              console.warn(`Auto-translation failed for hotel ${data.id} in ${language}:`, translationError);
              // Continue with other languages even if one fails
            }
          }
        } catch (error) {
          console.warn('Auto-translation process failed:', error);
          // Fail silently to not affect the main hotel creation workflow
        }
      }, 1000); // 1 second delay to ensure main workflow completes
    }

    console.log("=== CREATE NEW HOTEL END ===");
    return data;
    
  } catch (insertError) {
    console.error("=== CRITICAL HOTEL INSERT ERROR ===");
    console.error("Failed to insert hotel into database:", insertError);
    console.error("Insert error message:", insertError.message);
    console.error("Insert error details:", insertError.details);
    console.error("Insert error hint:", insertError.hint);
    console.error("Insert error code:", insertError.code);
    throw insertError;
  }
};
