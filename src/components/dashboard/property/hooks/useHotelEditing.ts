
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
      console.log("Loading hotel data for editing:", hotelData);
      console.log("Dynamic pricing values:", {
        enablePriceIncrease: hotelData.enablePriceIncrease,
        enable_price_increase: hotelData.enable_price_increase,
        priceIncreaseCap: hotelData.priceIncreaseCap,
        price_increase_cap: hotelData.price_increase_cap
      });

      setFormData(prev => ({
        ...prev,
        hotelName: hotelData.name || '',
        description: hotelData.description || '',
        country: hotelData.country || '',
        city: hotelData.city || '',
        address: hotelData.address || '',
        postalCode: hotelData.postal_code || '',
        latitude: hotelData.latitude || null,
        longitude: hotelData.longitude || null,
        category: hotelData.category?.toString() || '',
        propertyType: hotelData.property_type || '',
        style: hotelData.style || '',
        idealGuests: hotelData.ideal_guests || '',
        atmosphere: hotelData.atmosphere || '',
        perfectLocation: hotelData.perfect_location || '',
        contactName: hotelData.contact_name || '',
        contactEmail: hotelData.contact_email || '',
        contactPhone: hotelData.contact_phone || '',
        stayLengths: hotelData.stay_lengths || [],
        mealPlans: hotelData.meal_plans || [],
        roomTypes: hotelData.room_types || [],
        faqs: hotelData.faqs || [],
        terms: hotelData.terms || '',
        preferredWeekday: hotelData.preferredWeekday || 'Monday',
        featuresHotel: hotelData.features_hotel || {},
        featuresRoom: hotelData.features_room || {},
        available_months: hotelData.available_months || [],
        rates: hotelData.rates || {},
        mainImageUrl: hotelData.main_image_url || '',
        // Load dynamic pricing values - try both camelCase and snake_case
        enablePriceIncrease: hotelData.enablePriceIncrease ?? hotelData.enable_price_increase ?? false,
        priceIncreaseCap: hotelData.priceIncreaseCap ?? hotelData.price_increase_cap ?? 20,
        // Extract themes and activities
        themes: hotelData.hotel_themes?.map(ht => ht.themes?.id).filter(Boolean) || [],
        activities: hotelData.hotel_activities?.map(ha => ha.activities?.name).filter(Boolean) || [],
        hotelImages: hotelData.hotel_images?.map(img => ({
          id: img.id,
          url: img.image_url,
          isMain: img.is_main
        })) || []
      }));

      setCurrentStep(1);
    }
  }, [editingHotelId, hotelData, isLoading, setFormData, setCurrentStep]);

  return { isLoading };
};
