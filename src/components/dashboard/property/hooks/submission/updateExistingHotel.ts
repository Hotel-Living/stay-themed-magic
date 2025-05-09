
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "../usePropertyFormData";
import { sortObjectKeysRecursively, stableStringifyArray } from "./utils/compareUtils";

export const updateExistingHotel = async (formData: PropertyFormData, hotelId: string) => {
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
  
  // Improved comparison logic to detect actual changes
  const pendingChanges: Record<string, any> = {};
  let hasChanges = false;
  
  for (const [key, newValue] of Object.entries(updatedData)) {
    // Get the current value from the database
    const currentValue = currentHotel[key];
    
    // Improved comparison logic for different types of values
    let isChanged = false;
    
    try {
      if (Array.isArray(newValue) && Array.isArray(currentValue)) {
        // For arrays, specialized handling depending on content
        if (newValue.length === 0 && currentValue.length === 0) {
          // Both arrays are empty, no change
          isChanged = false;
        } else if (newValue.length !== currentValue.length) {
          // Different lengths, definitely changed
          console.log(`Array length difference for ${key}: new=${newValue.length}, current=${currentValue.length}`);
          isChanged = true;
        } else if (newValue.length > 0 && typeof newValue[0] === 'object') {
          // For array of objects (like room_types), use a more robust comparison
          const normalizedNew = stableStringifyArray(newValue);
          const normalizedCurrent = stableStringifyArray(currentValue);
          
          isChanged = normalizedNew !== normalizedCurrent;
          
          // Extra logging to help diagnose the issue with room_types
          if (key === 'room_types' && isChanged) {
            console.log('Room types detected as changed:');
            console.log('New:', normalizedNew);
            console.log('Current:', normalizedCurrent);
            
            // Additional check to see if they're actually different
            // Sometimes there are slight differences in representation but not in content
            if (JSON.stringify(sortObjectKeysRecursively(newValue)) === 
                JSON.stringify(sortObjectKeysRecursively(currentValue))) {
              console.log('After deeper analysis, room_types appear to be the same');
              isChanged = false;
            }
          }
        } else {
          // Simple array of primitives
          // Sort and convert to string for a stable comparison
          const normalizedNew = [...newValue].sort().toString();
          const normalizedCurrent = [...currentValue].sort().toString();
          
          isChanged = normalizedNew !== normalizedCurrent;
        }
      } else if (
        typeof newValue === 'object' && 
        newValue !== null && 
        currentValue !== null && 
        typeof currentValue === 'object'
      ) {
        // For objects, use recursive sorting for stable comparison
        const normalizedNew = JSON.stringify(sortObjectKeysRecursively(newValue));
        const normalizedCurrent = JSON.stringify(sortObjectKeysRecursively(currentValue));
        
        isChanged = normalizedNew !== normalizedCurrent;
      } else {
        // Simple value comparison, with special handling for numbers that might be strings
        if (typeof newValue === 'number' && typeof currentValue === 'string') {
          isChanged = newValue !== parseFloat(currentValue);
        } else if (typeof newValue === 'string' && typeof currentValue === 'number') {
          isChanged = parseFloat(newValue) !== currentValue;
        } else {
          isChanged = newValue !== currentValue;
        }
      }
    } catch (error) {
      console.error(`Error comparing ${key}:`, error);
      // If comparison fails, assume no change to be safe
      isChanged = false;
    }
    
    if (isChanged) {
      console.log(`Field changed: ${key}`, { 
        old: currentValue, 
        new: newValue 
      });
      pendingChanges[key] = newValue;
      hasChanges = true;
    }
  }
  
  // If there are no changes, let the user know
  if (!hasChanges) {
    console.log("No changes detected in hotel data");
    return { id: hotelId, noChangesDetected: true };
  }
  
  console.log("Detected changes:", pendingChanges);
  console.log("Number of changed fields:", Object.keys(pendingChanges).length);
  
  // Store changes in pending_changes column and update status
  const { error } = await supabase
    .from('hotels')
    .update({
      pending_changes: pendingChanges,
      status: 'pending'
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
        recipient: 'admin@hotel-living.com',
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
