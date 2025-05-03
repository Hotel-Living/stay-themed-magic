
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFormData } from "./usePropertyFormData";
import { useToast } from "@/hooks/use-toast";

interface HotelEditingProps {
  editingHotelId: string | null | undefined;
  setFormData: (formData: PropertyFormData) => void;
  setCurrentStep?: (step: number) => void;
}

const safeFeatureConversion = (featureData: any): Record<string, boolean> => {
  if (!featureData) return {};
  
  // If it's already in the correct format, return it
  if (typeof featureData === 'object' && !Array.isArray(featureData)) {
    return featureData as Record<string, boolean>;
  }
  
  // Otherwise, return an empty object
  console.warn('Unexpected feature data format:', featureData);
  return {};
};

// Helper function to safely convert rates to the correct format
const safeRatesConversion = (ratesData: any): Record<string, number> => {
  if (!ratesData) return {};
  
  // If it's already an object but not an array, try to convert
  if (typeof ratesData === 'object' && !Array.isArray(ratesData)) {
    const result: Record<string, number> = {};
    
    // Iterate over the object properties and ensure values are numbers
    Object.entries(ratesData).forEach(([key, value]) => {
      if (typeof value === 'number') {
        result[key] = value;
      } else if (typeof value === 'string') {
        // Try to parse string to number
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
          result[key] = parsedValue;
        }
      }
    });
    
    return result;
  }
  
  console.warn('Unexpected rates data format:', ratesData);
  return {};
};

export const useHotelEditing = ({
  editingHotelId,
  setFormData,
  setCurrentStep
}: HotelEditingProps) => {
  const { toast } = useToast();
  
  useEffect(() => {
    if (!editingHotelId) return;

    const fetchHotelDetails = async () => {
      console.log("Fetching hotel details for editing:", editingHotelId);
      
      try {
        const { data: hotel, error } = await supabase
          .from('hotels')
          .select(`
            *, 
            hotel_themes(theme_id, themes(*)), 
            hotel_activities(activity_id, activities(*)), 
            hotel_images(*)
          `)
          .eq('id', editingHotelId)
          .single();
        
        if (error) {
          console.error("Error fetching hotel details:", error);
          toast({
            title: "Error loading hotel",
            description: "Could not load hotel details. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (!hotel) {
          console.error("Hotel not found");
          toast({
            title: "Hotel not found",
            description: "The hotel you're trying to edit could not be found.",
            variant: "destructive",
          });
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

        console.log("Mapped uploaded images:", uploadedImages);

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
          latitude: hotel.latitude,
          longitude: hotel.longitude,
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
          available_months: hotel.available_months || [],
          rates: safeRatesConversion(hotel.rates)
        });
        
        console.log("Set form data for editing");
        
        // Navigate to first step if setting current step is provided
        if (setCurrentStep) {
          setCurrentStep(1);
        }
      } catch (error) {
        console.error("Error in fetchHotelDetails:", error);
        toast({
          title: "Error loading hotel",
          description: "There was a problem loading hotel details.",
          variant: "destructive",
        });
      }
    };

    fetchHotelDetails();
  }, [editingHotelId, setFormData, setCurrentStep, toast]);

  return { editingHotelId };
};
