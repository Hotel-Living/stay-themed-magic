
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from '../usePropertyFormData';

export const useHotelSubmission = () => {
  const { toast } = useToast();

  const calculateAveragePrice = (roomTypes: any[]) => {
    if (!roomTypes || roomTypes.length === 0) return 1000;
    let totalPrice = 0;
    let count = 0;
    roomTypes.forEach(room => {
      if (room.price) {
        totalPrice += parseFloat(room.price);
        count++;
      }
    });
    return count > 0 ? Math.round(totalPrice / count) : 1000;
  };

  const createNewHotel = async (formData: PropertyFormData, userId?: string) => {
    console.log("Creating new hotel with data:", formData);
    
    // Process months to ensure consistency
    const availableMonths = formData.stayLengths?.length > 0 
      ? processAvailableMonths(formData.available_months || [])
      : [];
    
    console.log("Processed available months:", availableMonths);
    
    // Create list of explicit amenities
    const amenities = formData.amenities || [];
    console.log("Saving amenities:", amenities);
    
    const { data: hotelData, error: hotelError } = await supabase
      .from('hotels')
      .insert({
        name: formData.hotelName,
        property_type: formData.propertyType,
        property_style: formData.style,
        style: formData.style,
        description: formData.description,
        ideal_guests: formData.idealGuests,
        ideal_guests_description: formData.idealGuests,
        atmosphere: formData.atmosphere,
        atmosphere_description: formData.atmosphere,
        perfect_location: formData.perfectLocation,
        location_highlight_description: formData.perfectLocation,
        country: formData.country,
        address: formData.address,
        location_address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        category: parseInt(formData.category) || null,
        meal_plans: formData.mealPlans || [],
        room_types: formData.roomTypes || [],
        photos: formData.hotelImages?.map(img => img.url) || [],
        faqs: formData.faqs || [],
        owner_id: userId,
        price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
        preferredWeekday: formData.preferredWeekday || "Monday",
        features_hotel: formData.featuresHotel || null,
        features_room: formData.featuresRoom || null,
        status: 'pending',
        available_months: availableMonths,
        amenities: amenities
      })
      .select()
      .single();

    if (hotelError) {
      console.error('Error submitting hotel basic info:', hotelError);
      throw hotelError;
    }

    console.log("Successfully created hotel:", hotelData);
    return hotelData;
  };

  const updateExistingHotel = async (formData: PropertyFormData, hotelId: string) => {
    console.log("Updating hotel with ID:", hotelId, "with data:", formData);
    
    // Process months to ensure consistency
    const availableMonths = formData.stayLengths?.length > 0 
      ? processAvailableMonths(formData.available_months || [])
      : [];
    
    console.log("Processed available months for update:", availableMonths);
    
    // Create list of explicit amenities
    const amenities = formData.amenities || [];
    console.log("Saving amenities for update:", amenities);
    
    const { error: hotelError } = await supabase
      .from('hotels')
      .update({
        name: formData.hotelName,
        property_type: formData.propertyType,
        property_style: formData.style,
        style: formData.style,
        description: formData.description,
        ideal_guests: formData.idealGuests,
        ideal_guests_description: formData.idealGuests,
        atmosphere: formData.atmosphere,
        atmosphere_description: formData.atmosphere,
        perfect_location: formData.perfectLocation,
        location_highlight_description: formData.perfectLocation,
        country: formData.country,
        address: formData.address,
        location_address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        category: parseInt(formData.category) || null,
        meal_plans: formData.mealPlans || [],
        room_types: formData.roomTypes || [],
        photos: formData.hotelImages?.map(img => img.url) || [],
        faqs: formData.faqs || [],
        preferredWeekday: formData.preferredWeekday || "Monday",
        price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
        features_hotel: formData.featuresHotel || null,
        features_room: formData.featuresRoom || null,
        status: 'pending',
        available_months: availableMonths,
        amenities: amenities
      })
      .eq('id', hotelId);

    if (hotelError) {
      console.error('Error updating hotel:', hotelError);
      throw hotelError;
    }

    console.log("Successfully updated hotel:", hotelId);
    return hotelId;
  };
  
  // Helper function to normalize month names
  const processAvailableMonths = (months: string[]): string[] => {
    if (!months || !Array.isArray(months)) return [];
    
    return [...new Set(months.map(month => {
      if (!month) return '';
      return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    }))].filter(Boolean);
  };

  return {
    createNewHotel,
    updateExistingHotel,
    calculateAveragePrice
  };
};
