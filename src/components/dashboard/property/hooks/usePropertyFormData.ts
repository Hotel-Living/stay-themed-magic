
import { useState } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";
import { isValidUuid } from "@/utils/validation";

export interface PropertyFormData {
  hotelName: string;
  propertyType: string;
  description: string;
  idealGuests?: string;
  atmosphere?: string;
  perfectLocation?: string;
  style: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  stayLengths: number[];
  mealPlans: string[];
  roomTypes: any[];
  themes: string[]; // Should contain valid UUIDs
  activities: string[]; // Should contain valid UUIDs
  faqs: any[];
  terms: string;
  termsAccepted: boolean;
  hotelImages?: UploadedImage[];
  mainImageUrl?: string;
  preferredWeekday?: string;
  featuresHotel?: any;
  featuresRoom?: any;
  available_months?: string[];
}

export const usePropertyFormData = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    hotelName: "",
    propertyType: "",
    description: "",
    idealGuests: "",
    atmosphere: "",
    perfectLocation: "",
    style: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    category: "",
    stayLengths: [],
    mealPlans: [],
    roomTypes: [],
    themes: [],
    activities: [],
    faqs: [],
    terms: "",
    termsAccepted: false,
    preferredWeekday: "Monday",
    featuresHotel: null,
    featuresRoom: null,
    available_months: []
  });

  const updateFormData = (field: keyof PropertyFormData, value: any) => {
    // Special handling for themes and activities to ensure they're valid UUIDs
    if (field === 'themes' || field === 'activities') {
      // Validate UUIDs before updating
      const validValues = Array.isArray(value) 
        ? value.filter(id => id && isValidUuid(id))
        : [];
        
      setFormData(prev => ({
        ...prev,
        [field]: validValues
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    formData,
    setFormData,
    updateFormData
  };
};
