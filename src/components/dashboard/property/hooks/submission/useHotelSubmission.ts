
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

    // Parse latitude and longitude if they're strings
    const latitude = formData.latitude ? 
      (typeof formData.latitude === 'string' ? parseFloat(formData.latitude) : formData.latitude) : 
      null;
    
    const longitude = formData.longitude ? 
      (typeof formData.longitude === 'string' ? parseFloat(formData.longitude) : formData.longitude) : 
      null;
    
    console.log(`Location data: lat=${latitude}, lng=${longitude}`);
    
    // Prepare the hotel data
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
    
    // First, get the current hotel data to determine what has changed
    const { data: currentHotel, error: fetchError } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', hotelId)
      .single();
    
    if (fetchError) {
      console.error("Error fetching current hotel data:", fetchError);
      throw fetchError;
    }
    
    // Check if there are already pending changes
    if (currentHotel.pending_changes && Object.keys(currentHotel.pending_changes).length > 0) {
      throw new Error("This hotel already has pending changes awaiting approval. Please wait for admin review before making additional changes.");
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
    
    // Prepare the new hotel data
    const updatedData: Record<string, any> = {
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
      main_image_url: formData.mainImageUrl || null
    };
    
    // Compare with current data and only include changed fields in pending_changes
    const pendingChanges: Record<string, any> = {};
    let hasChanges = false;
    
    for (const [key, value] of Object.entries(updatedData)) {
      // Improved comparison logic for different types of values
      let isChanged = false;
      
      if (Array.isArray(value) && Array.isArray(currentHotel[key])) {
        // For arrays, compare stringified versions with stable order
        const sortAndStringify = (arr: any[]) => JSON.stringify([...arr].sort());
        isChanged = sortAndStringify(value) !== sortAndStringify(currentHotel[key]);
      } else if (typeof value === 'object' && value !== null && 
                currentHotel[key] !== null && typeof currentHotel[key] === 'object') {
        // For objects, sort keys for stable comparison
        const normalizeObject = (obj: object) => {
          const normalized: Record<string, any> = {};
          Object.keys(obj).sort().forEach(k => {
            if (obj.hasOwnProperty(k)) {
              normalized[k] = obj[k as keyof typeof obj];
            }
          });
          return normalized;
        };
        
        isChanged = JSON.stringify(normalizeObject(value)) !== 
                    JSON.stringify(normalizeObject(currentHotel[key]));
      } else {
        // Simple value comparison
        isChanged = value !== currentHotel[key];
      }
      
      if (isChanged) {
        console.log(`Field changed: ${key}`, { 
          old: currentHotel[key], 
          new: value 
        });
        pendingChanges[key] = value;
        hasChanges = true;
      }
    }
    
    // If there are no changes, let the user know
    if (!hasChanges) {
      return { id: hotelId, noChangesDetected: true };
    }
    
    console.log("Detected changes:", pendingChanges);
    
    // Store changes in pending_changes column and update status
    const { error } = await supabase
      .from('hotels')
      .update({
        pending_changes: pendingChanges,
        status: 'pending'  // Using 'pending' status rather than 'pending_changes'
      })
      .eq('id', hotelId);
    
    if (error) {
      console.error("Error updating hotel with pending changes:", error);
      throw error;
    }
    
    // Send notification to admin about pending changes
    try {
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'message',
          recipient: 'admin@hotel-living.com', // Replace with actual admin email
          data: {
            sender: 'Hotel Living System',
            hotelName: formData.hotelName,
            message: `Hotel '${formData.hotelName}' has submitted changes that require your approval.`
          }
        }
      });
    } catch (notifyError) {
      console.warn("Error sending admin notification:", notifyError);
      // Continue despite notification error
    }
    
    return { id: hotelId, changes: Object.keys(pendingChanges).length };
  };

  return {
    createNewHotel,
    updateExistingHotel
  };
};
