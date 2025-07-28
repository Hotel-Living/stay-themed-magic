import { TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelSlogansENEnhanced } from "./HotelSlogans.en.enhanced";
import { HotelSlogansES } from "./HotelSlogans.es";
import { HotelSlogansPT } from "./HotelSlogans.pt";
import { HotelSlogansRO } from "./HotelSlogans.ro";

export function HotelSlogansEnhanced() {
  const { language } = useTranslation();
  
  if (language === 'en') return <HotelSlogansENEnhanced />;
  if (language === 'es') return <HotelSlogansES />;
  if (language === 'pt') return <HotelSlogansPT />;
  if (language === 'ro') return <HotelSlogansRO />;
  
  // Default fallback to English enhanced
  return <HotelSlogansENEnhanced />;
}