
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
        postalCode: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        category: data.category?.toString() || "",
        stayLengths: Array.isArray(data.available_months) && data.available_months.length > 0 ? [30] : [],
        mealPlans: [],
        roomTypes: [],
        themes: Array.isArray(data.hotel_themes) ? data.hotel_themes.map((t: any) => t.theme_id) : [],
        activities: Array.isArray(data.hotel_activities) ? data.hotel_activities.map((a: any) => a.activity_id) : [],
        faqs: [],
        terms: "",
        termsAccepted: false
      });
      setCurrentStep(1);
    }
    
    fetchHotelIfEditing();
  }, [editingHotelId, setFormData, setCurrentStep, toast]);
};
