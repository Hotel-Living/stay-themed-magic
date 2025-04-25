
import { useState } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";

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
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const validValues = Array.isArray(value) 
        ? value.filter(id => id && typeof id === 'string' && uuidRegex.test(id))
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
