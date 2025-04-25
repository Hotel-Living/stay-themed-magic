
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
    
    const { data: hotelData, error: hotelError } = await supabase
      .from('hotels')
      .insert({
        name: formData.hotelName,
        property_type: formData.propertyType,
        style: formData.style,
        description: formData.description,
        ideal_guests: formData.idealGuests,
        atmosphere: formData.atmosphere,
        perfect_location: formData.perfectLocation,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        category: parseInt(formData.category) || null,
        meal_plans: formData.mealPlans || [],
        room_types: formData.roomTypes || [],
        owner_id: userId,
        price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
        preferredWeekday: formData.preferredWeekday || "Monday",
        status: 'pending'
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
    
    const { error: hotelError } = await supabase
      .from('hotels')
      .update({
        name: formData.hotelName,
        property_type: formData.propertyType,
        style: formData.style,
        description: formData.description,
        ideal_guests: formData.idealGuests,
        atmosphere: formData.atmosphere,
        perfect_location: formData.perfectLocation,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        category: parseInt(formData.category) || null,
        meal_plans: formData.mealPlans || [],
        room_types: formData.roomTypes || [],
        preferredWeekday: formData.preferredWeekday || "Monday",
        price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
        status: 'pending',
      })
      .eq('id', hotelId);

    if (hotelError) {
      console.error('Error updating hotel:', hotelError);
      throw hotelError;
    }

    console.log("Successfully updated hotel:", hotelId);
    return hotelId;
  };

  return {
    createNewHotel,
    updateExistingHotel,
    calculateAveragePrice
  };
};
