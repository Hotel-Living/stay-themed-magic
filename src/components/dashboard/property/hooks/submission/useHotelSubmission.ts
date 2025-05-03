
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";

export const useHotelSubmission = () => {
  const createNewHotel = async (formData: PropertyFormData, userId?: string) => {
    console.log("Creating new hotel with data:", formData);
    
    // Convert the stay lengths from an array of numbers to a PostgreSQL array
    const stayLengths = formData.stayLengths || [];
    
    // Get available months from formData
    const availableMonths = formData.available_months || [];
    
    // Get meal plans array
    const mealPlans = formData.mealPlans || [];
    
    // Get room types data
    const roomTypes = formData.roomTypes || [];

    // Extract hotel and room features - ensure they're actually objects
    const featuresHotel = formData.featuresHotel || {};
    const featuresRoom = formData.featuresRoom || {};
    
    console.log("Hotel features being submitted:", featuresHotel);
    console.log("Room features being submitted:", featuresRoom);
    
    // Extract faqs
    const faqs = formData.faqs || [];
    
    // Get the selected weekday
    const preferredWeekday = formData.preferredWeekday || "Monday";
    
    // Extract rates for different stay lengths
    const rates = formData.rates || {
      "8": formData.price_8,
      "16": formData.price_16,
      "24": formData.price_24,
      "32": formData.price_32
    };
    
    console.log("Submitting rates:", rates);
    
    // Prepare the hotel data
    const hotelData = {
      owner_id: userId,
      name: formData.hotelName,
      description: formData.description,
      country: formData.country,
      city: formData.city,
      address: formData.address || null,
      postal_code: formData.postalCode || null,
      latitude: formData.latitude,
      longitude: formData.longitude,
      price_per_month: parseInt(formData.category) * 1000, // Placeholder calculation
      category: parseInt(formData.category),
      property_type: formData.propertyType,
      style: formData.style,
      ideal_guests: formData.idealGuests,
      atmosphere: formData.atmosphere,
      perfect_location: formData.perfectLocation,
      contact_name: formData.contactName,
      contact_email: formData.contactEmail,
      contact_phone: formData.contactPhone,
      status: 'pending',
      is_featured: false,
      stay_lengths: stayLengths,
      meal_plans: mealPlans,
      room_types: roomTypes,
      faqs: faqs,
      terms: formData.terms || null,
      preferredWeekday: preferredWeekday,
      features_hotel: featuresHotel,
      features_room: featuresRoom,
      available_months: availableMonths,
      rates: rates, // Add rates to hotel data
      main_image_url: formData.mainImageUrl || null
    };
    
    const { data, error } = await supabase
      .from('hotels')
      .insert(hotelData)
      .select('id')
      .single();
    
    if (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }

    return data;
  };
  
  const updateExistingHotel = async (formData: PropertyFormData, hotelId: string) => {
    console.log("Updating hotel with ID:", hotelId);
    console.log("Update data:", formData);
    
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
    
    console.log("Hotel features being updated:", featuresHotel);
    console.log("Room features being updated:", featuresRoom);
    
    // Extract rates for different stay lengths
    const rates = formData.rates || {
      "8": formData.price_8,
      "16": formData.price_16,
      "24": formData.price_24,
      "32": formData.price_32
    };
    
    console.log("Updating rates:", rates);
    
    // Prepare the hotel data for update
    const hotelData = {
      name: formData.hotelName,
      description: formData.description,
      country: formData.country,
      city: formData.city,
      address: formData.address || null,
      postal_code: formData.postalCode || null,
      latitude: formData.latitude,
      longitude: formData.longitude,
      price_per_month: parseInt(formData.category) * 1000, // Placeholder calculation
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
      rates: rates, // Add rates to hotel data
      status: 'pending', // Set status back to pending for admin review
      main_image_url: formData.mainImageUrl || null
    };
    
    const { error } = await supabase
      .from('hotels')
      .update(hotelData)
      .eq('id', hotelId);
    
    if (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
    
    return { id: hotelId };
  };

  return {
    createNewHotel,
    updateExistingHotel
  };
};
