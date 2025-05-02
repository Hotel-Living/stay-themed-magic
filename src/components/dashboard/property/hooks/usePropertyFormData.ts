
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
  price_8?: number; // Price for 8-day stay
  price_16?: number; // Price for 16-day stay
  price_24?: number; // Price for 24-day stay
  price_32?: number; // Price for 32-day stay
  rates?: Record<string, number>; // For storing all rates together
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
    available_months: [], // Initialize available_months as empty array
    price_8: 0,
    price_16: 0,
    price_24: 0,
    price_32: 0,
    rates: {}
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
