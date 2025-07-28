import { Calendar, DollarSign, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelFeaturesENEnhanced } from "./HotelFeatures.en.enhanced";
import { HotelFeaturesES } from "./HotelFeatures.es";
import { HotelFeaturesPT } from "./HotelFeatures.pt";
import { HotelFeaturesRO } from "./HotelFeatures.ro";

export function HotelFeaturesEnhanced() {
  const { language } = useTranslation();
  
  if (language === 'en') return <HotelFeaturesENEnhanced />;
  if (language === 'es') return <HotelFeaturesES />;
  if (language === 'pt') return <HotelFeaturesPT />;  
  if (language === 'ro') return <HotelFeaturesRO />;
  
  // Default fallback to English enhanced
  return <HotelFeaturesENEnhanced />;
}