
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from './usePropertyForm';

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
      
      const { data, error } = await supabase
        .from("hotels")
        .select(`
          *,
          hotel_themes:hotel_themes(theme_id),
          hotel_activities:hotel_activities(activity_id),
          hotel_images(image_url, is_main)
        `)
        .eq("id", editingHotelId)
        .single();

      if (error || !data) {
        toast({
          title: "Error",
          description: "Unable to load property for editing."
        });
        return;
      }

      // Cast data to any to safely access properties that might not be in the type
      const hotelData = data as any;

      setFormData({
        hotelName: hotelData.name || "",
        propertyType: hotelData.property_type || "",
        style: hotelData.style || "", 
        description: hotelData.description || "",
        // Safely access these fields which might not exist in database schema
        idealGuests: hotelData.ideal_guests || "",
        atmosphere: hotelData.atmosphere || "",
        perfectLocation: hotelData.perfect_location || "",
        country: hotelData.country || "",
        address: hotelData.address || "",
        city: hotelData.city || "",
        postalCode: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        category: hotelData.category?.toString() || "",
        stayLengths: Array.isArray(hotelData.available_months) && hotelData.available_months.length > 0 ? [30] : [],
        mealPlans: [],
        roomTypes: [],
        themes: Array.isArray(hotelData.hotel_themes) ? hotelData.hotel_themes.map((t: any) => t.theme_id) : [],
        activities: Array.isArray(hotelData.hotel_activities) ? hotelData.hotel_activities.map((a: any) => a.activity_id) : [],
        faqs: [],
        terms: "",
        termsAccepted: false
      });
      setCurrentStep(1);
    }
    
    fetchHotelIfEditing();
  }, [editingHotelId, setFormData, setCurrentStep, toast]);
};
