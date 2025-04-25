
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from './usePropertyFormData';

interface UseHotelEditingProps {
  editingHotelId?: string | null;
  setFormData: (data: PropertyFormData) => void;
  setCurrentStep: (step: number) => void;
}

export const useHotelEditing = ({
  editingHotelId,
  setFormData,
  setCurrentStep
}: UseHotelEditingProps) => {
  const { toast } = useToast();

  useEffect(() => {
    async function fetchHotelIfEditing() {
      if (!editingHotelId) return;
      
      console.log("Fetching hotel for editing with ID:", editingHotelId);
      
      try {
        const { data, error } = await supabase
          .from("hotels")
          .select(`
            *,
            hotel_themes!hotel_id(theme_id, themes(*)),
            hotel_activities!hotel_id(activity_id, activities(*)),
            hotel_images(id, image_url, is_main)
          `)
          .eq("id", editingHotelId)
          .maybeSingle();

        if (error || !data) {
          console.error("Error loading property for editing:", error);
          toast({
            title: "Error",
            description: "Unable to load property for editing."
          });
          return;
        }

        console.log("Successfully fetched hotel data:", data);

        // Extract themes and activities
        const themes = Array.isArray(data.hotel_themes) 
          ? data.hotel_themes.map((t: any) => t.theme_id) 
          : [];
        
        const activities = Array.isArray(data.hotel_activities) 
          ? data.hotel_activities.map((a: any) => a.activity_id) 
          : [];
          
        // Extract images
        const images = Array.isArray(data.hotel_images)
          ? data.hotel_images.map((img: any) => ({
              id: img.id,
              name: img.image_url.split('/').pop(),
              url: img.image_url,
              isMain: img.is_main,
              uploaded: true
            }))
          : [];
            
        // Find main image URL
        const mainImage = data.hotel_images?.find((img: any) => img.is_main);
        const mainImageUrl = mainImage?.image_url || data.main_image_url || '';

        // Type assertion to access the additional properties
        const hotelData = data as any;

        // Log all properties to debug
        console.log("Hotel properties:", Object.keys(hotelData));
        console.log("Hotel themes:", themes);
        console.log("Hotel activities:", activities);
        console.log("Hotel available months:", hotelData.available_months);
        console.log("Hotel features_hotel:", hotelData.features_hotel);
        console.log("Hotel features_room:", hotelData.features_room);
        
        // Process available months to ensure proper type safety
        // First, ensure we have an array
        const monthsArray = Array.isArray(hotelData.available_months) 
          ? hotelData.available_months 
          : [];
          
        // Then, ensure each item is a string with proper capitalization
        const normalizedMonths: string[] = monthsArray
          .filter((month): month is string => typeof month === 'string' && month.trim() !== '')
          .map((month: string) => {
            return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
          });
          
        console.log("Normalized months for editing:", normalizedMonths);
        
        // Populate form data with all available fields, using proper mapping from snake_case to camelCase
        setFormData({
          hotelName: hotelData.name || "",
          propertyType: hotelData.property_type || "",
          style: hotelData.style || "", 
          description: hotelData.description || "",
          idealGuests: hotelData.ideal_guests || "",
          atmosphere: hotelData.atmosphere || "",
          perfectLocation: hotelData.perfect_location || "",
          country: hotelData.country || "",
          address: hotelData.address || "",
          city: hotelData.city || "",
          postalCode: hotelData.postal_code || "",
          contactName: hotelData.contact_name || "",
          contactEmail: hotelData.contact_email || "",
          contactPhone: hotelData.contact_phone || "",
          category: hotelData.category?.toString() || "",
          stayLengths: hotelData.stay_lengths || [],
          mealPlans: hotelData.meal_plans || [],
          roomTypes: hotelData.room_types || [],
          themes: themes,
          activities: activities,
          faqs: hotelData.faqs || [],
          terms: hotelData.terms || "",
          termsAccepted: true,
          hotelImages: images,
          mainImageUrl: mainImageUrl,
          preferredWeekday: hotelData.preferredWeekday || "Monday",
          available_months: normalizedMonths,
          featuresHotel: hotelData.features_hotel || null,
          featuresRoom: hotelData.features_room || null
        });
        
        setCurrentStep(1);
        console.log("Form data populated for editing");
      } catch (err) {
        console.error("Error in fetchHotelIfEditing:", err);
        toast({
          title: "Error",
          description: "Failed to load property data for editing."
        });
      }
    }
    
    fetchHotelIfEditing();
  }, [editingHotelId, setFormData, setCurrentStep, toast]);
};
