
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "./usePropertyFormData";

interface HotelEditingProps {
  editingHotelId: string | null | undefined;
  setFormData: (formData: PropertyFormData) => void;
  setCurrentStep?: (step: number) => void;
}

export const useHotelEditing = ({
  editingHotelId,
  setFormData,
  setCurrentStep
}: HotelEditingProps) => {
  useEffect(() => {
    if (!editingHotelId) return;

    const fetchHotelDetails = async () => {
      console.log("Fetching hotel details for editing:", editingHotelId);
      
      try {
        const { data: hotel, error } = await supabase
          .from('hotels')
          .select('*, hotel_themes(theme_id, themes(*)), hotel_activities(activity_id, activities(*)), hotel_images(*)')
          .eq('id', editingHotelId)
          .single();
        
        if (error) {
          console.error("Error fetching hotel details:", error);
          return;
        }

        if (!hotel) {
          console.error("Hotel not found");
          return;
        }

        console.log("Fetched hotel data:", hotel);
        
        // Map the selected themes from hotel_themes relation
        const selectedThemes = hotel.hotel_themes?.map(theme => theme.theme_id) || [];
        
        // Map the selected activities from hotel_activities relation
        const selectedActivities = hotel.hotel_activities?.map(activity => activity.activity_id) || [];

        // Map uploaded images
        const uploadedImages = hotel.hotel_images?.map(img => ({
          id: img.id,
          url: img.image_url,
          isMain: img.is_main
        })) || [];

        // Helper function to safely convert to Record<string, boolean>
        const safeFeatureConversion = (featureData: any): Record<string, boolean> => {
          if (!featureData) return {};
          
          // If it's already a plain object with boolean values, return it
          if (typeof featureData === 'object' && !Array.isArray(featureData)) {
            const result: Record<string, boolean> = {};
            
            // Convert all values to boolean
            for (const key in featureData) {
              result[key] = Boolean(featureData[key]);
            }
            
            return result;
          }
          
          // Return empty object if it's not in expected format
          return {};
        };

        // Parse hotel data for form
        setFormData({
          hotelName: hotel.name || "",
          propertyType: hotel.property_type || "",
          description: hotel.description || "",
          idealGuests: hotel.ideal_guests || "",
          atmosphere: hotel.atmosphere || "",
          perfectLocation: hotel.perfect_location || "",
          style: hotel.style || "",
          country: hotel.country || "",
          address: hotel.address || "",
          city: hotel.city || "",
          postalCode: hotel.postal_code || "",
          contactName: hotel.contact_name || "",
          contactEmail: hotel.contact_email || "",
          contactPhone: hotel.contact_phone || "",
          category: hotel.category?.toString() || "0",
          stayLengths: hotel.stay_lengths || [],
          mealPlans: hotel.meal_plans || [],
          roomTypes: hotel.room_types || [],
          themes: selectedThemes,
          activities: selectedActivities,
          faqs: hotel.faqs || [],
          terms: hotel.terms || "",
          termsAccepted: true,
          hotelImages: uploadedImages,
          mainImageUrl: hotel.main_image_url,
          preferredWeekday: hotel.preferredWeekday || "Monday",
          featuresHotel: safeFeatureConversion(hotel.features_hotel),
          featuresRoom: safeFeatureConversion(hotel.features_room),
          available_months: hotel.available_months || []
        });
        
        // Navigate to first step if setting current step is provided
        if (setCurrentStep) {
          setCurrentStep(1);
        }
      } catch (error) {
        console.error("Error in fetchHotelDetails:", error);
      }
    };

    fetchHotelDetails();
  }, [editingHotelId, setFormData, setCurrentStep]);

  return { editingHotelId };
};
