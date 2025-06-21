
import { useTranslation } from "@/hooks/useTranslation";
import HotelDashboardEN from "./HotelDashboard.en";
import HotelDashboardES from "./HotelDashboard.es";
import HotelDashboardPT from "./HotelDashboard.pt";
import HotelDashboardRO from "./HotelDashboard.ro";

export default function HotelDashboard() {
  const { language } = useTranslation();
  
  if (language === 'en') return <HotelDashboardEN />;
  if (language === 'es') return <HotelDashboardES />;
  if (language === 'pt') return <HotelDashboardPT />;
  if (language === 'ro') return <HotelDashboardRO />;
  
  // Default fallback to English
  return <HotelDashboardEN />;
}
