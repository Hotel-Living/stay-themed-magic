
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";

export const useHotelSubmission = () => {
  const createNewHotel = async (formData: PropertyFormData, userId?: string) => {
    console.log("Creating new hotel with data:", formData);
    
    // Convert the stay lengths from an array of numbers to a PostgreSQL array
    const stayLengths = formData.stayLengths || [];
    
    // Get available months from the formData
    const availableMonths = formData.available_months || [];
    
    // Get meal plans data
    const mealPlans = formData.mealPlans || [];
    
    // Get room types data
    const roomTypes = formData.roomTypes || [];

    // Convert themes selected to proper format
    const themes = formData.themes || [];

    // Convert activities selected to proper format
    const activities = formData.activities || [];
    
    // Extract hotel and room features
    const featuresHotel = formData.featuresHotel || {};
    const featuresRoom = formData.featuresRoom || {};
    
    // Extract faqs
    const faqs = formData.faqs || [];
    
    // Get the selected weekday
    const preferredWeekday = formData.preferredWeekday || "Monday";
    
    // Prepare the hotel data
    const hotelData = {
      owner_id: userId,
      name: formData.hotelName,
      description: formData.description,
      country: formData.country,
      city: formData.city,
      address: formData.address || null,
      postal_code: formData.postalCode || null,
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
    };
    
    console.log("Submitting hotel data to database:", hotelData);
    
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
    
    // Get meal plans data
    const mealPlans = formData.mealPlans || [];
    
    // Get room types data
    const roomTypes = formData.roomTypes || [];

    // Extract hotel and room features
    const featuresHotel = formData.featuresHotel || {};
    const featuresRoom = formData.featuresRoom || {};
    
    // Extract faqs
    const faqs = formData.faqs || [];
    
    // Get the selected weekday
    const preferredWeekday = formData.preferredWeekday || "Monday";
    
    // Prepare the hotel data for update
    const hotelData = {
      name: formData.hotelName,
      description: formData.description,
      country: formData.country,
      city: formData.city,
      address: formData.address || null,
      postal_code: formData.postalCode || null,
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
    };
    
    console.log("Submitting updated hotel data to database:", hotelData);
    
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
