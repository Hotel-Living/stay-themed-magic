
import { useEffect } from "react";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { PropertyFormData } from "./usePropertyFormData";

interface UseHotelEditingProps {
  editingHotelId?: string | null;
  setFormData: (updater: (prev: PropertyFormData) => PropertyFormData) => void;
  setCurrentStep: (step: number) => void;
}

export const useHotelEditing = ({ 
  editingHotelId, 
  setFormData, 
  setCurrentStep 
}: UseHotelEditingProps) => {
  const { data: hotelData, isLoading } = useHotelDetail(editingHotelId);

  useEffect(() => {
    if (editingHotelId && hotelData && !isLoading) {
      console.log("🔄 Loading hotel data for editing:", hotelData);
      console.log("🔄 Hotel themes raw data:", hotelData.hotel_themes);
      console.log("🔄 Hotel activities raw data:", (hotelData as any).hotel_activities);
      console.log("🔄 Hotel room_types:", hotelData.room_types);
      console.log("🔄 Hotel meal_plans:", hotelData.meal_plans);
      console.log("🔄 Hotel stay_lengths:", hotelData.stay_lengths);
      console.log("🔄 Hotel available_months:", hotelData.available_months);
      
      // Extract theme IDs correctly - they should be direct theme_id values
      const themes = hotelData.hotel_themes?.map(ht => ht.theme_id).filter(Boolean) || [];
      console.log("✅ Extracted theme IDs:", themes);
      
      // Extract activity IDs correctly - they should be direct activity_id values  
      const activities = (hotelData as any).hotel_activities?.map((ha: any) => ha.activity_id).filter(Boolean) || [];
      console.log("✅ Extracted activity IDs:", activities);

      console.log("💰 Dynamic pricing values:", {
        enablePriceIncrease: hotelData.enablePriceIncrease,
        enable_price_increase: hotelData.enable_price_increase,
        priceIncreaseCap: hotelData.priceIncreaseCap,
        price_increase_cap: hotelData.price_increase_cap
      });

      // CRITICAL: Ensure all arrays are properly loaded
      const safeStayLengths = Array.isArray(hotelData.stay_lengths) ? hotelData.stay_lengths : [];
      const safeMealPlans = Array.isArray(hotelData.meal_plans) ? hotelData.meal_plans : [];
      const safeRoomTypes = Array.isArray(hotelData.room_types) ? hotelData.room_types : [];
      const safeAvailableMonths = Array.isArray(hotelData.available_months) ? hotelData.available_months : [];
      const safeHotelImages = Array.isArray(hotelData.hotel_images) ? hotelData.hotel_images : [];

      console.log("📋 Safe arrays loaded:", {
        stayLengths: safeStayLengths,
        mealPlans: safeMealPlans,
        roomTypes: safeRoomTypes.length,
        availableMonths: safeAvailableMonths,
        hotelImages: safeHotelImages.length
      });

      setFormData(prev => ({
        ...prev,
        // Basic information - ENSURE ALL LOADED
        hotelName: hotelData.name || '',
        description: hotelData.description || '',
        country: hotelData.country || '',
        city: hotelData.city || '',
        address: hotelData.address || '',
        postalCode: (hotelData as any).postal_code || '',
        latitude: hotelData.latitude || null,
        longitude: hotelData.longitude || null,
        category: hotelData.category?.toString() || '',
        propertyType: hotelData.property_type || '',
        style: hotelData.style || '',
        
        // Extended descriptions - ENSURE ALL LOADED
        idealGuests: hotelData.idealGuests || (hotelData as any).ideal_guests || '',
        atmosphere: hotelData.atmosphere || '',
        perfectLocation: hotelData.perfectLocation || (hotelData as any).perfect_location || '',
        
        // Contact info - ENSURE ALL LOADED
        contactName: (hotelData as any).contact_name || '',
        contactEmail: (hotelData as any).contact_email || '',
        contactPhone: (hotelData as any).contact_phone || '',
        
        // CRITICAL ARRAYS - ENSURE ALL LOADED PROPERLY
        stayLengths: safeStayLengths,
        mealPlans: safeMealPlans,
        roomTypes: safeRoomTypes,
        available_months: safeAvailableMonths,
        
        // FAQs and terms - ENSURE ALL LOADED
        faqs: (hotelData as any).faqs || [],
        terms: hotelData.terms || '',
        
        // Preferences - ENSURE ALL LOADED
        preferredWeekday: hotelData.preferredWeekday || (hotelData as any).check_in_weekday || 'Monday',
        
        // Features - ENSURE ALL LOADED
        featuresHotel: hotelData.features_hotel || {},
        featuresRoom: hotelData.features_room || {},
        
        // Pricing - ENSURE ALL LOADED
        rates: hotelData.rates || {},
        mainImageUrl: hotelData.main_image_url || '',
        
        // Dynamic pricing - ENSURE ALL LOADED
        enablePriceIncrease: hotelData.enablePriceIncrease ?? hotelData.enable_price_increase ?? false,
        priceIncreaseCap: hotelData.priceIncreaseCap ?? hotelData.price_increase_cap ?? 20,
        
        // CRITICAL RELATIONSHIPS - ENSURE ALL LOADED
        themes: themes,
        activities: activities,
        
        // CRITICAL IMAGES - ENSURE ALL LOADED
        hotelImages: safeHotelImages.map(img => ({
          id: img.id,
          url: img.image_url,
          isMain: img.is_main
        }))
      }));

      console.log("✅ Form data COMPLETELY loaded with:");
      console.log("   - Themes:", themes);
      console.log("   - Activities:", activities);
      console.log("   - Stay lengths:", safeStayLengths);
      console.log("   - Meal plans:", safeMealPlans);
      console.log("   - Room types count:", safeRoomTypes.length);
      console.log("   - Available months:", safeAvailableMonths);
      console.log("   - Hotel images count:", safeHotelImages.length);

      setCurrentStep(1);
    }
  }, [editingHotelId, hotelData, isLoading, setFormData, setCurrentStep]);

  return { isLoading };
};
