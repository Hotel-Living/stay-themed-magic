
import { useState } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";

export interface PropertyFormData {
  hotelName: string;
  propertyType: string;
  description: string;
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
  hotelImages?: UploadedImage[]; // Added this field
}

export const usePropertyFormData = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    hotelName: "",
    propertyType: "",
    description: "",
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
    termsAccepted: false
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
