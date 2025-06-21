
import { TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelSlogansEN } from "./HotelSlogans.en";
import { HotelSlogansES } from "./HotelSlogans.es";
import { HotelSlogansPT } from "./HotelSlogans.pt";
import { HotelSlogansRO } from "./HotelSlogans.ro";

export function HotelSlogans() {
  const { language } = useTranslation();
  
  if (language === 'en') return <HotelSlogansEN />;
  if (language === 'es') return <HotelSlogansES />;
  if (language === 'pt') return <HotelSlogansPT />;
  if (language === 'ro') return <HotelSlogansRO />;
  
  // Default fallback to English
  return <HotelSlogansEN />;
}
