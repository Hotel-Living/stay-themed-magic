
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
  themes: string[];
  activities: string[];
  faqs: any[];
  terms: string;
  termsAccepted: boolean;
  hotelImages?: UploadedImage[];
  mainImageUrl?: string;
  preferredWeekday?: string;
  featuresHotel?: Record<string, boolean>;  
  featuresRoom?: Record<string, boolean>;
  available_months?: string[]; // Added available_months to match database schema
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
    featuresHotel: {},
    featuresRoom: {},
    available_months: [] // Initialize available_months as empty array
  });

  const updateFormData = (field: keyof PropertyFormData, value: any) => {
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
