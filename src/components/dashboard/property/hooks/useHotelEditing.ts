
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
            hotel_images(image_url, is_main)
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

        // Populate form data with all available fields, using optional chaining for fields that might be missing
        setFormData({
          hotelName: data.name || "",
          propertyType: data.property_type || "",
          style: data.style || "", 
          description: data.description || "",
          idealGuests: data.ideal_guests || "",
          atmosphere: data.atmosphere || "",
          perfectLocation: data.perfect_location || "",
          country: data.country || "",
          address: data.address || "",
          city: data.city || "",
          postalCode: data.postal_code || "",
          contactName: data.contact_name || "",
          contactEmail: data.contact_email || "",
          contactPhone: data.contact_phone || "",
          category: data.category?.toString() || "",
          stayLengths: Array.isArray(data.available_months) && data.available_months.length > 0 
            ? [30] // Default to 30 days if there are available months
            : [],
          mealPlans: data.meal_plans || [],
          roomTypes: data.room_types || [],
          themes: themes,
          activities: activities,
          faqs: data.faqs || [],
          terms: data.terms || "",
          termsAccepted: true,
          hotelImages: images,
          mainImageUrl: mainImageUrl
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
